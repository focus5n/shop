import React from 'react'
import clsx from 'clsx'
import { useProductManageQueryResponseLoading, useProductManageQueryResponsePagination } from '../query/response/QueryProductManageResponseProvider'
import {useProductManageQueryRequest} from "../query/request/QueryProductManageRequestProvider";


const ProductManagementListPagination = () => {
    const { updateState } = useProductManageQueryRequest()
    const pagination = useProductManageQueryResponsePagination()
    const isLoading = useProductManageQueryResponseLoading()

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

export { ProductManagementListPagination }
