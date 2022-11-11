import React, {FC, useContext, useState} from "react";
import {createResponseContextSingle, stringifyRequestQuery} from "../QueryHelpers";
import {initialQueryResponse} from "../QueryModels";
import {getAuth} from "../../../pages/auth/core/ShopAuthHelper";
import {useQuery} from "react-query";
import {User} from "../../../models/ShopUserModels";
import {useUserStateQueryRequest} from "../request/QueryUserStateRequestProvider";
import {getUser} from "../../../api/ShopUserApi";
import {ShopUseAuth} from "../../../pages/auth/core/ShopAuth";

type Props = {
    children: React.ReactNode
}

const QueryUserStateResponseContext = createResponseContextSingle<User>(initialQueryResponse)
const useUserStateQueryResponse = () => useContext(QueryUserStateResponseContext)

const useUserStateQueryResponseData = () => {
    const { response } = useUserStateQueryResponse()

    if (!response) {
        return []
    }
    return response?.data || []
}

const QueryUserStateResponseProvider: FC<Props> = ({ children }) => {
    const { state, update } = useUserStateQueryRequest()
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))

    const user = getAuth() as unknown as User
    const {setCurrentUser}  = ShopUseAuth()
    const {
        isFetching,
        refetch,
        data: response,
    } = useQuery(
        [update, user],
        () => {
            return getUser(user?.id)
        },
        {enabled:false, cacheTime: 0, refetchOnWindowFocus: false }
    )

    //setCurrentUser(response?.data)

    return (
        <QueryUserStateResponseContext.Provider value={{ isLoading: isFetching, refetch, response, query }}>
            {children}
        </QueryUserStateResponseContext.Provider>
    )
}

export {
    QueryUserStateResponseProvider,
    useUserStateQueryResponseData
}