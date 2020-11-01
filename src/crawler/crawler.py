import requests
import re
import json
import time

def pageUrl(pageNum):
	return "https://www.chefkoch.de/rs/s%do3/Rezepte.html" % (pageNum * 30)

t1 = time.time()
for page in range(1):
	firstRequest = requests.get(pageUrl(page))
	html = firstRequest.text
	jsonStart = html.find('<script type="application/ld+json">', html.find('<script type="application/ld+json">') + 1)
	jsonEnd = html.find("</script>", jsonStart)
	entries = html[jsonStart:jsonEnd]
	ids = re.findall("https://www\\.chefkoch\\.de/rezepte/(\\d+)/.*\\.html", entries)

	for id in ids:
		request = requests.get("https://api.chefkoch.de/v2/recipes/" + str(id))
		print(request.json())
		break

	break

t2 = time.time()

print(t2 - t1)