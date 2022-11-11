import { getUniqueIdWithPrefix } from './TypeUtils.js'

export class DOMEventHandlerUtils {
    static store = new Map()

    static on(
        element,
        selector,
        eventName,
        callBack
    ) {
        const eventId = getUniqueIdWithPrefix('DOMEvent')
        DOMEventHandlerUtils.store.set(eventId, (e) => {
            const targets = element.querySelectorAll(selector)
            let target = e.target
            while (target && target !== element) {
                for (let i = 0; i < targets.length; i++) {
                    if (target === targets[i]) {
                        callBack.call(target, e)
                    }
                }

                if (target.parentElement) {
                    target = target.parentElement
                } else {
                    target = null
                }
            }
        })
        element.addEventListener(eventName, DOMEventHandlerUtils.store.get(eventId))
        return eventId
    }

    static off(element, eventName, eventId) {
        const funcFromStore = DOMEventHandlerUtils.store.get(eventId)
        if (!funcFromStore) {
            return
        }

        element.removeEventListener(eventName, funcFromStore)
        DOMEventHandlerUtils.store.delete(eventId)
    }

    static one(element, eventName, callBack) {
        element.addEventListener(eventName, function calee(e) {
            if (e.target && e.target.removeEventListener) {
                e.target.removeEventListener(e.type, calee)
            }

            if (element && e && e.currentTarget) {
                e.currentTarget.removeEventListener(e.type, calee)
            }

            return callBack(e)
        })
    }
}
