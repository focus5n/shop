import { DataUtils } from './DataUtils'
import { getUniqueIdWithPrefix } from './TypeUtils'

export interface EventMeta {
  name: string
  callback: Function
  one: boolean
  fired: boolean
}

export class EventHandlerUtils {
  static store: Map<string, Map<string, EventMeta>> = new Map()

  private static setEventMetasByName(name: string, metas: Map<string, EventMeta>): void {
    EventHandlerUtils.store.set(name, metas)
  }

  private static getEventMetasByName(name: string): Map<string, EventMeta> | undefined {
    return EventHandlerUtils.store.get(name)
  }

  private static setEventMetaByNameAndHandlerId(
    name: string,
    handlerId: string,
    meta: EventMeta
  ): void {
    let metas = EventHandlerUtils.getEventMetasByName(name)
    if (!metas) {
      metas = new Map()
    }

    metas.set(handlerId, meta)
    EventHandlerUtils.setEventMetasByName(name, metas)
  }

  private static getEventsMetaByHandlerId(name: string, handlerId: string): EventMeta | undefined {
    const metas = EventHandlerUtils.store.get(name)
    if (!metas) {
      return
    }

    return metas.get(handlerId)
  }

  private static setFiredByNameAndHandlerId(name: string, handerId: string, fired: boolean): void {
    const meta = EventHandlerUtils.getEventsMetaByHandlerId(name, handerId)
    if (!meta) {
      return
    }

    meta.fired = fired
    EventHandlerUtils.setEventMetaByNameAndHandlerId(name, handerId, meta)
  }

  private static addEvent(
    element: HTMLElement,
    name: string,
    callback: Function,
    one: boolean = false
  ) {
    const handlerId = getUniqueIdWithPrefix('event')
    DataUtils.set(element, name, handlerId)
    const meta: EventMeta = {
      name: name,
      callback: callback,
      one: one,
      fired: false,
    }

    EventHandlerUtils.setEventMetaByNameAndHandlerId(name, handlerId, meta)
  }

  private static removeEvent(element: HTMLElement, name: string) {
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

  public static trigger(element: HTMLElement, name: string, target?: any, e?: Event) {
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

  public static on = function (element: HTMLElement, name: string, callBack: Function): void {
    EventHandlerUtils.addEvent(element, name, callBack, false)
  }

  public static one(element: HTMLElement, name: string, callBack: Function): void {
    EventHandlerUtils.addEvent(element, name, callBack, true)
  }

  public static off(element: HTMLElement, name: string): void {
    EventHandlerUtils.removeEvent(element, name)
  }
}
