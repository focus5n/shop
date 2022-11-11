import React from 'react'
import { Link } from 'react-router-dom';
import { HIMG } from '../../../../../_h/helpers/components/HIMG';
import { ShopUserSideMenuItem } from './ShopUserSideMenuItem';
import {ShopUseAuth} from "../../auth/core/ShopAuth";

const ShopUserSide = () => {
    const {currentUser} = ShopUseAuth()
    return (
        <div className="col-lg-3 mb-3">
            <div className="py-6 px-8 border border-gray-light-v2">
                <div className="text-center position-relative border-bottom border-gray-light-v2 mb-4">
                    <HIMG className='img-fluid rounded-circle w-100px h-100px' path='/media/imgs/shop/user/user3.png' />
                    <div className="my-5 ">{currentUser?.name}님</div>
                </div>

                {/*<ShopUserSideMenuItem*/}
                {/*    link="/shop/user/userlist"*/}
                {/*    title="회원관리"*/}
                {/*    icon="icon-finance-064  h-line-icon-pro pt-1"*/}
                {/*/>*/}

                <ShopUserSideMenuItem
                    link="/shop/user/productUpload"
                    title="상품등록"
                    icon="icon-finance-035  h-line-icon-pro pt-1"
                />

                <ShopUserSideMenuItem
                    link="/shop/user/productManagement"
                    title="상품관리"
                    icon="icon-finance-089  h-line-icon-pro pt-1"
                />

                <ShopUserSideMenuItem
                    link="/shop/user/myOrder"
                    title="내 주문"
                    icon="icon-finance-114  h-line-icon-pro pt-1"
                />

                <ShopUserSideMenuItem
                    link="/shop/user/cart"
                    title="장바구니"
                    icon="icon-medical-022  h-line-icon-pro pt-1"
                />

                {/*<ShopUserSideMenuItem*/}
                {/*    link="/shop/user/myPage"*/}
                {/*    title="내 정보"*/}
                {/*    icon="icon-finance-067  h-line-icon-pro pt-1"*/}
                {/*/>*/}
            </div>
        </div>
    )
}

export { ShopUserSide }