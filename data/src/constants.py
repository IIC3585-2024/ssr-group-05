series = { 
    'path': 'src/series/series.csv',
    'col': 0,
    'headers': [ 
      'idPage',
      'id',
      'title',
      'description',
      'imageUrl',
    ]
}

genre = {
    'path': 'src/series/genre.csv',
    'col': 1,
    'headers': [ 
      'id',
      'genre'
    ]
}

platform = {
    'path': 'src/series/platform.csv',
    'col': 1,
    'headers': [ 
      'id',
      'platform'
    ]
}

season = {
    'path': 'src/series/season.csv',
    'col': 1,
    'headers': [ 
      'id',
      'seriesId',
      'seasonNumber',
      'episodeCount'
    ]
}

episode = {
    'path': 'src/series/episode.csv',
    'col': 1,
    'headers': [ 
      'id',
      'seasonId',
      'episodeNumber',
      'posterUrl',
      'summary'
    ]
}

seriesGenre = {
    'path': 'src/series/seriesGenre.csv',
    'col': 0,
    'headers': [ 
      'seriesId',
      'genreId'
    ]
}

seriesPlatform = {
    'path': 'src/series/seriesPlatform.csv',
    'col': 0,
    'headers': [ 
      'seriesId',
      'platformId',
      'platformUrl'
    ]
}
