import { AnimationUtils } from './AnimationUtils.js'
import { DataUtils } from './DataUtils.js'
import { ElementStyleUtils } from './ElementStyleUtils.js'
import { getObjectPropertyValueByKey, toJSON } from './TypeUtils.js'

const getCSS = (el, styleProp) => {
    const defaultView = (el.ownerDocument || document).defaultView

    if (!defaultView) {
        return ''
    }

    styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase()

    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp)
}

const getCSSVariableValue = (variableName) => {
    let hex = getComputedStyle(document.documentElement).getPropertyValue(variableName)
    if (hex && hex.length > 0) {
        hex = hex.trim()
    }

    return hex
}

const getElementActualCss = (el, prop, cache) => {
    let css = ''

    if (!el.getAttribute('h-hidden-' + prop) || cache === false) {
        let value

        css = el.style.cssText
        el.style.cssText = 'position: absolute; visibility: hidden; display: block;'

        if (prop === 'width') {
            value = el.offsetWidth
        } else if (prop === 'height') {
            value = el.offsetHeight
        }

        el.style.cssText = css

        if (value !== undefined) {
            el.setAttribute('h-hidden-' + prop, value.toString())
            return parseFloat(value.toString())
        }
        return 0
    } else {
        const attributeValue = el.getAttribute('h-hidden-' + prop)
        if (attributeValue || attributeValue === '0') {
            return parseFloat(attributeValue)
        }
    }
}

const getElementActualHeight = (el) => {
    return getElementActualCss(el, 'height', false)
}

const getElementActualWidth = (el, cache) => {
    return getElementActualCss(el, 'width', false)
}

const getElementIndex = (element) => {
    if (element.parentNode) {
        const c = element.parentNode.children
        for (let i = 0; i < c.length; i++) {
            if (c[i] === element) return i
        }
    }
    return -1
}

const getElementMatches = (element, selector) => {
    const p = Element.prototype
    const f = p.matches || p.webkitMatchesSelector

    if (element && element.tagName) {
        return f.call(element, selector)
    } else {
        return false
    }
}

const getElementOffset = (el) => {
    if (!el.getClientRects().length) {
        return { top: 0, left: 0 }
    }

    const rect = el.getBoundingClientRect()
    const win = el.ownerDocument.defaultView
    if (win) {
        return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset,
        }
    }

    return rect
}

const getElementParents = (element, selector) => {
    if (!Element.prototype.matches) {
        Element.prototype.matches = function (s) {
            const matches = (document || this.ownerDocument).querySelectorAll(s)
            let i = matches.length
            while (--i >= 0 && matches.item(i) !== this) { }
            return i > -1
        }
    }

    const parents = []

    let el = element

    for (; el && el !== document.body; el = el.parentElement) {
        if (selector) {
            if (el.matches(selector)) {
                parents.push(el)
            }
            continue
        }
        parents.push(el)
    }
    return parents
}

const getHighestZindex = (el) => {
    let bufferNode = el
    let buffer = el
    while (bufferNode && bufferNode !== document) {
        const position = buffer.style.getPropertyValue('position')
        if (position === 'absolute' || position === 'relative' || position === 'fixed') {
            const value = parseInt(buffer.style.getPropertyValue('z-index'))
            if (!isNaN(value) && value !== 0) {
                return value
            }
        }

        bufferNode = bufferNode.parentNode
        buffer = bufferNode
    }
    return null
}

const getScrollTop = () => {
    return (document.scrollingElement || document.documentElement).scrollTop
}

const getViewPort = () => {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    }
}

const insertAfterElement = (el, referenceNode) => {
    return referenceNode.parentNode?.insertBefore(el, referenceNode.nextSibling)
}

const isElementHasClasses = (element, classesStr) => {
    const classes = classesStr.split(' ')
    for (let i = 0; i < classes.length; i++) {
        if (!element.classList.contains(classes[i])) {
            return false
        }
    }
    return true
}

const isVisibleElement = (element) => {
    return !(element.offsetWidth === 0 && element.offsetHeight === 0)
}

const throttle = (timer, func, delay) => {
    if (timer) {
        return
    }

    timer = window.setTimeout(function () {
        func()
        timer = undefined
    }, delay)
}

const getElementChildren = (element, selector) => {
    if (!element || !element.childNodes) {
        return null
    }

    const result = []
    for (let i = 0; i < element.childNodes.length; i++) {
        const child = element.childNodes[i]
        if (child.nodeType === 1 && getElementMatches(child, selector)) {
            result.push(child)
        }
    }
    return result
}

const getElementChild = (element, selector) => {
    const children = getElementChildren(element, selector)
    return children ? children[0] : null
}

const isMobileDevice = () => {
    let test = getViewPort().width < +getBreakpoint('lg') ? true : false

    if (test === false) {
        test = navigator.userAgent.match(/iPad/i) != null
    }

    return test
}

