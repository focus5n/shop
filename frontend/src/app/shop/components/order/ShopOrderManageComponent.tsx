import React, {FC} from "react";
import {deleteOrder} from "../../api/ShopOrderApi";
import {useOrderManageQueryRequest} from "../../helpers/query/request/QueryOrderManageRequestProvider";
import {initialQueryState} from "../../helpers/query/QueryModels";
import {toastSuccess} from "../../../../_h/utils/ToastUtils";
import {productGet} from "../../api/ShopProductApi";
import {useNavigate} from "react-router-dom";
import {useUserStateQueryRequest} from "../../helpers/query/request/QueryUserStateRequestProvider";
import {getRandomInt} from "../../../../_h/utils/HUtils";
import {getUser} from "../../api/ShopUserApi";
import {ShopUseAuth} from "../../pages/auth/core/ShopAuth";

type Props = {
    orderId: number
    orderNumber: string
    orderName: string
    amount: number
    userId: number
    productId: number
    basicAddress: string
    detailAddress: string
    createdAt:string
    productImg: string,
    productCategory: string,
}

const ShopOrderManageComponent:FC<Props> = ({
    orderId,
    orderNumber,
    orderName,
    amount,
    userId,
    productId,
    basicAddress,
    detailAddress,
                                                createdAt,
    productImg,
    productCategory
}) => {

    const {updateState} = useOrderManageQueryRequest()
    const {setUpdate} = useUserStateQueryRequest()
    const {setCurrentUser} = ShopUseAuth()

    const del = async (orderId: number, userId: number) => {
        const {data: order} = await deleteOrder(orderId)
        const {data: user} = await getUser(userId)
        if(order) {
            updateState({delete: orderId, ...initialQueryState})
            toastSuccess('주문을 삭제 하였습니다')
            setUpdate(getRandomInt())
            setCurrentUser(user)
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


    return (
        <div className="mb-9">
            <div className="p-6 border border-gray-light-v2 bg-gray-light-v3">
                <div className="row">
                    <div className="col-sm-3 col-md-2">
                        <div className="fw-bold">총합</div>
                        <div className="fw-normal">{amount}원</div>
                    </div>
                    <div className="col-sm-3 col-md-2">
                        <div className="fw-bold">주문날짜</div>
                        <div className="fw-normal">{createdAt}</div>
                    </div>
                    <div className="col-sm-3 col-md-2">
                        <div className="fw-bold">배송지</div>
                        <div className="fw-normal">{basicAddress} {detailAddress}</div>
                    </div>
                    <div className="col-sm-3 col-md-4 ms-auto text-sm-end">
                        <div className="fw-bold">주문번호</div>
                        <div className="text-success">{orderNumber}</div>
                    </div>
                </div>
            </div>

            <div className="p-6 border border-gray-light-v2 bg-white align-items-center">
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <div className="row align-items-center">
                            <div className="col-md-4">
                                <img onClick={() => detail(productId)} className="img-fluid w-150px h-150px cursor-pointer"
                                     src={productImg} />
                            </div>
                            <div className="col-md-8">
                                <a href="#" onClick={() => detail(productId)}
                                   className="fw-light fs-4 text-black text-hover-success">{orderName}</a>
                                <div className="text-dark-v3 fs-7 mb-3 mt-2 ps-1">{productCategory}</div>
                                <div className="text-success mb-4 ps-1">{amount}원</div>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 flex flex-col">
                        <button onClick={() => del(orderId, userId)}
                            className="btn bg-gray-light-v3 bg-hover-light-info text-gray-700 p-3 mt-3">주문취소</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {ShopOrderManageComponent}