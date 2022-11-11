import React from 'react'
import { cartDelete } from '../../api/ShopCartApi'
import { getRandomInt } from '../../../../_h/utils/HUtils';
import { toastSuccess } from '../../../../_h/utils/ToastUtils';
import {
    useCartQueryResponseData
} from "../../helpers/query/response/QueryCartResponseProvider";
import {useCartQueryRequest} from "../../helpers/query/request/QueryCartRequestProvider";
import {useNavigate} from "react-router-dom";
import {Product} from "../../models/ShopProductModels";
import {productGet} from "../../api/ShopProductApi";

const ShopCartPage = () => {
    const carts = useCartQueryResponseData()
    const { setCart } = useCartQueryRequest()

    const cartDel = async (id: number) => {
        const { data: cart } = await cartDelete(id)
        if (cart) {
            setCart(getRandomInt())
            toastSuccess('장바구니를 삭제 하였습니다')
        }
    }

    const navigate = useNavigate()
    const detail = async (productId: number) => {
        const {data: product} = await productGet(productId)
        navigate('/shop/productDetail', {
            state: {
                product: product
            }
        })
    }

    const render = () => {
        if (carts.length === 0) {
            return (
                <div className='row '>
                    <div className='flex justify-content-center mt-6'>
                        장바구니가 비어 있습니다
                    </div>
                </div>
            )
        }

        return carts.map((cart, key) => {
            return (
                <div className="row py-6 align-items-center border-bottom border-gray-light-v2" key={key}>
                    <div className="col-md-6">
                        <div className="flex align-items-center">
                            <div className="col-6 me-5 w-150px">
                                <img className="img-fluid w-150px h-150px"
                                    src={cart.productImg} />
                            </div>
                            <div className="col-6">
                                <div onClick={()=> detail(cart.productId)} className="font-weight-bold fs-4 text-hover-success cursor-pointer">{cart.productName}</div>
                                <span className="text-dark-v3">{cart.productMainCategory}-{cart.productSubCategory}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 pe-8">
                        <div className="flex justify-content-between">
                            <div>
                                <h4 className="fs-5 fw-normal">{cart.productPrice}원</h4>
                            </div>
                            <div>
                                <h4 className="fs-5 fw-normal">{cart.productCount}개</h4>
                            </div>
                            <div>
                                <h4 className="fs-5 fw-normal d-inline-block me-4">{cart.totalPrice}원</h4>
                                <a onClick={() => cartDel(cart.cartId)}><i
                                    className="fa fa-trash text-hover-success cursor-pointer"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className="col-lg-9">
            <div>
                <div className="mb-9">
                    <div className="p-8 border border-gray-light-v2">
                        <div className="row border-bottom border-gray-light-v2 pb-3">
                            <div className="col-md-6">
                                <h4 className="fs-5">상품</h4>
                            </div>
                            <div className="col-md-6 pe-9">
                                <div className="flex justify-content-between">
                                    <div>
                                        <h4 className="fs-5 ps-2">가격</h4>
                                    </div>
                                    <div>
                                        <h4 className="fs-5">수량</h4>
                                    </div>
                                    <div>
                                        <h4 className="fs-5 d-inline-block me-4 pe-1">총합</h4>
                                        <i className="mt-auto fa fa-trash invisible"></i>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {render()}



                        {/*<div className="flex justify-content-end mt-7">*/}
                        {/*    <button className="btn btn-success w-150px">구매 하러가기</button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ShopCartPage }