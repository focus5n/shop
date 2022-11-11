

import { DataUtils } from './utils/DataUtils.js'
import { DOMEventHandlerUtils } from './utils/DOMEventHandlerUtils.js'
import {
    getAttributeValueByBreakpoint,
    getElementChild,
    getHighestZindex,
    insertAfterElement,
    slideDown,
    slideUp,
    throttle
} from './utils/DomUtils.js'
import { ElementStyleUtils } from './utils/ElementStyleUtils.js'
import { EventHandlerUtils } from './utils/EventHandlerUtils.js'
import { getElementParents } from './utils/DomUtils.js'
import { getUniqueIdWithPrefix } from './utils/TypeUtils.js'

const defaultMenuOptions = {
    dropdown: {
        hoverTimeout: 200,
        zindex: 105,
    },
    accordion: {
        slideSpeed: 250,
        expand: false,
    },
}

class MenuComponent {
    element
    options
    instanceUid
    triggerElement = null

    constructor(_element, options) {
        this.element = _element
        this.options = Object.assign(defaultMenuOptions, options)
        this.instanceUid = getUniqueIdWithPrefix('menu')
        this._setTriggerElement()
        this._update()
        DataUtils.set(this.element, 'menu', this)
        return this
    }

    _setTriggerElement = () => {
        const target = document.querySelector(
            `[data-h-menu-target="#${this.element.getAttribute('id')}]`
        )

        if (target) {
            this.triggerElement = target
        } else if (this.element.closest('[data-h-menu-trigger')) {
            this.triggerElement = this.element.closest('[data-h-menu-trigger')
        } else if (
            this.element.parentNode &&
            getElementChild(this.element.parentNode, '[data-h-menu-trigger]')
        ) {
            const child = getElementChild(this.element.parentNode, '[data-h-menu-trigger]')
            if (child) {
                this.triggerElement = child
            }
        }

        if (this.triggerElement) {
            DataUtils.set(this.triggerElement, 'menu', this)
        }
    }

    _isTriggerElement = (item) => {
        return this.triggerElement === item
    }

