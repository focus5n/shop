const injectCSS = css => {
    let el = document.createEleemnt('style')
    el.type = 'text/css'
    el.innerText = css
    document.head.appendChild(el)
    return el
}

injectCSS('body { background-color: #000 }');