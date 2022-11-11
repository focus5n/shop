import {useProductManageQueryRequest} from "../query/request/QueryProductManageRequestProvider";
import {
    useProductManageQueryResponseLoading,
    useProductManageQueryResponsePagination
} from "../query/response/QueryProductManageResponseProvider";
import clsx from "clsx";
import React from "react";
import {useOrderManageQueryRequest} from "../query/request/QueryOrderManageRequestProvider";
import {useOrderManageQueryResponsePagination} from "../query/response/QueryOrderManageResponseProvider";
import {useProductCategoryQueryResponseLoading} from "../query/response/QueryProductCategoryResponseProvider";

const OrderManagementListPagination = () => {
    const { updateState } = useOrderManageQueryRequest()
    const pagination = useOrderManageQueryResponsePagination()
    const isLoading = useProductCategoryQueryResponseLoading()

    const updatePage = (page: number | null) => {
        if (!page || isLoading || pagination.page === page) {
            return
        }
        updateState({ page, size: pagination.size || 10 })
    }

    return (
        <>
            {pagination.links?.map((link) => (
                <a
                    key={link.label}
                    className={clsx('page-link text-hover-success bg-hover-white', {
                        'text-success': pagination.page === link.page,
                        'd-none': link.page === -1,
                        disabled: isLoading,
                        previous: link.label === '&laquo; Previous',
                        next: link.label === 'Next &raquo;',
                    })}
                    onClick={() => updatePage(link.page)}
                    style={{ cursor: 'pointer' }}
                >
                    {link.label}
                </a>
            ))}
        </>
    )
}

export { OrderManagementListPagination }