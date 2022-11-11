import React from 'react'
import clsx from 'clsx'
import {
    useProductCategoryQueryResponseLoading,
    useProductCategoryQueryResponsePagination
} from "../query/response/QueryProductCategoryResponseProvider";
import {useProductCategoryQueryRequest} from "../query/request/QueryProductCategoryRequestProvider";


const ProductCategoryListPagination = () => {
    const pagination = useProductCategoryQueryResponsePagination()
    const isLoading = useProductCategoryQueryResponseLoading()
    const { updateState } = useProductCategoryQueryRequest()
    const updatePage = (page: number | null) => {
        if (!page || isLoading || pagination.page === page) {
            return
        }
        updateState({ page, size: pagination.size || 8 })
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

export { ProductCategoryListPagination }
