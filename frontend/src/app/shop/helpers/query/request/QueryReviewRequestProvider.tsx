import React, {createContext, FC, useContext, useState} from "react";
import {initialReviewQueryRequest, QueryReviewRequestContextProps} from "../QueryModels";

type Props = {
    children: React.ReactNode
}

const QueryReviewRequestContext = createContext<QueryReviewRequestContextProps>(initialReviewQueryRequest)
const useReviewQueryRequest = () => useContext(QueryReviewRequestContext)

const QueryReviewRequestProvider: FC<Props> = ({ children }) => {
    const [review, setReview] = useState<number>(0)

    return (
        <QueryReviewRequestContext.Provider value={{review, setReview}}>
            {children}
        </QueryReviewRequestContext.Provider>
    )
}

export {QueryReviewRequestProvider, useReviewQueryRequest}