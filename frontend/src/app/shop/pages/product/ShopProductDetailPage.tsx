import React, {useEffect, useMemo, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {ShopProductDetailContentComponent} from '../../components/product/ShopProductDetailComponent'
import {ShopUserReviewComponent} from '../../components/user/ShopUserReveiwComponent'
import {Product} from '../../models/ShopProductModels'
import * as Yup from "yup";
import {useFormik} from "formik";
import {reviewSave} from "../../api/ShopReviewApi";
import {ShopUseAuth} from "../auth/core/ShopAuth";
import {toastSuccess} from "../../../../_h/utils/ToastUtils";
import {useReviewQueryResponseData} from "../../helpers/query/response/QueryReviewResponseContextProps";
import {useReviewQueryRequest} from "../../helpers/query/request/QueryReviewRequestProvider";
import {getRandomInt} from "../../../../_h/utils/HUtils";

type LocationProps = {
    state: {
        product: Product
    }
}

const reviewSchema = Yup.object().shape({
    comment: Yup.string()
        .required("필수 입력 사항 입니다."),
})

const initialValues = {
    comment: '',
}

const ShopProductDetailPage = () => {
    const location = useLocation() as unknown as LocationProps
    const product = location.state.product
    const [loading, setLoading] = useState(false)
    const {currentUser} = ShopUseAuth()

    const {review, setReview} = useReviewQueryRequest()


    useEffect(() => {
        setReview(product.id)
        return () => {

        };
    }, [product, review]);

    const data = useReviewQueryResponseData()
    const reviews = useMemo(() => data, [data])

    const reviewRender = () => {

        if(reviews.length === 0) {
            return (
                <div>후기가 없습니다</div>
            )
        }

        return reviews.map((review, key) => {
            return (
                <ShopUserReviewComponent
                    key={key}
                    reviewId={review.reviewId}
                    username={review.userName}
                    reviewContent={review.comment}
                    reviewDate={review.createdAt}
                    path="/media/imgs/shop/user/user.png"/>
            )
        })
    }

    const formik = useFormik({
        initialValues,
        validationSchema: reviewSchema,
        onSubmit: async (values, {setStatus, setSubmitting}) => {
            setLoading(true)
            try {
                const {data: comment} = await reviewSave(
                    values.comment,
                    currentUser?.id,
                    product.id
                )

                if (comment.message === '요청에 성공 했습니다') {
                    toastSuccess('후기를 작성 하였습니다')
                    await formik.setFieldValue('comment', '')
                    setReview(getRandomInt())
                    setLoading(false)
                    setSubmitting(false)
                }
            } catch {
                setLoading(false)
                setSubmitting(false)
            }
        }
    })

    const render = () => {
        return (
            <ShopProductDetailContentComponent
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                status={product.status}
                stock={product.stock}
                mainCategory={product.mainCategory}
                subCategory={product.subCategory}
                path={product.img}
                product={product}/>
        )
    }

    return (
        <>
            <div className="bg-white">
                <div className="p-8">
                    {render()}
                    <div className="container px-lg-20 mt-14 border-bottom border-gray-light-v2"></div>
                </div>
            </div>

            <form className="py-5 bg-white" onSubmit={formik.handleSubmit} noValidate id="sign_form" autoComplete='off'>
                <div className="bg-white pb-14">
                    <div className="container px-lg-2 ">
                        <div className="row justify-content-center">
                            <div className="col-lg-9 ">
                                <h2 className="mb-8">후기</h2>
                                {reviewRender()}
                            </div>
                        </div>

                        <div>
                            <div className="row justify-content-center">
                                <div className="col-lg-9">
                                    <h2 className="mb-8">후기작성</h2>

                                    <div className="mb-8">
                                    <textarea rows={12}
                                              {...formik.getFieldProps('comment')}
                                              className="form-control border-gray-light-v2 border-gray-light p-4 resize-none text-black"></textarea>
                                    </div>

                                    {formik.touched.comment && formik.errors.comment && (
                                        <div className='fv-plugins-message-container'>
                                            <span role='alert'
                                                  className='text-danger ps-2'>{formik.errors.comment}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-content-end">
                                        <button disabled={!(formik.isValid && formik.dirty)} type="submit"
                                                className="btn btn-success">후기작성
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

export {ShopProductDetailPage}