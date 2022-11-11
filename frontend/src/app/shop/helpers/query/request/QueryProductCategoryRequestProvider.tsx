import React, {createContext, FC, useContext, useState} from "react";
import {
    initialProductCategoryQueryRequest,
    initialQueryRequest,
    QueryProductCategoryRequestContextProps,
    QueryState
} from "../QueryModels";

type Props = {
    children: React.ReactNode
}

const QueryProductCategoryRequestContext = createContext<QueryProductCategoryRequestContextProps>(initialProductCategoryQueryRequest)
const useProductCategoryQueryRequest = () => useContext(QueryProductCategoryRequestContext)

const QueryProductCategoryRequestProvider: FC<Props> = ({ children }) => {
    const [state, setState] = useState<QueryState>(initialProductCategoryQueryRequest.state)
    const [mainCategory, setMainCategory] = useState<string>('')
    const [subCategory, setSubCategory] = useState<string>('')

    const updateState = (updates: Partial<QueryState>) => {
        const updateState = { ...state, ...updates } as QueryState
        setState(updateState)
    }

    return (
        <QueryProductCategoryRequestContext.Provider value={{ state, updateState, mainCategory, setMainCategory, subCategory, setSubCategory }}>
            {children}
        </QueryProductCategoryRequestContext.Provider>
    )
}

export { QueryProductCategoryRequestProvider, useProductCategoryQueryRequest}