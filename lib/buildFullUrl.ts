import kebabCase from 'lodash/kebabCase';

import type { Options } from '../types';
import {
  removeInvalidData, takeTagsToAddOnURL, returnEndPointIfExistPath,
  checkAndAddLastElementOfUrl, deleteAndAddLastElementOnURL,
  returnEndPointIfExistCustomPath, returnEndPointIfExistUrlParse,
  getNewCustomPathIfExistIdAndCustomPath,
  returnEndPointIfExistIdAndDoesntCustomPath,  
  removeFirstElementOnEndPoint
  
} from './helpers';

export default function buildFullUrl(opts: Options) {
  let url: string = opts?.baseUrl || '';
  let endpoint = kebabCase(opts?.name);
  let qs = null;

  endpoint = returnEndPointIfExistUrlParse(opts?.urlParser, opts.name, endpoint);  

  endpoint = returnEndPointIfExistPath(opts?.path, endpoint);

  endpoint = returnEndPointIfExistIdAndDoesntCustomPath( opts.id, opts.customPath,endpoint);

  opts.customPath = getNewCustomPathIfExistIdAndCustomPath(opts?.id, opts?.customPath);

  endpoint = returnEndPointIfExistCustomPath(opts.customPath, endpoint);

  endpoint = endpoint.split('//').join('/');
  endpoint = removeFirstElementOnEndPoint(endpoint);
  url = checkAndAddLastElementOfUrl(endpoint, url);
  url += endpoint;

  const { query } = opts;
  if (opts?.query) {
    qs = '';
    let options = Object.keys(opts.query);
    options = Object.keys(removeInvalidData(query, options));
    qs = takeTagsToAddOnURL(query, options, opts?.queryStringParser, qs);
  }
  url = deleteAndAddLastElementOnURL(url);
  qs && (url += '?' + qs);
  return url;
}
