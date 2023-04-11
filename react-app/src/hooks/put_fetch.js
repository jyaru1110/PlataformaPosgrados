export const put_fetch = (url,signal,body,func) => {
    fetch(url, {
        signal: signal,
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        func(data);
    })
    .catch((err) => {
        console.log("error ",err);
    });
}