import React from 'react'

type Props = {
    children: React.ReactNode
    title: string
}

const ShopHeaderUserMenuItemSub: React.FC<Props> = ({
    children,
    title
}) => {
    return (
        <div className="menu-item" data-h-menu-trigger="hover"
        data-h-menu-placement="bottom-start">
        <a id="account-dropdown-invoker"
            className="text-white cursor-pointer opacity-50 text-hover-success text-decoration-none fw-bold">{title}</a>

        <ul data-h-menu="true"
            className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold p-3 fs-6 w-275px list-unstyled position-absolute bg-white w-150px mt-5 pb-1 z-index-2">
            {children}
        </ul>
    </div>

    )
}

export { ShopHeaderUserMenuItemSub }