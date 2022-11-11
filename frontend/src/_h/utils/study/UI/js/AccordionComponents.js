
import { DataUtils } from './utils/DataUtils.js';
import { DOMEventHandlerUtils } from './utils/DOMEventHandlerUtils.js';
import { slideDown } from './utils/DomUtils.js'
import { EventHandlerUtils } from './utils/EventHandlerUtils.js'
class AccordionComponents {
    element

    constructor(_element) {
        this.element = _element;
        DataUtils.set(this.element, 'accordion', this);
    }

    static getInstance = (element) => {
        const hambuger = DataUtils.get(element, 'accordion')
        if (hambuger) {
            return hambuger
        }
        return null
    }

    _click = (element, e) => {
        const id = element.getAttribute('data-h-accordion-target')
        const target = document.querySelector(id)

        element.classList.toggle('collapsed')
        target.classList.toggle('show')

    }

    static initGlobalHandlers = () => {
        DOMEventHandlerUtils.on(
            document.body,
            '[data-h-accordion="true"]',
            'click',
            function (e) {
                const accordion = AccordionComponents.getInstance(this)
                if (accordion) {
                    return accordion._click(this, e)
                }
            }
        )
    }

    static createInstances = (selector) => {
        document.querySelectorAll(selector).forEach((el) => {
            const accordionItem = el
            let accordionInstance = AccordionComponents.getInstance(accordionItem)
            if (!accordionInstance) {
                accordionInstance = new AccordionComponents(el)
            }
        })
    }

    static bootstrap = () => {
        AccordionComponents.initGlobalHandlers()
        AccordionComponents.createInstances('[data-h-accordion="true"]')
    }
}

AccordionComponents.bootstrap()