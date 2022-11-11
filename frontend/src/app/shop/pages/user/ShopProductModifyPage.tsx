import React, { useEffect } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { useState } from 'react';
import { productGet, productImgUpload, productUpdate } from '../../api/ShopProductApi';
import 'toastr/build/toastr.min.css';
import { toastSuccess } from '../../../../_h/utils/ToastUtils';
import { useLocation, useNavigate } from 'react-router-dom';

type LocationProps = {
    state: {
        id: number;
    }
}

const productSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, '최소 한 글자 이상 입력 해주세요')
        .max(10, '10글자 이상 입력 하실 수 없습니다')
        .required('상품이름은 필수 입력 사항입니다'),
    description: Yup.string()
        .min(1, '최소 한 글자 이상 입력 해주세요')
        .max(30, '30글자 이상 입력 하실 수 없습니다')
        .required('설명은 필수 입력 사항입니다'),
    price: Yup.number()
        .min(100, '가격은 최소 백원 이상이어야 합니다')
        .max(10000000, '가격은 천만원 이하여야 합니다')
        .typeError('가격은 숫자여야만 합니다')
        .required('가격은 필수 입력 사항입니다'),
    status: Yup.string()
        .required('상태를 선택 해주세요'),
    stock: Yup.number()
        .min(1, '수량은 5개 이상이어야 합니다')
        .max(99, '수량은 최대 99개 입니다')
        .typeError('수량은 숫자여야만 합니다')
        .required('수량은 필수 입력 사항입니다'),
    mainCategory: Yup.string()
        .required("메인 카테고리를 선택 해주세요"),
    subCategory: Yup.string()
        .required("서브 카테고리를 선택 해주세요"),
})

const initialValues = {
    name: '',
    description: '',
    price: 100,
    stock: 1,
    status: '판매중',
    mainCategory: '',
    subCategory: '',
    img: FormData,
}


