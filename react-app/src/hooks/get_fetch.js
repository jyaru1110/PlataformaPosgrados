const get_fetch = (url,metodo_fetch) => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(url, {signal: signal})
    .then(response => response.json())
    .then(data => {
        return(data);   
    })
    .catch((err) => {
        console.log("error ",err);
    });
    return () => controller.abort();
}

export default get_fetch;