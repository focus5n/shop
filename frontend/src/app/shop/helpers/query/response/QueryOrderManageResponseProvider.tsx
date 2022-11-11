import React, {FC, useContext, useEffect, useMemo, useState} from "react";
import {createResponseContext, stringifyRequestQuery} from "../QueryHelpers";
import {Product} from "../../../models/ShopProductModels";
import {initialQueryResponse, initialQueryState, PaginationState} from "../QueryModels";
import {useQuery} from "react-query";
import {useOrderManageQueryRequest} from "../request/QueryOrderManageRequestProvider";
import {myOrder} from "../../../api/ShopOrderApi";
import {ShopUseAuth} from "../../../pages/auth/core/ShopAuth";
import {Order} from "../../../models/ShopOrderModel";

type Props = {
    children: React.ReactNode
}

const QueryOrderManageResponseContext = createResponseContext<Order>(initialQueryResponse)
const useOrderManageQueryResponse = () => useContext(QueryOrderManageResponseContext)

const useOrderManageQueryResponseData = () => {
    const { response } = useOrderManageQueryResponse()
    if (!response) {
        return []
    }
    return response?.data || []
}

const useOrderManageQueryResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const { response } = useOrderManageQueryResponse()
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }
    return response.payload.pagination
}

const useOrderManageQueryResponseLoading = (): boolean => {
    const { isLoading } = useOrderManageQueryResponse()
    return isLoading
}

const QueryOrderManageResponseProvider: FC<Props> = ({ children }) => {
    let { state } = useOrderManageQueryRequest()
    const { currentUser } = ShopUseAuth()
    state = {...state, userId: currentUser?.id}

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
            return myOrder(query)
        },
        { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
    )

    if (!response) {
        return null
    }

    return (
        <QueryOrderManageResponseContext.Provider value={{ isLoading: isFetching, refetch, response, query }}>
            {children}
        </QueryOrderManageResponseContext.Provider>
    )
}

export {
    QueryOrderManageResponseProvider,
    useOrderManageQueryResponse,
    useOrderManageQueryResponseData,
    useOrderManageQueryResponsePagination,
    useOrderManageQueryResponseLoading,
}