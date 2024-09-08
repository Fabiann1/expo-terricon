export const getBooks = async () => {
    const data = await fetch('http://192.168.1.102:8000/booking/books', {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    }).then((res) => res.json());
    return data
}
export const postBook = async (book_id, user, to) => {
    const data = await fetch('http://192.168.1.102:8000/booking/rent', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({user_id : user, book_id : book_id, to : to})
    }).then((res) => res.json());
}

export const getRentBook = async (user) => {
    const data = await fetch('http://192.168.1.102:8000/booking/get_rent', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({user_id : user})
    }).then((res) => res.json());
    return data
}

export const getEvents = async () => {
    const data = await fetch('http://192.168.1.102:8000/booking/events', {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json'
        }
    }).then((res) => res.json());
    return data
}

export const regEvent = async (user_id, event_id) => {
    const data = await fetch('http://192.168.1.102:8000/booking/reg', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({user_id : user_id, event_id : event_id})
    }).then((res) => res.json());
    return data
}

export const removeReg = async (user_id, event_id) => {
    const data = await fetch('http://192.168.1.102:8000/booking/remove_reg', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({user_id : user_id, event_id : event_id})
    }).then((res) => res.json());
    return data
}

export const getRegEvent = async (user_id) => {
    const data = await fetch('http://192.168.1.102:8000/booking/reg_events', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({user_id : user_id})
    }).then((res) => res.json());
    return data
}

export const getPoints = async (user_id, points) => {
    const data = await fetch('http://192.168.1.102:8000/booking/level_increase', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({user_id : user_id, points : points})
    }).then((res) => res.json());
    return data
}
export const removeBook = async (user_id, book_id) => {
    const data = await fetch('http://192.168.1.102:8000/booking/remove_book', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({user_id : user_id, book_id : book_id})
    }).then((res) => res.json());
    return data
}