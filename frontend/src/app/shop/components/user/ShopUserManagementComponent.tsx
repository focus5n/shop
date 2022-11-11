import React, {FC} from 'react'
import { HIMG } from '../../../../_h/helpers/components/HIMG'
import { Link } from 'react-router-dom';
import { userDelete } from '../../api/ShopUserApi'
import { toastSuccess } from '../../../../_h/utils/ToastUtils';
import { initialQueryState } from '../../helpers/query/QueryModels';
import {useUserManageQueryRequest} from "../../helpers/query/request/QueryUserManageRequestProvider";

type Props = {
    id: number
    name: string,
    email: string,
    createdAt: string,
    role: string
}


const ShopUserManagementComponent: FC<Props> = ({
    id,
    name,
    email,
    createdAt,
    role
}) => {

    const { updateState } = useUserManageQueryRequest()

    const del = async (id: number) => {
        const { data: response } = await userDelete(id)
        if (response.code) {
            updateState({ delete: id, ...initialQueryState })
            toastSuccess('회원을 탈퇴 시켰습니다')
        }
    }

    return (
        <div className="mb-9">
            <div className="p-6 border border-gray-light-v2 bg-gray-light-v3">
                <div className="flex">
                    <div className="col-sm-3 col-md-2">
                        <div className="fw-bold text-dark-v3">회원구분</div>
                        <div className="fw-normal text-dark-v3">{role === 'ADMIN' ? '관리자' : '회원'}</div>
                    </div>
                    <div className="col-sm-3 col-md-3">
                        <div className="fw-bold text-dark-v3">이메일</div>
                        <div className="fw-normal text-dark-v3">{email}</div>
                    </div>
                    <div className="col-sm-3 col-md-5">
                        <div className="fw-bold text-dark-v3">가입일</div>
                        <div className="fw-normal text-dark-v3">{createdAt}</div>
                    </div>
                    <div className="col-sm-3 col-md-2 ms-auto text-sm-end">
                        <div className="fw-bold">회원번호</div>
                        <div className="text-success">{id}</div>
                    </div>
                </div>
            </div>

            <div className="p-6 border border-gray-light-v2 bg-white align-items-center">
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <HIMG className='img-fluid rounded-circle w-100px h-100px' path='/media/imgs/shop/user/user3.png' />
                            </div>
                            <div className="col-md-8">
                                <div className="text-dark-v3 fs-4 mb-3 mt-2 ps-1">{name}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 flex flex-col">
                        <button onClick={() => del(id)}
                            className="btn bg-gray-light-v3 bg-hover-light-info text-gray-700 p-3 mb-3">회원탈퇴</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ShopUserManagementComponent }

