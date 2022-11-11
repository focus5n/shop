const setStyle = (el, rule, val) => (el.style[rule] = val);

setStyle(document.querySelector('p'), 'font-size', '20px');
// The first <p> element on the page will have a font-size of 20px