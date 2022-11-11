import {EventHandlerUtils, DataUtils, getUniqueIdWithPrefix, getCSS} from '../index'


export interface ImageInputOptions {}

export interface ImageInputQueries {
  componentName: string
  instanseQuery: string
  inputQuery: string
  wrapperQuery: string
  cancelQuery: string
  removeQuery: string
  hiddenQuery: string
  textQuery: string
}

const defaultImageInputOptions = {}

const defaultImageInputQueires: ImageInputQueries = {
  componentName: 'image-input',
  instanseQuery: '[data-h-image-input]',
  inputQuery: 'input[type="file"]',
  wrapperQuery: '.image-input-wrapper',
  cancelQuery: '[data-h-image-input-action="cancel"]',
  removeQuery: '[data-h-image-input-action="remove"]',
  hiddenQuery: 'input[type="hidden"]',
  textQuery: '[data-h-image-text]',
}

class ImageInputComponent {
  element: HTMLElement
  inputElement: HTMLInputElement | null
  wrapperElement: HTMLElement | null
  cancelElement: HTMLElement | null
  removeElement: HTMLElement | null
  hiddenElement: HTMLInputElement | null
  textElement: HTMLElement | null
  src: string = ''
  options: ImageInputOptions
  queries: ImageInputQueries
  uid: string
  value: string = ''

  constructor(_element: HTMLElement, _options: ImageInputOptions, _queries: ImageInputQueries) {
    this.options = Object.assign(defaultImageInputOptions, _options)
    this.queries = _queries
    this.uid = getUniqueIdWithPrefix(this.queries.componentName)

    this.element = _element
    this.inputElement = this.element.querySelector(this.queries.inputQuery)
    this.wrapperElement = this.element.querySelector(this.queries.wrapperQuery)
    this.cancelElement = this.element.querySelector(this.queries.cancelQuery)
    this.removeElement = this.element.querySelector(this.queries.removeQuery)
    this.hiddenElement = this.element.querySelector(this.queries.hiddenQuery)
    this.textElement = this.element.querySelector(this.queries.textQuery)

    if (this.wrapperElement) {
      this.src = getCSS(this.wrapperElement, 'backgrounImage')
    }

    this.handlers()

    DataUtils.set(this.element, this.queries.componentName, this)
  }

  private handlers(): void {
    this.element.addEventListener('change', this._change)

    if (this.cancelElement) {
      this.cancelElement.addEventListener('click', this._cancel)
    }

    if (this.removeElement) {
      this.removeElement.addEventListener('click', this._cancel)
    }
  }

  private _change = (e: Event) => {
    e.preventDefault()

    if (this.inputElement !== null && this.inputElement.files && this.inputElement.files[0]) {
      if (EventHandlerUtils.trigger(this.element, 'h.imageinput.change', e) === false) {
        return
      }

      const reader = new FileReader()

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (this.wrapperElement && e.target) {
          this.wrapperElement.style.setProperty('background-image', `url('${e.target.result}')`)
        }
      }

      reader.readAsDataURL(this.inputElement.files[0])
      this.element.classList.add('image-input-changed')
      this.element.classList.remove('image-input-empty')
    
      if(this.textElement) {
        this.textElement.classList.add('d-none')
      }

      EventHandlerUtils.trigger(this.element, 'h.imageinput.changed', e)
    }
  }

  private _cancel = (e: Event) => {
    e.preventDefault()

    if (EventHandlerUtils.trigger(this.element, 'h.imageinput.cancel', e) === false) {
      return
    }

    this.element.classList.remove('image-input-changed')
    this.element.classList.add('image-input-empty')

    if (this.wrapperElement) {
      this.wrapperElement.style.setProperty('background-image', this.src)
    }

    if(this.textElement) {
      this.textElement.classList.remove('d-none')
    }

    if (this.inputElement) {
      this.inputElement.value = ''
    }

    if (this.hiddenElement !== null) {
      this.hiddenElement.value = '0'
    }

    EventHandlerUtils.trigger(this.element, 'h.imageinput.canceled', e)
  }

  private _remove = (e: Event) => {
    e.preventDefault()

    if (EventHandlerUtils.trigger(this.element, 'h.imageinput.remove', e) === false) {
      return
    }

    this.element.classList.remove('image-input-changed')
    this.element.classList.add('image-input-empty')
    if (this.wrapperElement) {
      this.wrapperElement.style.setProperty('background-image', 'none')
    }

    if (this.inputElement) {
      this.inputElement.value = ''
    }

    if (this.hiddenElement !== null) {
      this.hiddenElement.value = '1'
    }

    EventHandlerUtils.trigger(this.element, 'h.imageinput.removed', e)
  }

  public getInputElement(): HTMLInputElement | null {
    return this.inputElement
  }

  public getElement(): HTMLElement {
    return this.element
  }

  public on = (name: string, handler: Function) => {
    return EventHandlerUtils.on(this.element, name, handler)
  }

  public one = (name: string, handler: Function) => {
    return EventHandlerUtils.one(this.element, name, handler)
  }

  public off = (name: string) => {
    return EventHandlerUtils.off(this.element, name)
  }

  public trigger = (name: string, event: Event) => {
    return EventHandlerUtils.trigger(this.element, name, event)
  }

  public static getInstance = (
    el: HTMLElement,
    componentName: string = defaultImageInputQueires.componentName
  ) => {
    const ImageInput = DataUtils.get(el, componentName)
    if (ImageInput) {
      return ImageInput
    }
    return null
  }

  public static createInstances = (
    selector: string = defaultImageInputQueires.instanseQuery,
    options: ImageInputOptions = defaultImageInputOptions,
    queries: ImageInputQueries = defaultImageInputQueires
  ) => {
    const elements = document.body.querySelectorAll(selector)
    elements.forEach((el) => {
      const item = el as HTMLElement
      let ImageInput = ImageInputComponent.getInstance(item)
      if (!ImageInput) {
        ImageInput = new ImageInputComponent(item, options, queries)
      }
    })
  }

  public static createInsance = (
    selector: string = defaultImageInputQueires.instanseQuery,
    options: ImageInputOptions = defaultImageInputOptions,
    queries: ImageInputQueries = defaultImageInputQueires
  ): ImageInputComponent | undefined => {
    const element = document.body.querySelector(selector)
    if (!element) {
      return
    }
    const item = element as HTMLElement
    let ImageInput = ImageInputComponent.getInstance(item)
    if (!ImageInput) {
      ImageInput = new ImageInputComponent(item, options, queries)
    }
    return ImageInput
  }

  public static bootstrap = (selector: string = defaultImageInputQueires.instanseQuery) => {
    ImageInputComponent.createInstances(selector)
  }

  public static reinitialization = (selector: string = defaultImageInputQueires.instanseQuery) => {
    ImageInputComponent.createInstances(selector)
  }
}

export {ImageInputComponent, defaultImageInputOptions, defaultImageInputQueires}
