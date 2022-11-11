import React from 'react'

import { ShopCheckoutStepOne } from '../../components/checkout/ShopCheckoutStepOne'
import { ShopCheckoutStepTwo } from '../../components/checkout/ShopCheckoutStepTwo'
import { ShopCheckoutStepThree } from '../../components/checkout/ShopCheckoutStepThree'
import {Product} from "../../models/ShopProductModels";
import {useLocation} from "react-router-dom";

type LocationProps = {
    state: {
        product: Product
        productCount: number
    }
}

const ShopCheckoutPage = () => {
    const location = useLocation() as unknown as LocationProps
    const product = location.state.product
    const productCount = location.state.productCount

    return (
        <>
            <div id="steps" className="bg-white">
                <ShopCheckoutStepOne />
                <ShopCheckoutStepTwo />
                <ShopCheckoutStepThree />
            </div>
        </>
    )
}

export { ShopCheckoutPage }