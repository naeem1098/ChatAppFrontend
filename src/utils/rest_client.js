import * as request from 'superagent';
const url = 'http://localhost:3100';

export const Get = (endPoint, authToken, acceptType = 'application/json') => {
    const uri = `${url}/${endPoint}`;
    return new Promise((resolve, reject) => {
        request
            .get(uri)
            .set('Accept', acceptType)
            .set('Content-Type', 'application/json')
            .set('Authorization', authToken)
            .then((response) => resolve(response.body))
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
}

/**
 * POST request
 * @param {string} endPoint the URI of the server resource
 * @param {any} data the data to send over to server
 * @param {string} authToken the authentication token
 * @returns {Promise<any>}
 */
export const Post = (endPoint, data, authToken, contentType = 'application/json') => {
    const uri = `${url}/${endPoint}`;
    return new Promise((resolve, reject) => {
        request
            .post(uri)
            .send(data)
            .set('Accept', 'application/json')
            .set('Content-Type', contentType)
            .set('Authorization', authToken)
            .then((response) => resolve(response.body))
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
}