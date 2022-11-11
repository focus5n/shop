import React, {useMemo} from 'react'
import {
    useOrderManageQueryResponseData,

} from "../../helpers/query/response/QueryOrderManageResponseProvider";

import {ShopOrderManageComponent} from "../../components/order/ShopOrderManageComponent";
import {OrderManagementListPagination} from "../../helpers/pagination/OrderManagementListPagination";

const ShopMyOrderPage = () => {
    const data = useOrderManageQueryResponseData()
    const orders = useMemo(() => data, [data])

    const render = () => {
        return orders.map((order, key) => {
            return (
                <ShopOrderManageComponent key={key}
                                          orderId={order.id}
                                          orderNumber={order.orderNumber}
                                          orderName={order.orderName}
                                          amount={order.amount}
                                          userId={order.userId}
                                          productId={order.productId}
                                          basicAddress={order.basicAddress}
                                          detailAddress={order.detailAddress}
                                          productImg={order.productImg}
                                          createdAt={order.createdAt}
                                          productCategory={order.productCategory}
                />
            )
        })
    }


    return (
        <>
            <div className="col-lg-9">
                {render()}
            </div>

            <div className="flex justify-content-end">
                <div id="pagination" className="pagination">
                    <OrderManagementListPagination/>
                </div>
            </div>
        </>
    )
}

export {ShopMyOrderPage}