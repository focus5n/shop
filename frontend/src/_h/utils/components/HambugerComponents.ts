import { DataUtils } from "../DataUtils";
import { DOMEventHandlerUtils } from "../DomEventHandlerUtils";

class HambugerComponents {
    element

    constructor(_element: HTMLElement) {
        this.element = _element;
        DataUtils.set(this.element, 'hambuger', this);
    }

    static getInstance = (element: HTMLElement) => {
        const hambuger = DataUtils.get(element, 'hambuger')
        if (hambuger) {
            return hambuger
        }
        return null
    }

    _click = (element: HTMLElement, e: Event) => {
        const id = element.getAttribute('data-h-hambuger-target') as string
        const target = document.querySelector(id) as HTMLElement

        element.classList.toggle('is-active')
        target.classList.toggle('show')
    }

    static initGlobalHandlers = () => {
        DOMEventHandlerUtils.on(
            document.body,
            '[data-h-hambuger="true"]',
            'click',
            function (this: HTMLElement,e: Event) {
                const hambuger = HambugerComponents.getInstance(this)
                if (hambuger) {
                    return hambuger._click(this, e)
                }
            }
        )
    }

    static createInstances = (selector: string) => {
        document.querySelectorAll(selector).forEach((el) => {
            const hambugerItem = el as HTMLElement
            let hambugerInstance = HambugerComponents.getInstance(hambugerItem)
            if (!hambugerInstance) {
                hambugerInstance = new HambugerComponents(el as HTMLElement)
            }
        })
    }

    static bootstrap = () => {
        HambugerComponents.initGlobalHandlers()
        HambugerComponents.createInstances('[data-h-hambuger="true"]')
    }
}

export {HambugerComponents}