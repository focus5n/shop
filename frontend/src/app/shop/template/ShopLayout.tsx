import React from 'react'
import {Outlet} from 'react-router-dom'
import {PageDataProvider} from '../../../_h/layout/core/PageData'
import {ShopHeader} from './header/ShopHeader'
import {ShopContent} from './ShopContent'
import {ShopFooter} from './footer/ShopFooter'
import {ShopBreadCrumb} from './breadcrumb/ShopBreadCrumb'
import '../../../_h/assets/sass/shop.scss'
import {QueryCartResponseProvider} from '../helpers/query/response/QueryCartResponseProvider'
import {QueryCartRequestProvider} from '../helpers/query/request/QueryCartRequestProvider'
import {QueryUserStateRequestProvider} from "../helpers/query/request/QueryUserStateRequestProvider";
import {QueryUserStateResponseProvider} from "../helpers/query/response/QueryUserStateResponseProvider";

const ShopLayout = () => {
    return (
        <PageDataProvider>
            <QueryUserStateRequestProvider>
                <QueryUserStateResponseProvider>
                    <QueryCartRequestProvider>
                        <QueryCartResponseProvider>
                            <ShopHeader/>
                            <ShopContent>
                                <ShopBreadCrumb/>
                                <Outlet/>
                            </ShopContent>
                            <ShopFooter/>
                        </QueryCartResponseProvider>
                    </QueryCartRequestProvider>
                </QueryUserStateResponseProvider>
            </QueryUserStateRequestProvider>
        </PageDataProvider>
    )
}

export {ShopLayout}