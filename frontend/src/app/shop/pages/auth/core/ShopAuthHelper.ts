import {User} from '../../../models/ShopUserModels'

const AUTH_LOCAL_STORAGE_KEY = 'h-shop-user'
const getAuth = (): User | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth: User = JSON.parse(lsValue) as User
    if (auth) {
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: User) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

export function ShopSetupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'
  // axios.interceptors.request.use(
  //   (config: {headers: {Authorization: string}}) => {
  //     const auth = getAuth()
  //     if (auth && auth.api_token) {
  //       config.headers.Authorization = `Bearer ${auth.api_token}`
  //     }

  //     return config
  //   },
  //   (err: any) => Promise.reject(err)
  // )
}

export {getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY}
