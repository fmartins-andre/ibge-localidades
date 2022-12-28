const baseUrl = 'https://servicodados.ibge.gov.br/api/v3/malhas'

export function getUrlImagemEstado(ufId: UF['id']) {
  return `${baseUrl}/estados/${ufId}`
}

export function getUrlImagemMesorregiao(mesoregiaoId: Mesorregiao['id']) {
  return `${baseUrl}/mesorregioes/${mesoregiaoId}`
}

export function getUrlImagemMicrorregiao(microrregiaoId: Microrregiao['id']) {
  return `${baseUrl}/microrregioes/${microrregiaoId}`
}

export function getUrlImagemMunicipio(municipioId: Municipio['id']) {
  return `${baseUrl}/municipios/${municipioId}`
}
