import requests


url = 'https://api.tvmaze.com/singlesearch/shows?q={name}&embed=episodes'
def getDataTVmaze(name):
  response = requests.get(url.format(name=name))
  episodes = None
  image = None
  summary = None
  
  if response.status_code == 200:
    data = response.json()
      
    image = data.get('image', None)
    image = getImage(image)
      
    summary = data.get('summary', None)
    summary = getSummary(summary)

    episodes = data['_embedded'].get('episodes', None)
    episodes = getEpisodes(episodes)

  else:
    print(f"Query failed with status code {response.status_code}")
    
  return episodes, image, summary


def getEpisodes(episodes):
  if not episodes:
    return None

  episodesDict = {}
    
  for eposode in episodes:
    season = eposode.get('season', None)
    number = eposode.get('number', None)
    summary = eposode.get('summary', None)
    image = eposode.get('image', None)

    image = getImage(image)
        
    summary = getSummary(summary)

    if season not in episodesDict:
        episodesDict[season] = {}

    episodesDict[season][number] = {
        "summary": summary,
        "image": image
    }

  return episodesDict

def getImage(image):
  if image:
    image = image.get('original', None)
  return image

def getSummary(summary):
  if summary:
    summary = summary.encode('utf-8').decode('unicode_escape')
    summary = summary.replace('<p>', '').replace('</p>', '').replace('<b>', '').replace('</b>', '')
  return summary
