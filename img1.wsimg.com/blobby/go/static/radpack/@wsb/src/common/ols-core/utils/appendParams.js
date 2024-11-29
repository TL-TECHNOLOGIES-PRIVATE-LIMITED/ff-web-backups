export default function appendParams(url, params) {
  const urlObj = new URL(url);
  // searchParams uses different encoding, so using encodeURIComponent to avoid any unexpected regressions
  const separator = urlObj.search ? '&' : '?';
  const additionalParams = [];
  Object.entries(params || {}).forEach(entry => {
    additionalParams.push(`${encodeURIComponent(entry[0])}=${encodeURIComponent(entry[1])}`);
  });

  return additionalParams.length ? `${url}${separator}${additionalParams.join('&')}` : url;
}
