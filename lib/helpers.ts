function wordsFromAnyCase(str: string): string[] {
  const CASE_REGEX =
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;

  return str.match(CASE_REGEX) || [];
}
function kebabCase(str: string) {
  return wordsFromAnyCase(str)
    .map((x) => x.toLowerCase())
    .join('-');
}
function snakeCase(str: string) {
  return wordsFromAnyCase(str)
    .map((x) => x.toLowerCase())
    .join('_');
}

export function removeFirstElementOnEndPoint(endpoint: string) {
  if (endpoint.indexOf('/') == 0) {
    const [, ...arrayEndpoint] = endpoint.split('');
    endpoint = arrayEndpoint.join('');
  }
  return endpoint;
}

export function checkAndAddLastElementOfUrl(endpoint: string, url: string) {
  if (endpoint && url.lastIndexOf('/') != url.length - 1) url += '/';
  return url;
}

export function removeInvalidData(query: any, options: string[]) {
  if (query) {
    options?.forEach((element) => {
      const value = query[element];
      if (value == null || Number.isNaN(value) || typeof value == undefined)
        delete query[element];
    });
  }
  return query;
}

export function takeTagsToAddOnURL(query: any, options: string[], queryStringParser: any, qs: string) {
  options.forEach((element: string, indexElement: number) => {
    let value = query[element];
    let name = queryStringParser ? queryStringParser(element) : element;
    if (!Array.isArray(value)) qs += name + '=' + value;
    else {
      value = value as Array<any>;
      value?.forEach((elementValue: string, index: number) => {
        qs += name + '[]=' + elementValue;
        if (index < value.length - 1) qs += '&';
      });
    }
    if (indexElement < options.length - 1) qs += '&';
  });
  return qs;
}

export function deleteAndAddLastElementOnURL(url: string) {
  if (url.lastIndexOf('/') == url.length - 1) {
    let arrayUrl = url.split('');
    arrayUrl.pop();
    url = arrayUrl.join('');
  }
  return url;
}

export const returnEndPointIfExistUrlParse = ( urlParser: any, name: string | undefined, endpoint: string) => 
  urlParser ? urlParser(name || '') : endpoint;

export const returnEndPointIfExistIdAndDoesntCustomPath = ( id: any, customPath: any, endpoint: string) => 
  id && !customPath ? endpoint + `/${id}` : endpoint;

export const returnEndPointIfExistCustomPath = (customPath: any, endpoint: string) =>
  customPath ? customPath : endpoint;

export const returnEndPointIfExistPath = (path: any, endpoint: string) =>
  path ? path : endpoint;

export const getNewCustomPathIfExistIdAndCustomPath = (id:any, customPath:any) => 
  id && customPath ? customPath.replace(/:id/, id.toString()) : customPath;

export { kebabCase, snakeCase }