    _getItemElement = (_element) => {
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
            const subItem = DataUtils.get(sub, 'item')
            if (subItem) {
                return subItem
            }
        }
    }

    _getItemParentElement = (item) => {
        const sub = item.closest('.menu-sub')
        if (!sub) {
            return null
        }

        const subItem = DataUtils.get(sub, 'item')
        if (subItem) {
            return subItem
        }

        const parentItem = sub.closest('.menu-item[data-h-menu-trigger]')
        if (sub && parentItem) {
            return parentItem
        }

        return null
    }

    _getItemParentElements = (item) => {
        const parents = []
        let parent
        let i = 0
        let buffer = item

        do {
            parent = this._getItemParentElement(buffer)
            if (parent) {
                parents.push(parent)
                buffer = parent
            }
            i += 1
        } while (parent !== null && i < 20)

        if (this.triggerElement) {
            parents.unshift(this.triggerElement)
        }
        return parents
    }

    _getDropdownPopperConfig = (item) => {
        const placementOption = this._getItemOption(item, 'placement')
        let placement = 'right'
        if (placementOption) {
            placement = placementOption
        }

        const offsetValue = this._getItemOption(item, 'offset')
        const offset = offsetValue ? offsetValue.toString().split(',') : []

        const strategy =
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

    _getItemChildElement = (item) => {
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

    _getItemChildElements = (item) => {
        const children = []
        let child
        let i = 0
        let buffer = item
        do {
            child = this._getItemChildElement(buffer)
            if (child) {
                children.push(child)
                buffer = child
            }

            i += 1
        } while (child !== null && i < 20)

        return children
    }

    _getItemSubElement = (item) => {
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

    _getCss = (el, styleProp) => {
        const defaultView = (el.ownerDocument || document).defaultView
        if (!defaultView) {
            return ''
        }

        styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase()

        return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp)
    }

    _getItemSubType = (element) => {
        const sub = this._getItemSubElement(element)
        if (sub && parseInt(this._getCss(sub, 'z-index')) > 0) {
            return 'dropdown'
        } else {
            return 'accordion'
        }
    }

    _isItemSubShown = (item) => {
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

    _getItemOption = (item, name) => {
        let value = null
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

    _isItemDropdownPermanent = (item) => {
        return this._getItemOption(item, 'permanent') === true
    }

    _isItemParentShown = (item) => {
        return getElementParents(item, '.menu-item.show').length > 0
    }

    _isItemSubElement = (item) => {
        return item.classList.contains('menu-sub')
    }

    _hasItemSub = (item) => {
        return item.classList.contains('menu-item') && item.hasAttribute('data-h-menu-trigger')
    }

    _getItemLinkElement = (item) => {
        return getElementChild(item, '.menu-link')
    }

    _getItemToggleElement = (item) => {
        if (this.triggerElement) {
            return this.triggerElement
        }

        return this._getItemLinkElement(item)
    }

    _showDropdown = (item) => {
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
            ElementStyleUtils.set(sub, 'z-index', zindex)
        }

        if (width) {
            ElementStyleUtils.set(sub, 'width', width)
        }

        if (height) {
            ElementStyleUtils.set(sub, 'height', height)
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

    initDropdownPopper = (item, sub) => {
        let reference
        const attach = this._getItemOption(item, 'attach')

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
            const popper = Popper.createPopper(
                reference,
                sub,
                this._getDropdownPopperConfig(item)
            )

            DataUtils.set(item, 'popper', popper)
        }
    }

    _hideDropdown = (item) => {
        if (EventHandlerUtils.trigger(this.element, 'h.menu.dropdown.hide') === false) {
            return
        }

        const sub = this._getItemSubElement(item)

        ElementStyleUtils.set(sub, 'z-index', '')
        ElementStyleUtils.set(sub, 'width', '')
        ElementStyleUtils.set(sub, 'height', '')
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

    destroyDropdownPopper = (item) => {
        if (DataUtils.has(item, 'popper') === true) {
            DataUtils.get(item, 'popper').destroy()
            DataUtils.remove(item, 'popper')
        }

        EventHandlerUtils.trigger(this.element, 'h.menu.dropdown.hidden')
    }

    _showAccordion = (item) => {
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
            const sub = subElement
            slideDown(sub, this.options.accordion.slideSpeed, () => {
                item.classList.remove('showing')
                item.classList.add('show')
                sub.classList.add('show')
                EventHandlerUtils.trigger(this.element, 'h.menu.accordion.shown')
            })
        }
    }

    _hideAccordion = (item) => {
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

    _hideAccordions = (item) => {
        const itemsToHide = this.element.querySelectorAll('.show[data-h-menu-trigger]')
        if (itemsToHide && itemsToHide.length > 0) {
            for (var i = 0, len = itemsToHide.length; i < len; i++) {
                const itemToHide = itemsToHide[i]

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

    _reset = (item) => {
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

    _destroy = () => { }

    _update = () => {
        const items = this.element.querySelectorAll('.menu-item[data-h-menu-trigger]')
        items.forEach((el) => this._reset(el))
    }

    _hide = (item) => {
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

    _show = (item) => {
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

    _click = (element, e) => {
        e.preventDefault()
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

    _toggle = (item) => {
        if (!item) {
            return
        }

        if (this._isItemSubShown(item) === true) {
            this._hide(item)
        } else {
            this._show(item)
        }
    }

    _mouseout = (element, e) => {
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

    _mouseover = (element, e) => {
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

    _dismiss = (element, e) => {
        const item = this._getItemElement(element)
        const items = this._getItemChildElements(item)
        const itemSubType = this._getItemSubType(item)
        if (item !== null && itemSubType === 'dropdown') {
            this._hide(item)

            if (items.length > 0) {
                for (let i = 0, len = items.length; i < len; i++) {
                    if (items[i] !== null && this._getItemSubType(items[i]) === 'dropdown') {
                        this._hide(items[i])
                    }
                }
            }
        }
    }

    _link = (element, e) => {
        if (EventHandlerUtils.trigger(this.element, 'h.menu.link.click') === false) {
            return
        }

        MenuComponent.hideDropdowns(undefined)
        EventHandlerUtils.trigger(this.element, 'h.menu.link.clicked')
    }

    click = (element, e) => {
        return this._click(element, e)
    }

    link = (element, e) => {
        return this._link(element, e)
    }

    dismiss = (element, e) => {
        return this._dismiss(element, e)
    }

    mouseover = (element, e) => {
        return this._mouseover(element, e)
    }

    mouseout = (element, e) => {
        return this._mouseout(element, e)
    }

    getItemTriggerType = (item) => {
        return this._getItemOption(item, 'trigger')
    }

    getItemSubType = (element) => {
        return this._getItemSubType(element)
    }

    show = (item) => {
        return this._show(item)
    }

    hide = (item) => {
        return this._hide(item)
    }

    reset = (item) => {
        return this._reset(item)
    }

    update = () => {
        return this._update()
    }

    getElement = () => {
        return this.element
    }

    getItemLinkElement = (item) => {
        return this._getItemLinkElement(item)
    }

    getItemToggleElement = (item) => {
        return this._getItemToggleElement(item)
    }

    getItemSubElement = (item) => {
        return this._getItemSubElement(item)
    }

    getItemParentElements = (item) => {
        return this._getItemParentElements(item)
    }

    isItemSubShown = (item) => {
        return this._isItemSubShown(item)
    }

    isItemParentShown = (item) => {
        return this._isItemParentShown(item)
    }

    getTriggerElement = () => {
        return this.triggerElement
    }

    isItemDropdownPermanent = (item) => {
        return this._isItemDropdownPermanent(item)
    }

    // Accordion Mode Methods
    hideAccordions = (item) => {
        return this._hideAccordions(item)
    }

    // Event API
    on = (name, handler) => {
        return EventHandlerUtils.on(this.element, name, handler)
    }

    one = (name, handler) => {
        return EventHandlerUtils.one(this.element, name, handler)
    }

    off = (name) => {
        return EventHandlerUtils.off(this.element, name)
    }

    static hideDropdowns = (skip) => {
        const items = document.querySelectorAll('.show.menu-dropdown[data-h-menu-trigger]')

        if (items && items.length > 0) {
            for (let i = 0, len = items.length; i < len; i++) {
                const item = items[i]
                const menu = MenuComponent.getInstance(item)

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

    static updateDropdowns = () => {
        const items = document.querySelectorAll('.show.menu-dropdown[data-h-menu-trigger]')
        if (items && items.length > 0) {
            for (var i = 0, len = items.length; i < len; i++) {
                var item = items[i]
                if (DataUtils.has(item, 'popper')) {
                    DataUtils.get(item, 'popper').forceUpdate()
                }
            }
        }
    }

    static getInstance = (element) => {
        const elementMenu = DataUtils.get(element, 'menu')
        if (elementMenu) {
            return elementMenu
        }

        const menu = element.closest('.menu')

        if (menu) {
            const menuData = DataUtils.get(menu, 'menu')
            if (menuData) {
                return menuData
            }
        }

        if (element.classList.contains('menu-link')) {
            const sub = element.closest('.menu-sub')
            if (sub) {
                const subMenu = DataUtils.get(sub, 'menu')
                if (subMenu) {
                    return subMenu
                }
            }
        }
        return null
    }

    static initGlobalHandlers() {

        document.addEventListener('click', (e) => {
            const menuItems = document.querySelectorAll('.show.menu-dropdown[data-h-menu-trigger]')
            if (menuItems && menuItems.length > 0) {
                for (let i = 0; i < menuItems.length; i++) {
                    const item = menuItems[i]
                    const menuObj = MenuComponent.getInstance(item)
                    if (menuObj && menuObj.getItemSubType(item) === 'dropdown') {
                        const menu = menuObj.getElement()
                        const sub = menuObj.getItemSubElement(item)
                        if (item === e.target || item.contains(e.target)) {
                            continue
                        }

                        if (sub && (sub === e.target || sub.contains(e.target))) {
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
            function (e) {
                const menu = MenuComponent.getInstance(this)
                if (menu) {
                    return menu._click(this, e)
                }
            }
        )

        DOMEventHandlerUtils.on(
            document.body,
            '.menu-item[data-h-menu-trigger] > .menu-link, [data-h-menu-trigger]:not(.menu-item):not([data-h-menu-trigger="auto"])',
            'click',
            function (e) {
                const menu = MenuComponent.getInstance(this)
                if (menu) {
                    return menu.click(this, e)
                }
            }
        )

        DOMEventHandlerUtils.on(
            document.body,
            '.menu-item:not([data-h-menu-trigger]) > .menu-link',
            'click',
            function (e) {
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
            function (e) {
                const menu = MenuComponent.getInstance(this)
                if (menu) {
                    return menu.dismiss(this, e)
                }
            }
        )

        DOMEventHandlerUtils.on(
            document.body,
            '[data-h-menu-trigger], .menu-sub',
            'mouseover',
            function (e) {
                const menu = MenuComponent.getInstance(this)
                if (menu && menu.getItemSubType(this) === 'dropdown') {
                    return menu.mouseover(this, e)
                }
            }
        )

        DOMEventHandlerUtils.on(
            document.body,
            '[data-h-menu-trigger], .menu-sub',
            'mouseout',
            function (e) {
                const menu = MenuComponent.getInstance(this)
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
                        const menu = MenuComponent.getInstance(el)
                        if (menu) {
                            menu.update()
                        }
                    })
                },
                200
            )
        })
    }

    static createInstances = (selector) => {
        document.querySelectorAll(selector).forEach((el) => {
            const menuItem = el
            let menuInstance = MenuComponent.getInstance(menuItem)
            if (!menuInstance) {
                menuInstance = new MenuComponent(el, defaultMenuOptions)
            }
        })
    }

    static reinitialization = () => {
        MenuComponent.createInstances('[data-h-menu="true"]')
    }

    static bootstarp = () => {
        MenuComponent.initGlobalHandlers()
        MenuComponent.createInstances('[data-h-menu="true"]')
    }
}

MenuComponent.bootstarp()
MenuComponent.reinitialization()
