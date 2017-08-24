/*jshint esversion:6*/
export function Capitalize (str = '') {
  return typeof str !== 'string' ? ''
    : str[0].toUpperCase() + str.slice(1);
}
