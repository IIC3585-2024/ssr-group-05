import csv

class CsvSaver:
  def __init__(self):
    pass

  def get_id(self, output_file_name: str) -> int:
    try:
      with open(output_file_name, newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        data = list(reader)
        return len(data)
    except FileNotFoundError:
      return 1

  def get_unique_check(self, output_file_name: str, col: int) -> list:
    try:
      with open(output_file_name, newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        data = list(reader)
        unique_check = []
        for row in data[1:]:
          unique_id = ''.join(row[col])
          unique_check.append(unique_id)
        return unique_check
    except FileNotFoundError:
      return []

  def save_data(self, output_file_name: str, header: list, data: list) -> None:
    with open(output_file_name, 'a', newline='', encoding='utf-8') as csvfile:
      writer = csv.writer(csvfile)
      if csvfile.tell() == 0:
        writer.writerow(header)
        
      writer.writerow(data)

  def saveGenres(self, csvSaver, currentData: list, genresList: list, seriesId: int, constantGenre: dict, constantSeriesGenre: dict):
    genres = []
    saveId = None

    if currentData:
      genres = currentData
    id = len(genres)

    for genre in genresList:
      if genre not in genres:
        saveId = id + 1
        id += 1
        genres.append(genre)
        csvSaver.save_data(constantGenre['path'], constantGenre['headers'], [saveId, genre])

      else:
        saveId = genres.index(genre) + 1

      csvSaver.save_data(constantSeriesGenre['path'], constantSeriesGenre['headers'], [seriesId, saveId])
  
    return genres
  

  def savePlatforms(self, csvSaver, currentData: list, platformsList: list, seriesId: int, constantPlatform: dict, constantSeriesPlatform: dict):
    id = 0
    platforms = []
    saveId = None

    if currentData:
      platforms = currentData

    id = len(platforms)

    for platform in platformsList:
      if platform[0] not in platforms:
        saveId = id + 1
        id += 1
        platforms.append(platform[0])
        csvSaver.save_data(constantPlatform['path'], constantPlatform['headers'], [saveId, platform[0]])

      else:
        saveId = platforms.index(platform[0]) + 1

      csvSaver.save_data(constantSeriesPlatform['path'], constantSeriesPlatform['headers'], [seriesId, saveId, platform[1]])
    
    return platforms


  def saveSeason(self, csvSaver, seasonsDict: dict, seriesId: int, constantSeason: dict, constantEpisode: dict):
    seasonId = self.get_id(constantSeason['path'])
    episodeId = self.get_id(constantEpisode['path'])


    for seasonNumber, episodes in seasonsDict.items():
      
      csvSaver.save_data(constantSeason['path'], constantSeason['headers'], [seasonId, seriesId, seasonNumber, len(episodes)])
      seasonId += 1
