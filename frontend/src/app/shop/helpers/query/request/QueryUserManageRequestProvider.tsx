import React, { createContext, FC, useContext, useState } from "react";
import { initialQueryRequest, QueryRequestContextProps, QueryState } from '../QueryModels';

type Props = {
    children: React.ReactNode
}

const QueryUserManageRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)
const useUserManageQueryRequest = () => useContext(QueryUserManageRequestContext)

const QueryUserManageRequestProvider: FC<Props> = ({ children }) => {
    const [state, setState] = useState<QueryState>(initialQueryRequest.state)
    const updateState = (updates: Partial<QueryState>) => {
        const updateState = { ...state, ...updates } as QueryState
        setState(updateState)
    }

    return (
        <QueryUserManageRequestContext.Provider value={{ state, updateState }}>
            {children}
        </QueryUserManageRequestContext.Provider>
    )
}

export { QueryUserManageRequestProvider, useUserManageQueryRequest }