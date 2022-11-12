import axios from 'axios'

import {AxiosResponse} from 'axios'
import {Response} from '../helpers/query/QueryModels'
import {Likes} from '../models/ShopLikesModels'

const API_URL = 'http://13.209.148.183/:8080'

export const LIKE_LIST_URL = `${API_URL}/api/shop/likes/get`
export const PRODUCT_LIKE_UP_URL = `${API_URL}/api/shop/likes/save`
export const PRODUCT_LIKE_DOWN_URL = `${API_URL}/api/shop/likes/delete`

export type LikesQueryResponse = Response<Array<Likes>>

export function likesList(userId: number | undefined) {
  return axios
    .get(`${LIKE_LIST_URL}/${userId}`)
    .then((response: AxiosResponse<LikesQueryResponse>) => response.data)
}

export function productLikeUp(userId: number | undefined, productId: number) {
  return axios.post(PRODUCT_LIKE_UP_URL, {
    userId,
    productId
  })
}

export function productLikeDown(likesId:number) {
  return axios.delete(`${PRODUCT_LIKE_DOWN_URL}/${likesId}`)
}
