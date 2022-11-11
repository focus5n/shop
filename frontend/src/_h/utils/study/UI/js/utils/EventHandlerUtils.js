import { DataUtils } from './DataUtils.js'
import { getUniqueIdWithPrefix } from './TypeUtils.js'



export class EventHandlerUtils {
    static store = new Map()

    static setEventMetasByName(name, metas) {
        EventHandlerUtils.store.set(name, metas)
    }

    static getEventMetasByName(name) {
        return EventHandlerUtils.store.get(name)
    }
    static setEventMetaByNameAndHandlerId(
        name,
        handlerId,
        meta
    ) {
        let metas = EventHandlerUtils.getEventMetasByName(name)
        if (!metas) {
            metas = new Map()
        }

        metas.set(handlerId, meta)
        EventHandlerUtils.setEventMetasByName(name, metas)
    }

    static getEventsMetaByHandlerId(name, handlerId) {
        const metas = EventHandlerUtils.store.get(name)
        if (!metas) {
            return
        }

        return metas.get(handlerId)
    }

    static setFiredByNameAndHandlerId(name, handerId, fired) {
        const meta = EventHandlerUtils.getEventsMetaByHandlerId(name, handerId)
        if (!meta) {
            return
        }

        meta.fired = fired
        EventHandlerUtils.setEventMetaByNameAndHandlerId(name, handerId, meta)
    }

    static addEvent(
        element,
        name,
        callback,
        one = false
    ) {
        const handlerId = getUniqueIdWithPrefix('event')
        DataUtils.set(element, name, handlerId)
        const meta = {
            name: name,
            callback: callback,
            one: one,
            fired: false,
        }

        EventHandlerUtils.setEventMetaByNameAndHandlerId(name, handlerId, meta)
    }

    static removeEvent(element, name) {
        const handlerId = DataUtils.get(element, name)
        if (!handlerId) {
            return
        }

        const metas = EventHandlerUtils.getEventMetasByName(name)
        if (!metas) {
            return
        }

        metas.delete(handlerId)
        EventHandlerUtils.setEventMetasByName(name, metas)
    }

    static trigger(element, name, target, e) {
        if (DataUtils.has(element, name)) {
            const handlerId = DataUtils.get(element, name)
            if (!handlerId) {
                return undefined
            }

            const handler = EventHandlerUtils.getEventsMetaByHandlerId(name, handlerId)
            if (handler) {
                if (handler.name === name) {
                    if (handler.one === true) {
                        if (handler.fired === false) {
                            EventHandlerUtils.setFiredByNameAndHandlerId(name, handlerId, true)
                            return handler.callback.call(this, target, e)
                        }
                    } else {
                        return handler.callback.call(this, target, e)
                    }
                }
            }
        }

        return null
    }

    static on = function (element, name, callBack) {
        EventHandlerUtils.addEvent(element, name, callBack, false)
    }

    static one(element, name, callBacknction) {
        EventHandlerUtils.addEvent(element, name, callBack, true)
    }

    static off(element, name) {
        EventHandlerUtils.removeEvent(element, name)
    }
}
