import React from 'react'
import {ShopHeaderUserMenuItemSub} from './menu/ShopHeaderUserMenuItemSub'
import {ShopHeaderMenuItem} from './menu/ShopHeaderMenuItem'
import {ShopHeaderMenuItemSub} from './menu/ShopHeaderMenuItemSub'
import {ShopHeaderUserMenuItem} from './menu/ShopUserMenuItem'
import {Link} from 'react-router-dom'
import {ShopCartComponent} from '../../components/header/ShopCartComponent'
import {ShopUseAuth} from '../../pages/auth/core/ShopAuth'
import {getRandomInt} from '../../../../_h/utils/HUtils'
import {useCartQueryRequest} from "../../helpers/query/request/QueryCartRequestProvider";
import {useLikeQueryRequest} from "../../helpers/query/request/QueryLikeRequestProvider";

const ShopHeader = () => {
    const {currentUser, logout} = ShopUseAuth()
    const {setCart} = useCartQueryRequest()
    const {setLike} = useLikeQueryRequest()
    return (
        <header className="h-header">
            <div className="position-relative border-gray-light-v2 bg-black border-bottom">
                <div className="container">
                    <div className="row justify-content-between align-items-center mx-lg-0">
                        {/*<div className="col-sm-auto">*/}
                        {/*    <ul className="list-inline g-py-14 mb-0">*/}
                        {/*        <li className="list-inline-item">*/}
                        {/*            <a className="text-white text-hover-primary p-1" href="#">*/}
                        {/*                <i className="fa fa-facebook"></i>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*        <li className="list-inline-item">1*/}
                        {/*            <a className="text-white text-hover-primary p-1" href="#">*/}
                        {/*                <i className="fa fa-twitter"></i>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*        <li className="list-inline-item">*/}
                        {/*            <a className="text-white text-hover-primary p-1" href="#">*/}
                        {/*                <i className="fa fa-tumblr"></i>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*        <li className="list-inline-item">*/}
                        {/*            <a className="text-white text-hover-primary p-1" href="#">*/}
                        {/*                <i className="fa fa-pinterest-p"></i>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*        <li className="list-inline-item">*/}
                        {/*            <a className="text-white text-hover-primary p-1" href="#">*/}
                        {/*                <i className="fa fa-google"></i>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</div>*/}

                        <div className="col-sm-auto ps-sm-0 ps-4 py-4 opacity-50 text-white fw-bold">
                            <i className="icon-communication-163 mr-4 align-middle fs-3 me-2"></i>
                            010-xxxx-xxxx
                        </div>

                        <div className="col-sm-auto py-4">
                            {/*<ul className="list-inline mb-0">*/}
                            {/*    <li className="list-inline-item position-relative">*/}
                            {/*        <a href="#"*/}
                            {/*            className="text-white opacity-50 text-hover-primary text-decoration-none fw-bold">나의잔액</a>*/}
                            {/*    </li>*/}
                            {/*    <li className="list-inline-item text-white opacity-25">|</li>*/}
                            {/*    <li className="list-inline-item position-relative">*/}
                            {/*        <a href="#"*/}
                            {/*            className="text-white opacity-50 text-hover-primary text-decoration-none fw-bold">{currentUser?.money}원</a>*/}
                            {/*    </li>*/}
                            {/*</ul>*/}
                        </div>

                        <div className="col-sm-auto py-4">
                            {/*<ul className="list-inline mb-0">*/}
                            {/*    <li className="list-inline-item position-relative">*/}
                            {/*        <a href="#"*/}
                            {/*            className="text-white opacity-50 text-hover-primary text-decoration-none fw-bold">나의잔액</a>*/}
                            {/*    </li>*/}
                            {/*    <li className="list-inline-item text-white opacity-25">|</li>*/}
                            {/*    <li className="list-inline-item position-relative">*/}
                            {/*        <a href="#"*/}
                            {/*            className="text-white opacity-50 text-hover-primary text-decoration-none fw-bold">{currentUser?.money}원</a>*/}
                            {/*    </li>*/}
                            {/*</ul>*/}
                        </div>

                        <div className="col-sm-auto py-4">
                            {/*<ul className="list-inline mb-0">*/}
                            {/*    <li className="list-inline-item position-relative">*/}
                            {/*        <a href="#"*/}
                            {/*            className="text-white opacity-50 text-hover-primary text-decoration-none fw-bold">나의잔액</a>*/}
                            {/*    </li>*/}
                            {/*    <li className="list-inline-item text-white opacity-25">|</li>*/}
                            {/*    <li className="list-inline-item position-relative">*/}
                            {/*        <a href="#"*/}
                            {/*            className="text-white opacity-50 text-hover-primary text-decoration-none fw-bold">{currentUser?.money}원</a>*/}
                            {/*    </li>*/}
                            {/*</ul>*/}
                        </div>

                        <div className="col-sm-auto py-4 flex-grow-1 flex justify-content-end">
                            <ul className="list-inline mb-0">
                                {currentUser && (
                                    <>
                                        <li className="list-inline-item position-relative">
                                    <span
                                        className="text-white opacity-50 text-hover-success text-decoration-none fw-bold">안녕하세요 {currentUser?.name}님</span>
                                        </li>
                                        <li className="list-inline-item text-white opacity-25">|</li>
                                        <li className="list-inline-item position-relative">
                                    <span
                                        className="text-white opacity-50 text-hover-success text-decoration-none fw-bold">나의잔액: {currentUser?.money}원</span>
                                        </li>
                                        <li className="list-inline-item text-white opacity-25">|</li>
                                    </>
                                )

                                }
                                <li className="list-inline-item position-relative">
                                    <ShopHeaderUserMenuItemSub title="마이페이지">
                                        {!currentUser && (
                                            <>
                                                <ShopHeaderUserMenuItem to="/shop/auth/login" title="로그인"/>
                                                <ShopHeaderUserMenuItem to="/shop/auth/register" title="회원가입"/>
                                            </>
                                        )}
                                        {currentUser && (
                                            <>
                                                <ShopHeaderUserMenuItem to="/shop/user/myOrder" title="내 주문"/>
                                                <ShopHeaderUserMenuItem to="/shop/user/cart" title="장바구니"/>
                                                <li onClick={() => {
                                                    logout()
                                                    setCart(getRandomInt())
                                                    setLike(getRandomInt())
                                                }} className="menu-item">
                                                    <span
                                                        className="menu-link d-block text-black fw-lighter text-hover-success text-decoration-none py-2 px-6">로그아웃</span>
                                                </li>
                                            </>
                                        )}
                                    </ShopHeaderUserMenuItemSub>
                                </li>
                            </ul>
                        </div>


                        <div className="col-sm-auto pe-4 pe-sm-0">
                            <ShopCartComponent/>

                            {/*<div className="d-inline-block align-middle cursor-pointer">*/}
                            {/*    <div className="py-5 px-2 ms-3" data-h-menu-trigger="click" data-h-menu-attach="parent"*/}
                            {/*        data-h-menu-placement="bottom-end" data-h-menu-flip="bottom">*/}
                            {/*        <a className="text-white text-hover-success font-size-16 text-decoration-none">*/}
                            {/*            <i className="fs-4 position-relative icon-education-045 h-line-icon-pro"></i>*/}
                            {/*        </a>*/}
                            {/*    </div>*/}

                            {/*    <div data-h-menu="true"*/}
                            {/*        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold p-3 fs-6 w-275px">*/}
                            {/*        <form id="searchform" className="w-100 position-relative">*/}
                            {/*            <div className="input-group align-items-center">*/}
                            {/*                <input className="form-control form-control-flush border border-success" type="text"*/}
                            {/*                    placeholder="검색어를 입력 해주세요" />*/}
                            {/*                <button className="btn btn-success text-uppercase px-3 rounded-0"*/}
                            {/*                    type="submit">검색</button>*/}
                            {/*            </div>*/}
                            {/*        </form>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>


                <div className="bg-white transition-0_3 py-4 navbar navbar-expand-lg">
                    <div className="container justify-content-between">
                        <div className="navbar-brand">
                            <Link to="/shop">
                                <span className="fw-bolder fs-2 text-black">H</span>
                            </Link>
                        </div>
                        <span data-h-hambuger="true" data-h-hambuger-target="#main_menu"
                              className="hamburger hamburger--slider g-pr-0">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </span>

                        <div id="main_menu"
                             className="navbar-collapse collapse align-items-center flex-sm-row pt-3 pt-lg-0">
                            <ul className="navbar-nav">
                                <ShopHeaderMenuItemSub
                                    title="남자">
                                    <ShopHeaderMenuItem
                                        mainCategory='MAN'
                                        subCategory='TOP'
                                        title="상의"/>
                                    <ShopHeaderMenuItem
                                        mainCategory='MAN'
                                        subCategory='PANTS'
                                        title="하의"/>
                                </ShopHeaderMenuItemSub>

                                <ShopHeaderMenuItemSub
                                    title="여자">
                                    <ShopHeaderMenuItem
                                        mainCategory='WOMEN'
                                        subCategory='TOP'
                                        title="상의"/>
                                    <ShopHeaderMenuItem
                                        mainCategory='WOMEN'
                                        subCategory='PANTS'
                                        title="하의"/>

                                </ShopHeaderMenuItemSub>

                                <ShopHeaderMenuItemSub
                                    title="어린이">
                                    <ShopHeaderMenuItem
                                        mainCategory='KIDS'
                                        subCategory='TOP'
                                        title="상의"/>
                                    <ShopHeaderMenuItem
                                        mainCategory='KIDS'
                                        subCategory='PANTS'
                                        title="하의"/>
                                </ShopHeaderMenuItemSub>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </header>
    )
}

export {ShopHeader}