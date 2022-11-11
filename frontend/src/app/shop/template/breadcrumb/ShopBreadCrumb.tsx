import React from 'react'
import { usePageData } from '../../../../_h/layout/core/PageData'

const ShopBreadCrumb = () => {
    const { pageTitle } = usePageData()
    return (
        <div className="p-8 border-bottom border-gray-light-v2 bg-white">
            <div className="container flex px-lg-20">
                <div className="me-3">Home</div>
                <div className="me-3">&gt;</div>
                <div className="me-3">Page</div>
                <div className="me-3">&gt;</div>
                <div className="text-success">{pageTitle}</div>
            </div>
        </div>
    )
}

export { ShopBreadCrumb }