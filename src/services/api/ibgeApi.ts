import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ibgeApi = createApi({
  reducerPath: 'ibgeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://servicodados.ibge.gov.br/api'
  }),
  tagTypes: [],
  endpoints: () => ({})
})
