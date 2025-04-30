import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';

export function fetchData({ page = 1, searchQuery: query = '' }) {
  const options = {
    url: 'search/photos',
    params: {
      page: page,
      query: query,
      per_page: 10,
    },
    headers: {
      Authorization: import.meta.env.VITE_AUTH_TOKEN,
    },
  };
  return axios.get(options.url, {
    params: options.params,
    headers: options.headers,
  });
}
