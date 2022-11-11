function loadScript(src) {
    return new Promise(function(resolve, reject) {
        let script = document.createElement('script')
        script.src = src

        script.onload = () => resolve(script)
        script.onerror = () => reject(new Error('Error'))
        document.head.append(script)
    });
}

let promise = loadScript('test')

promise.then(
    script => console.log(script.src),
    error => console.log(error.message)
)

