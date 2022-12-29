import Autocomplete from "@mui/material/Autocomplete"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import MuiLinearProgress, { LinearProgressProps } from "@mui/material/LinearProgress"
import { styled } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import Header from "features/header"
import MediaCard from "features/mediaCard"
import { useEffect, useState } from "react"
import { useGetEstadosQuery, useGetMunicipiosQuery } from "services/api/localidadesApi"
import { getUrlImagemEstado, getUrlImagemMesorregiao, getUrlImagemMicrorregiao, getUrlImagemMunicipio } from "services/api/malhaEndpoints"
import { getWikiUrlById, useGetWikiSearchQuery } from "services/api/wikipediaApi"

export default function App() {

  const [estado, setEstado] = useState<UF|null>(null)
  const [municipio, setMunicipio] = useState<Municipio|null>(null)

  const {
    data: estadosData,
    isFetching: isFetchingEstados
  } = useGetEstadosQuery()

  const {
    data: municipiosData,
    isFetching: isFetchingMunicipios
  } = useGetMunicipiosQuery(
    [estado?.id ?? 0],
    {skip: !estado?.id}
  )

  const { estadoWikiPageId } = useGetWikiSearchQuery(
    `estado ${estado?.nome}`,
    {
      skip: !estado?.nome,
      selectFromResult: result => ({
        estadoWikiPageId: result.data?.query.search.at(0)?.pageid
      })
    }
  )

  const { mesorregiaoWikiPageId } = useGetWikiSearchQuery(
    `mesorregião ${municipio?.microrregiao.mesorregiao.nome} ${estado?.sigla}`,
    {
      skip: !municipio?.microrregiao.mesorregiao.nome,
      selectFromResult: result => ({
        mesorregiaoWikiPageId: result.data?.query.search.at(0)?.pageid
      })
    }
  )

  const { microrregiaoWikiPageId } = useGetWikiSearchQuery(
    `microrregião ${municipio?.microrregiao.nome} ${estado?.sigla}`,
    {
      skip: !municipio?.microrregiao.nome,
      selectFromResult: result => ({
        microrregiaoWikiPageId: result.data?.query.search.at(0)?.pageid
      })
    }
  )

  const { municipioWikiPageId } = useGetWikiSearchQuery(
    `município ${municipio?.nome} ${estado?.sigla}`,
    {
      skip: !municipio?.nome,
      selectFromResult: result => ({
        municipioWikiPageId: result.data?.query.search.at(0)?.pageid
      })
    }
  )

  useEffect(
    () => {
      if (municipiosData?.length) {
        setMunicipio(municipiosData!.at(0)!)
      }
    },
    [municipiosData]
  )

  return (
    <>
      <Header />
      <Container sx={{ paddingTop: 15 }}>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={6}>
            <Autocomplete
              value={estado}
              options={estadosData ?? []}
              getOptionLabel={uf => uf.nome}
              onChange={(_, value) => {
                setEstado(value)
                setMunicipio(null)
              }}
              renderInput={(params) =>
                <TextField {...params} label="Estado*" />
              }
            />
            {isFetchingEstados && <LinearProgress />}
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Autocomplete
              value={municipio}
              options={municipiosData ?? []}
              getOptionLabel={municipio => municipio.nome}
              onChange={(_, value) => {
                setMunicipio(value)
              }}
              renderInput={(params) =>
                <TextField {...params} label="Municipio*" />
              }
            />
            {isFetchingMunicipios && <LinearProgress />}
          </Grid>

          <Grid container item xs={12} spacing={3}>

            {Boolean(estado) &&
              <Grid item xs={12} sm={6} md={3}>
                <MediaCard
                  image={{
                    url: getUrlImagemEstado(estado!.id),
                    title: `${estado!.nome} (${estado!.sigla})`
                  }}
                  content={{
                    title: `${estado!.nome} (${estado!.sigla})`,
                    body: 'Estado'
                  }}
                  action={
                    estadoWikiPageId
                     ? {
                      title: 'Saiba mais',
                      url: getWikiUrlById(estadoWikiPageId)
                     }
                     : undefined
                  }
                />
              </Grid>
            }

            {Boolean(municipio) && <>
              <Grid item xs={12} sm={6} md={3}>
                <MediaCard
                  image={{
                    url: getUrlImagemMesorregiao(municipio!.microrregiao.mesorregiao.id),
                    title: municipio!.microrregiao.mesorregiao.nome
                  }}
                  content={{
                    title: municipio!.microrregiao.mesorregiao.nome,
                    body: 'Mesorregião'
                  }}
                  action={
                    mesorregiaoWikiPageId
                     ? {
                      title: 'Saiba mais',
                      url: getWikiUrlById(mesorregiaoWikiPageId)
                     }
                     : undefined
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <MediaCard
                  image={{
                    url: getUrlImagemMicrorregiao(municipio!.microrregiao.id),
                    title: municipio!.microrregiao.nome
                  }}
                  content={{
                    title: municipio!.microrregiao.nome,
                    body: 'Microrregião'
                  }}
                  action={
                    microrregiaoWikiPageId
                     ? {
                      title: 'Saiba mais',
                      url: getWikiUrlById(microrregiaoWikiPageId)
                     }
                     : undefined
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <MediaCard
                  image={{
                    url: getUrlImagemMunicipio(municipio!.id),
                    title: municipio!.nome
                  }}
                  content={{
                    title: municipio!.nome,
                    body: 'Município'
                  }}
                  action={
                    municipioWikiPageId
                     ? {
                      title: 'Saiba mais',
                      url: getWikiUrlById(municipioWikiPageId)
                     }
                     : undefined
                  }
                />
              </Grid>
            </>}
          </Grid>

        </Grid>
      </Container>
    </>
  )
}

const LinearProgress = styled(MuiLinearProgress)<LinearProgressProps>(() => ({
  marginTop: '-5px'
}))