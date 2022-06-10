const baseURL = process.env.REACT_APP_API_URL

export const fetchSinToken = (endpoint, data, method = "GET") => {

    const url = `${baseURL}/${endpoint}`;

    if( method === "GET" ){
        return fetch(url);
    }else{
        return fetch(url, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

}

export const fetchConToken = ( endpoint, data, method = "GET" ) => {

    const url = `${baseURL}/${endpoint}`;

    const token = localStorage.getItem("token") || "";

    if( method === "GET" ){
        return fetch( url, {
            headers: {
                "x-token": token
            }
        } )
    }else{
        return fetch( url, {
            method: method,
            body: JSON.stringify(data),
            headers:{
                "x-token": token,
                "Content-Type": "application/json"
            }
        } )
    }
}