import {createResponseContext, isNotEmptys, stringifyRequestQuery} from "../QueryHelpers";
import {Product} from "../../../models/ShopProductModels";
import {initialQueryResponse, initialQueryState, PaginationState} from "../QueryModels";
import React, {FC, useContext, useEffect, useMemo, useState} from "react";
import {useQuery} from "react-query";
import {productCategoryList} from "../../../api/ShopProductApi";
import {useProductCategoryQueryRequest} from "../request/QueryProductCategoryRequestProvider";

type Props = {
    children: React.ReactNode
}

const QueryProductCategoryResponseContext = createResponseContext<Product>(initialQueryResponse)
const useProductCategoryQueryResponse = () => useContext(QueryProductCategoryResponseContext)

const useProductCategoryQueryResponseData = () => {
    const { response } = useProductCategoryQueryResponse()

    if (!response) {
        return []
    }
    return response?.data || []
}

const useProductCategoryQueryResponseLoading = (): boolean => {
    const { isLoading } = useProductCategoryQueryResponse()
    return isLoading
}

const useProductCategoryQueryResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const { response } = useProductCategoryQueryResponse()
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }
    return response.payload.pagination
}

const QueryProductCategoryResponseProvider: FC<Props> = ({ children }) => {
    const {state, mainCategory, subCategory} = useProductCategoryQueryRequest()
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
    let updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [query, updatedQuery])

    const enabledQuery: boolean = isNotEmptys(mainCategory, subCategory)

    const {
        isFetching,
        refetch,
        data: response,
    } = useQuery(
        [query],
        () => {
            return productCategoryList(query)
        },
        {enabled: enabledQuery, cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false }
    )

    return (
        <QueryProductCategoryResponseContext.Provider value={{ isLoading: isFetching, refetch, response, query }}>
            {children}
        </QueryProductCategoryResponseContext.Provider>
    )
}

export {
    QueryProductCategoryResponseProvider,
    useProductCategoryQueryResponse,
    useProductCategoryQueryResponseData,
    useProductCategoryQueryResponseLoading,
    useProductCategoryQueryResponsePagination,
}