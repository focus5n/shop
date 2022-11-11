import React, {createContext, FC, useContext, useState} from "react";
import {initialCartQueryRequest, initialQueryRequest, QueryCartRequestContextProps, QueryState} from "../QueryModels";

type Props = {
    children: React.ReactNode
}

const QueryCartRequestContext = createContext<QueryCartRequestContextProps>(initialCartQueryRequest)
const useCartQueryRequest = () => useContext(QueryCartRequestContext)

const QueryCartRequestProvider: FC<Props> = ({ children }) => {
    const [state, setState] = useState<QueryState>(initialQueryRequest.state)
    const [cart, setCart] = useState<number>(0)

    const updateState = (updates: Partial<QueryState>) => {
        const updateState = { ...state, ...updates } as QueryState
        setState(updateState)
    }

    return (
        <QueryCartRequestContext.Provider value={{ state, updateState, cart, setCart }}>
            {children}
        </QueryCartRequestContext.Provider>
    )
}

export {QueryCartRequestProvider, useCartQueryRequest}