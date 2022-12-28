import { ibgeApi } from "./ibgeApi";

const baseUrl = '/v1/localidades'

export const localidadesApi = ibgeApi
  .injectEndpoints({
    endpoints: (builder) => ({

      getEstados: builder.query<UF[], void>({
        query: () => `${baseUrl}/estados?orderBy=nome`
      }),
  
      getMunicipios: builder.query<Municipio[], Array<UF['id']>>({
        query: (ufs) => {
          const ufsParam = ufs.filter(Boolean).join('|')
          return ({
            url: `${baseUrl}/estados/${ufsParam}/municipios?orderBy=nome`
          })
        }
      })

    })
  })

export const  {
  useGetEstadosQuery,
  useLazyGetEstadosQuery,

  useGetMunicipiosQuery,
  useLazyGetMunicipiosQuery
} = localidadesApi
  