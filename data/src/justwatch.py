import requests
from src.queries import queryStreaming, queryPopularTitles
from src.tvmaze import getDataTVmaze
from src.csvSaver import CsvSaver

url = "https://apis.justwatch.com/graphql"


def loadPopularTitles():
  responsePopular = requests.post(url, json=queryPopularTitles)

  response = responsePopular
  if response.status_code == 200:
    csvSaver = CsvSaver('src/series/series.csv')
    currentData = csvSaver.get_unique_check()
    data = response.json()
    
    for edge in data['data']['popularTitles']['edges']:
      id = edge['node'].get('id', None)
      content = edge['node'].get('content', None)
      
      if not content or not id or id in currentData:
          continue

      title = edge['node']['content'].get('title', None)
      imdbScore = edge['node']['content']['scoring'].get('imdbScore', None)
      imdbVotes = edge['node']['content']['scoring'].get('imdbVotes', None)
      posterUrl = edge['node']['content'].get('posterUrl', None)
      genres = edge['node']['content'].get('genres', None)

      if posterUrl:
        posterUrl = 'https://images.justwatch.com' + posterUrl

      genres = getGenres(genres)

      platforms = getStreamingData(id)

      seasons = getDataTVmaze(title)

      csvSaver.save_data([id, title, imdbScore, imdbVotes, posterUrl, genres, platforms, seasons])

  else:
      print(f"Query failed with status code {response.status_code}")


def getStreamingData(jwEntityID):
  queryStreaming['variables']['filter']['jwEntityID'] = jwEntityID
  response = requests.post(url, json=queryStreaming)

  platforms = []

  if response.status_code == 200:
    dataStreaming = response.json()
    edge = dataStreaming['data']['streamingCharts']['edges'][0]
    offers = edge['node'].get('offers', [])
    watchNowOffer = edge['node'].get('watchNowOffer', None)
    platforms = getPlatforms(offers, watchNowOffer)

  else:
    print(f"Query failed with status code {response.status_code}")

  return platforms


def getPlatforms(offers, watch_now_offer):
  platforms = []
  names = []

  for offer in offers:
    name, streamUrl, firstWord = getStreamNameAndUrl(offer)
    
    if firstWord in names:
      continue
    
    names.append(firstWord)
    platforms.append([name, streamUrl])
  
  if watch_now_offer:
    name, streamUrl, firstWord = getStreamNameAndUrl(watch_now_offer)
    
    if firstWord not in names:
      platforms.append([name, streamUrl])
  
  return platforms

def getStreamNameAndUrl(source):
  name = source['package']['clearName']
  streamUrl = source['standardWebURL']
  firstWord = name.split(' ')[0]
  return name, streamUrl, firstWord

def getGenres(genres):
  return [genre['translation'] for genre in genres]
