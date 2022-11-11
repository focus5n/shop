const insertAfter = (el, htmlString) => {
    el.insertAdjacentHTML('afterend', htmlString)
}

const insertBefore = (el, htmlString) =>
  el.insertAdjacentHTML('beforebegin', htmlString);