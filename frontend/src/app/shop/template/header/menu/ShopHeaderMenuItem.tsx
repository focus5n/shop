import React from 'react'
import { useNavigate } from 'react-router-dom';

type Props = {
    title: string,
    mainCategory: string,
    subCategory: string
}

const ShopHeaderMenuItem: React.FC<Props> = ({
    title,
    mainCategory,
    subCategory
}) => {
    const navigate = useNavigate()
    const go = () => {
        navigate('/shop/product', {
            state: {
                mainCategory: mainCategory,
                subCategory: subCategory
            }
        })
    }
    return (
        <div className="menu-link d-block bg-hover-light py-1 px-4" onClick={() => go()}>
            <div className="p-3 text-center">
                <span className="text-hover-success text-black">{title}</span>
            </div>
        </div>
    )
}

export { ShopHeaderMenuItem }