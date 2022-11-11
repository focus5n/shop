

import { DataUtils } from '../DataUtils';
import { DOMEventHandlerUtils } from '../DomEventHandlerUtils';
import { ElementStyleUtil } from '../ElementStyleUtil';

class QuantityComponents {
    element

    constructor(_element: HTMLElement) {
        this.element = _element;
        DataUtils.set(this.element, 'quantity', this);
    }

    static getInstance = (element: HTMLElement) => {
        const quantity = DataUtils.get(element, 'quantity')
        if (quantity) {
            return quantity
        }
        return null
    }

    static initGlobalHandlers = () => {
        const element = document.body.querySelector('[data-h-quantity="true"]') as HTMLElement
        const target = document.body.querySelector('[data-h-quantity-target="true"]') as HTMLElement

        DOMEventHandlerUtils.on(
            element,
            '[data-h-quantity-up="true"]',
            'click',
            function (e: Event) { 
                const value = parseInt((target as HTMLInputElement).value) + 1 as number
                (target as HTMLInputElement).defaultValue = String(value);
                (target as HTMLInputElement).value = String(value)

            }
        )

        DOMEventHandlerUtils.on(
            element,
            '[data-h-quantity-down="true"]',
            'click',
            function (e: Event) { 
                const value = parseInt((target as HTMLInputElement).defaultValue) - 1 as number
                if(value <= 0) {
                    return
                }
                (target as HTMLInputElement).defaultValue = String(value);
                (target as HTMLInputElement).value = String(value)

            }
        )
    }

    static createInstances = (selector: string) => {
        document.querySelectorAll(selector).forEach((el) => {
            const quantityItem = el as HTMLElement
            let quantityInstance = QuantityComponents.getInstance(quantityItem)
            if (!quantityInstance) {
                quantityInstance = new QuantityComponents(el as HTMLElement)
            }
        })
    }

    static bootstrap = () => {
        QuantityComponents.initGlobalHandlers()
        QuantityComponents.createInstances('[data-h-quantity="true"]')
    }
}

export { QuantityComponents }