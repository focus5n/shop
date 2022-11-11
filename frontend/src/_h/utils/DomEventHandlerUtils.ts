import {getUniqueIdWithPrefix} from './TypeUtils'

export class DOMEventHandlerUtils {
  public static store = new Map()

  public static on(
    element: HTMLElement,
    selector: string,
    eventName: string,
    callBack: any
  ): string {
    const eventId = getUniqueIdWithPrefix('DOMEvent')
    DOMEventHandlerUtils.store.set(eventId, (e: Event) => {
      const targets = element.querySelectorAll(selector)
      let target: HTMLElement | null = e.target as HTMLElement
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
    if(element) {
      element.addEventListener(eventName, DOMEventHandlerUtils.store.get(eventId))
    }

    return eventId
  }

  public static off(element: HTMLElement, eventName: string, eventId: string): void {
    const funcFromStore = DOMEventHandlerUtils.store.get(eventId)
    if (!funcFromStore) {
      return
    }

    element.removeEventListener(eventName, funcFromStore)
    DOMEventHandlerUtils.store.delete(eventId)
  }

  public static one(element: HTMLElement, eventName: string, callBack: Function): void {
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
