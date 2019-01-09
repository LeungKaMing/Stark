import axios from 'axios'

export function sendServer (data) {
    axios.post('http://127.0.0.1:1234/sendServer', ...data)
    .then(function (response) {
        console.log(response);
        resolve(response)
    })
    .catch(function (error) {
        console.log(error);
        reject(error)
    });
}