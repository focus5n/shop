import React, {FC, Suspense} from 'react'
import {Outlet, Route, Routes, useLocation} from 'react-router-dom'
import {ShopCartPage} from './ShopCartPage'
import {ShopMyOrderPage} from './ShopMyOrderPage'
import {ShopUserSide} from './side/ShopUserSide'
import TopBarProgress from "react-topbar-progress-indicator";
import {getCSSVariableValue} from '../../../../_h/utils'
import {PageTitle} from '../../../../_h/layout/core/PageData'
import {ShopMyPage} from './ShopMyPage'
import {ShopProductUploadPage} from './ShopProductUploadPage'
import {QueryProductManageResponseProvider} from '../../helpers/query/response/QueryProductManageResponseProvider'
import {ShopProductManagementPage} from './management/product/ShopProductManagementPage'
import {ShopProductModifyPage} from './ShopProductModifyPage'
import {ShopUserManagementPage} from './management/user/ShoUserManagementPage'
import {QueryUserManageResponseProvider} from "../../helpers/query/response/QueryUserResponseProvider";
import {QueryUserManageRequestProvider} from "../../helpers/query/request/QueryUserManageRequestProvider";
import {QueryProductManageRequestProvider} from "../../helpers/query/request/QueryProductManageRequestProvider";
import {QueryOrderManageRequestProvider} from "../../helpers/query/request/QueryOrderManageRequestProvider";
import {QueryOrderManageResponseProvider} from "../../helpers/query/response/QueryOrderManageResponseProvider";

type Props = {
    children: React.ReactNode
}

const ShopUserLayOut = () => {
    const location = useLocation()

    return (
        <>
            <div>
                <div className="bg-white flex-grow-1">
                    <div className="p-8">
                        <div className="container row mx-auto">
                            {location.pathname !== '/shop/user/productUpload' && location.pathname !== '/shop/user/productModify' &&
                                <ShopUserSide/>}
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const ShopUserApp = () => {
    return (
        <Routes>
            <Route element={<ShopUserLayOut/>}>
                <Route
                    path="/cart"
                    element={
                        <SuspendedView>
                            <PageTitle>카트</PageTitle>
                            <ShopCartPage/>
                        </SuspendedView>
                    }/>
                <Route
                    path="/myOrder"
                    element={
                        <SuspendedView>
                            <QueryOrderManageRequestProvider>
                                <QueryOrderManageResponseProvider>
                                    <PageTitle>내 주문</PageTitle>
                                    <ShopMyOrderPage/>
                                </QueryOrderManageResponseProvider>
                            </QueryOrderManageRequestProvider>
                        </SuspendedView>
                    }/>
                <Route
                    path="/myPage"
                    element={
                        <SuspendedView>
                            <PageTitle>내 정보</PageTitle>
                            <ShopMyPage/>
                        </SuspendedView>
                    }/>
                <Route
                    path="/userlist"
                    element={
                        <QueryUserManageRequestProvider>
                            <QueryUserManageResponseProvider>
                                <SuspendedView>
                                    <PageTitle>회원관리</PageTitle>
                                    <ShopUserManagementPage/>
                                </SuspendedView>
                            </QueryUserManageResponseProvider>
                        </QueryUserManageRequestProvider>
                    }/>
                <Route
                    path="/productUpload"
                    element={
                        <SuspendedView>
                            <PageTitle>상품등록</PageTitle>
                            <ShopProductUploadPage/>
                        </SuspendedView>
                    }/>
                <Route
                    path="/productManagement"
                    element={
                        <QueryProductManageRequestProvider>
                            <QueryProductManageResponseProvider>
                                <SuspendedView>
                                    <PageTitle>상품관리</PageTitle>
                                    <ShopProductManagementPage/>
                                </SuspendedView>
                            </QueryProductManageResponseProvider>
                        </QueryProductManageRequestProvider>
                    }/>
                <Route
                    path="/productModify"
                    element={
                        <SuspendedView>
                            <PageTitle>상품수정</PageTitle>
                            <ShopProductModifyPage/>
                        </SuspendedView>
                    }/>
            </Route>
        </Routes>
    )
}

const SuspendedView: FC<Props> = ({children}) => {
    const baseColor = getCSSVariableValue('--bs-primary')
    TopBarProgress.config({
        barColors: {
            '0': baseColor,
        },
        barThickness: 1,
        shadowBlur: 5,
    })
    return <Suspense fallback={<TopBarProgress/>}>{children}</Suspense>
}

export {ShopUserApp}