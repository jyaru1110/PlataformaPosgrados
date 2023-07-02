import axios from "axios";
export const delete_fetch = (url,signal,func) => {
    axios.delete(url, {
        signal: signal,
        withCredentials: true
    })
    .then(data => {
        func(data);
    })
    .catch((err) => {
        console.log("error ",err);
    });
}