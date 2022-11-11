const onScrollStop = callback => {
    let isScrolling
    window.addEventListener('scroll', e => {
        clearTimeout(isScrolling)
        isScrolling = setTimeout(() => {
            callback()
        }, 150)
    },
        false
    )
}