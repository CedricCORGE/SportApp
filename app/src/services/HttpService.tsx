import {API_URL} from '@env';

export const HttpService = {
  getRequest: async (url: string) => {
    const response = await fetch(API_URL + url);
    return await response.json();
  },
  postRequest: async (url: string, data: {}) => {
    const response = await fetch(API_URL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },
  patchRequest: async (url: string, data: {}) => {
    const response = await fetch(API_URL + url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },
  deleteRequest: async (url: string) => {
    const response = await fetch(API_URL + url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  },
};
