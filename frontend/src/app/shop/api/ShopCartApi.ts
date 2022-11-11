import axios from 'axios'

import {AxiosResponse} from 'axios'
import {Response} from '../helpers/query/QueryModels'
import {Cart} from '../models/ShopCartModels'

const API_URL = 'http://localhost:8080'

export const CART_LIST_URL = `${API_URL}/api/shop/cart/get`
export const CART_DELETE_URL = `${API_URL}/api/shop/cart/delete`
export const CART_SAVE_URL = `${API_URL}/api/shop/cart/save`

export type CartsQueryResponse = Response<Array<Cart>>

export function cartList(userId: number) {
  return axios
    .get(`${CART_LIST_URL}/${userId}`)
    .then((response: AxiosResponse<CartsQueryResponse>) => response.data)
}

export function cartDelete(id: number) {
  return axios.delete(`${CART_DELETE_URL}/${id}`)
}

export function cartSave(productCount: number, userId: number | undefined, productId: number) {
  return axios.post(CART_SAVE_URL, {
    productCount,
    userId,
    productId,
  })
}
