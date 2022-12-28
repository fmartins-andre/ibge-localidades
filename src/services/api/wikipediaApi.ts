import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const wikipediaApi = createApi({
  reducerPath: 'wikipediaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pt.wikipedia.org/w/api.php'
  }),
  endpoints: (builder) => ({

    getWikiSearch: builder.query<WikiListSearchResponse, string>({
      query: (searchString) => {
        return ({
          url: '',
          params: {
            action: "query",
            format: "json",
            list: "search",
            utf8: 1,
            formatversion: "2",
            srsearch: searchString,
            srnamespace: "0",
            srlimit: "1",
            srqiprofile: "engine_autoselect",
            origin: "*"
          }
        })
      }
    })

  })
})

export const {
  useGetWikiSearchQuery,
  useLazyGetWikiSearchQuery,
} = wikipediaApi

export function getWikiUrlById(wikiPageId: number | null | undefined) {
  return wikiPageId
    ? `https://pt.wikipedia.org/?curid=${wikiPageId}`
    : null
}