const url = 'https://api.pishchyta.nomoredomains.club';
let userJWT = '';
//const url = 'http://localhost:3005';

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
    userJWT = jwt;
    return fetch(`${url}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${jwt}`,
        },
    }).then(checkResponse);
}

function getSavedFilms(){
    return fetch(`${url}/movies`, {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${userJWT}`,
        },
    }).then(checkResponse);

}

function saveFilm(film){
    return fetch(`${url}/movies`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${userJWT}`,
        },
        body: JSON.stringify(film),
    }).then(checkResponse);
}

function deleteFilm(movieId){
    return fetch(`${url}/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${userJWT}`,
        }
    }).then(checkResponse);
}

function editProfile(name, email){
    return fetch(`${url}/users/me`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${userJWT}`,
        },
        body: JSON.stringify({email: email, name: name}),
    }).then(checkResponse);

}

export {register, login, checkToken, saveFilm, getSavedFilms, deleteFilm, editProfile}