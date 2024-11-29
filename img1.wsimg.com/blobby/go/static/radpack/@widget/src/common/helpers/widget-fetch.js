const widgetFetch = async (path, { timeout = 5000, method = 'GET', baseUrl, data, jwt } = {}) => {
  const headers = {};

  headers['Content-Type'] = 'application/json';
  if (jwt) {
    headers.Authorization = `sso-jwt ${jwt}`;
  }

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(`${baseUrl}/${path}`, {
    headers,
    method,
    mode: 'cors',
    credentials: 'same-origin',
    signal: controller.signal,
    body: JSON.stringify(data)
  });
  clearTimeout(id);

  if (!response.ok) {
    throw Error(response.statusText);
  }

  try {
    return await response.json();
  } catch {
    return;
  }
};

export default widgetFetch;
