import { DataUtils } from "../DataUtils";
import { DOMEventHandlerUtils } from "../DomEventHandlerUtils";

class StepperComponents {
    element

    constructor(_element: HTMLElement) {
        this.element = _element;
        DataUtils.set(this.element, 'step', this);
    }

    static getInstance = (element: HTMLElement) => {
        const step = DataUtils.get(element, 'step')
        if (step) {
            return step
        }
        return null
    }

    _click = (element: HTMLElement, e: Event) => {
        const currentId = element.getAttribute('data-h-step-current-target') as string
        const currentTarget = document.querySelector(currentId) as HTMLElement
        currentTarget.classList.add('d-none')

        const currentValueId = element.getAttribute('data-h-step-next')
        if(currentValueId) {
            const valueTarget = document.querySelector(currentId) as HTMLElement
            const values = valueTarget.querySelectorAll('[data-h-step-value="true"]')
            values.forEach((value) => {
                const id = value.getAttribute('data-h-step-value-target') as string
                const target = document.querySelector(id) as HTMLElement
                target.textContent = (value as HTMLInputElement).value
            })
        }

        const nextId = element.getAttribute('data-h-step-next-target') as string
        const nextTarget = document.querySelector(nextId) as HTMLElement
        nextTarget.classList.remove('d-none')
    }

    static initGlobalHandlers = () => {
        DOMEventHandlerUtils.on(
            document.body,
            '[data-h-step="true"]',
            'click',
            function (this: HTMLElement, e: Event) {
                const step = StepperComponents.getInstance(this)
                if (step) {
                    return step._click(this, e)
                }
            }
        )
    }

    static createInstances = (selector: string) => {
        document.querySelectorAll(selector).forEach((el) => {
            const stepItem = el as HTMLElement
            let stepInstance = StepperComponents.getInstance(stepItem)
            if (!stepInstance) {
                stepInstance = new StepperComponents(el as HTMLElement)
            }
        })
    }

    static bootstrap = () => {
        StepperComponents.initGlobalHandlers()
        StepperComponents.createInstances('[data-h-step="true"]')
    }
}

export {StepperComponents}