export const get_fetch = (url,func) => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(url, {signal: signal})
    .then(response => response.json())
    .then(data => {
        func(data);
    })
    .catch((err) => {
        console.log("error ",err);
    });
    return () => controller.abort();
}