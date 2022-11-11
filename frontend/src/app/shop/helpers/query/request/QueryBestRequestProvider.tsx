import React, {createContext, FC, useContext, useState} from "react";
import {initialBestQueryRequest, QueryBestRequestContextProps} from "../QueryModels";

type Props = {
    children: React.ReactNode
}

const QueryBestRequestContext = createContext<QueryBestRequestContextProps>(initialBestQueryRequest)
const useBestQueryRequest = () => useContext(QueryBestRequestContext)

const QueryBestRequestProvider: FC<Props> = ({ children }) => {
    const [best, setBest] = useState<number>(0)

    return (
        <QueryBestRequestContext.Provider value={{best, setBest}}>
            {children}
        </QueryBestRequestContext.Provider>
    )
}

export {QueryBestRequestProvider, useBestQueryRequest}