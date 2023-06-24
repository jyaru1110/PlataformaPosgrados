import axios from "axios";

export const  get_fetch  = async (url, signal, func) => {
    const response = await axios.get(url, {
        signal: signal,
        withCredentials: true,
    }).catch((err) => {
        console.log("error ", err);
    });
    func(response.data);
};
