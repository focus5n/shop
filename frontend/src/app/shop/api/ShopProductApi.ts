import axios from 'axios'

const API_URL = 'http://localhost:8080'

export const PRODUCT_GET_URL = `${API_URL}/api/shop/product/get`
export const PRODUCT_LIST_URL = `${API_URL}/api/shop/product/page/list`
export const PRODUCT_DELETE_URL = `${API_URL}/api/shop/product/delete`
export const PRODUCT_UPDATE_URL = `${API_URL}/api/shop/product/update`
export const PRODUCT_CATEGORY_LIST_URL = `${API_URL}/api/shop/product/category/list`
export const PRODUCT_UPLOAD_URL = `${API_URL}/api/shop/product/upload`
export const PRODUCT_IMG_UPLOAD_URL = `${API_URL}/api/shop/file/upload`

export const BEST_PRODUCT_URL = `${API_URL}/api/shop/product/get/bestProduct`

export const productGet = (id: number) => {
  return axios
    .get(`${PRODUCT_GET_URL}/${id}`)
    .then((response) => response.data)
}

export const productList = (query: string) => {
  return axios.get(`${PRODUCT_LIST_URL}?${query}`).then((response) => response.data)
}

export function productCategoryList(query: string) {
  return axios
    .get(`${PRODUCT_CATEGORY_LIST_URL}?${query}`)
    .then((response) => response.data)
}

export function bestProduct() {
  return axios.get(`${BEST_PRODUCT_URL}`)
      .then((response) => response.data)
}

export function productDelete(id: number) {
  return axios.delete(`${PRODUCT_DELETE_URL}/${id}`)
}

export function productUpdate(
  id: number,
  name: string,
  description: string,
  price: number,
  stock: number,
  status: string,
  img: string,
  mainCategory: string,
  subCategory: string,
) {
  return axios.patch(`${PRODUCT_UPDATE_URL}/${id}`, {
    name,
    description,
    price,
    stock,
    status,
    img,
    mainCategory,
    subCategory,
  })
}

export function productUpload (
  name: string,
  description: string,
  price: number,
  stock: number,
  status: string,
  img: string,
  mainCategory: string,
  subCategory: string,
) {
  return axios.post(PRODUCT_UPLOAD_URL, {
    name,
    description,
    price,
    stock,
    status,
    img,
    mainCategory,
    subCategory,
  })
}

export function productImgUpload(formData: FormData) {
  return axios.postForm(PRODUCT_IMG_UPLOAD_URL, formData)
}
