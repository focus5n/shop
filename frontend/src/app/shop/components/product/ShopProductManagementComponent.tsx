import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom';
import { productDelete, productGet } from '../../api/ShopProductApi'
import {toastDanger, toastSuccess} from '../../../../_h/utils/ToastUtils';
import { initialQueryState } from '../../helpers/query/QueryModels';
import { getRandomInt } from '../../../../_h/utils/HUtils';
import {useProductManageQueryRequest} from "../../helpers/query/request/QueryProductManageRequestProvider";
import {useCartQueryRequest} from "../../helpers/query/request/QueryCartRequestProvider";
import {current} from "immer";
import {ShopUseAuth} from "../../pages/auth/core/ShopAuth";
import toast from "../../../../_h/utils/study/UI/components/boot/js/src/toast";

type Props = {
    id: number
    name: string,
    description: string,
    price: number
    stock: number
    status: string,
    mainCategory: string,
    subCategory: string,
    img: string
    createAt: string
}


const ShopProductManagementComponent: FC<Props> = ({
    id,
    name,
    description,
    price,
    stock,
    status,
    mainCategory,
    subCategory,
    img,
    createAt
}) => {

    const { updateState } = useProductManageQueryRequest()
    const {setCart} = useCartQueryRequest()
    const {currentUser} = ShopUseAuth()
    const navigate = useNavigate()
    const get = async (id: number) => {
        const { data: product } = await productGet(id)
        if (product) {
            navigate('/shop/user/productModify', {state: {
                id: id
            }})
        }
    }

    const del = async (id: number) => {
        const { data: response } = await productDelete(id)
        if(currentUser?.email !== 'these990712@gmail.com') {
            toastDanger('권한이 없습니다')
            return
        }

        if (response.code) {
            updateState({ delete: id, ...initialQueryState })
            setCart(getRandomInt())
            toastSuccess('상품을 삭제 하였습니다')
        }
    }
    return (
        <div className="mb-9">
            <div className="p-6 border border-gray-light-v2 bg-gray-light-v3">
                <div className="row">
                    <div className="col-sm-3 col-md-2">
                        <div className="fw-bold">상태</div>
                        <div className="fw-normal">{status === 'SALE' ? <span className='text-success'>판매중</span> : <span className='text-danger'>품절</span>}</div>
                    </div>
                    <div className="col-sm-3 col-md-2">
                        <div className="fw-bold">재고</div>
                        <div className="fw-normal">{stock}개</div>
                    </div>
                    <div className="col-sm-3 col-md-4">
                        <div className="fw-bold">등록날짜</div>
                        <div className="fw-normal">{createAt}</div>
                    </div>
                    <div className="col-sm-3 col-md-4 ms-auto text-sm-end">
                        <div className="fw-bold">등록번호</div>
                        <div className="text-success">{id}</div>
                    </div>
                </div>
            </div>

            <div className="p-6 border border-gray-light-v2 bg-white align-items-center">
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <div className="row align-items-center">
                            <div className="col-md-4">
                                <img className="img-fluid w-150px h-150px"
                                    src={img} />
                            </div>
                            <div className="col-md-8">
                                <a href="#"
                                    className="fw-light fs-4 text-black text-hover-success">{name}</a>
                                <div className="text-dark-v3 fs-7 mb-3 mt-2 ps-1">{mainCategory}-{subCategory}</div>
                                <div className="text-success mb-4 ps-1">{price}원</div>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 flex flex-col">
                        <button onClick={() => get(id)}
                            className="btn bg-gray-light-v3 bg-hover-light-info text-gray-700 p-3 mb-3">상품수정</button>
                        <button onClick={() => del(id)}
                            className="btn bg-gray-light-v3 bg-hover-light-info text-gray-700 p-3 mt-3">상품삭제</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ShopProductManagementComponent }

