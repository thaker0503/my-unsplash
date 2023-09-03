export const apiCall = (url, method, bodyParams, headers = {}) => {
    const token = localStorage.getItem('TOKEN')
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }
    let body;
    console.log("bodyParams", bodyParams)
    if (bodyParams) {
        body = bodyParams instanceof FormData ? bodyParams : JSON.stringify(bodyParams)
    }
    console.log("body", body)

    return fetch(`${url}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ?? undefined,
    }).then(async (r) => {
        const json = await r.json();
        // console.log("STATUS",r.status)
        if (r.status > 399) {
            const error = new Error(json.message);
            error.response = json;
            throw error
        } else {
            return json;
        }

    })
}

export const apiUtils = {
    get: (url, headers) => apiCall(url, "GET", false, headers),
    post: (url, body, headers) => apiCall(url, "POST", body, headers),
    put: (url, body, headers) => apiCall(url, "PUT", body, headers),
    patch: (url, body, headers) => apiCall(url, "PATCH", body, headers),
    delete: (url, body, headers) => apiCall(url, "DELETE", body, headers),

}