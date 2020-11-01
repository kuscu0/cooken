import requests
import re
import json
import time
import codecs
import threading

allIds = []
pendingIds = []
pendingIdsLock = threading.Lock()
allIdsFound = False
t_firstReq = 0
t_apiReq = 0
t_idSearch = 0
t_fileWrite = 0

startPage = 500
endPage = 1000
currentPage = 0
threadsToUse = 4
remainingIdsLoggingInterval = 15

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


def pageUrl(pageNum):
	return "https://www.chefkoch.de/rs/s%do3/Rezepte.html" % (pageNum * 30)

def statusPrinter():
	startTime = time.time()
	while len(pendingIds) > 0 or not allIdsFound:
		print("remaining ids: %d \t\t page crawler progress: %.2f \t\t seconds passed: %d"
			% (len(pendingIds), ((currentPage - startPage) / (endPage - startPage)), time.time() - startTime))
		time.sleep(remainingIdsLoggingInterval)

def idsCollector():
	global currentPage
	global allIdsFound
	global pendingIds
	global t_firstReq
	global t_idSearch


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

		for id in ids:
			if id in allIds:
				continue
			allIds.append(id)
			pendingIdsLock.acquire()
			pendingIds.append(id)
			pendingIdsLock.release()
	print("ids collector is done")
	allIdsFound = True

def recipeDataDownloader():
	global t_apiReq, t_fileWrite

	while len(pendingIds) > 0 or not allIdsFound:
		pendingIdsLock.acquire()
		if len(pendingIds) == 0:
			if allIdsFound:
				pendingIdsLock.release()
				return
			else:
				pendingIdsLock.release()
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

def main():
	getAllPrevIds()
	t_total = time.time()

	threading.Thread(target=statusPrinter).start()
	idsCollectorThread = threading.Thread(target=idsCollector)
	idsCollectorThread.start()
	apiThreads = []
	for i in range(threadsToUse):
		apiThreads.append(threading.Thread(target=recipeDataDownloader))
		apiThreads[i].start()

	idsCollectorThread.join()
	for thread in apiThreads:
		thread.join()

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
