import { fetchData, DEFAULT_HEADERS } from "./api.js";

export const getLevels = async () => {
  return fetchData("levels", {
    headers: { ...DEFAULT_HEADERS },
  });
};

export const createLevel = async (level) => {
  return fetchData("levels", {
    headers: { ...DEFAULT_HEADERS },
    method: "POST",
    body: JSON.stringify(level),
  });
};

export const deleteLevel = async (_id) => {
  return fetchData(`levels/${_id}`, {
    headers: { ...DEFAULT_HEADERS },
    method: "DELETE",
  });
};

export const updateLevel = async (level) => {
  return fetchData(`levels/:${level._id}`, {
    headers: { ...DEFAULT_HEADERS },
    method: "PATCH",
    body: JSON.stringify(level),
  });
};
