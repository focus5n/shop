import React, { useEffect, useState } from "react"

import {useDebounce} from '../query/QueryHelpers'
import {initialQueryState} from '../query/QueryModels'
import {useProductManageQueryRequest} from "../query/request/QueryProductManageRequestProvider";

const ShopProductManagementSearch = () => {
    const {updateState} = useProductManageQueryRequest()
    const [searchString, setSearchString] = useState<string>('')
    const debounceSearchString = useDebounce(searchString, 150)

    useEffect(() => {
        if (debounceSearchString !== undefined && searchString !== undefined) {
            updateState({ search: debounceSearchString, ...initialQueryState })
        }
    }, [debounceSearchString])

    return (
        <form id="searchForm" className="w-300px position-relative">
            <div className="input-group">
                <span
                    className="position-absolute z-index-10 start-0 top-0 py-4 px-4 text-black w-50px">
                    <i className="icon-education-045 h-line-icon-pro text-gray-400"></i>
                </span>
                <input className="form-control form-control-flush border border-success ps-10" type="text"
                    placeholder="상품 이름을 입력 해주세요" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
                <button className="btn btn-success text-uppercase px-3 rounded-0"
                    type="submit">검색</button>
            </div>
        </form>
    )
}

export {ShopProductManagementSearch}