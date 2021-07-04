const url = 'https://api.pishchyta.nomoredomains.club';
//sconst url = 'http://localhost:3005';

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(res.status + ' ' + res.statusText);
    }
}

function register(name, email, password){
    return fetch(url + '/signup', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, email: email, password: password})
    }).then(checkResponse);
}

function login(email, password){
    return fetch(url + '/signin', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
    }).then(checkResponse);

}

function checkToken (jwt){
    console.log(jwt);
    return fetch(`${url}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${jwt}`,
        },
    }).then(checkResponse);
}

export {register, login, checkToken}