import buildFullUrl from '../buildFullUrl'
import { snakeCase, kebabCase } from '../helpers'

const baseUrl = 'https://seasoned.cc'
describe('buildFullUrl', () => {
  describe('when there is no name, path or query', () => {
    it('returns baseUrl', () => {
      expect(buildFullUrl({ baseUrl })).toBe(baseUrl)
    })
  })

  describe('when no custom path is provided', () => {
    it('parses the URL based on name, defaults to kebabCase', () => {
      const result = buildFullUrl({ baseUrl, name: 'somePath' })
      expect(result).toBe(`${baseUrl}/some-path`)
    })

    it('accepts a URL parser', () => {
      const result = buildFullUrl({
        baseUrl,
        name: 'somePath',
        urlParser: snakeCase,
      })
      expect(result).toBe(`${baseUrl}/some_path`)
    })

    it('appends the ID to the end of generated path', () => {
      const result = buildFullUrl({ baseUrl, name: 'somePath', id: 10 })
      expect(result).toBe(`${baseUrl}/some-path/10`)
    })
  })

  describe('when customPath is provided', () => {
    it('does not append the ID to the end of customPath', () => {
      const result = buildFullUrl({
        baseUrl,
        name: 'foo',
        customPath: 'fizz/buzz',
        id: 10,
      })
      expect(result).toBe(`${baseUrl}/fizz/buzz`)
    })

    it('accepts a wildcard to place the :id', () => {
      const result = buildFullUrl({
        baseUrl,
        name: 'foo',
        customPath: 'foo/:id/bar',
        id: 10,
      })
      expect(result).toBe(`${baseUrl}/foo/10/bar`)
    })

    it('does not replace :id wildcard if no id was given', () => {
      const result = buildFullUrl({
        baseUrl,
        name: 'foo',
        customPath: 'foo/:id/bar',
      })
      expect(result).toBe(`${baseUrl}/foo/:id/bar`)
    })
  })

  describe('when query is given', () => {
    it('returns a formatted queryString', () => {
      expect(
        buildFullUrl({ baseUrl, query: { foo: 'bar', another: 'value' } }),
      ).toBe(`${baseUrl}?foo=bar&another=value`)
    })

    it('flattens arrays in the query string', () => {
      expect(
        buildFullUrl({
          baseUrl,
          query: { tags: ['foo', 'bar'], another: 'value' },
        }),
      ).toBe(`${baseUrl}?tags[]=foo&tags[]=bar&another=value`)
    })

    it('accepts a custom queryString parser', () => {
      expect(
        buildFullUrl({
          baseUrl,
          query: { camelCase: 'should-be-kebab' },
          queryStringParser: kebabCase,
        }),
      ).toBe(`${baseUrl}?camel-case=should-be-kebab`)
    })

    it('filters "nil" and NaN values from queryString', () => {
      expect(
        buildFullUrl({
          baseUrl,
          query: {
            nan: NaN,
            null: null,
            undefined: undefined,
            zero: 0,
            false: false,
            value: 'foobar',
          },
        }),
      ).toBe(`${baseUrl}?zero=0&false=false&value=foobar`)
    })
  })

  it('avoids slash between url and queryString', () => {
    expect(
      buildFullUrl({
        baseUrl,
        name: 'resource',
        customPath: '/fake/path/',
        query: { foo: true },
      }),
    ).toBe(`${baseUrl}/fake/path?foo=true`)
  })

  describe('other utilities', () => {
    it('removes extra slashes', () => {
      const result = buildFullUrl({
        baseUrl: baseUrl + '/',
        name: 'foo',
        customPath: '//foo//bar//',
      })
      expect(result).toBe(`${baseUrl}/foo/bar`)
    })
  })
})
