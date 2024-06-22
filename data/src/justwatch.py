import requests
from src.queries import queryStreaming, queryPopularTitles
from src.tvmaze import getDataTVmaze
from src.csvSaver import CsvSaver
import src.constants as constants
import uuid6


url = "https://apis.justwatch.com/graphql"

def loadPopularTitles():
  responsePopular = requests.post(url, json=queryPopularTitles)

  response = responsePopular
  if response.status_code == 200:
    csvSaver = CsvSaver()
    currentSeries = csvSaver.get_unique_check(constants.series['path'], constants.series['col'])
    currentPlatforms = csvSaver.get_unique_check(constants.platform['path'], constants.platform['col'])
    currentGenres = csvSaver.get_unique_check(constants.genre['path'], constants.genre['col'])

    data = response.json()
    
    for edge in data['data']['popularTitles']['edges']:
      id = edge['node'].get('id', None)
      serieUuid = uuid6.uuid6()
      content = edge['node'].get('content', None)
      
      if not content or not id or id in currentSeries:
          continue

      title = edge['node']['content'].get('title', None)
      posterUrl = edge['node']['content'].get('posterUrl', None)
      genres = edge['node']['content'].get('genres', None)

      if posterUrl:
        posterUrl = 'https://images.justwatch.com' + posterUrl

      genres = getGenres(genres)
      currentGenres = csvSaver.saveGenres(csvSaver, currentGenres, genres, serieUuid, constants.genre, constants.seriesGenre)

      platforms = getStreamingData(id)
      currentPlatforms = csvSaver.savePlatforms(csvSaver, currentPlatforms, platforms, serieUuid, constants.platform, constants.seriesPlatform)

      seasons, image, summary = getDataTVmaze(title)

      csvSaver.saveSeason(csvSaver, seasons, serieUuid, constants.season, constants.episode)
      csvSaver.save_data(constants.series['path'], constants.series['headers'], [id, serieUuid, title, summary, posterUrl])

  else:
      print(f"Query failed with status code {response.status_code}")


def getStreamingData(jwEntityID):
  queryStreaming['variables']['filter']['jwEntityID'] = jwEntityID
  response = requests.post(url, json=queryStreaming)

  platforms = []

  if response.status_code == 200:
    dataStreaming = response.json()
    edge = dataStreaming['data']['streamingCharts'].get('edges', [])

    if not edge:
      return platforms

    edge = edge[0]
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
