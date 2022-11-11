import React, {createContext, FC, useContext, useState} from "react";
import {
    initialQueryRequest,
    initialUserStateQueryRequest,
    QueryState, QueryUserStateRequestContextProps
} from "../QueryModels";

type Props = {
    children: React.ReactNode
}

const QueryUserStateRequestContext = createContext<QueryUserStateRequestContextProps>(initialUserStateQueryRequest)
const useUserStateQueryRequest = () => useContext(QueryUserStateRequestContext)

const QueryUserStateRequestProvider: FC<Props> = ({ children }) => {
    const [state, setState] = useState<QueryState>(initialQueryRequest.state)
    const [update, setUpdate] = useState<number>(0)

    const updateState = (updates: Partial<QueryState>) => {
        const updateState = { ...state, ...updates } as QueryState
        setState(updateState)
    }

    return (
        <QueryUserStateRequestContext.Provider value={{ state, updateState, update, setUpdate }}>
            {children}
        </QueryUserStateRequestContext.Provider>
    )
}

export {QueryUserStateRequestProvider, useUserStateQueryRequest}