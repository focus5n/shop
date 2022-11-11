import React, {useEffect, useState} from 'react'
import {Product} from "../../models/ShopProductModels";
import {Order} from "../../models/ShopOrderModel";
import {useLocation, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {useFormik} from "formik";
import {completeOrder, getOrder, updateOrder} from "../../api/ShopOrderApi";
import {toastDanger} from "../../../../_h/utils/ToastUtils";
import {useUserStateQueryRequest} from "../../helpers/query/request/QueryUserStateRequestProvider";
import {getRandomInt} from "../../../../_h/utils/HUtils";
import {ShopUseAuth} from "../../pages/auth/core/ShopAuth";
import {getUser} from "../../api/ShopUserApi";

type LocationProps = {
    state: {
        product: Product
        productCount: number
        order: Order
    }
}

const orderSchema = Yup.object().shape({

});

const initialValues = {
};

const ShopCheckoutStepThree = () => {
    const location = useLocation() as unknown as LocationProps
    const order = location.state.order
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {setUpdate} = useUserStateQueryRequest();
    const {setCurrentUser} = ShopUseAuth()

    const checkOrder = async(order: Order) => {
        const {data: data} = await getOrder(order.id)
        if(data.data.status === 'COMPLETE') {
            toastDanger('비정상적인 접근 입니다')
            navigate('/shop/user/myOrder')
        }
    }


    useEffect(() => {
        checkOrder(order)
        return () => {
        };
    }, [order.status]);


    const formik = useFormik({
        initialValues,
        validationSchema: orderSchema,
        onSubmit: async (values, {setStatus, setSubmitting}) => {
            setLoading(true)
            try {
                const {data: updatedOrder} = await completeOrder(
                    order.id,
                )
                const {data: user} = await getUser(order.userId)
                setCurrentUser(user)

                setUpdate(getRandomInt())
                navigate('/shop/user/myOrder')
            } catch {
                setLoading(false)
                setSubmitting(false)
            }
        }
    })

    return (
        <>
            <form className="py-5" onSubmit={formik.handleSubmit} noValidate id="sign_form" autoComplete='off'>
            <div id="step3" className="d-none">
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
                                            className="mb-3 border rounded-circle bg-success text-white fw-bold flex justify-content-center align-items-center">2</span>
                                        <h4>배송정보 입력</h4>
                                    </div>

                                    <div className="flex flex-col align-items-center">
                                        <span style={{ width: "41px", height: "41px" }}
                                            className="mb-3 border rounded-circle bg-success text-white fw-bold flex justify-content-center align-items-center">3</span>
                                        <h4>결제</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-8">
                                <div className="border border-gray-400">
                                    <div className="flex">
                                        <div className="p-4 border-end border-gray-400">
                                            <i className="text-black icon-media-065 h-line-icon-p"></i>
                                        </div>
                                        <div className="p-4">
                                            배송정보 확인
                                        </div>
                                    </div>
                                </div>

                                <div className="my-8">
                                    <div className="my-4">
                                        <span className="me-1">성함:</span>
                                        <div id="name" className="d-inline my-4 fw-bold"></div>
                                    </div>
                                    <div className="my-4 me-1">
                                        <span className="me-1">이메일:</span>
                                        <div id="email" className="d-inline my-4 fw-bold"></div>
                                    </div>
                                    <div className="my-4 me-1">
                                        <span className="me-1">주소:</span>
                                        <div id="phone" className="d-inline my-4 fw-bold"></div>
                                    </div>
                                    <div className="my-4 me-1">
                                        <span className="me-1">상세주소:</span>
                                        <div id="address" className="d-inline my-4 fw-bold"></div>
                                    </div>
                                    <div className="my-4 me-1">
                                        <span className="me-1">요청사:</span>
                                        <div id="request" className="d-inline my-4 fw-bold"></div>
                                    </div>

                                </div>

                                <div className="flex justify-content-end my-4">
                                    <button data-h-step="true" data-h-step-current-target="#step3"
                                        data-h-step-next-target="#step2"
                                        className="btn btn-success py-4 w-200px">수정하기</button>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="p-5 bg-light-v3 mb-6">
                                    <h4 className="pb-4 mb-4 border-bottom border-gray-light-v3">구매 정보</h4>
                                    <div className="flex justify-content-between mb-3">
                                        <h5>가격</h5>
                                        <h5>{order.amount}원</h5>
                                    </div>
                                    <div className="flex justify-content-between mb-3">
                                        <h5>배송비</h5>
                                        <h5>0원</h5>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <button type='submit' data-h-step="true" className="btn btn-success w-100">
                                        {loading ? (
                                            <span className='indicator-progress' style={{ display: 'block' }}>
                                         구매 완료 중입니다...
                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                    </span>
                                        ) : (
                                            <span>결제하기</span>
                                        )
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </>
    )
}

export {ShopCheckoutStepThree}