type QueryStringObj = Record<
  string,
  string | number | boolean | Array<string | number>
>

type Options = {
  baseUrl?: `${'http:' | 'https:' | ''}//${string}.${string}`
  id?: number
  name?: string
  path?: string
  customPath?: string
  query?: QueryStringObj
  queryStringParser?: (t: string) => string
  urlParser?: (t: string) => string
}

export type { Options, QueryStringObj }
