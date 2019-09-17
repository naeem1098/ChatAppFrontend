import {Get, Post} from './../utils/rest_client';


let authToken = localStorage.getItem('authToken')
authToken = 'bearer ' + authToken


export const getWithToken = (url) => {
   
    return Get(url, authToken);
}

export const postWithToken = (url, data) => {

    return Post(url, data, authToken );
}

