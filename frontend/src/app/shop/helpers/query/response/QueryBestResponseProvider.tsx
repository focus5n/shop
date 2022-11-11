import React, {FC, useContext} from "react";
import {initialQueryBasicResponse} from "../QueryModels";
import {useBestQueryRequest} from "../request/QueryBestRequestProvider";
import {useQuery} from "react-query";
import {Product} from "../../../models/ShopProductModels";
import {bestProduct} from "../../../api/ShopProductApi";
import {createBasicResponseContextSingle} from "../QueryHelpers";

type Props = {
    children: React.ReactNode
}

const QueryBestResponseContext = createBasicResponseContextSingle<Product>(initialQueryBasicResponse)
const useBestQueryResponse = () => useContext(QueryBestResponseContext)

const useBestQueryResponseData = () => {
    const { response } = useBestQueryResponse()

    if (!response) {
        return []
    }
    return response.data || []
}

const QueryBestResponseProvider: FC<Props> = ({ children }) => {
    const { best } = useBestQueryRequest()

    const {
        isFetching,
        refetch,
        data: response,
    } = useQuery(
        [best],
        () => {
            return bestProduct()
        },
        {cacheTime: 0,keepPreviousData: true, refetchOnWindowFocus: false }
    )

    return (
        <QueryBestResponseContext.Provider value={{ isLoading: isFetching, refetch, response }}>
            {children}
        </QueryBestResponseContext.Provider>
    )
}

export {
    QueryBestResponseProvider,
    useBestQueryResponseData
}