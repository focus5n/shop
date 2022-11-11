import React from 'react'
import { HIMG } from '../../../../_h/helpers/components/HIMG'
import {reviewDelete} from "../../api/ShopReviewApi";
import {toastSuccess} from "../../../../_h/utils/ToastUtils";
import {useReviewQueryRequest} from "../../helpers/query/request/QueryReviewRequestProvider";
import {getRandomInt} from "../../../../_h/utils/HUtils";

type Props = {
    path: string
    reviewId: number
    username: string
    reviewDate: string
    reviewContent: string
}

const ShopUserReviewComponent: React.FC<Props> = ({
    path,
    reviewId,
    username,
    reviewDate,
    reviewContent
}) => {

    const {setReview} = useReviewQueryRequest()

    const del = async (reviewId: number) => {
        const {data: review} = await reviewDelete(reviewId)
        if(review.message === '요청에 성공 했습니다') {
            toastSuccess('후기를 삭제 하였습니다')
            setReview(getRandomInt())
        }
    }


    return (

        <div className="border-bottom border-gray-light-v2 mb-8">
            <div className="flex mb-2">
                <HIMG className='rounded-circle me-6 w-60px h-60px' path={path} />
                <div className="flex flex-col flex-grow-1">
                    <div className="flex flex-grow-1 justify-content-between mb-4">
                        <div>
                            <h2 className="fw-bold">{username}</h2>
                            <span className="text-dark-v2 fs-10">{reviewDate}</span>
                        </div>
                        <div className="text-hover-success cursor-pointer" onClick={() => del(reviewId)}>삭제</div>
                    </div>
                    <p className="text-dark-v3 fw-bold fs-6">{reviewContent}</p>
                </div>
            </div>
        </div>

    )
}

export { ShopUserReviewComponent }