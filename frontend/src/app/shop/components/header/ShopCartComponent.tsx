import React from 'react'
import { Link } from 'react-router-dom'
import { cartDelete } from '../../api/ShopCartApi';
import { toastSuccess } from '../../../../_h/utils/ToastUtils';
import { getRandomInt } from '../../../../_h/utils/HUtils';
import {
    useCartQueryResponseData
} from "../../helpers/query/response/QueryCartResponseProvider";
import {useCartQueryRequest} from "../../helpers/query/request/QueryCartRequestProvider";

const ShopCartComponent = () => {
    const carts = useCartQueryResponseData()
    const { setCart } = useCartQueryRequest()

    const cartDel = async (id: number) => {
        const { data: cart } = await cartDelete(id)
        if (cart) {
            setCart(getRandomInt())
            toastSuccess('장바구니를 삭제 하였습니다')
        }
    }

    const total = () => {
        let totalPrice = 0
        carts.map((cart) => {
            totalPrice += cart.productPrice * cart.productCount
        })
        return `${totalPrice}원`
    }

    const render = () => {
        if (carts.length === 0) {
            return (
                <div className='row '>
                    <div className='flex justify-content-center'>
                        장바구니가 비어 있습니다
                    </div>
                </div>
            )
        }

        return carts.map((cart, key) => {
            return (
                <div className="row" key={key}>
                    <div className=" col-4">
                        <img className="img-fluid h-80px"
                            src={cart.productImg} />
                    </div>
                    <div className="col-8">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="">
                                <a className="text-black fw-bold text-hover-success">{cart.productName}</a>
                                <div className="text-gray-600 fw-bold py-1">{cart.productCount}개</div>
                                <div className="text-success ">{cart.productPrice}원</div>
                            </div>
                            <div>
                                <button type="button" onClick={() => cartDel(cart.cartId)}
                                    className="btn text-hover-success py-6 pe-0">X</button>
                            </div>
                        </div>
                    </div>
                </div>
            )

        })
    }

    const allPriceRender = () => {
        return (
            <div id='allPrice' className="py-3 text-center col-6 fw-bold">
                {total()}
            </div>
        )
    }

    return (
        <div className="position-relative d-inline-block z-index-3 cursor-pointer">
            <div className="py-5 px-2 menu-item" data-h-menu-trigger="click" data-h-menu-placement="bottom-end">
                <a className="text-hover-success text-white fs-4 h-icon-v1">
                    <span style={{ top: '15px', right: '3px' }}
                        className="h-badge-v1--sm text-white fs-9 rounded-circle bg-success lh-base">
                        {carts.length}
                    </span>
                    <i className="fs-4 icon-hotel-restaurant-105 h-line-icon-pro"></i>
                </a>
            </div>

            <div data-h-menu="true"
                className="bg-white menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold fs-6 w-350px">
                <div className="p-3 border-bottom border-gray-light-v2">
                    <div className="text-center">
                        장바구니
                    </div>
                </div>

                <div className="p-6 cart-list">
                    {render()}
                </div>

                <div className="border-top border-bottom border-gray-light-v2">
                    <div className="row">
                        <div
                            className="py-3 fw-bold text-center justify-content-center col-6 border-end border-gray-light-v2">
                            총합
                        </div>
                        {allPriceRender()}
                    </div>
                </div>

                <div className="row flex-column">
                    <Link to="/shop/user/cart" className='w-100 '>
                        <span className='menu-item'>
                            <button className="menu-link d-block btn text-success text-hover-primary border-bottom border-gray-light-v2 w-100"
                                type="button">장바구니 확인</button>
                        </span>
                    </Link>
                    {/*<button className="btn text-black text-hover-primary" type="button">구매하기</button>*/}

                </div>
            </div>
        </div>
    )
}

export { ShopCartComponent }


