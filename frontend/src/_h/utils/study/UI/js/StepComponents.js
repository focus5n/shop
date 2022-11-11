
import { DataUtils } from './utils/DataUtils.js';
import { DOMEventHandlerUtils } from './utils/DOMEventHandlerUtils.js';
class StepComponents {
    element

    constructor(_element) {
        this.element = _element;
        DataUtils.set(this.element, 'step', this);
    }

    static getInstance = (element) => {
        const step = DataUtils.get(element, 'step')
        if (step) {
            return step
        }
        return null
    }

    _click = (element, e) => {
        const currentId = element.getAttribute('data-h-step-current-target')
        const currentTarget = document.querySelector(currentId)
        currentTarget.classList.add('d-none')

        const currentValudId = element.getAttribute('data-h-step-next')
        if(currentValudId) {
            const valueTarget = document.querySelector(currentId)
            const values = valueTarget.querySelectorAll('[data-h-step-value="true"]')
            values.forEach((value) => {
                const id = value.getAttribute('data-h-step-value-target')
                const target = document.querySelector(id)
                target.textContent = value.value
            })
        }

        const nextId = element.getAttribute('data-h-step-next-target')
        const nextTarget = document.querySelector(nextId)
        nextTarget.classList.remove('d-none')
    }

    static initGlobalHandlers = () => {
        DOMEventHandlerUtils.on(
            document.body,
            '[data-h-step="true"]',
            'click',
            function (e) {
                const step = StepComponents.getInstance(this)
                if (step) {
                    return step._click(this, e)
                }
            }
        )
    }

    static createInstances = (selector) => {
        document.querySelectorAll(selector).forEach((el) => {
            const stepItem = el
            let stepInstance = StepComponents.getInstance(stepItem)
            if (!stepInstance) {
                stepInstance = new StepComponents(el)
            }
        })
    }

    static bootstrap = () => {
        StepComponents.initGlobalHandlers()
        StepComponents.createInstances('[data-h-step="true"]')
    }
}

StepComponents.bootstrap()