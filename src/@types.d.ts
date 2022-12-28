type Municipio = {
  id: number
  nome: string
  microrregiao: Microrregiao
}

type Microrregiao = {
  id: number
  nome: string
  mesorregiao: Mesorregiao
}

type RegiaoImediata = {
  id: number
  nome: string
  'regiao-intermediara': RegiaoIntermediara
}

type RegiaoIntermediara = {
  id: number
  nome: string
  UF: UF
}

type Mesorregiao = {
  id: number
  nome: string
  UF: UF
}

type UF = {
  id: number
  nome: string
  sigla: string
  regiao: Regiao
}

type Regiao = {
  id: number
  nome: string
  sigla: string
}

type WikiListSearchResponse = {
  batchcomplete: boolean
  continue: {
    sroffset: number
    continue: string
  }
  query: {
    searchinfo: {
      totalhits: number
    },
    search: Array<{
      ns: number
      title: string
      pageid: number
      size: number
      wordcount: number
      snippet: string
      timestamp: string
    }>
  }
}
