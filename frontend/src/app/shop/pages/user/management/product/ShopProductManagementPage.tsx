import React from 'react'
import { useProductManageQueryResponseData, useProductManageQueryResponseLoading } from '../../../../helpers/query/response/QueryProductManageResponseProvider'
import { useMemo } from 'react';
import { ShopProductManagementComponent } from '../../../../components/product/ShopProductManagementComponent';
import { ShopProductManagementSearch } from '../../../../helpers/search/ShopProductManagementSearch';
import { ShopSearchLoading } from '../../../../helpers/loading/ShopSearchLoading';
import { ProductManagementListPagination } from '../../../../helpers/pagination/ProductManagementListPagination';

const ShopProductManagementPage = () => {
    const data = useProductManageQueryResponseData()
    const products = useMemo(() => data, [data])
    const isLoading = useProductManageQueryResponseLoading()

    const render = () => {
        if(products.length === 0) {
            return (
                <div>상품이 없습니다</div>
            )
        }
        return products.map((product, key) => {
            return (
                <ShopProductManagementComponent
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    stock={product.stock}
                    status={product.status}
                    mainCategory={product.mainCategory}
                    subCategory={product.subCategory}
                    img={product.img}
                    createAt={product.createAt}
                    key={key} />
            )
        })
    }



    return (
        <>
            <div className="col-lg-9">
                <div className="flex justify-content-end mb-6">
                    <div className="w-300px">
                      <ShopProductManagementSearch/>
                    </div>
                </div>

                {render()}
            </div>

            <div className="flex justify-content-end">
                <div id="pagination" className="pagination">
                    <ProductManagementListPagination />
                    {isLoading && <ShopSearchLoading />}
                </div>
            </div>
        </>
    )
}

export { ShopProductManagementPage }