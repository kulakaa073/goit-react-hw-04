import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';

export function fetchData({ query = '', page = 1 }) {
  const options = {
    url: 'search/photos',
    params: {
      page: page,
      query: query,
      per_page: 12,
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

export function parseImagesData(data) {
  return data.map(image => ({
    id: image.id,
    webformatURL: image.urls.small,
    largeImageURL: image.urls.regular,
    altText: image.alt_description || 'No text available',
    author: image.user.name || 'Unknown',
    description: image.description || 'No description available',
    width: image.width,
    height: image.height,
  }));
}
