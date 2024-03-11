import {API_URL} from '@env';

export const HttpService = {
  getRequest: async (url: string) => {
    try {
      const response = await fetch(API_URL + url);
      const data = await response.json();
      return data;
    } catch (error) {
      return {statusCode: 404, error: error};
    }
  },
  postRequest: async (url: string, data: {}) => {
    try {
      const response = await fetch(API_URL + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      return {statusCode: 404, error: error};
    }
  },
  patchRequest: async (url: string, data: {}) => {
    try {
      const response = await fetch(API_URL + url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      return {statusCode: 404, error: error};
    }
  },
  deleteRequest: async (url: string) => {
    try {
      const response = await fetch(API_URL + url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      return {statusCode: 404, error: error};
    }
  },
};
