import React, {FC, useContext} from "react";
import {initialQueryResponse} from "../QueryModels";
import {useReviewQueryRequest} from "../request/QueryReviewRequestProvider";
import {useQuery} from "react-query";
import {Review} from "../../../models/ShopReviewModel";
import {getReview} from "../../../api/ShopReviewApi";
import {createBasicResponseContext} from "../QueryHelpers";

type Props = {
    children: React.ReactNode
}

const QueryReviewResponseContext = createBasicResponseContext<Review>(initialQueryResponse)
const useReviewQueryResponse = () => useContext(QueryReviewResponseContext)

const useReviewQueryResponseData = () => {
    const { response } = useReviewQueryResponse()

    if (!response) {
        return []
    }
    return response?.data || []
}

const QueryReviewResponseProvider: FC<Props> = ({ children }) => {
    const { review } = useReviewQueryRequest()

    const {
        isFetching,
        refetch,
        data: response,
    } = useQuery(
        [review],
        () => {
            return getReview(review)
        },
        {cacheTime: 0,keepPreviousData: true, refetchOnWindowFocus: false }
    )

    return (
        <QueryReviewResponseContext.Provider value={{ isLoading: isFetching, refetch, response }}>
            {children}
        </QueryReviewResponseContext.Provider>
    )
}

export {
    QueryReviewResponseProvider,
    useReviewQueryResponseData
}