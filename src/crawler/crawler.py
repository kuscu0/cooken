import requests
import re
import json
import time
import codecs
import threading

# constants
# in Nov 2020 chefkoch.de has around 12k pages
# recommended to download in batches, not all at once
startPage    = 0
endPage      = 1000
threadsToUse = 7
# in seconds
remainingIdsLoggingInterval = 10

# list of all indexed recipe ids, to avoid duplicates
allIds = []
# list of recipe ids to be processed by api worker threads
pendingIds = []
pendingIdsLock = threading.Lock()
# when True no more ids will be appended to pendingIds
allIdsFound = False
currentPage = startPage
t_firstReq = 0
t_apiReq = 0
t_idSearch = 0
t_fileWrite = 0

def getAllPrevIds():
	global allIds
	try:
		with open("allIds.txt", "r") as f:
			allIds = f.read().splitlines()
	except:
		pass  # file doesn't exist, no problem, since allIds have already been initialized


def writeAllIds():
	global allIds
	with open("allIds.txt", "w+") as f:
		f.write("\n".join(allIds))
	print("saved all %d ids" % len(allIds))


def pageUrl(pageNum):
	return "https://www.chefkoch.de/rs/s%do3/Rezepte.html" % (pageNum * 30)		# chronological list of all recipes

# print every n seconds the current crawling progress
def statusPrinter():
	startTime = time.time()
	while len(pendingIds) > 0 or not allIdsFound:
		print("remaining ids: %d \t\t page crawler progress: %.2f \t\t seconds passed: %d"
			% (len(pendingIds), ((currentPage - startPage) / (endPage - startPage)), time.time() - startTime))
		time.sleep(remainingIdsLoggingInterval)
	
	print("status: done")

# crawl for ids of recipes
def idsCollector():
	global currentPage
	global allIdsFound
	global pendingIds
	global t_firstReq
	global t_idSearch

	try:
		for page in range(startPage, endPage):
			currentPage = page
			t1 = time.time()
			firstRequest = requests.get(pageUrl(page))
			html = firstRequest.text
			t_firstReq += time.time() - t1
			t1 = time.time()
			jsonStart = html.find('<script type="application/ld+json">',
								html.find('<script type="application/ld+json">') + 1)
			jsonEnd = html.find("</script>", jsonStart)
			entries = html[jsonStart:jsonEnd]
			ids = re.findall("https://www\\.chefkoch\\.de/rezepte/(\\d+)/.*\\.html", entries)
			t_idSearch += time.time() - t1
			
			if (len(ids) == 0):			# last page
				print("LAST PAGE REACHED !!!")
				break

			for id in ids:
				if id in allIds:
					continue
				allIds.append(id)
				pendingIdsLock.acquire()
				pendingIds.append(id)
				pendingIdsLock.release()
	except Exception as e:
		print("ids collector ran into an error")
		print(e)
	print("ids collector is done")
	allIdsFound = True

# downloads recipes from ids in pendingIds
def recipeDataDownloader():
	global t_apiReq, t_fileWrite

	try:
		while len(pendingIds) > 0 or not allIdsFound:
			pendingIdsLock.acquire()
			if len(pendingIds) == 0:
				if allIdsFound:
					pendingIdsLock.release()
					break
				else:
					pendingIdsLock.release()
					time.sleep(0.01)
					continue

			id = pendingIds.pop()
			pendingIdsLock.release()

			t1 = time.time()
			request = requests.get("https://api.chefkoch.de/v2/recipes/" + str(id))
			t_apiReq += time.time() - t1

			t1 = time.time()
			with codecs.open("recipes/%s.json" % id, "w+", "utf-8") as f:
				f.write(json.dumps(request.json(), indent=4, ensure_ascii=False)
						.encode("utf-8")
						.decode())
			t_fileWrite += time.time() - t1
	except Exception as e:
		print("error in api thread")
		print(e)
	
	print("api thread finished")

def main():
	getAllPrevIds()
	t_total = time.time()

	try:
		threading.Thread(target=statusPrinter).start()
		# idsCollector is the main bottle neck, until it also gets multi threaded
		idsCollectorThread = threading.Thread(target=idsCollector)
		idsCollectorThread.start()
		apiThreads = []
		for i in range(threadsToUse):
			apiThreads.append(threading.Thread(target=recipeDataDownloader))
			apiThreads[i].start()

		idsCollectorThread.join()
		for thread in apiThreads:
			thread.join()
	except Exception as e:
		print("error in main method")
		print(e)

	t_total = time.time() - t_total

	print("t_total: " + str(t_total))
	print("t_firstReq: " + str(t_firstReq))
	print("t_apiReq: " + str(t_apiReq))
	print("t_idSearch: " + str(t_idSearch))
	print("t_fileWrite: " + str(t_fileWrite))

	print("last page: " + str(currentPage))

	writeAllIds()


if __name__ == '__main__':
	main()
