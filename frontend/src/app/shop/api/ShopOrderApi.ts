import axios from 'axios'
import {string} from "yup";
import {PRODUCT_CATEGORY_LIST_URL} from "./ShopProductApi";

const API_URL = 'http://13.209.148.183:8080'

export const ORDER_GET_URL = `${API_URL}/api/shop/order/get`
export const ORDER_CREATE_URL = `${API_URL}/api/shop/order/create`
export const ORDER_UPDATE_URL = `${API_URL}/api/shop/order/update`
export const ORDER_COMPLETE_URL = `${API_URL}/api/shop/order/complete`
export const ORDER_DELETE_URL = `${API_URL}/api/shop/order/delete`

export const ORDER_MY_ORDER_URL = `${API_URL}/api/shop/order/get/myOrder`

export function getOrder (orderId: number) {
    return axios.get(`${ORDER_GET_URL}/${orderId}`)
}

export function myOrder (query: string ) {
    return axios
        .get(`${ORDER_MY_ORDER_URL}?${query}`)
        .then((response) => response.data)
}

export function orderCreate (
    productCount: number,
    userId: number | undefined,
    productId: number
) {
    return axios.post(ORDER_CREATE_URL, {
        productCount,
        userId,
        productId,
    })
}

export function updateOrder (
    orderId: number,
    basicAddress: string,
    detailAddress: string,
    requestMessage: string
) {
    return axios.patch(`${ORDER_UPDATE_URL}/${orderId}`,{
        basicAddress,
        detailAddress,
        requestMessage
    })
}

export function completeOrder (
    orderId: number,
) {
    return axios.patch(`${ORDER_COMPLETE_URL}/${orderId}`,{
    })
}

export function deleteOrder (
    orderId: number
) {
    return axios.delete(`${ORDER_DELETE_URL}/${orderId}`)
}