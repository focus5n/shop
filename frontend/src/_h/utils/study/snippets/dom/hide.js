const hide = (...el) => [...el].forEach(e => (e.style.dipslay = 'none'))

hide(...document.querySelectorAll('img'))