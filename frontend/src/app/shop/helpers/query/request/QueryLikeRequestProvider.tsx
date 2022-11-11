import React, {createContext, FC, useContext, useState} from "react";
import {initialLikeQueryRequest, initialQueryRequest, QueryLikeRequestContextProps, QueryState} from "../QueryModels";

type Props = {
    children: React.ReactNode
}

const QueryLikeRequestContext = createContext<QueryLikeRequestContextProps>(initialLikeQueryRequest)
const useLikeQueryRequest = () => useContext(QueryLikeRequestContext)

const QueryLikeRequestProvider: FC<Props> = ({ children }) => {
    const [state, setState] = useState<QueryState>(initialQueryRequest.state)
    const [like, setLike] = useState<number>(0)

    const updateState = (updates: Partial<QueryState>) => {
        const updateState = { ...state, ...updates } as QueryState
        setState(updateState)
    }

    return (
        <QueryLikeRequestContext.Provider value={{ state, updateState, like, setLike }}>
            {children}
        </QueryLikeRequestContext.Provider>
    )
}

export {QueryLikeRequestProvider, useLikeQueryRequest}