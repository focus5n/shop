  import {createPopper, VirtualElement} from '@popperjs/core'
import {DataUtils} from '../DataUtils'
import {DOMEventHandlerUtils} from '../DomEventHandlerUtils'
import {
  getAttributeValueByBreakpoint,
  getElementChild,
  getElementParents,
  getHighestZindex,
  insertAfterElement,
  slideDown,
  slideUp,
  throttle,
} from '../DomUtils'
import {ElementStyleUtil} from '../ElementStyleUtil'
import {EventHandlerUtils} from '../EventHandlerUtils'
import { getUniqueIdWithPrefix } from '../TypeUtils'


export interface MenuOptions {
  dropdown: {
    hoverTimeout: number
    zindex: number
  }
  accordion: {
    slideSpeed: number
    expand: boolean
  }
}

const defaultMenuOptions: MenuOptions = {
  dropdown: {
    hoverTimeout: 200,
    zindex: 105,
  },
  accordion: {
    slideSpeed: 250,
    expand: false,
  },
}

type PopperPlacement =
  | 'right'
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end'
  | undefined

class MenuComponent {
  element: HTMLElement
  options: MenuOptions
  instanceUid: string
  triggerElement: HTMLElement | null = null

  constructor(_element: HTMLElement, options: MenuOptions) {
    this.element = _element
    this.options = options
    this.instanceUid = getUniqueIdWithPrefix('menu')
    this._setTriggerElement()

    DataUtils.set(this.element, 'menu', this)
    return this
  }

  private _setTriggerElement = () => {
    const target = document.querySelector(
      `[data-h-menu-target="#${this.element.getAttribute('id')}]`
    )

    if (target) {
      this.triggerElement = target as HTMLElement
    } else if (this.element.closest('[data-h-menu-trigger')) {
      this.triggerElement = this.element.closest('[data-h-menu-trigger') as HTMLElement
    } else if (
      this.element.parentNode &&
      getElementChild(this.element.parentNode as HTMLElement, '[data-h-menu-trigger]')
    ) {
      const child = getElementChild(this.element.parentNode as HTMLElement, '[data-h-menu-trigger]')
      if (child) {
        this.triggerElement = child
      }
    }

    if (this.triggerElement) {
      DataUtils.set(this.triggerElement, 'menu', this)
    }
  }

  private _isTriggerElement = (item: HTMLElement) => {
    return this.triggerElement === item
  }

  private _getItemElement = (_element: HTMLElement) => {
    if (this._isTriggerElement(_element)) {
      return _element
    }

    if (_element.hasAttribute('data-h-menu-trigger')) {
      return _element
    }

    const itemElement = DataUtils.get(_element, 'item')
    if (itemElement) {
      return itemElement
    }

    const item = _element.closest('.menu-item[data-h-menu-trigger]')
    if (item) {
      return item
    }

    const sub = _element.closest('.menu-sub')
    if (sub) {
      const subItem = DataUtils.get(sub as HTMLElement, 'item')
      if (subItem) {
        return subItem
      }
    }
  }

  private _getItemParentElement = (item: HTMLElement) => {
    const sub = item.closest('.menu-sub')
    if (!sub) {
      return null
    }

    const subItem = DataUtils.get(sub as HTMLElement, 'item')
    if (subItem) {
      return subItem
    }

    const parentItem = sub.closest('.menu-item[data-h-menu-trigger]')
    if (sub && parentItem) {
      return parentItem
    }

    return null
  }

  private _getItemParentElements = (item: HTMLElement) => {
    const parents: Array<Element> = []
    let parent: Element
    let i = 0
    let buffer: HTMLElement = item

    do {
      parent = this._getItemParentElement(buffer)
      if (parent) {
        parents.push(parent)
        buffer = parent as HTMLElement
      }
      i += 1
    } while (parent !== null && i < 20)

    if (this.triggerElement) {
      parents.unshift(this.triggerElement)
    }
    return parents
  }

