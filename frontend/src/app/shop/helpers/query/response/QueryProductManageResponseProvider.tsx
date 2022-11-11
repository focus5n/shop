import React, { FC, useContext, useState, useEffect, useMemo } from 'react'
import { createResponseContext, stringifyRequestQuery } from '../QueryHelpers'
import { initialQueryResponse, initialQueryState, PaginationState } from '../QueryModels';
import { useQuery } from 'react-query'
import { Product } from '../../../models/ShopProductModels'
import { productList } from '../../../api/ShopProductApi';
import {useProductManageQueryRequest} from "../request/QueryProductManageRequestProvider";

type Props = {
    children: React.ReactNode
}

const QueryProductManageResponseContext = createResponseContext<Product>(initialQueryResponse)
const useProductManageQueryResponse = () => useContext(QueryProductManageResponseContext)

const useProductManageQueryResponseData = () => {
    const { response } = useProductManageQueryResponse()
    if (!response) {
        return []
    }
    return response?.data || []
}

const useProductManageQueryResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const { response } = useProductManageQueryResponse()
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }
    return response.payload.pagination
}

const useProductManageQueryResponseLoading = (): boolean => {
    const { isLoading } = useProductManageQueryResponse()
    return isLoading
}

const QueryProductManageResponseProvider: FC<Props> = ({ children }) => {
    const { state } = useProductManageQueryRequest()
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [query, updatedQuery])

    const {
        isFetching,
        refetch,
        data: response,
    } = useQuery(
        `${query}`,
        () => {
            return productList(query)
        },
        { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
    )

    if (!response) {
        return null
    }

    return (
        <QueryProductManageResponseContext.Provider value={{ isLoading: isFetching, refetch, response, query }}>
            {children}
        </QueryProductManageResponseContext.Provider>
    )
}

export {
    QueryProductManageResponseProvider,
    useProductManageQueryResponse,
    useProductManageQueryResponseData,
    useProductManageQueryResponsePagination,
    useProductManageQueryResponseLoading,
}