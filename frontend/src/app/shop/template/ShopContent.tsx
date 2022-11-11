import React from 'react'

type Props = {
    children: React.ReactNode
}

const ShopContent: React.FC<Props> = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}

export { ShopContent }