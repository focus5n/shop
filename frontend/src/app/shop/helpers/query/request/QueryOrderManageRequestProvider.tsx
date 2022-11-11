import React, {createContext, FC, useContext, useState} from "react";
import {
    initialQueryRequest, QueryRequestContextProps,
    QueryState
} from "../QueryModels";

type Props = {
    children: React.ReactNode
}

const QueryOrderManageRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)
const useOrderManageQueryRequest = () => useContext(QueryOrderManageRequestContext)

const QueryOrderManageRequestProvider: FC<Props> = ({ children }) => {
    const [state, setState] = useState<QueryState>(initialQueryRequest.state)

    const updateState = (updates: Partial<QueryState>) => {
        const updateState = { ...state, ...updates } as QueryState
        setState(updateState)
    }

    return (
        <QueryOrderManageRequestContext.Provider value={{ state, updateState}}>
            {children}
        </QueryOrderManageRequestContext.Provider>
    )
}

export { QueryOrderManageRequestProvider, useOrderManageQueryRequest}