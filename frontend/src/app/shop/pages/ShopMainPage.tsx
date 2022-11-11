import React, {useMemo} from 'react'
import { ShopCategoryProductComponent } from '../components/main/ShopCategoryProdcutComponent'
import {useBestQueryResponseData} from "../helpers/query/response/QueryBestResponseProvider";
import {Product} from "../models/ShopProductModels";
import {useNavigate} from "react-router-dom";
import {productGet} from "../api/ShopProductApi";

const ShopMainPage = () => {
    const data = useBestQueryResponseData() as Product
    const best = useMemo(() => data, [data])

    const navigate = useNavigate();

    const to = async (productId: number) => {
        const {data: product} = await productGet(productId)
        navigate('/shop/productDetail', {
            state: {
                product: product
            }
        })
    }

    return (
        <div>
            <div className="container py-4">
                <div className="row align-items-center bg-white py-2">
                    <div className="col-md-4">
                        <div className="text-center">
                            <div className="mb-4">
                                <h1 className="fs-2hx">{best.name}</h1>
                                <p>추천을 가장 많이 받은 상품 입니다</p>
                            </div>
                            <div className="mb-4">
                                <span className="fw-bold text-success fs-2hx">{best.price}원</span>
                            </div>
                        </div>

                        {/*<div>*/}
                        {/*    <div className="border-top border-bottom border-gray-light-v2 py-3">*/}
                        {/*        <button className="accordion-button fs-6 fw-bold collapsed px-0 py-1 text-dark-v2" type="button"*/}
                        {/*            data-h-accordion="true"*/}
                        {/*            data-h-accordion-target="#details">Details</button>*/}
                        {/*    </div>*/}

                        {/*    <div id="details" className="accordion-collapse collapse">*/}
                        {/*        <div className="py-0 text-dark-v2">*/}
                        {/*            <p>Our Team Is Adidas</p>*/}
                        {/*            <p className="mb-0">This Product Is Best</p>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div*/}
                        {/*    className="flex justify-content-between align-items-center border-top border-bottom border-gray-light-v2 py-3">*/}
                        {/*    <div className="fw-bold collapsed px-0 py-1 text-dark-v2">*/}
                        {/*        Size*/}
                        {/*    </div>*/}

                        {/*    <div>*/}
                        {/*        <label className="position-relative me-6">*/}
                        {/*            <input name="size" type="radio" className="position-absolute start-100 bottom-100 hidden" />*/}
                        {/*            <span className="text-primary-checked cursor-pointer">S</span>*/}
                        {/*        </label>*/}

                        {/*        <label className="position-relative me-6">*/}
                        {/*            <input name="size" type="radio" className="position-absolute start-100 bottom-100 hidden" />*/}
                        {/*            <span className="text-primary-checked cursor-pointer">M</span>*/}
                        {/*        </label>*/}

                        {/*        <label className="position-relative me-6">*/}
                        {/*            <input name="size" type="radio" className="position-absolute start-100 bottom-100 hidden" />*/}
                        {/*            <span className="text-primary-checked cursor-pointer">L</span>*/}
                        {/*        </label>*/}

                        {/*        <label className="position-relative">*/}
                        {/*            <input name="size" type="radio" className="position-absolute start-100 bottom-100 hidden" />*/}
                        {/*            <span className="text-primary-checked cursor-pointer">XL</span>*/}
                        {/*        </label>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div*/}
                        {/*    className="flex align-content-center justify-content-between border-top border-bottom border-gray-light-v2 py-3">*/}
                        {/*    <div className="fw-bold collapsed px-0 py-1 text-dark-v2">*/}
                        {/*        Quantity*/}
                        {/*    </div>*/}

                        {/*    <div className="flex align-items-center">*/}
                        {/*        <div>*/}
                        {/*            <input style={{ width: "40px" }} className="form-control p-0 py-1 text-center rounded-0 me-2" type="text" readOnly*/}
                        {/*                value="1" />*/}
                        {/*        </div>*/}
                        {/*        <div>*/}
                        {/*            <i className="text-hover-success fa fa-angle-up me-3"></i>*/}
                        {/*            <i className="text-hover-success fa fa-angle-down"></i>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className="flex justify-content-center my-8">*/}
                        {/*    <button onClick={() => to(best.id)} className="btn btn-success w-150px">구매하러 가기</button>*/}
                        {/*</div>*/}
                    </div>

                    <div className="col-md-8">
                        <div className="bgi-size-cover bgi-position-center"
                            style={{ backgroundImage: `url(${best.img})`, height: "600px" }}>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-bottom bg-white">
                <div className="container py-8">
                    <div className="row justify-content-center">
                        <div className="col-md-4 mx-auto py-4">
                            <div className="d-flex align-items-center px-14">
                                <i
                                    className="d-flex text-black fs-1 position-relative me-6 h-line-icon-pro icon-real-estate-048"></i>
                                <div>
                                    <span className="d-block fw-bolder text-uppercase">무료배송</span>
                                    <span className="d-block text-gray-400">In 2-3 Days</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mx-auto py-4">
                            <div className="d-flex align-items-center px-14">
                                <i
                                    className="d-flex text-black fs-1 position-relative me-6 h-line-icon-pro icon-real-estate-040"></i>
                                <div>
                                    <span className="d-block fw-bolder text-uppercase">무료 환불</span>
                                    <span className="d-block text-gray-400">No Questions Asked</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mx-auto py-4">
                            <div className="d-flex align-items-center px-14">
                                <i
                                    className="d-flex text-black fs-1 position-relative me-6 h-line-icon-pro icon-hotel-restaurant-062"></i>
                                <div>
                                    <span className="d-block fw-bolder text-uppercase">24시 운영</span>
                                    <span className="d-block text-gray-400">All days</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="">
                <div className="container py-20">
                    <div className="row">
                        <div className="col-sm-6 col-md-4 px-3 mb-8 position-relative cursor-pointer">
                            <ShopCategoryProductComponent mainCategory="MAN" subCategory="TOP" title="Man" path="/media/imgs/shop/product/shoes.jpg" />
                        </div>

                        <div className="col-sm-6 col-md-4 px-3 mb-8 position-relative cursor-pointer">
                            <ShopCategoryProductComponent mainCategory="WOMEN" subCategory="TOP" title="Women" path="/media/imgs/shop/product/shoes.jpg" />
                        </div>

                        <div className="col-sm-6 col-md-4 px-3 mb-8 position-relative cursor-pointer">
                            <ShopCategoryProductComponent mainCategory="KIDS" subCategory="TOP" title="Kids" path="/media/imgs/shop/product/shoes.jpg" />
                        </div>
                    </div>
                </div>
            </div>

            {/*<div className="bg-secondary position-relative">*/}
            {/*    <div className="container py-20">*/}
            {/*        <div className="row justify-content-between align-items-center">*/}
            {/*            <div className="col-md-4 mb-8">*/}
            {/*                <div id="comming-info" className="mb-8">*/}
            {/*                    <h1 className="text-success font-weight-400 fs-2tx mb-0">Shoes</h1>*/}
            {/*                    <h2 className="text-black font-weight-300 fs-5tx lh-1 mb-6">Gloves</h2>*/}
            {/*                    <p className="text-gray-400 fs-6">*/}
            {/*                        We want to create a range of beautiful,*/}
            {/*                        parctical and modern outerwear*/}
            {/*                    </p>*/}
            {/*                </div>*/}

            {/*                <div className="btn btn-success fs-3 text-uppercase py-3 px-7 mb-10">SHOP NOW</div>*/}

            {/*                <div className="text-uppercase">*/}
            {/*                    <div className="text-black">*/}
            {/*                        <div className="d-inline-block me-3">*/}
            {/*                            <div className="text-danger font-weight-400 fs-3">00</div>*/}
            {/*                            <div className="text-gray-600 font-weight-300">DAYS</div>*/}
            {/*                        </div>*/}
            {/*                        <div className="d-inline-block align-top me-3 mt-1">*/}
            {/*                            :*/}
            {/*                        </div>*/}
            {/*                        <div className="d-inline-block me-3">*/}
            {/*                            <div className="text-dark font-weight-400 fs-3">00</div>*/}
            {/*                            <div className="text-gray-600 font-weight-300">HOURS</div>*/}
            {/*                        </div>*/}
            {/*                        <div className="d-inline-block align-top me-3 mt-1">*/}
            {/*                            :*/}
            {/*                        </div>*/}
            {/*                        <div className="d-inline-block me-3">*/}
            {/*                            <div className="text-dark font-weight-400 fs-3">00</div>*/}
            {/*                            <div className="text-gray-600 font-weight-300">MINUTES</div>*/}
            {/*                        </div>*/}
            {/*                        <div className="d-inline-block align-top me-3 mt-1">*/}
            {/*                            :*/}
            {/*                        </div>*/}
            {/*                        <div className="d-inline-block">*/}
            {/*                            <div className="text-dark font-weight-400 fs-3">00</div>*/}
            {/*                            <div className="text-gray-600 font-weight-300">SECONDS</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div className="col-md-8 col-lg-6 mb-8">*/}
            {/*                <div id="comming-image" className="position-relative">*/}
            {/*                    <img className="img-fluid w-100"*/}
            {/*                        src="https://assets.adidas.com/images/w_600,f_auto,q_auto/ce8a6f3aa6294de988d7abce00c4e459_9366/Breaknet_Shoes_White_FX8707_01_standard.jpg" />*/}
            {/*                    <div style={{ top: "7rem", width: "85px", height: "85px" }}*/}
            {/*                        className="h-icon-v1 border-3 text-white position-absolute fs-2 border-white bg-success rounded-circle text-center">*/}
            {/*                        <span className="position-absolute top-50 start-50 translate-middle">60$</span>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className="bg-white">*/}
            {/*    <div className="container py-20">*/}
            {/*        <div className="text-center mx-auto mw-600px mb-14">*/}
            {/*            <h2 className="text-black mb-6">New Arrivals</h2>*/}
            {/*            <p className="text-gray-600 font-weight-400">*/}
            {/*                We want to create a range fo beautiful*/}
            {/*            </p>*/}
            {/*        </div>*/}

            {/*        <div className="row mb-14">*/}
            {/*            <div className="col-md-6 col-lg-4 px-3">*/}
            {/*                <div className="d-flex flex-grow-1 align-items-center border border-gray-200 bg-white p-3 mb-6">*/}
            {/*                    <div className="mw-100px me-6">*/}
            {/*                        <img className="d-flex w-100"*/}
            {/*                            src="https://assets.adidas.com/images/w_600,f_auto,q_auto/ce8a6f3aa6294de988d7abce00c4e459_9366/Breaknet_Shoes_White_FX8707_01_standard.jpg" />*/}
            {/*                    </div>*/}
            {/*                    <div className="flex-grow-1">*/}
            {/*                        <a href="#">*/}
            {/*                            <h4 className="h5 mb-2 text-hover-success">Adidas</h4>*/}
            {/*                        </a>*/}
            {/*                        <a href="#" className="d-inline-block text-gray-400 text-hover-success fs-4 mb-3">Shoes</a>*/}
            {/*                        <div className="d-flex flex-grow-1 justify-content-between align-items-center fs-4">*/}
            {/*                            <div className="text-black lh-1">$22</div>*/}
            {/*                            <div className="d-flex justify-content-end lh-1">*/}
            {/*                                <div className="border-end border-gray-300 pe-3 me-2 py-0">*/}
            {/*                                    <a className="text-white text-hover-success text-decoration-none p-0" href="#">*/}
            {/*                                        <i className="icon-finance-100 h-line-icon-pro"></i>*/}
            {/*                                    </a>*/}
            {/*                                </div>*/}

            {/*                                <a className="text-white text-hover-success text-decoration-none" href="#">*/}
            {/*                                    <i className="icon-medical-022 h-line-icon-pro"></i>*/}
            {/*                                </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div className="col-md-6 col-lg-4 px-3">*/}
            {/*                <div className="d-flex flex-grow-1 align-items-center border border-gray-200 bg-white p-3 mb-6">*/}
            {/*                    <div className="mw-100px me-6">*/}
            {/*                        <img className="d-flex w-100"*/}
            {/*                            src="https://assets.adidas.com/images/w_600,f_auto,q_auto/ce8a6f3aa6294de988d7abce00c4e459_9366/Breaknet_Shoes_White_FX8707_01_standard.jpg" />*/}
            {/*                    </div>*/}
            {/*                    <div className="flex-grow-1">*/}
            {/*                        <a href="#">*/}
            {/*                            <h4 className="h5 mb-2 text-hover-success">Adidas</h4>*/}
            {/*                        </a>*/}
            {/*                        <a href="#" className="d-inline-block text-gray-400 text-hover-success fs-4 mb-3">Shoes</a>*/}
            {/*                        <div className="d-flex flex-grow-1 justify-content-between align-items-center fs-4">*/}
            {/*                            <div className="text-black lh-1">$22</div>*/}
            {/*                            <div className="d-flex justify-content-end lh-1">*/}
            {/*                                <div className="border-end border-gray-300 pe-3 me-2 py-0">*/}
            {/*                                    <a className="text-white text-hover-success text-decoration-none p-0" href="#">*/}
            {/*                                        <i className="icon-finance-100 h-line-icon-pro"></i>*/}
            {/*                                    </a>*/}
            {/*                                </div>*/}

            {/*                                <a className="text-white text-hover-success text-decoration-none" href="#">*/}
            {/*                                    <i className="icon-medical-022 h-line-icon-pro"></i>*/}
            {/*                                </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div className="col-md-6 col-lg-4 px-3">*/}
            {/*                <div className="d-flex flex-grow-1 align-items-center border border-gray-200 bg-white p-3 mb-6">*/}
            {/*                    <div className="mw-100px me-6">*/}
            {/*                        <img className="d-flex w-100"*/}
            {/*                            src="https://assets.adidas.com/images/w_600,f_auto,q_auto/ce8a6f3aa6294de988d7abce00c4e459_9366/Breaknet_Shoes_White_FX8707_01_standard.jpg" />*/}
            {/*                    </div>*/}
            {/*                    <div className="flex-grow-1">*/}
            {/*                        <a href="#">*/}
            {/*                            <h4 className="h5 mb-2 text-hover-success">Adidas</h4>*/}
            {/*                        </a>*/}
            {/*                        <a href="#" className="d-inline-block text-gray-400 text-hover-success fs-4 mb-3">Shoes</a>*/}
            {/*                        <div className="d-flex flex-grow-1 justify-content-between align-items-center fs-4">*/}
            {/*                            <div className="text-black lh-1">$22</div>*/}
            {/*                            <div className="d-flex justify-content-end lh-1">*/}
            {/*                                <div className="border-end border-gray-300 pe-3 me-2 py-0">*/}
            {/*                                    <a className="text-white text-hover-success text-decoration-none p-0" href="#">*/}
            {/*                                        <i className="icon-finance-100 h-line-icon-pro"></i>*/}
            {/*                                    </a>*/}
            {/*                                </div>*/}

            {/*                                <a className="text-white text-hover-success text-decoration-none" href="#">*/}
            {/*                                    <i className="icon-medical-022 h-line-icon-pro"></i>*/}
            {/*                                </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div className="col-md-6 col-lg-4 px-3">*/}
            {/*                <div className="d-flex flex-grow-1 align-items-center border border-gray-200 bg-white p-3 mb-6">*/}
            {/*                    <div className="mw-100px me-6">*/}
            {/*                        <img className="d-flex w-100"*/}
            {/*                            src="https://assets.adidas.com/images/w_600,f_auto,q_auto/ce8a6f3aa6294de988d7abce00c4e459_9366/Breaknet_Shoes_White_FX8707_01_standard.jpg" />*/}
            {/*                    </div>*/}
            {/*                    <div className="flex-grow-1">*/}
            {/*                        <a href="#">*/}
            {/*                            <h4 className="h5 mb-2 text-hover-success">Adidas</h4>*/}
            {/*                        </a>*/}
            {/*                        <a href="#" className="d-inline-block text-gray-400 text-hover-success fs-4 mb-3">Shoes</a>*/}
            {/*                        <div className="d-flex flex-grow-1 justify-content-between align-items-center fs-4">*/}
            {/*                            <div className="text-black lh-1">$22</div>*/}
            {/*                            <div className="d-flex justify-content-end lh-1">*/}
            {/*                                <div className="border-end border-gray-300 pe-3 me-2 py-0">*/}
            {/*                                    <a className="text-white text-hover-success text-decoration-none p-0" href="#">*/}
            {/*                                        <i className="icon-finance-100 h-line-icon-pro"></i>*/}
            {/*                                    </a>*/}
            {/*                                </div>*/}

            {/*                                <a className="text-white text-hover-success text-decoration-none" href="#">*/}
            {/*                                    <i className="icon-medical-022 h-line-icon-pro"></i>*/}
            {/*                                </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div className="col-md-6 col-lg-4 px-3">*/}
            {/*                <div className="d-flex flex-grow-1 align-items-center border border-gray-200 bg-white p-3 mb-6">*/}
            {/*                    <div className="mw-100px me-6">*/}
            {/*                        <img className="d-flex w-100"*/}
            {/*                            src="https://assets.adidas.com/images/w_600,f_auto,q_auto/ce8a6f3aa6294de988d7abce00c4e459_9366/Breaknet_Shoes_White_FX8707_01_standard.jpg" />*/}
            {/*                    </div>*/}
            {/*                    <div className="flex-grow-1">*/}
            {/*                        <a href="#">*/}
            {/*                            <h4 className="h5 mb-2 text-hover-success">Adidas</h4>*/}
            {/*                        </a>*/}
            {/*                        <a href="#" className="d-inline-block text-gray-400 text-hover-success fs-4 mb-3">Shoes</a>*/}
            {/*                        <div className="d-flex flex-grow-1 justify-content-between align-items-center fs-4">*/}
            {/*                            <div className="text-black lh-1">$22</div>*/}
            {/*                            <div className="d-flex justify-content-end lh-1">*/}
            {/*                                <div className="border-end border-gray-300 pe-3 me-2 py-0">*/}
            {/*                                    <a className="text-white text-hover-success text-decoration-none p-0" href="#">*/}
            {/*                                        <i className="icon-finance-100 h-line-icon-pro"></i>*/}
            {/*                                    </a>*/}
            {/*                                </div>*/}

            {/*                                <a className="text-white text-hover-success text-decoration-none" href="#">*/}
            {/*                                    <i className="icon-medical-022 h-line-icon-pro"></i>*/}
            {/*                                </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div className="col-md-6 col-lg-4 px-3">*/}
            {/*                <div className="d-flex flex-grow-1 align-items-center border border-gray-200 bg-white p-3 mb-6">*/}
            {/*                    <div className="mw-100px me-6">*/}
            {/*                        <img className="d-flex w-100"*/}
            {/*                            src="https://assets.adidas.com/images/w_600,f_auto,q_auto/ce8a6f3aa6294de988d7abce00c4e459_9366/Breaknet_Shoes_White_FX8707_01_standard.jpg" />*/}
            {/*                    </div>*/}
            {/*                    <div className="flex-grow-1">*/}
            {/*                        <a href="#">*/}
            {/*                            <h4 className="h5 mb-2 text-hover-success">Adidas</h4>*/}
            {/*                        </a>*/}
            {/*                        <a href="#" className="d-inline-block text-gray-400 text-hover-success fs-4 mb-3">Shoes</a>*/}
            {/*                        <div className="d-flex flex-grow-1 justify-content-between align-items-center fs-4">*/}
            {/*                            <div className="text-black lh-1">$22</div>*/}
            {/*                            <div className="d-flex justify-content-end lh-1">*/}
            {/*                                <div className="border-end border-gray-300 pe-3 me-2 py-0">*/}
            {/*                                    <a className="text-white text-hover-success text-decoration-none p-0" href="#">*/}
            {/*                                        <i className="icon-finance-100 h-line-icon-pro"></i>*/}
            {/*                                    </a>*/}
            {/*                                </div>*/}

            {/*                                <a className="text-white text-hover-success text-decoration-none" href="#">*/}
            {/*                                    <i className="icon-medical-022 h-line-icon-pro"></i>*/}
            {/*                                </a>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}


            {/*        </div>*/}

            {/*        <div className="text-center">*/}
            {/*            <div className="fs-3 px-7 py-3 btn btn-success text-uppercase">New Arrival</div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className="container py-20">*/}
            {/*    <div className="text-center mx-auto mw-600px mb-14">*/}
            {/*        <h2 className="text-black mb-4">Blog News</h2>*/}
            {/*        <p className="texg-gray-400 font-weight-400">Keep in this shop</p>*/}
            {/*    </div>*/}

            {/*    <div className="row">*/}
            {/*        <div className="col-sm-6 col-md-4 px-3 mb-8">*/}
            {/*            <div className="position-relative">*/}
            {/*                <div className="position-relative bg-white-gradient-opacity-v1">*/}
            {/*                    <img className="d-flex align-items-end img-fluid"*/}
            {/*                        src="https://assets.adidas.com/images/w_600,f_auto,q_auto/ce8a6f3aa6294de988d7abce00c4e459_9366/Breaknet_Shoes_White_FX8707_01_standard.jpg" />*/}
            {/*                </div>*/}

            {/*                <div className="position-absolute bottom-0 start-0 end-0">*/}
            {/*                    <div className="text-center position-absolute p-7 bottom-100 start-0 end-0">*/}
            {/*                        <span className="d-block text-gray-400 fs-6">sport</span>*/}

            {/*                        <h2 className="text-white font-weight-400 mb-4">*/}
            {/*                            <a className="text-hover-success text-white">24 Hours in Shopping</a>*/}
            {/*                        </h2>*/}

            {/*                        <h4 className="d-inline-block text-white opacity-75 fs-5">By H</h4>*/}
            {/*                        <span className="text-white">.</span>*/}
            {/*                        <span className="text-white fs-6 text-uppercase">May 31, 2022</span>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="col-sm-6 col-md-4 px-3 mb-8">*/}
            {/*            <div className="position-relative">*/}
            {/*                <div className="position-relative bg-white-gradient-opacity-v1">*/}
            {/*                    <img className="d-flex align-items-end img-fluid"*/}
            {/*                        src="https://assets.adidas.com/images/w_600,f_auto,q_auto/ce8a6f3aa6294de988d7abce00c4e459_9366/Breaknet_Shoes_White_FX8707_01_standard.jpg" />*/}
            {/*                </div>*/}

            {/*                <div className="position-absolute bottom-0 start-0 end-0">*/}
            {/*                    <div className="text-center position-absolute p-7 bottom-100 start-0 end-0">*/}
            {/*                        <span className="d-block text-gray-400 fs-6">sport</span>*/}

            {/*                        <h2 className="text-white font-weight-400 mb-4">*/}
            {/*                            <a className="text-hover-success text-white">24 Hours in Shopping</a>*/}
            {/*                        </h2>*/}

            {/*                        <h4 className="d-inline-block text-white opacity-75 fs-5">By H</h4>*/}
            {/*                        <span className="text-white">.</span>*/}
            {/*                        <span className="text-white fs-6 text-uppercase">May 31, 2022</span>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*        <div className="col-sm-6 col-md-4 px-3 mb-8">*/}
            {/*            <div className="position-relative">*/}
            {/*                <div className="position-relative bg-white-gradient-opacity-v1">*/}
            {/*                    <img className="d-flex align-items-end img-fluid"*/}
            {/*                        src="https://assets.adidas.com/images/w_600,f_auto,q_auto/ce8a6f3aa6294de988d7abce00c4e459_9366/Breaknet_Shoes_White_FX8707_01_standard.jpg" />*/}
            {/*                </div>*/}

            {/*                <div className="position-absolute bottom-0 start-0 end-0">*/}
            {/*                    <div className="text-center position-absolute p-7 bottom-100 start-0 end-0">*/}
            {/*                        <span className="d-block text-gray-400 fs-6">sport</span>*/}

            {/*                        <h2 className="text-white font-weight-400 mb-4">*/}
            {/*                            <a className="text-hover-success text-white">24 Hours in Shopping</a>*/}
            {/*                        </h2>*/}

            {/*                        <h4 className="d-inline-block text-white opacity-75 fs-5">By H</h4>*/}
            {/*                        <span className="text-white">.</span>*/}
            {/*                        <span className="text-white fs-6 text-uppercase">May 31, 2022</span>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}

export { ShopMainPage }