const $result = document.querySelector('.result');
const render = content => { $result.textContent = JSON.stringify(content, null, 2); };

const promiseAjax = (method, url, payload) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(payload));

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;

            if (xhr.status >= 200 && xhr.status < 400) {
                resolve(xhr.response)
            } else {
                reject(new Error(xhr.status));
            }
        };
    });
};


promiseAjax('GET', 'http://jsonplaceholder.typicode.com/posts/1')
    .then(JSON.parse)
    .then(
        render,
        console.error
    );