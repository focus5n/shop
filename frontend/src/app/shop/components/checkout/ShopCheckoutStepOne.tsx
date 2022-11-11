import React from 'react'
import {useLocation} from "react-router-dom";
import {Product} from "../../models/ShopProductModels";

type LocationProps = {
    state: {
        product: Product
        productCount: number
    }
}


const ShopCheckoutStepOne = () => {
    const location = useLocation() as unknown as LocationProps
    const product = location.state.product
    const productCount = location.state.productCount
    return (
        <>
            <div id="step1">
                <div className="p-8 pb-lg-60">
                    <div className="container pt-28 px-lg-20">
                        <div className="mb-20">
                            <div className="flex justify-content-center">
                                <div className="flex justify-content-between w-700px">
                                    <div className="flex  flex-col align-items-center">
                                        <span style={{ width: "41px", height: "41px" }}
                                            className="mb-3 border rounded-circle bg-success text-white fw-bold flex justify-content-center align-items-center">1</span>
                                        <h4>상품확인</h4>
                                    </div>

                                    <div className="flex  flex-col align-items-center">
                                        <span style={{ width: "41px", height: "41px" }}
                                            className="mb-3 border rounded-circle  text-black fw-bold flex justify-content-center align-items-center">2</span>
                                        <h4>배송정보 입력</h4>
                                    </div>

                                    <div className="flex flex-col align-items-center">
                                        <span style={{ width: "41px", height: "41px" }}
                                            className="mb-3 border rounded-circle  text-black fw-bold flex justify-content-center align-items-center">3</span>
                                        <h4>결제</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-8">
                                <div className="flex justify-content-between pb-3 mb-4">
                                    <div className="col-6">
                                        <h4>상품</h4>
                                    </div>
                                    <div className="flex col-6 justify-content-between">
                                        <h4>가격</h4>
                                        <h4>수량</h4>
                                        <h4 className="pe-4">총합</h4>
                                    </div>
                                </div>

                                <div className="py-7 border-top border-bottom border-gray-light-v2">
                                    <div className="flex justify-content-between align-items-center">
                                        <div className="flex align-items-center col-md-6">
                                            <div className="col-6 me-5 w-150px h-150px">
                                                <img className="img-fluid w-150px h-150px"
                                                    src={product.img} />
                                            </div>
                                            <div className="col-6">
                                                <h4>{product.name}</h4>
                                                <span className="text-dark-v3">{product.mainCategory}-{product.subCategory}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-content-between col-md-6">
                                            <span className="text-black fw-normal">{product.price}원</span>
                                            <span className="text-black fw-normal">{productCount}개</span>
                                            <span className="text-black fw-normal pe-2">{product.price * productCount}원</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-4">
                                <div className="p-5 bg-light-v3 mb-6">
                                    <h4 className="pb-4 mb-4 border-bottom ㅠㅎ border-gray-light-v3">구매 정보</h4>
                                    <div className="flex justify-content-between mb-3">
                                        <h5>가격</h5>
                                        <h5>{product.price * productCount}</h5>
                                    </div>
                                    <div className="flex justify-content-between mb-3">
                                        <h5>배송비</h5>
                                        <h5>0원</h5>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <button data-h-step="true" data-h-step-current-target="#step1"
                                        data-h-step-next-target="#step2"
                                        className="btn btn-success w-100">구매하기</button>
                                </div>

                                <button
                                    className="flex justify-content-end accordion-button-v2 fs-6 fw-bold collapsed px-0 py-1 mb-1"
                                    type="button" data-h-accordion="true"
                                    data-h-accordion-target="#point">포인트
                                    적용하기</button>

                                <div id="point" className="accordion-collapse collapse">
                                    <div className="flex justify-content-end fw-bold mb-2">포인트: 3000</div>
                                    <div className="input-group">
                                        <input className="form-control border border-gray-400 py-2" />
                                        <button className="btn btn-success py-2">적용</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export { ShopCheckoutStepOne }