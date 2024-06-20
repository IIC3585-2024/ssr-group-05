# based on https://www.reddit.com/r/webscraping/comments/wacb8a/how_to_scrape_graphql_endpoint_with_requests/?rdt=49727

queryPopularTitles = {
    "operationName": "GetPopularTitles",
    "variables": {
        "popularTitlesSortBy": "POPULAR",
        "first": 5,
        "platform": "WEB",
        "sortRandomSeed": 0,
        "popularAfterCursor": "NDA=",
        "popularTitlesFilter": {
            "ageCertifications": [],
            "excludeGenres": [],
            "excludeProductionCountries": [],
            "genres": [],
            "objectTypes": ["SHOW"],
            "productionCountries": [],
            "packages": [],
            "excludeIrrelevantTitles": False,
            "presentationTypes": [],
            "monetizationTypes": [],
        },        
        "profile": "S166",
        "format": "JPG",
        "watchNowFilter": {},
        "language": "en",
        "country": "GB",
    },
    "query": """
query GetPopularTitles($country: Country!, $popularTitlesFilter: TitleFilter, $watchNowFilter: WatchNowOfferFilter!, $popularAfterCursor: String, $popularTitlesSortBy: PopularTitlesSorting! = POPULAR, $first: Int! = 40, $language: Language!, $platform: Platform! = WEB, $sortRandomSeed: Int! = 0, $profile: PosterProfile, $backdropProfile: BackdropProfile, $format: ImageFormat) {
  popularTitles(
    country: $country
    filter: $popularTitlesFilter
    after: $popularAfterCursor
    sortBy: $popularTitlesSortBy
    first: $first
    sortRandomSeed: $sortRandomSeed
  ) {
    totalCount
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
      __typename
    }
    edges {
      ...PopularTitleGraphql
      __typename
    }
    __typename
  }
}

fragment PopularTitleGraphql on PopularTitlesEdge {
  cursor
  node {
    id
    objectId
    objectType
    content(country: $country, language: $language) {
      title
      fullPath
      scoring {
        imdbScore
        imdbVotes
      }
      genres {
        translation(language: $language)
        shortName
      }
      posterUrl(profile: $profile, format: $format)
      ... on ShowContent {
        backdrops(profile: $backdropProfile, format: $format) {
          backdropUrl
          __typename
        }
        __typename
      }
      __typename
  
    }
    watchNowOffer(country: $country, platform: $platform, filter: $watchNowFilter) {
      package {
        clearName
      }
    }
    ... on Movie {
      seenlistEntry {
        createdAt
        __typename
      }
      __typename
    }
    ... on Show {
      seenState(country: $country) {
        seenEpisodeCount
        progress
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}"""
}


queryStreaming = {
    "operationName": "GetStreamingChartInfo",
    "variables": {
        "language": "en",
        "country": "GB",
        "countryOffers": "GB",
        "withOffers": True,
        "platform": "WEB",
        "after": "",
        "filter": {
            "jwEntityID": "{jwEntityID}",
            # "category": "DAILY_POPULARITY_SAME_CONTENT_TYPE",
            # "previousTitles": 9,
            # "nextTitles": 9,
            "objectType": "SHOW"
        },
        "first": 1
    },
    "query": """
query GetStreamingChartInfo($country: Country!, $countryOffers: Country!, $language: Language!, $filter: StreamingChartsFilter, $first: Int!, $platform: Platform!, $withOffers: Boolean!, $after: String) {
  streamingCharts(
    country: $country
    filter: $filter
    first: $first
    after: $after
  ) {
    edges {
      node {
        id
        objectId
        objectType
        offerCount(country: $countryOffers, platform: $platform) @include(if: $withOffers)
        offers(country: $countryOffers, platform: $platform) @include(if: $withOffers) {
          package {
            clearName
          }
          standardWebURL
        }
        watchNowOffer(country: $countryOffers, platform: $platform) {
          package {
            clearName
          }
          standardWebURL
        }
        ... on MovieOrShowOrSeason {
          content(country: $countryOffers, language: $language) {
            title
          }
        }
      }
    }
    totalCount
  }
}
"""
}

