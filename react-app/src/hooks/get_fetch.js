import axios from "axios";

export const get_fetch = async (url, signal, func) => {
  const response = await axios
    .get(url, {
      signal: signal,
      withCredentials: true,
    })
    .then((response) => {
      func(response.data);
    })
    .catch((err) => {
      console.log("error ", err);
    });
};
