
import { DataUtils } from './utils/DataUtils.js';
import { DOMEventHandlerUtils } from './utils/DOMEventHandlerUtils.js';
class HambugerComponents {
    element

    constructor(_element) {
        this.element = _element;
        DataUtils.set(this.element, 'hambuger', this);
    }

    static getInstance = (element) => {
        const hambuger = DataUtils.get(element, 'hambuger')
        if (hambuger) {
            return hambuger
        }
        return null
    }

    _click = (element, e) => {
        const id = element.getAttribute('data-h-hambuger-target')
        const target = document.querySelector(id)

        element.classList.toggle('is-active')
        target.classList.toggle('show')
    }

    static initGlobalHandlers = () => {
        DOMEventHandlerUtils.on(
            document.body,
            '[data-h-hambuger="true"]',
            'click',
            function (e) {
                const hambuger = HambugerComponents.getInstance(this)
                if (hambuger) {
                    return hambuger._click(this, e)
                }
            }
        )
    }

    static createInstances = (selector) => {
        document.querySelectorAll(selector).forEach((el) => {
            const hambugerItem = el
            let hambugerInstance = HambugerComponents.getInstance(hambugerItem)
            if (!hambugerInstance) {
                hambugerInstance = new HambugerComponents(el)
            }
        })
    }

    static bootstrap = () => {
        HambugerComponents.initGlobalHandlers()
        HambugerComponents.createInstances('[data-h-hambuger="true"]')
    }
}

HambugerComponents.bootstrap()