export const fetchApi = async (url, method, body) => {
    return await fetch(url,
        {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
}