const slide = (el, dir, speed, callback) => {
    if (
        !el ||
        (dir === 'up' && isVisibleElement(el) === false) ||
        (dir === 'down' && isVisibleElement(el) === true)
    ) {
        return
    }

    speed = speed ? speed : 600
    let calcHeight = getElementActualHeight(el)
    let calcPaddingTop = 0
    let calcPaddingBottom = 0

    if (ElementStyleUtils.get(el, 'padding-top') && DataUtils.get(el, 'slide-padding-top') !== true) {
        DataUtils.set(el, 'slide-padding-top', ElementStyleUtils.get(el, 'padding-top'))
    }

    if (
        ElementStyleUtils.get(el, 'padding-bottom') &&
        DataUtils.has(el, 'slide-padding-bottom') !== true
    ) {
        DataUtils.set(el, 'slide-padding-bottom', ElementStyleUtils.get(el, 'padding-bottom'))
    }

    if (DataUtils.has(el, 'slide-padding-top')) {
        calcPaddingTop = parseInt(DataUtils.get(el, 'slide-padding-top'))
    }

    if (DataUtils.has(el, 'slide-padding-bottom')) {
        calcPaddingBottom = parseInt(DataUtils.get(el, 'slide-padding-bottom'))
    }

    if (dir === 'up') {
        el.style.cssText = 'display: block; overflow: hidden;'

        if (calcPaddingTop) {
            AnimationUtils.animate(0, calcPaddingTop, speed, function (value) {
                el.style.paddingTop = calcPaddingTop - value + 'px'
            })
        }

        if (calcPaddingBottom) {
            AnimationUtils.animate(0, calcPaddingBottom, speed, function (value) {
                el.style.paddingBottom = calcPaddingBottom - value + 'px'
            })
        }

        AnimationUtils.animate(
            0,
            calcHeight || 0,
            speed,
            function (value) {
                el.style.height = (calcHeight || 0) - value + 'px'
            },
            function () {
                el.style.height = ''
                el.style.display = 'none'

                if (typeof callback === 'function') {
                    callback()
                }
            }
        )
    } else if (dir === 'down') {
        el.style.cssText = 'display: block; overflow: hidden;'

        if (calcPaddingTop) {
            AnimationUtils.animate(
                0,
                calcPaddingTop,
                speed,
                function (value) {
                    el.style.paddingTop = value + 'px'
                },
                function () {
                    el.style.paddingTop = ''
                }
            )
        }

        if (calcPaddingBottom) {
            AnimationUtils.animate(
                0,
                calcPaddingBottom,
                speed,
                function (value) {
                    el.style.paddingBottom = value + 'px'
                },
                function () {
                    el.style.paddingBottom = ''
                }
            )
        }

        AnimationUtils.animate(
            0,
            calcHeight || 0,
            speed,
            function (value) {
                el.style.height = value + 'px'
            },
            function () {
                el.style.height = ''
                el.style.display = ''
                el.style.overflow = ''

                if (typeof callback === 'function') {
                    callback()
                }
            }
        )
    }
}

const slideUp = (el, speed, callback) => {
    slide(el, 'up', speed, callback)
}

const slideDown = (el, speed, callback) => {
    slide(el, 'down', speed, callback)
}

const getBreakpoint = (breakpoint) => {
    let value = getCSSVariableValue('--bs-' + breakpoint)
    if (value) {
        value = parseInt(value.trim())
    }
    return value
}

const getAttributeValueByBreakpoint = (incomingAttr) => {
    let value = toJSON(incomingAttr)
    if (typeof value !== 'object') {
        return incomingAttr
    }

    const width = getViewPort().width
    let resultKey
    let resultBreakpoint = -1
    let breakpoint

    for (let key in value) {
        if (key === 'default') {
            breakpoint = 0
        } else {
            breakpoint = getBreakpoint(key) ? +getBreakpoint(key) : parseInt(key)
        }

        if (breakpoint <= width && breakpoint > resultBreakpoint) {
            resultKey = key
            resultBreakpoint = breakpoint
        }
    }

    return resultKey ? getObjectPropertyValueByKey(value, resultKey) : value
}

const colorLighten = (color, amount) => {
    const addLight = (_color, _amount) => {
        const cc = parseInt(_color, 16) + _amount
        const cNum = cc > 255 ? 255 : cc
        const c = cNum.toString(16).length > 1 ? cNum.toString(16) : `0${cNum.toString(16)}`
        return c
    }

    color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
    amount = parseInt(((255 * amount) / 100).toString())
    return (color = `#${addLight(color.substring(0, 2), amount)}${addLight(
        color.substring(2, 4),
        amount
    )}${addLight(color.substring(4, 6), amount)}`)
}

const colorDarken = (color, amount) => {
    const subtractLight = (_color, _amount) => {
        const cc = parseInt(color, 16) - amount
        const cNum = cc < 0 ? 0 : cc
        const c = cNum.toString(16).length > 1 ? cNum.toString(16) : `0${cNum.toString(16)}`
        return c
    }

    color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
    amount = parseInt(((255 * amount) / 100).toString())

    return (color = `#${subtractLight(color.substring(0, 2), amount)}${subtractLight(
        color.substring(2, 4),
        amount
    )}${subtractLight(color.substring(4, 6), amount)}`)
}

export {
    getBreakpoint,
    getCSS,
    getCSSVariableValue,
    getElementActualCss,
    getElementActualHeight,
    getElementActualWidth,
    getElementIndex,
    getElementMatches,
    getElementOffset,
    getElementParents,
    getHighestZindex,
    getScrollTop,
    getViewPort,
    insertAfterElement,
    isElementHasClasses,
    isVisibleElement,
    throttle,
    getElementChildren,
    getElementChild,
    isMobileDevice,
    slide,
    slideUp,
    slideDown,
    getAttributeValueByBreakpoint,
    colorLighten,
    colorDarken,
}
