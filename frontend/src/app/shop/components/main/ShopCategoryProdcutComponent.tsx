import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { HIMG } from '../../../../_h/helpers/components/HIMG'

type Props = {
    mainCategory:string
    subCategory:string
    path: string
    title: string
}

const ShopCategoryProductComponent: React.FC<Props> = ({
    mainCategory,
    subCategory,
    path,
    title
}) => {
    const navigate = useNavigate();
    const to = () => {
        navigate('/shop/product', {
            state: {
                mainCategory: mainCategory,
                subCategory: subCategory
            }
        })
    }

    return (
        <>
            <div onClick={to}>
                <HIMG className="w-100 position-relative m-0 overflow-hidden mw-100" path={path}/>
                <div className="position-absolute" style={{ bottom: "2rem", left: "2rem" }}>
                    <span className="d-block text-black">Collections</span>
                    <h2 className="h1 mb-0">{title}</h2>
                </div>
            </div>
        </>
    )
}

export { ShopCategoryProductComponent }