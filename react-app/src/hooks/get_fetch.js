export const get_fetch = (url,signal,func) => {
    fetch(url, {signal: signal})
    .then(response => response.json())
    .then(data => {
        func(data);
    })
    .catch((err) => {
        console.log("error ",err);
    });
}