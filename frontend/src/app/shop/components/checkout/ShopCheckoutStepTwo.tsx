import React, {useEffect, useState} from 'react'
import {ShopUseAuth} from "../../pages/auth/core/ShopAuth";
import {useLocation} from "react-router-dom";
import {Product} from "../../models/ShopProductModels";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import {Order} from "../../models/ShopOrderModel";
import {updateOrder} from "../../api/ShopOrderApi";

type LocationProps = {
    state: {
        product: Product
        productCount: number
        order: Order
    }
}

const orderSchema = Yup.object().shape({
    basicAddress: Yup.string()
        .required('필수 입력 사항입니다'),
    detailAddress: Yup.string()
        .required('필수 입력 사항입니다'),
});

const initialValues = {
    basicAddress: '',
    detailAddress: '',
    requestMessage: ''
};

const ShopCheckoutStepTwo = () => {
    const {currentUser} = ShopUseAuth()
    const location = useLocation() as unknown as LocationProps
    const product = location.state.product
    const productCount = location.state.productCount
    const order = location.state.order

    useEffect(() => {
        formik.setFieldValue('basicAddress', currentUser?.basicAddress)
        formik.setFieldValue('detailAddress', currentUser?.detailAddress)
        return () => {
        };
    }, [currentUser]);


    const formik = useFormik({
        initialValues,
        validationSchema: orderSchema,
        onSubmit: async (values, {setStatus, setSubmitting}) => {
            try {
                const {data: updatedOrder} = await updateOrder(
                    order.id,
                    values.basicAddress,
                    values.detailAddress,
                    values.requestMessage
                )

            } catch {
            }
        }
    })
    return (
        <>
            <form className="py-5" onSubmit={formik.handleSubmit} noValidate id="sign_form" autoComplete='off'>
                <div id="step2" className="d-none">
                    <div className="p-8 pb-lg-60">
                        <div className="container pt-28 px-lg-20">
                            <div className="mb-20">
                                <div className="flex justify-content-center">
                                    <div className="flex justify-content-between w-700px">
                                        <div className="flex  flex-col align-items-center">
                                        <span style={{width: "41px", height: "41px"}}
                                              className="mb-3 border rounded-circle bg-success text-white fw-bold flex justify-content-center align-items-center">1</span>
                                            <h4>상품확인</h4>
                                        </div>

                                        <div className="flex  flex-col align-items-center">
                                        <span style={{width: "41px", height: "41px"}}
                                              className="mb-3 border rounded-circle bg-success text-white fw-bold flex justify-content-center align-items-center">2</span>
                                            <h4>배송정보 입력</h4>
                                        </div>

                                        <div className="flex flex-col align-items-center">
                                        <span style={{width: "41px", height: "41px"}}
                                              className="mb-3 border rounded-circle text-black fw-bold flex justify-content-center align-items-center">3</span>
                                            <h4>결제</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div id="step-value2" className="col-md-8">
                                    <div className="row mb-7">
                                        <div className="col-md-6">
                                            <div className="flex flex-col">
                                                <label className="text-dark-v4 fs-4 ps-1 mb-1">성함</label>
                                                <input data-h-step-value="true" data-h-step-value-target="#name"
                                                       className="form-control py-5 rounded-0 px-2" type="text"
                                                       defaultValue={currentUser?.name} readOnly={true}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="flex flex-col">
                                                <label className="text-dark-v4 fs-4 ps-1 mb-1">이메일</label>
                                                <input data-h-step-value="true" data-h-step-value-target="#email"
                                                       className="form-control py-5 rounded-0 px-2" type="text"
                                                       defaultValue={currentUser?.email} readOnly={true}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-7">
                                        <div className="col-md-6">
                                            <div className="flex flex-col">
                                                <label className="text-dark-v4 fs-4 ps-1 mb-1">기본주소</label>
                                                <input {...formik.getFieldProps('basicAddress')}
                                                       data-h-step-value="true" data-h-step-value-target="#phone"
                                                       className="form-control py-5 rounded-0 px-2" type="text"
                                                />
                                                {formik.touched.basicAddress && formik.errors.basicAddress && (
                                                    <div className='fv-plugins-message-container'>
                                                        <span role='alert'
                                                              className='text-danger ps-2'>{formik.errors.basicAddress}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="flex flex-col">
                                                <label className="text-dark-v4 fs-4 ps-1 mb-1">상세주소</label>
                                                <input {...formik.getFieldProps('detailAddress')}
                                                       data-h-step-value="true" data-h-step-value-target="#address"
                                                       className="form-control py-5 rounded-0 px-2" type="text"
                                                />
                                            </div>
                                            {formik.touched.detailAddress && formik.errors.detailAddress && (
                                                <div className='fv-plugins-message-container'>
                                                    <span role='alert'
                                                          className='text-danger ps-2'>{formik.errors.detailAddress}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="row mb-6">
                                        <div className="col-12">
                                            <label className="text-dark-v4 fs-4 ps-1 mb-1">배송 요청사항</label>
                                            <textarea {...formik.getFieldProps('requestMessage')}
                                                      data-h-step-value="true" data-h-step-value-target="#request"
                                                      className="form-control border-gray-light-v2 border-gray-light p-4 resize-none text-black"
                                                      rows={3}></textarea>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-4">
                                    <div className="p-5 bg-light-v3 mb-6">
                                        <h4 className="pb-4 mb-4 border-bottom border-gray-light-v3">구매 정보</h4>
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
                                        <button type='submit' disabled={!(formik.isValid && formik.dirty)}
                                                data-h-step="true" data-h-step-current-target="#step2"
                                                data-h-step-next-target="#step3" data-h-step-next="true"
                                                data-h-step-next-id="#step-value2"
                                                className="btn btn-success w-100">구매하기
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

export {ShopCheckoutStepTwo}