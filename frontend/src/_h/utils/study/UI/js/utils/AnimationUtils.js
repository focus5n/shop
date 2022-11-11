
import { DOMEventHandlerUtils } from './DomEventHandlerUtils.js'
import { getElementOffset } from './DomUtils.js'
import { ElementStyleUtils } from './ElementStyleUtils.js'

export class AnimationUtils {
    static animate(
        from,
        to,
        duration,
        update,
        complete
    ) {

        const easings = {
            linear: function (t, b, c, d) {
                return (c * t) / d + b
            },
        }

        if (!complete) {
            complete = function () { }
        }


        const change = to - from

        function loop(timestamp) {
            var time = (timestamp || +new Date()) - start

            if (time >= 0) {
                update(easings.linear(time, from, change, duration))
            }
            if (time >= 0 && time >= duration) {
                update(to)
                if (complete) {
                    complete()
                }
            } else {
                window.requestAnimationFrame(loop)
            }
        }

        update(from)


        const start =
            window.performance && window.performance.now ? window.performance.now() : +new Date()

        window.requestAnimationFrame(loop)
    }

    static animateClass(
        element,
        animationName,
        callBack
    ) {
        const animateClasses = animationName.split(' ')
        animateClasses.forEach((cssClass) => element.classList.add(cssClass))
        DOMEventHandlerUtils.one(element, 'animationend', function () {
            animateClasses.forEach((cssClass) => element.classList.remove(cssClass))
        })

        if (callBack) {
            DOMEventHandlerUtils.one(element, 'animationend', callBack)
        }
    }

    static transitionEnd(element, callBack) {
        DOMEventHandlerUtils.one(element, 'transitionend', callBack)
    }

    static animationEnd(element, callBack) {
        DOMEventHandlerUtils.one(element, 'animationend', callBack)
    }

    static animationDelay(element, value) {
        ElementStyleUtils.set(element, 'animation-delay', value)
    }

    static animationDuration(element, value) {
        ElementStyleUtils.set(element, 'animation-duration', value)
    }

    static scrollTo(element, offset, duration = 500) {
        let targetPos = element ? getElementOffset(element).top : 0
        let scrollPos =
            window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

        if (offset) {
            scrollPos += offset
            targetPos = targetPos - offset
        }

        const from = scrollPos
        const to = targetPos

        AnimationUtils.animate(from, to, duration, function (value) {
            document.documentElement.scrollTop = value

            document.body.scrollTop = value
        })
    }
    static scrollTop(offset, duration) {
        AnimationUtils.scrollTo(null, offset, duration)
    }
}
