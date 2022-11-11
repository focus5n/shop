import React, { FC, useContext, useState, useEffect, useMemo } from 'react'
import { initialQueryResponse, initialQueryState, PaginationState } from '../QueryModels';
import { createResponseContext, stringifyRequestQuery } from '../QueryHelpers'

import { useQuery } from 'react-query'
import { User } from '../../../models/ShopUserModels'
import { userList } from '../../../api/ShopUserApi';
import {useUserManageQueryRequest} from "../request/QueryUserManageRequestProvider";


type Props = {
    children: React.ReactNode
}

const QueryUserManageResponseContext = createResponseContext<User>(initialQueryResponse)
const useUserManageQueryResponse = () => useContext(QueryUserManageResponseContext)

const useUserQueryResponseData = () => {
    const { response } = useUserManageQueryResponse()
    
    if (!response) {
        return []
    }
    return response?.data || []
}

const useUserQueryResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const { response } = useUserManageQueryResponse()
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }
    return response.payload.pagination
}

const useUserQueryResponseLoading = (): boolean => {
    const { isLoading } = useUserManageQueryResponse()
    return isLoading
}

const QueryUserManageResponseProvider: FC<Props> = ({ children }) => {
    const { state } = useUserManageQueryRequest()
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
            return userList(query)
        },
        { cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
    )

    if (!response) {
        return null
    }

    return (
        <QueryUserManageResponseContext.Provider value={{ isLoading: isFetching, refetch, response, query }}>
            {children}
        </QueryUserManageResponseContext.Provider>
    )
}

export {
    QueryUserManageResponseProvider,
    useUserManageQueryResponse,
    useUserQueryResponseData,
    useUserQueryResponsePagination,
    useUserQueryResponseLoading
}