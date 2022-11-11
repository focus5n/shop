

import { DataUtils } from '../DataUtils';
import { DOMEventHandlerUtils } from '../DomEventHandlerUtils';

class AccordionComponents {
    element

    constructor(_element: HTMLElement) {
        this.element = _element;
        DataUtils.set(this.element, 'accordion', this);
    }

    static getInstance = (element: HTMLElement) => {
        const accordion = DataUtils.get(element, 'accordion')
        if (accordion) {
            return accordion
        }
        return null
    }

    _click = (element: HTMLElement, e: Event) => {
        const id = element.getAttribute('data-h-accordion-target') as string
        const target = document.querySelector(id) as HTMLElement
        element.classList.toggle('collapsed')
        target.classList.toggle('show')
    }

    static initGlobalHandlers = () => {
        DOMEventHandlerUtils.on(
            document.body,
            '[data-h-accordion="true"]',
            'click',
            function (this: HTMLElement, e: Event) {
                const accordion = AccordionComponents.getInstance(this)
                if (accordion) {
                    return accordion._click(this, e)
                }
            }
        )
    }

    static createInstances = (selector: string) => {
        document.querySelectorAll(selector).forEach((el) => {
            const accordionItem = el as HTMLElement
            let accordionInstance = AccordionComponents.getInstance(accordionItem)
            if (!accordionInstance) {
                accordionInstance = new AccordionComponents(el as HTMLElement)
            }
        })
    }

    static bootstrap = () => {
        AccordionComponents.initGlobalHandlers()
        AccordionComponents.createInstances('[data-h-accordion="true"]')
    }
}

export {AccordionComponents}