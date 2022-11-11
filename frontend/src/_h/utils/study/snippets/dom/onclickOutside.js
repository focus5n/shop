const onClickOutside = (element, callback) => {
    document.addEventListener('click', e => {
        if(!element.contains(e.target)) callback()
    })
}

onClickOutside('#my-element', () => console.log('Hello'));
