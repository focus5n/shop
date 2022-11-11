import React, { useMemo } from 'react'
import { useUserQueryResponseData, useUserQueryResponseLoading } from '../../../../helpers/query/response/QueryUserResponseProvider'
import { ShopUserManagementComponent } from '../../../../components/user/ShopUserManagementComponent';

const ShopUserManagementPage = () => {
    const data = useUserQueryResponseData()
    const users = useMemo(() => data, [data])
    const isLoading = useUserQueryResponseLoading()

    const render = () => {
        if (users.length === 0) {
            return (
                <div>회원이 없습니다</div>
            )
        }

        return users.map((user, key) => {
            return (
                <ShopUserManagementComponent
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    role={user.role}
                    createdAt={user.createAt}
                    key={key}
                />
            )
        })
    }
    return (
        <div className="col-lg-9">

            <div className="flex justify-content-end mb-6">
                <div className="w-300px">
                    <div className="input-group">
                        <span
                            className="position-absolute z-index-3 start-0 top-0 py-4 px-4 text-black w-100px">
                            <i className="icon-education-045 h-line-icon-pro text-gray-400"></i>
                        </span>
                        <input type="text" className="form-control" />
                        <button className="btn btn-bg-dark text-white" type="button">검색</button>
                    </div>
                </div>
            </div>

            {render()}
        </div>
    )
}

export { ShopUserManagementPage }