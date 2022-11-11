import React, {FC, Suspense} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import {PageTitle} from '../../_h/layout/core/PageData';
import {getCSSVariableValue} from '../../_h/utils';
import TopBarProgress from "react-topbar-progress-indicator";
import {ShopLayout} from '../shop/template/ShopLayout';
import {ShopMainPage} from '../shop/pages/ShopMainPage';
import {ShopLoginPage} from '../shop/pages/auth/ShopLoginPage';
import {ShopRegisterPage} from '../shop/pages/auth/ShopRegisterPage';
import {ShopProductListPage} from '../shop/pages/product/ShopProductListPage';
import {ShopProductDetailPage} from '../shop/pages/product/ShopProductDetailPage';
import {ShopCheckoutPage} from '../shop/pages/product/ShopCheckoutPage';
import {ShopUserApp} from '../shop/pages/user/ShopUserApp';
import {ShopUseAuth} from '../shop/pages/auth/core/ShopAuth';
import {
    QueryProductCategoryResponseProvider
} from '../shop/helpers/query/response/QueryProductCategoryResponseProvider';
import {QueryProductCategoryRequestProvider} from '../shop/helpers/query/request/QueryProductCategoryRequestProvider';
import {QueryLikeRequestProvider} from "../shop/helpers/query/request/QueryLikeRequestProvider";
import {QueryLikeResponseProvider} from "../shop/helpers/query/response/QueryLikeResponseProvider";
import {QueryReviewRequestProvider} from "../shop/helpers/query/request/QueryReviewRequestProvider";
import {QueryReviewResponseProvider} from "../shop/helpers/query/response/QueryReviewResponseContextProps";
import {QueryBestRequestProvider} from "../shop/helpers/query/request/QueryBestRequestProvider";
import {QueryBestResponseProvider} from "../shop/helpers/query/response/QueryBestResponseProvider";

type Props = {
    children: React.ReactNode
}

const ShopRoutes = () => {
    const {currentUser} = ShopUseAuth()
    return (
        <Routes>
            <Route element={<ShopLayout/>}>
                {!currentUser ? (
                    <>
                        <Route
                            path="/auth/login"
                            element={
                                <SuspendedView>
                                    <PageTitle>로그인</PageTitle>
                                    <ShopLoginPage/>
                                </SuspendedView>
                            }/>
                        <Route
                            path="/auth/register"
                            element={
                                <SuspendedView>
                                    <PageTitle>회원가입</PageTitle>
                                    <ShopRegisterPage/>
                                </SuspendedView>
                            }/>
                    </>
                ) : (
                    <>
                        <Route path='/auth/*' element={<Navigate to='/shop'/>}/>
                    </>
                )}
                <Route
                    path="/"
                    element={
                        <SuspendedView>
                            <QueryBestRequestProvider>
                                <QueryBestResponseProvider>
                                    <PageTitle>메인페이지</PageTitle>
                                    <ShopMainPage/>
                                </QueryBestResponseProvider>
                            </QueryBestRequestProvider>
                        </SuspendedView>
                    }/>
                <Route
                    path="/product"
                    element={
                        <SuspendedView>
                            <QueryLikeRequestProvider>
                                <QueryLikeResponseProvider>
                                    <QueryProductCategoryRequestProvider>
                                        <QueryProductCategoryResponseProvider>
                                            <PageTitle>상품 리스트</PageTitle>
                                            <ShopProductListPage/>
                                        </QueryProductCategoryResponseProvider>
                                    </QueryProductCategoryRequestProvider>
                                </QueryLikeResponseProvider>
                            </QueryLikeRequestProvider>
                        </SuspendedView>
                    }/>
                <Route
                    path="/productDetail"
                    element={
                        <SuspendedView>
                            <QueryProductCategoryRequestProvider>
                                <QueryProductCategoryResponseProvider>
                                    <QueryReviewRequestProvider>
                                        <QueryReviewResponseProvider>
                                            <PageTitle>상품</PageTitle>
                                            <ShopProductDetailPage/>
                                        </QueryReviewResponseProvider>
                                    </QueryReviewRequestProvider>
                                </QueryProductCategoryResponseProvider>
                            </QueryProductCategoryRequestProvider>
                        </SuspendedView>
                    }/>

                <Route
                    path="/checkout"
                    element={
                        <SuspendedView>
                            <PageTitle>체크아웃</PageTitle>
                            <ShopCheckoutPage/>
                        </SuspendedView>
                    }/>

                {currentUser ? (
                    <>
                        <Route path="/user/*" element={<ShopUserApp/>}/>
                    </>
                ) : (
                    <>
                        <Route path='/user/*' element={<Navigate to='/shop'/>}/>
                        <Route path='/shop/user/productUpload' element={<Navigate to='/shop'/>}/>
                    </>
                )}
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

export {ShopRoutes};
