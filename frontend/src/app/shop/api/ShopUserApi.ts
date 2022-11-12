import axios, {AxiosResponse} from 'axios'
import qs from 'qs'
import {Response} from "../helpers/query/QueryModels";
import {User} from "../models/ShopUserModels";

const API_URL = 'http://13.209.148.183:8080'

export const GET_URL = `${API_URL}/api/shop/user/get`
export const LOGIN_URL = `${API_URL}/api/shop/user/login`
export const REGISTER_URL = `${API_URL}/api/shop/user/register`
export const USER_LIST_URL = `${API_URL}/api/shop/user/list`
export const USER_DELETE_URL = `${API_URL}/api/shop/user/delete`

export type UserQueryResponse = Response<User>

export function getUser(userId: number) {
  return axios.get(`${GET_URL}/${userId}`)
      .then((response) => response.data)
}

export function login(email: string, password: string) {
  return axios.post(LOGIN_URL,
      qs.stringify({email, password})
  )
}

export function register(email: string, password: string, name: string, role: string) {
  return axios.post(REGISTER_URL, {
    email,
    password,
    name,
    role,
  })
}

export const userList = (query: string) => {
  return axios.get(`${USER_LIST_URL}?${query}`).then((response) => response.data)
}

export function userDelete(id: number) {
  return axios.delete(`${USER_DELETE_URL}/${id}`)
}
