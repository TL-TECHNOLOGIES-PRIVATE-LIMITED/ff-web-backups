import { queryStringRegex } from '../constants/regex';

export function getQueryStringValue(key) {
  return typeof window !== 'undefined'
    ? window.location.search.replace(new RegExp(queryStringRegex(key), 'i'), '$1')
    : '';
}
