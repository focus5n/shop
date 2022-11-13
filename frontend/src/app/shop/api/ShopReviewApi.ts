import axios, {AxiosResponse} from 'axios'
import {Response} from "../helpers/query/QueryModels";
import {Review} from "../models/ShopReviewModel";

const API_URL = 'http://13.209.148.183:8080'

export const REVIEW_GET_URL = `${API_URL}/api/shop/review/get`
export const REVIEW_SAVE_URL = `${API_URL}/api/shop/review/save`
export const REVIEW_DELETE_URL = `${API_URL}/api/shop/review/delete`

export type ReviewsQueryResponse = Response<Array<Review>>

export function getReview(productId: number){
    return axios.get(`${REVIEW_GET_URL}/${productId}`)
        .then((response: AxiosResponse<ReviewsQueryResponse>) => response.data)
}

export function reviewSave(comment: string, userId: number | undefined, productId: number) {
    return axios.post(REVIEW_SAVE_URL, {
        comment,
        userId,
        productId,
    })
}

export function reviewDelete(reviewId: number) {
    return axios.delete(`${REVIEW_DELETE_URL}/${reviewId}`)
}