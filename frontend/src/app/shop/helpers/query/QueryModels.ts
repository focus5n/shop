import {Dispatch, SetStateAction} from 'react'

export type ID = undefined | null | number | string

export type PaginationState = {
    page: number
    size: 8 | 10 | 30 | 50 | 100
    direction: string
    links?: Array<{ label: string; active: boolean; url: string | null; page: number | null }>
}

export type categoryState = {
    mainCategory?: string
    subCategory?: string
}

export type userState = {
    update?: number
}

export type deleteState = {
    delete?: number
}

export type searchSate = {
    search?: string
}

export type orderState = {
    userId?: number
}

export type Response<T> = {
    data?: T
    payload?: {
        message?: string
        error?: {
            [key: string]: Array<string>
        }
        pagination?: PaginationState
    }
}

export type QueryState = PaginationState & searchSate & categoryState & deleteState & userState & orderState

export type QueryRequestContextProps = {
    state: QueryState
    updateState: (updates: Partial<QueryState>) => void
}

export type QueryProductCategoryRequestContextProps = {
    state: QueryState
    updateState: (updates: Partial<QueryState>) => void
    mainCategory: string
    setMainCategory: (main: Partial<string>) => void
    subCategory: string
    setSubCategory: (sub: Partial<string>) => void
}

export type QueryUserStateRequestContextProps = {
    state: QueryState
    updateState: (updates: Partial<QueryState>) => void
    update: number
    setUpdate: (update: Partial<number>) => void
}

export type QueryCartRequestContextProps = {
    state: QueryState
    updateState: (updates: Partial<QueryState>) => void
    cart: number
    setCart: (cart: Partial<number>) => void
}


export type QueryLikeRequestContextProps = {
    state: QueryState
    updateState: (updates: Partial<QueryState>) => void
    like: number
    setLike: (like: Partial<number>) => void
}

export type QueryBestRequestContextProps = {
    best: number
    setBest: (best: Partial<number>) => void
}

export type QueryReviewRequestContextProps = {
    review: number
    setReview: (review: Partial<number>) => void
}

export const initialQueryState: QueryState = {
    page: 1,
    size: 10,
    direction: 'DESC'
}

export const initialProductCategoryQueryState: QueryState = {
    page: 1,
    size: 8,
    direction: 'DESC'
}

export const initialQueryRequest: QueryRequestContextProps = {
    state: initialQueryState,
    updateState: () => {},
}


export const initialProductCategoryQueryRequest: QueryProductCategoryRequestContextProps = {
    state: initialProductCategoryQueryState,
    updateState: () => {},
    mainCategory: '',
    setMainCategory: () => {},
    subCategory: '',
    setSubCategory: () => {},
}

export const initialUserStateQueryRequest: QueryUserStateRequestContextProps = {
    state: initialQueryState,
    updateState: () => {},
    update: 0,
    setUpdate: () => {},
}

export const initialCartQueryRequest: QueryCartRequestContextProps = {
    state: initialQueryState,
    updateState: () => {},
    cart: 0,
    setCart: () => {},
}


export const initialLikeQueryRequest: QueryLikeRequestContextProps = {
    state: initialQueryState,
    updateState: () => {},
    like: 0,
    setLike: () => {},
}

export const initialBestQueryRequest: QueryBestRequestContextProps = {
    best: 0,
    setBest: () => {}
}

export const initialReviewQueryRequest: QueryReviewRequestContextProps = {
    review: 0 ,
    setReview: () => {}
}

export type QueryResponseContextProps<T> = {
    response?: Response<Array<T>> | undefined
    refetch: () => void
    isLoading: boolean
    query: string
}

export type QueryResponseContextPropsSingle<T> = {
    response?: Response<T> | undefined
    refetch: () => void
    isLoading: boolean
    query: string
}

export type QueryBasicResponseContextProps<T> = {
    response?: Response<Array<T>> | undefined
    refetch: () => void
    isLoading: boolean
}

export type QueryBasicResponseContextPropsSingle<T> = {
    response?: Response<T> | undefined
    refetch: () => void
    isLoading: boolean
}

export const initialQueryResponse = {
    refetch: () => {
    },
    isLoading: false,
    query: ''
}

export const initialQueryBasicResponse = {
    refetch:() => {},
    isLoading: false,
}


