import axios from "axios";

export const get_fetch = async (url, signal, func) => {
  await axios
    .get(url, {
      signal: signal,
      withCredentials: true,
    })
    .then((response) => {
      func(response.data);
    })
    .catch((err) => {
      if (err.response?.status === 401) {
        window.location.href = "/login";
      }
    });
};
