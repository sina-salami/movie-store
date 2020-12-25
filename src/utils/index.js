import store from '../redux/store/store';

export const colors = {
  red: '#FF4747',
  yellow: '#E9C46A',
  pink: '#FFD6D6',
  borderGray: '#ABA4B7',
  dimGray: '#6B6B76',
  jetBlack: '#2E2E33',
};

export const sendRequest = async (method, url, body = {}, needToken = true) => {
  const token = store.token;
  let headers = {};
  let requestBody = null;
  let base_url = 'https://imdb.hriks.com';
  headers['Content-Type'] = 'application/json';
  if (needToken) {
    headers.Authorization = 'Token' + token;
  }
  if (method !== 'GET') {
    requestBody = JSON.stringify(body);
  }
  if (url.startsWith('http')) {
    base_url = '';
  }
  const fetchIt = async () => {
    try {
      let response = await fetch(base_url + url, {
        method,
        body: requestBody,
        headers,
      });
      const result = await response.json();
      return {
        status: response.status,
        body: result,
      };
    } catch (err) {
      return {
        status: 500,
        body: err.message,
      };
    }
  };
  return await fetchIt();
};
