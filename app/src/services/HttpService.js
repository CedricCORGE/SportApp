export const HttpService = {
  getRequest: async (url) => {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + url);
    return await response.json();
  },
  postRequest: async (url, data) => {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },
  patchRequest: async (url, data) => {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },
  deleteRequest: async (url) => {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  },
};
