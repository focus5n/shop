async function requestGet(url = '') {
    const response = await fetch(url ,{
        metho: 'GET'
    })
    return response.json()
}

async function requestPost(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

const result = requestGet('https://www.naver.com')
