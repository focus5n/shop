import React from 'react'

type Props = {
    children: React.ReactNode
    title: string
}

const ShopHeaderMenuItemSub: React.FC<Props> = ({
    children,
    title
}) => {
    return (
        <div>
            <li className="nav-item hs-has-sub-menu mx-lg-3 mx-lg-4">
                <a id="nav-link--home" data-h-menu-trigger="click" data-h-menu-placement="bottom-end"
                    className="menu-item nav-link cursor-pointer text-uppercase text-black text-hover-success px-1 py-6" >
                    {title}
                </a>
                <div data-h-menu="true"
                    className="menu menu-item menu-sub menu-sub-dropdown menu-colum menu-gray-600 rounded-0 menu-state-bg menu-state-primary fw-bold fs-6 menu-w">
                    {children}
                </div>
            </li>
        </div>

    )
}

export { ShopHeaderMenuItemSub }