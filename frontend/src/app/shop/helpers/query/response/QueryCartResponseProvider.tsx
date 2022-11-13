import {createResponseContext, stringifyRequestQuery} from "../QueryHelpers";
import {initialQueryResponse} from "../QueryModels";
import {Cart} from "../../../models/ShopCartModels";
import React, {FC, useContext, useState} from "react";
import {getAuth} from "../../../pages/auth/core/ShopAuthHelper";
import {useQuery} from "react-query";
import {cartList} from "../../../api/ShopCartApi";
import {useCartQueryRequest} from "../request/QueryCartRequestProvider";

type Props = {
    children: React.ReactNode
}

const QueryCartResponseContext = createResponseContext<Cart>(initialQueryResponse)
const useCartQueryResponse = () => useContext(QueryCartResponseContext)

const useCartQueryResponseData = () => {
    const { response } = useCartQueryResponse()

    if (!response) {
        return []
    }
    return response?.data || []
}

const QueryCartResponseProvider: FC<Props> = ({ children }) => {
    const { state, cart } = useCartQueryRequest()
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))

    const user = getAuth() as unknown as User

    const {
        isFetching,
        refetch,
        data: response,
    } = useQuery(
        [cart, user],
        () => {
            return cartList(user?.id)
        },
        {enabled:!!user?.id, cacheTime: 0 }
    )


    return (
        <QueryCartResponseContext.Provider value={{ isLoading: isFetching, refetch, response, query }}>
            {children}
        </QueryCartResponseContext.Provider>
    )
}

export {
    QueryCartResponseProvider,
    useCartQueryResponseData,
}