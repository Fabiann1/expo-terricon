export const login = async (data) => {
    const rec = await fetch('http://192.168.1.102:8000/auth/login', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    }).then((d) => {return d.json()});
    return rec
}

export const register = async (data) => {
    const rec = await fetch('http://192.168.1.102:8000/auth/register', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    }).then((d) => {return d.json()});
    return rec
}