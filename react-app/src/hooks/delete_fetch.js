export const delete_fetch = (url,signal,func) => {
    fetch(url, {
        signal: signal,
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        func(data);
    })
    .catch((err) => {
        console.log("error ",err);
    });
}