  private _getDropdownPopperConfig = (item: HTMLElement) => {
    const placementOption = this._getItemOption(item, 'placement')
    let placement: PopperPlacement = 'right'
    if (placementOption) {
      placement = placementOption as PopperPlacement
    }

    const offsetValue = this._getItemOption(item, 'offset')
    const offset = offsetValue ? offsetValue.toString().split(',') : []

    const strategy: 'absolute' | 'fixed' | undefined =
      this._getItemOption(item, 'overflow') === true ? 'absolute' : 'fixed'

    return {
      placement: placement,
      strategy: strategy,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: offset,
          },
        },
        {
          name: 'preventOverflow',
        },
        {
          name: 'flip',
          options: {
            flipVariations: false,
          },
        },
      ],
    }
  }

  private _getItemChildElement = (item: HTMLElement) => {
    let selector = item

    const subItem = DataUtils.get(item, 'sub')
    if (subItem) {
      selector = subItem
    }

    if (selector) {
      const element = selector.querySelector('.menu-item[data-h-menu-trigger]')
      if (element) {
        return element
      }
    }
    return null
  }

  private _getItemChildElements = (item: HTMLElement) => {
    const children: Array<Element> = []
    let child: Element | null
    let i = 0
    let buffer = item
    do {
      child = this._getItemChildElement(buffer)
      if (child) {
        children.push(child)
        buffer = child as HTMLElement
      }

      i += 1
    } while (child !== null && i < 20)

    return children
  }

  private _getItemSubElement = (item: HTMLElement) => {
    if (!item) {
      return null
    }

    if (this._isTriggerElement(item)) {
      return this.element
    }

    if (item.classList.contains('menu-sb')) {
      return item
    } else if (DataUtils.has(item, 'sub')) {
      return DataUtils.get(item, 'sub')
    } else {
      return getElementChild(item, '.menu-sub')
    }
  }

  private _getCss = (el: HTMLElement, styleProp: string) => {
    const defaultView = (el.ownerDocument || document).defaultView
    if (!defaultView) {
      return ''
    }

    styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase()

    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp)
  }

  private _getItemSubType = (element: HTMLElement) => {
    const sub = this._getItemSubElement(element)
    if (sub && parseInt(this._getCss(sub, 'z-index')) > 0) {
      return 'dropdown'
    } else {
      return 'accordion'
    }
  }

  private _isItemSubShown = (item: HTMLElement) => {
    let sub = this._getItemElement(item)
    if (sub) {
      if (this._getItemSubElement(item) === 'dropdown') {
        return sub.classList.contains('show') && sub.hasAttribute('data-popper-placement')
      } else {
        return item.classList.contains('show')
      }
    }
    return false
  }
  private _getItemOption = (item: HTMLElement, name: string) => {
    let value: string | JSON | null | boolean = null
    if (item && item.hasAttribute('data-h-menu-' + name)) {
      const attr = item.getAttribute('data-h-menu-' + name) || ''
      value = getAttributeValueByBreakpoint(attr)
      if (value !== null && String(value) === 'true') {
        value = true
      } else if (value !== null && String(value) === 'false') {
        value = false
      }
    }
    return value
  }

  private _isItemDropdownPermanent = (item: HTMLElement) => {
    return this._getItemOption(item, 'permanent') === true
  }

  private _isItemParentShown = (item: HTMLElement) => {
    return getElementParents(item, '.menu-item.show').length > 0
  }

  private _isItemSubElement = (item: HTMLElement) => {
    return item.classList.contains('menu-sub')
  }

  private _hasItemSub = (item: HTMLElement) => {
    return item.classList.contains('menu-item') && item.hasAttribute('data-h-menu-trigger')
  }

  private _getItemLinkElement = (item: HTMLElement) => {
    return getElementChild(item, '.menu-link')
  }

  private _getItemToggleElement = (item: HTMLElement) => {
    if (this.triggerElement) {
      return this.triggerElement
    }

    return this._getItemLinkElement(item)
  }

  private _showDropdown = (item: HTMLElement) => {
    if (EventHandlerUtils.trigger(this.element, 'h.menu.dropdown.show') === false) {
      return
    }

    MenuComponent.hideDropdowns(item)

    const sub = this._getItemSubElement(item)
    const width = this._getItemOption(item, 'width')
    const height = this._getItemOption(item, 'height')

    let zindex = this.options.dropdown.zindex
    const parentZindex = getHighestZindex(item)
    if (parentZindex !== null && parentZindex >= zindex) {
      zindex = parentZindex + 1
    }

    if (zindex) {
      ElementStyleUtil.set(sub, 'z-index', zindex)
    }

    if (width) {
      ElementStyleUtil.set(sub, 'width', width)
    }

    if (height) {
      ElementStyleUtil.set(sub, 'height', height)
    }

    this.initDropdownPopper(item, sub)

    item.classList.add('show')
    item.classList.add('menu-dropdown')
    sub.classList.add('show')

    if (this._getItemOption(item, 'overflow') === true) {
      document.body.appendChild(sub)
      DataUtils.set(item, 'sub', sub)
      DataUtils.set(sub, 'item', item)
      DataUtils.set(sub, 'menu', this)
    } else {
      DataUtils.set(sub, 'item', item)
    }

    EventHandlerUtils.trigger(this.element, 'h.menu.dropdown.shown')
  }

  private initDropdownPopper = (item: HTMLElement, sub: HTMLElement) => {
    let reference
    const attach = this._getItemOption(item, 'attach') as string

    if (attach) {
      if (attach === 'parent') {
        reference = item.parentNode
      } else {
        reference = document.querySelector(attach)
      }
    } else {
      reference = item
    }

    if (reference) {
      const popper = createPopper(
        reference as Element | VirtualElement,
        sub,
        this._getDropdownPopperConfig(item)
      )
      DataUtils.set(item, 'popper', popper)
    }
  }

  private _hideDropdown = (item: HTMLElement) => {
    if (EventHandlerUtils.trigger(this.element, 'h.menu.dropdown.hide') === false) {
      return
    }


    const sub = this._getItemSubElement(item)
    ElementStyleUtil.set(sub, 'z-index', '')
    ElementStyleUtil.set(sub, 'width', '')
    ElementStyleUtil.set(sub, 'height', '')
    item.classList.remove('show')
    item.classList.remove('menu-dropdown')
    sub.classList.remove('show')

    if (this._getItemOption(item, 'overflow') === true) {
      if (item.classList.contains('menu-item')) {
        item.appendChild(sub)
      } else {
        insertAfterElement(this.element, item)
      }

      DataUtils.remove(item, 'sub')
      DataUtils.remove(sub, 'item')
      DataUtils.remove(sub, 'menu')
    }

    if (DataUtils.has(item, 'popper') === true) {
      DataUtils.get(item, 'popper').destroy()
      DataUtils.remove(item, 'popper')
    }

    this.destroyDropdownPopper(item)
    EventHandlerUtils.trigger(this.element, 'h.menu.dropdown.hidden')
  }

  private destroyDropdownPopper = (item: HTMLElement) => {
    if (DataUtils.has(item, 'popper') === true) {
      DataUtils.get(item, 'popper').destroy()
      DataUtils.remove(item, 'popper')
    }

    EventHandlerUtils.trigger(this.element, 'h.menu.dropdown.hidden')
  }

  private _showAccordion = (item: HTMLElement) => {
    if (EventHandlerUtils.trigger(this.element, 'h.menu.accordion.show') === false) {
      return
    }

    if (this.options.accordion.expand === false) {
      this._hideAccordions(item)
    }

    if (DataUtils.has(item, 'popper') === true) {
      this._hideDropdown(item)
    }

    item.classList.add('hover')
    item.classList.add('showing')

    const subElement = this._getItemSubElement(item)
    if (subElement) {
      const sub = subElement as HTMLElement
      slideDown(sub, this.options.accordion.slideSpeed, () => {
        item.classList.remove('showing')
        item.classList.add('show')
        sub.classList.add('show')
        EventHandlerUtils.trigger(this.element, 'h.menu.accordion.shown')
      })
    }
  }

  private _hideAccordion = (item: HTMLElement) => {
    if (EventHandlerUtils.trigger(this.element, 'h.menu.accordion.hide') === false) {
      return
    }

    const sub = this._getItemSubElement(item)
    item.classList.add('hiding')

    if (sub) {
      slideUp(sub, this.options.accordion.slideSpeed, () => {
        item.classList.remove('hiding')
        item.classList.remove('show')
        sub.classList.remove('show')
        item.classList.remove('hover')
        EventHandlerUtils.trigger(this.element, 'h.menu.accordion.hidden')
      })
    }
  }

  private _hideAccordions = (item: HTMLElement) => {
    const itemsToHide = this.element.querySelectorAll('.show[data-h-menu-trigger]')
    if (itemsToHide && itemsToHide.length > 0) {
      for (var i = 0, len = itemsToHide.length; i < len; i++) {
        const itemToHide = itemsToHide[i] as HTMLElement

        if (
          this._getItemSubType(itemToHide) === 'accordion' &&
          itemToHide !== item &&
          item.contains(itemToHide) === false &&
          itemToHide.contains(item) === false
        ) {
          this._hideAccordion(itemToHide)
        }
      }
    }
  }

  private _reset = (item: HTMLElement) => {
    if (this._hasItemSub(item) === false) {
      return
    }

    const sub = this._getItemSubElement(item)

    if (DataUtils.has(item, 'type') && DataUtils.get(item, 'type') !== this._getItemSubType(item)) {
      item.classList.remove('hover')
      item.classList.remove('show')
      item.classList.remove('show')
      if (sub && sub.removeClass) {
        sub.removeClass(sub, 'show')
      }
    }
  }

  private _destroy = () => {}

  private _update = () => {
    const items = this.element.querySelectorAll('.menu-item[data-h-menu-trigger]')
    items.forEach((el) => this._reset(el as HTMLElement))
  }

  private _hide = (item: HTMLElement) => {
    if (!item) {
      return
    }

    if (this._isItemSubShown(item) === false) {
      return
    }

    if (this._getItemSubType(item) === 'dropdown') {
      this._hideDropdown(item)
    } else if (this._getItemSubType(item) === 'accordion') {
      this._hideAccordion(item)
    }
  }

  private _show = (item: HTMLElement) => {
    if (!item) {
      return
    }

    if (this._isItemSubShown(item) === true) {
      return
    }

    if (this._getItemSubType(item) === 'dropdown') {
      this._showDropdown(item)
    } else if (this._getItemSubType(item) === 'accordion') {
      this._showAccordion(item)
    }

    DataUtils.set(item, 'type', this._getItemSubType(item))
  }

  private _click = (element: HTMLElement, e: Event) => {
    const item = this._getItemElement(element)

    if (this._getItemOption(item, 'trigger') !== 'click') {
      return
    }

    if (this._getItemOption(item, 'toggle') === false) {
      this._show(item)
    } else {
      this._toggle(item)
    }
  }

  private _toggle = (item: HTMLElement) => {
    if (!item) {
      return
    }

    if (this._isItemSubShown(item) === true) {
      this._hide(item)
    } else {
      this._show(item)
    }
  }

  private _mouseout = (element: HTMLElement, e: MouseEvent) => {
    const item = this._getItemElement(element)
    if (!item) {
      return
    }

    if (this._getItemOption(item, 'trigger') !== 'hover') {
      return
    }

    const timeout = setTimeout(() => {
      if (DataUtils.get(item, 'hover') === '1') {
        this._hide(item)
      }
    }, this.options.dropdown.hoverTimeout)

    DataUtils.set(item, 'hover', '1')
    DataUtils.set(item, 'timeout', timeout)
  }

  private _mouseover = (element: HTMLElement, e: MouseEvent) => {
    const item = this._getItemElement(element)
    if (!item) {
      return
    }

    if (this._getItemOption(item, 'trigger') !== 'hover') {
      return
    }

    if (DataUtils.get(item, 'hover') === '1') {
      clearTimeout(DataUtils.get(item, 'timeout'))
      DataUtils.remove(item, 'hover')
      DataUtils.remove(item, 'timeout')
    }

    this._show(item)
  }

  private _dismiss = (element: HTMLElement, e: Event) => {
    const item = this._getItemElement(element)
    const items = this._getItemChildElements(item)
    const itemSubType = this._getItemSubType(item)
    if (item !== null && itemSubType === 'dropdown') {
      this._hide(item)

      if (items.length > 0) {
        for (let i = 0, len = items.length; i < len; i++) {
          if (items[i] !== null && this._getItemSubType(items[i] as HTMLElement) === 'dropdown') {
            this._hide(items[i] as HTMLElement)
          }
        }
      }
    }
  }

  private _link = (element: HTMLElement, e: Event) => {
    if (EventHandlerUtils.trigger(this.element, 'h.menu.link.click') === false) {
      return
    }

    MenuComponent.hideDropdowns(undefined)
    EventHandlerUtils.trigger(this.element, 'h.menu.link.clicked')
  }

  public click = (element: HTMLElement, e: Event) => {
    return this._click(element, e)
  }

  public link = (element: HTMLElement, e: Event) => {
    return this._link(element, e)
  }

  public dismiss = (element: HTMLElement, e: Event) => {
    return this._dismiss(element, e)
  }

  public mouseover = (element: HTMLElement, e: Event) => {
    return this._mouseover(element, e as MouseEvent)
  }

  public mouseout = (element: HTMLElement, e: Event) => {
    return this._mouseout(element, e as MouseEvent)
  }

  public getItemTriggerType = (item: HTMLElement) => {
    return this._getItemOption(item, 'trigger')
  }

  public getItemSubType = (element: HTMLElement) => {
    return this._getItemSubType(element)
  }

  public show = (item: HTMLElement) => {
    return this._show(item)
  }

  public hide = (item: HTMLElement) => {
    return this._hide(item)
  }

  public reset = (item: HTMLElement) => {
    return this._reset(item)
  }

  public update = () => {
    return this._update()
  }

  public getElement = () => {
    return this.element
  }

  public getItemLinkElement = (item: HTMLElement) => {
    return this._getItemLinkElement(item)
  }

  public getItemToggleElement = (item: HTMLElement) => {
    return this._getItemToggleElement(item)
  }

  public getItemSubElement = (item: HTMLElement) => {
    return this._getItemSubElement(item)
  }

  public getItemParentElements = (item: HTMLElement) => {
    return this._getItemParentElements(item)
  }

  public isItemSubShown = (item: HTMLElement) => {
    return this._isItemSubShown(item)
  }

  public isItemParentShown = (item: HTMLElement) => {
    return this._isItemParentShown(item)
  }

  public getTriggerElement = () => {
    return this.triggerElement
  }

  public isItemDropdownPermanent = (item: HTMLElement) => {
    return this._isItemDropdownPermanent(item)
  }

  // Accordion Mode Methods
  public hideAccordions = (item: HTMLElement) => {
    return this._hideAccordions(item)
  }

  // Event API
  public on = (name: string, handler: any) => {
    return EventHandlerUtils.on(this.element, name, handler)
  }

  public one = (name: string, handler: any) => {
    return EventHandlerUtils.one(this.element, name, handler)
  }

  public off = (name: string) => {
    return EventHandlerUtils.off(this.element, name)
  }

  public static hideDropdowns = (skip: HTMLElement | undefined) => {
    const items = document.querySelectorAll('.show.menu-dropdown[data-h-menu-trigger]')

    if (items && items.length > 0) {
      for (let i = 0, len = items.length; i < len; i++) {
        const item = items[i]
        const menu = MenuComponent.getInstance(item as HTMLElement)

        if (menu && menu.getItemSubType(item) === 'dropdown') {
          if (skip) {
            if (
              menu.getItemSubElement(item).contains(skip) === false &&
              item.contains(skip) === false &&
              item !== skip
            ) {
              menu.hide(item)
            }
          } else {
            menu.hide(item)
          }
        }
      }
    }
  }

  public static updateDropdowns = () => {
    const items = document.querySelectorAll('.show.menu-dropdown[data-h-menu-trigger]')
    if (items && items.length > 0) {
      for (var i = 0, len = items.length; i < len; i++) {
        var item = items[i]
        if (DataUtils.has(item as HTMLElement, 'popper')) {
          DataUtils.get(item as HTMLElement, 'popper').forceUpdate()
        }
      }
    }
  }

  public static getInstance = (element: HTMLElement) => {
    const elementMenu = DataUtils.get(element, 'menu')
    if (elementMenu) {
      return elementMenu
    }

    const menu = element.closest('.menu')
    if (menu) {
      const menuData = DataUtils.get(menu as HTMLElement, 'menu')
      if (menuData) {
        return menuData
      }
    }

    if (element.classList.contains('menu-link')) {
      const sub = element.closest('.menu-sub')
      if (sub) {
        const subMenu = DataUtils.get(sub as HTMLElement, 'menu')
        if (subMenu) {
          return subMenu
        }
      }
    }
    return null
  }

  public static hideAllMenu() {
    const menuItems = document.querySelectorAll('.show.menu-dropdown[data-h-menu-trigger]')
    if (menuItems && menuItems.length > 0) {
      for (let i = 0; i < menuItems.length; i++) {
        const item = menuItems[i] as HTMLElement
        const menuObj = MenuComponent.getInstance(item) as MenuComponent
        if (menuObj && menuObj.getItemSubType(item) === 'dropdown') {
          menuObj.hide(item)
        }
      }
    }
  }

  public static initGlobalHandlers() {
    document.addEventListener('click', (e) => {
      const menuItems = document.querySelectorAll('.show.menu-dropdown[data-h-menu-trigger]')
      if (menuItems && menuItems.length > 0) {
        for (let i = 0; i < menuItems.length; i++) {
          const item = menuItems[i] as HTMLElement
          const menuObj = MenuComponent.getInstance(item) as MenuComponent
          if (menuObj && menuObj.getItemSubType(item) === 'dropdown') {
            const menu = menuObj.getElement()
            const sub = menuObj.getItemSubElement(item) as HTMLElement
            if (item === e.target || item.contains(e.target as HTMLElement)) {
              continue
            }

            if (sub && (sub === e.target || sub.contains(e.target as HTMLElement))) {
              continue
            }
            menuObj.hide(item)
          }
        }
      }
    })

    DOMEventHandlerUtils.on(
      document.body,
      '.menu-item[data-h-menu-trigger="click"]',
      'click',
      function (this: HTMLElement, e: Event) {
        const menu = MenuComponent.getInstance(this) as MenuComponent
        if (menu) {
          return menu._click(this, e)
        }
      }
    )

    DOMEventHandlerUtils.on(
      document.body,
      '.menu-item[data-h-menu-trigger] > .menu-link, [data-h-menu-trigger]:not(.menu-item):not([data-h-menu-trigger="auto"])',
      'click',
      function (this: HTMLElement, e: Event) {
        const menu = MenuComponent.getInstance(this) as MenuComponent
        if (menu) {
          return menu.click(this, e)
        }
      }
    )

    DOMEventHandlerUtils.on(
      document.body,
      '.menu-item:not([data-h-menu-trigger]) > .menu-link',
      'click',
      function (this: HTMLElement, e: Event) {
        e.stopPropagation()
        const menu = MenuComponent.getInstance(this)
        if (menu && menu.link) {
          return menu.link(this, e)
        }
      }
    )

    DOMEventHandlerUtils.on(
      document.body,
      '[data-h-menu-dismiss="true"]',
      'click',
      function (this: HTMLElement, e: Event) {
        const menu = MenuComponent.getInstance(this) as MenuComponent
        if (menu) {
          return menu.dismiss(this, e)
        }
      }
    )

    DOMEventHandlerUtils.on(
      document.body,
      '[data-h-menu-trigger], .menu-sub',
      'mouseover',
      function (this: HTMLElement, e: Event) {
        const menu = MenuComponent.getInstance(this) as MenuComponent
        if (menu && menu.getItemSubType(this) === 'dropdown') {
          return menu.mouseover(this, e)
        }
      }
    )

    DOMEventHandlerUtils.on(
      document.body,
      '[data-h-menu-trigger], .menu-sub',
      'mouseout',
      function (this: HTMLElement, e: Event) {
        const menu = MenuComponent.getInstance(this) as MenuComponent
        if (menu && menu.getItemSubType(this) === 'dropdown') {
          return menu.mouseout(this, e)
        }
      }
    )

    window.addEventListener('resize', () => {
      let timer
      throttle(
        timer,
        () => {
          const elements = document.querySelectorAll('[data-h-menu="true"]')
          elements.forEach((el) => {
            const menu = MenuComponent.getInstance(el as HTMLElement)
            if (menu) {
              menu.update()
            }
          })
        },
        200
      )
    })
  }

  public static createInstances = (selector: string) => {
    document.querySelectorAll(selector).forEach((el) => {
      const menuItem = el as HTMLElement
      let menuInstance = MenuComponent.getInstance(menuItem)
      if (!menuInstance) {
        menuInstance = new MenuComponent(el as HTMLElement, defaultMenuOptions)
      }
    })
  }

  public static reinitialization = () => {
    MenuComponent.createInstances('[data-h-menu="true"]')
    //MenuComponent.hideDropdowns(undefined)
  }

  public static bootstarp = () => {
    MenuComponent.initGlobalHandlers()
    MenuComponent.createInstances('[data-h-menu="true"]')
  }
}

export {MenuComponent, defaultMenuOptions}
