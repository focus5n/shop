import React from 'react'
import { useLocation } from 'react-router-dom'
import { ShopProductComponent } from '../../components/product/ShopProdcutComponent'
import { useMemo } from 'react';
import { useEffect } from 'react';
import { ProductCategoryListPagination } from '../../helpers/pagination/ProductCategoryListPagination'
import {initialProductCategoryQueryState, initialQueryState} from "../../helpers/query/QueryModels";
import {useProductCategoryQueryResponseData} from "../../helpers/query/response/QueryProductCategoryResponseProvider";
import {useProductCategoryQueryRequest} from "../../helpers/query/request/QueryProductCategoryRequestProvider";

type LocationProps = {
    state: {
        mainCategory: string
        subCategory: string
    }
}

const ShopProductListPage = () => {
    const { updateState, setMainCategory, setSubCategory } = useProductCategoryQueryRequest()
    const location = useLocation() as unknown as LocationProps
    const mainCategory = location.state.mainCategory
    const subCategory = location.state.subCategory

    const data = useProductCategoryQueryResponseData()
    const products = useMemo(() => data, [data])
    
    useEffect(() => {   
        setMainCategory(mainCategory)
        setSubCategory(subCategory)
        updateState({mainCategory: mainCategory, subCategory:subCategory, ...initialProductCategoryQueryState}) //카테고리 바꿀시 페이지 1 초기화
    }, [mainCategory, subCategory])

    const render = () => {
        if (data.length === 0) {
            return (
                <div>상품이 없습니다</div>
            )
        }

        return products.map((product, key) => {
            return (
                <ShopProductComponent
                    product={product}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    mainCategory={product.mainCategory}
                    subCategory={product.subCategory}
                    status={product.status}
                    path={product.img}
                    key={key} />
            )
        })
    }

    return (

        <div className="container py-8"  >
            <div className="row">
                {render()}
            </div>

            <div className="flex justify-content-end">
                <div id="pagination" className="pagination">
                    <ProductCategoryListPagination />
                </div>
            </div>
        </div >

    )
}

export { ShopProductListPage }