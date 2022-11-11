import React, {FC, useContext, useState} from "react";
import {createResponseContext, stringifyRequestQuery} from "../QueryHelpers";
import {initialQueryResponse} from "../QueryModels";
import {useLikeQueryRequest} from "../request/QueryLikeRequestProvider";
import {getAuth} from "../../../pages/auth/core/ShopAuthHelper";
import {useQuery} from "react-query";
import {likesList} from "../../../api/ShopLikesApi";
import {Like} from "../../../models/ShopLikeModel";

type Props = {
    children: React.ReactNode
}

const QueryLikeResponseContext = createResponseContext<Like>(initialQueryResponse)
const useLikeQueryResponse = () => useContext(QueryLikeResponseContext)

const useLikeQueryResponseData = () => {
    const { response } = useLikeQueryResponse()

    if (!response) {
        return []
    }
    return response?.data || []
}

const QueryLikeResponseProvider: FC<Props> = ({ children }) => {
    const { state, like } = useLikeQueryRequest()
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))

    const user = getAuth() as unknown as User

    const {
        isFetching,
        refetch,
        data: response,
    } = useQuery(
        [like, user],
        () => {
            return likesList(user?.id)
        },
        {enabled:!!user?.id, cacheTime: 0 }
    )

    return (
        <QueryLikeResponseContext.Provider value={{ isLoading: isFetching, refetch, response, query }}>
            {children}
        </QueryLikeResponseContext.Provider>
    )
}

export {
    QueryLikeResponseProvider,
    useLikeQueryResponseData
}