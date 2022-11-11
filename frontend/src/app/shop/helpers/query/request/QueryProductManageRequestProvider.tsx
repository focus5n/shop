import React, { createContext, FC, useContext, useState } from "react";
import { initialQueryRequest, QueryRequestContextProps, QueryState } from '../QueryModels';

type Props = {
    children: React.ReactNode
}

const QueryProductManageRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)
const useProductManageQueryRequest = () => useContext(QueryProductManageRequestContext)

const QueryProductManageRequestProvider: FC<Props> = ({ children }) => {
    const [state, setState] = useState<QueryState>(initialQueryRequest.state)
    const updateState = (updates: Partial<QueryState>) => {
        const updateState = { ...state, ...updates } as QueryState
        setState(updateState)
    }

    return (
        <QueryProductManageRequestContext.Provider value={{ state, updateState }}>
            {children}
        </QueryProductManageRequestContext.Provider>
    )
}

export { QueryProductManageRequestProvider, useProductManageQueryRequest }