const ShopProductModifyPage = () => {
    const [loading, setLoading] = useState(false)
    const [stock, setStock] = useState(1)
    const [image, setImage] = useState('')

    const location = useLocation() as unknown as LocationProps
    const navigate = useNavigate()
    const pid = location.state.id
    const [id, setId] = useState(pid)

    const getProduct = async (id: number) => {
        const { data: product } = await productGet(id)

        await formik.setFieldValue('name', product.name)
        await formik.setFieldValue('description', product.description)
        await formik.setFieldValue('price', product.price)
        await formik.setFieldValue('stock', product.stock)
        await formik.setFieldValue('status', product.status)
        await formik.setFieldValue('mainCategory', product.mainCategory)
        await formik.setFieldValue('subCategory', product.subCategory)
        const fileName = product.img.split('/')[product.img.split('/').length - 1]

        setStock(product.stock)
        setImage(fileName)

        const statusElement = document.querySelector(`#${product.status}`) as HTMLInputElement
        statusElement.defaultChecked = true

        const wrapperElement = document.querySelector('.image-input-wrapper') as HTMLElement
        const textElement = document.querySelector('[data-h-image-text]') as HTMLElement

        wrapperElement.style.setProperty('background-image', `url('${product.img}')`)
        textElement.classList.add('d-none')
    }

    useEffect(() => {
        if (id) getProduct(id)
    }, [id])


    const formik = useFormik({
        initialValues,
        validationSchema: productSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            setLoading(true)
            try {

                const { data: product } = await productUpdate(
                    id,
                    values.name,
                    values.description,
                    values.price,
                    values.stock,
                    values.status,
                    image,
                    values.mainCategory,
                    values.subCategory,
                )

                if (product.errorMessage) {
                    setStatus(product.errorMessage)
                    setSubmitting(false)
                    setLoading(false)
                    return
                }

                // @ts-ignore
                if (values.img[0]) {
                    const formData = new FormData()
                    // @ts-ignore
                    formData.append('file', values.img[0])

                    const { data: file } = await productImgUpload(
                        formData
                    )

                    if (file.errorMessage) {
                        setStatus(file.errorMessage)
                        setSubmitting(false)
                        setLoading(false)
                        return
                    }
                }

                toastSuccess('상품이 수정 되었습니다')
                setTimeout(() => {
                    navigate('/shop/user/productManagement')
                }, 1000);
            } catch (error) {
                setSubmitting(false)
                setLoading(false)
            }
        },
    })

    const stockUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setStock(stock + 1)
    }

    const stockDown = () => {
        if (stock === 1) {
            return
        }
        setStock(stock - 1)
    }

    useEffect(() => {
        formik.setFieldValue('stock', stock)
    }, [stock])



    return (
        <div className='bg-white'>
            <form className='form w-100' onSubmit={formik.handleSubmit} noValidate id='upload_form' encType="multipart/form-data">
                <div className="container row justify-content-center px-lg-20 py-15">
                    <div className="col-lg-7">

                        <div className="position-relative image-input image-input-empty border border-gray-300 img-fluid w-100 w-670px h-670px" data-h-image-input="true">
                            <span data-h-image-text="true" className='position-absolute top-50 start-50 translate-middle fw-bold fs-3 text-gray-700'>
                                이미지를 업로드 해주세요
                            </span>

                            <div className="image-input-wrapper bgi-position-center bgi-size-cover border border-black img-fluid w-100 w-670px h-670px"></div>

                            <label className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
                                data-h-image-input-action="change"
                                data-bs-toggle="tooltip"
                                data-bs-dismiss="click"
                                title="Change Product Image">
                                <i className="bi bi-pencil-fill fs-7"></i>
                                <input id='productImage'
                                    type="file"
                                    onChange={(e) => {
                                        setImage((e.currentTarget.files as FileList)[0].name)
                                        formik.setFieldValue('img', e.currentTarget.files)
                                    }}
                                    accept=".png, .jpg, .jpeg" />
                                <input type="hidden" name="avatar_remove" />

                            </label>

                            <span className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
                                data-h-image-input-action="cancel"
                                data-bs-toggle="tooltip"
                                data-bs-dismiss="click"
                                title="Cancel avatar">
                                <i className="bi bi-x fs-2" onClick={() => formik.setFieldValue('img', '')}></i>
                            </span>


                            <span className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
                                data-h-image-input-action="remove"
                                data-bs-toggle="tooltip"
                                data-bs-dismiss="click"
                                title="Remove avatar">
                                <i className="bi bi-x fs-2"></i>
                            </span>
                        </div>

                        {/* {formik.errors.img && (
                            <div className='fv-plugins-message-container'>
                                <span role='alert' className='text-muted ps-2'>이미지는 파일을 업로드 해주세요</span>
                            </div>
                        )} */}
                    </div>

                    <div className="col-lg-5 px-lg-20 pt-4 pt-lg-28 flex flex-col">
                        {formik.status ? (
                            <div className='mb-lg-15 alert alert-danger'>
                                <div className='alert-text font-weight-bold'>{formik.status}</div>
                            </div>
                        ) : (
                            <></>
                        )}


                        <div className="form-floating mb-7">
                            <input
                                placeholder='상품이름'
                                type="text"
                                {...formik.getFieldProps('name')}
                                className={clsx(
                                    'form-control form-con ftrol-lg',
                                    { 'is-invalid': formik.touched.name && formik.errors.name },
                                    { 'is-valid': formik.touched.name && !formik.errors.name }
                                )}
                                id="product_title"
                                //defaultValue={product.name}
                                maxLength={10} />
                            {formik.touched.name && formik.errors.name && (
                                <div className='fv-plugins-message-container'>
                                    <span role='alert' className='text-muted ps-2'>{formik.errors.name}</span>
                                </div>
                            )}
                            <label htmlFor="floatingInput" className='text-muted'>상품이름</label>
                        </div>

                        <div className="form-floating mb-7">
                            <textarea
                                id="product_description"
                                maxLength={30}
                                {...formik.getFieldProps('description')}
                                className={clsx(
                                    'form-control form-con ftrol-lg h-100px resize-none',
                                    { 'is-invalid': formik.touched.description && formik.errors.description },
                                    { 'is-valid': formik.touched.description && !formik.errors.description }
                                )}
                                placeholder="상품 설명"
                                rows={6}></textarea>
                            <span className="fs-6 text-muted"></span>
                            {formik.touched.description && formik.errors.description && (
                                <div className='fv-plugins-message-container'>
                                    <span role='alert' className='text-muted ps-2'>{formik.errors.description}</span>
                                </div>
                            )}
                            <label htmlFor="floatingTextarea2" className='text-muted'>상품 설명</label>
                        </div>


                        <div className="form-floating mb-7">
                            <input
                                placeholder='상품가격'
                                type="number"
                                {...formik.getFieldProps('price')}
                                className={clsx(
                                    'form-control form-con ftrol-lg',
                                    { 'is-invalid': formik.touched.price && formik.errors.price },
                                    { 'is-valid': formik.touched.price && !formik.errors.price }
                                )}
                                id="product_price"
                                maxLength={10} />
                            {formik.touched.price && formik.errors.price && (
                                <div className='fv-plugins-message-container'>
                                    <span role='alert' className='text-muted ps-2'>{formik.errors.price}</span>
                                </div>
                            )}
                            <label htmlFor="floatingInput" className='text-muted'>상품가격</label>
                        </div>

                        <div className='mb-7'>
                            <div className='flex flex-col'>
                                <select className="form-select form-select-solid bg-white mb-1"
                                    {...formik.getFieldProps('mainCategory')}
                                >
                                    <option value="">메인 카테고리를 선택 해주세요</option>
                                    <option value="MAN">남자</option>
                                    <option value="WOMEN">여자</option>
                                    <option value="KIDS">어린이</option>
                                </select>
                                {formik.touched.mainCategory && formik.errors.mainCategory && (
                                    <div className='fv-plugins-message-container'>
                                        <span role='alert' className='text-muted ps-2'>{formik.errors.mainCategory}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='mb-7'>
                            <div className='flex flex-col'>
                                <select className="form-select form-select-solid bg-white mb-1"
                                    {...formik.getFieldProps('subCategory')}
                                >
                                    <option value="">서브 카테고리를 선택 해주세요</option>
                                    <option value="TOP">상의</option>
                                    <option value="PANTS" >하의</option>
                                </select>
                                {formik.touched.subCategory && formik.errors.subCategory && (
                                    <div className='fv-plugins-message-container'>
                                        <span role='alert' className='text-muted ps-2'>{formik.errors.subCategory}</span>
                                    </div>
                                )}
                            </div>
                        </div>


                        <div
                            className="flex justify-content-between align-items-center border-top border-bottom border-gray-light-v2 py-3">
                            <div className="fw-bold collapsed px-0 py-1 text-dark-v2">
                                상태
                            </div>

                            <div>
                                <label className="position-relative me-6">
                                    <input type="radio"
                                        id='SALE'
                                        name='status'
                                        onChange={(e) => formik.setFieldValue('status', '판매중')}
                                        className="position-absolute start-100 bottom-100 hidden" />
                                    <span className="text-primary-checked cursor-pointer">판매중</span>
                                </label>

                                <label className="position-relative me-6">
                                    <input type="radio"
                                        id='SOLDOUT'
                                        name='status'
                                        onChange={(e) => formik.setFieldValue('status', '품절')}
                                        className="position-absolute start-100 bottom-100 hidden" />
                                    <span className="text-primary-checked cursor-pointer">품절</span>
                                </label>

                             

                                {formik.touched.status && formik.errors.status && (
                                    <div className='fv-plugins-message-container'>
                                        <span role='alert' className='text-muted ps-2'>{formik.errors.status}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div
                            className="flex align-content-center justify-content-between border-top border-bottom border-gray-light-v2 py-3">
                            <div className="fw-bold collapsed px-0 py-1 text-dark-v2">
                                수량
                            </div>

                            <div className="flex align-items-center" data-h-quantity="true">
                                <input style={{ width: "40px" }}
                                    className="form-control p-0 py-1 text-center rounded-0 me-2"
                                    type="number"
                                    data-h-quantity-target="true"
                                    {...formik.getFieldProps('stock')}
                                    readOnly
                                />
                                <i onClick={(e) => stockUp(e)} data-h-quantity-up="true" className="text-hover-success fa fa-angle-up me-3"></i>
                                <i onClick={() => stockDown()} data-h-quantity-down="true" className="text-hover-success fa fa-angle-down"></i>
                            </div>
                            {formik.touched.stock && formik.errors.stock && (
                                <div className='fv-plugins-message-container'>
                                    <span role='alert' className='text-muted ps-2'>{formik.errors.stock}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-content-center my-8">
                            <button type='submit'
                                className="btn btn-success w-100"
                            //disabled={formik.isSubmitting || !formik.isValid}
                            >
                                {loading ? (
                                    <span className='indicator-progress' style={{ display: 'block' }}>
                                        상품을 수정 중입니다...
                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                    </span>
                                ) : (
                                    <span>수정하기</span>
                                )
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export { ShopProductModifyPage }