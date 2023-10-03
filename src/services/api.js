const BASE_URL = "http://54.38.79.153:3000/api/";

export const DEFAULT_HEADERS = { Authentication: "Bearer *token here*" };

export const fetchData = async (url, config) => {
  try {
    const response = await fetch(BASE_URL + url, config);

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
};
