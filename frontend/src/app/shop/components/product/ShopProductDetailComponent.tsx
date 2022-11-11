import React, {FC, useEffect, useState} from 'react'
import {HIMG} from '../../../../_h/helpers/components/HIMG'
import * as Yup from 'yup'
import {useFormik} from 'formik';
import {Product} from "../../models/ShopProductModels";
import {useNavigate} from "react-router-dom";
import {register} from "../../api/ShopUserApi";
import {orderCreate} from "../../api/ShopOrderApi";
import {ShopUseAuth} from "../../pages/auth/core/ShopAuth";
import {toastDanger} from "../../../../_h/utils/ToastUtils";

type Props = {
    id: number
    name: string,
    description: string,
    price: number
    stock: number
    path: string
    status: string
    mainCategory: string
    subCategory: string
    product: Product
}

const ShopProductDetailContentComponent: FC<Props> = ({id,
                                                          name,
                                                          description,
                                                          price,
                                                          path,
                                                          status,
                                                          stock,
                                                          mainCategory,
                                                          subCategory,
                                                          product
                                                      }) => {
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(false)


    const productSchema = Yup.object().shape({
        stock: Yup.number()
            .min(1, '수량은 5개 이상이어야 합니다')
            .max(stock, '남은 재고를 초과 하였습니다')
            .typeError('수량은 숫자여야만 합니다')
            .required('수량은 필수 입력 사항입니다'),
    })

    const initialValues = {
        id: id,
        name: name,
        description: description,
        price: price,
        stock: 1,
        status: '결제중'
    }

    const navigate = useNavigate()
    const {currentUser} = ShopUseAuth()

    const formik = useFormik({
        initialValues,
        validationSchema: productSchema,
        onSubmit: async (values, {setStatus, setSubmitting}) => {
            setLoading(true)
            try {
                if(!currentUser) {
                    toastDanger('로그인 후 이용 가능합니다')
                    setSubmitting(false)
                    setLoading(false)
                    return
                }
                const {data: order} = await orderCreate(
                    values.stock,
                    currentUser?.id,
                    product.id
                )

                navigate('/shop/checkout', {
                    state: {
                        product: product,
                        productCount: values.stock,
                        order:order.data
                    }
                })
            } catch (error) {
                console.log(error)
                setSubmitting(false)
                setLoading(false)
            }
        },
    })

    const quantityUp = () => {
        setQuantity(quantity + 1)
    }

    const quantityDown = () => {
        if (quantity === 1) {
            return
        }
        setQuantity(quantity - 1)
    }

    useEffect(() => {
        formik.setFieldValue('stock', quantity)
    }, [quantity])

    return (
        <form className='form w-100' onSubmit={formik.handleSubmit}>
            <div className="container flex flex-wrap justify-content-center px-lg-20">
                <div className="col-lg-7">
                    <HIMG path={path} className='img-fluid w-100 w-670px h-670px'/>
                </div>
                <div className="col-lg-5 px-lg-20 pt-4 pt-lg-28">
                    <div className="mb-8">
                        <h1 className="fs-2tx">{name}</h1>
                        <p className="text-dark-v2">
                            {description}
                        </p>
                    </div>

                    <div className="mb-8">
                        <p className="text-dark-v2 fw-bold fs-4 mb-4">PRICE</p>
                        <h1 className="fs-2tx">{price}원</h1>
                    </div>

                    <div>
                        <div
                            className="flex justify-content-between align-items-center border-top border-bottom border-gray-light-v2 py-3">
                            <div className="fw-bold collapsed px-0 py-1 text-dark-v2">
                                상태
                            </div>
                            <div>{status === 'SALE' ? <span className='text-success'>판매중</span> :
                                <span className='text-danger'>품절</span>}</div>
                        </div>
                    </div>

                    <div>
                        <div
                            className="flex justify-content-between align-items-center border-top border-bottom border-gray-light-v2 py-3">
                            <div className="fw-bold collapsed px-0 py-1 text-dark-v2">
                                배송비
                            </div>
                            <div>무료</div>
                        </div>
                    </div>

                    <div
                        className="flex align-content-center justify-content-between border-top border-bottom border-gray-light-v2 py-3">
                        <div className="fw-bold collapsed px-0 py-1 text-dark-v2">
                            수량
                        </div>

                        <div className="flex align-items-center" data-h-quantity="true">
                            <input
                                style={{width: "40px"}}
                                className="form-control p-0 py-1 text-center rounded-0 me-2"
                                data-h-quantity-target="true"
                                type="text"
                                {...formik.getFieldProps('stock')}
                                readOnly/>
                            <i onClick={() => quantityUp()} data-h-quantity-up="true"
                               className="text-hover-success fa fa-angle-up me-3"></i>
                            <i onClick={() => quantityDown()} data-h-quantity-down="true"
                               className="text-hover-success fa fa-angle-down"></i>
                        </div>


                    </div>
                    {formik.errors.stock && (
                        <div className='fv-plugins-message-container flex flex-grow-1 justify-content-end'>
                            <span role='alert' className='text-danger ps-2'>{formik.errors.stock}</span>
                        </div>
                    )}


                    <div className="flex justify-content-center my-8">
                        <button type='submit'
                                className="btn btn-success w-100"
                                disabled={formik.isSubmitting || !formik.isValid || status === 'SOLD_OUT'}
                        >
                            {loading ? (
                                <span className='indicator-progress' style={{display: 'block'}}>
                                    결제 창으로 이동 중입니다...
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
        </form>
    )
}

export {ShopProductDetailContentComponent}