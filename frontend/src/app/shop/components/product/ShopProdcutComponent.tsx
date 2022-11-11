import clsx from 'clsx'
import React, {useMemo} from 'react'
import { useNavigate } from 'react-router-dom'
import { HIMG } from '../../../../_h/helpers/components/HIMG'
import { productGet } from '../../api/ShopProductApi'
import { productLikeDown, productLikeUp} from '../../api/ShopLikesApi'
import { cartSave } from '../../api/ShopCartApi'
import { Product } from '../../models/ShopProductModels'
import { getAuth } from '../../pages/auth/core/ShopAuthHelper'
import { User } from '../../models/ShopUserModels'
import { toastDanger, toastSuccess } from '../../../../_h/utils/ToastUtils';
import { getRandomInt } from '../../../../_h/utils/HUtils'
import {useCartQueryRequest} from "../../helpers/query/request/QueryCartRequestProvider";
import {useLikeQueryRequest} from "../../helpers/query/request/QueryLikeRequestProvider";
import {useLikeQueryResponseData} from "../../helpers/query/response/QueryLikeResponseProvider";
import {useBestQueryRequest} from "../../helpers/query/request/QueryBestRequestProvider";

type Props = {
    id: number
    name: string,
    mainCategory: string
    subCategory: string,
    status: string
    price: number,
    path: string,
    product: Product
}


const ShopProductComponent: React.FC<Props> = ({
    id,
    name,
    mainCategory,
    subCategory,
    status,
    price,
    path,
    product
}) => {
    const user = getAuth() as User | undefined
    const navigate = useNavigate()
    const { setCart } = useCartQueryRequest()
    const { setLike } = useLikeQueryRequest();
    const { setBest } = useBestQueryRequest()

    const data = useLikeQueryResponseData()
    const likes = useMemo(() => data, [data])

    const detail = async (id: number) => {
        const { data: product } = await productGet(id)
        if (product) {
            navigate('/shop/productDetail', {
                state: {
                    product: product
                }
            })
        }
    }

    const cart = async (productId: number) => {
        if (!user) {
            toastDanger('로그인 하신 뒤 이용 가능 합니다')
            return
        }

        const { data: cart } = await cartSave(1, user?.id, productId)

        if (cart.data) {
            setCart(getRandomInt())
            toastSuccess('카트에 저장 하였습니다')
        }
    }

    const likeUp = async (userId: number | undefined, productId: number) => {
        if (!userId) {
            toastDanger('로그인 하신 뒤 이용 가능 합니다')
            return
        }
        const { data: product } = await productLikeUp(userId, productId)

        if (product) {
            toastSuccess('이 상품을 추천 하였습니다')
            setLike(getRandomInt())
            setBest(getRandomInt())
        }
    }

    const likeDown = async (likesId: number,userId: number | undefined) => {
        if (!userId) {
            toastDanger('로그인 하신 뒤 이용 가능 합니다')
            return
        }
        const { data: product } = await productLikeDown(likesId)

        if (product) {
            toastSuccess('추천을 취소 하였습니다')
            setLike(getRandomInt())
            setBest(getRandomInt())

        }
    }

    const likeRender = () => {

        let check = false
        let likeId = -1
        likes.map((like) => {
            if(product.id === like.productId) {
                check = true
                likeId = like.likesId
            }
        })
        if(check) {
            return (
                <a onClick={() => likeDown(likeId ,user?.id)}><i className="svg-icon svg-icon-2x svg-icon-success bi bi-heart-fill h-line-icon-pro text-hover-success"></i></a>
            )
        } else {
            return (
                <a onClick={() => likeUp(user?.id, product.id)}><i className="icon-medical-022 h-line-icon-pro text-hover-success"></i></a>
            )
        }
    }

    return (
        <div className="col-6 col-lg-3 mb-8 cursor-pointer">
            <div className="position-relative mb-6" onClick={() => detail(id)}>
                <HIMG className="img-fluid h-350px w-100" path={path} />
                <span className={clsx(
                    'position-absolute bottom-0 start-0 p-1 w-100 text-center text-white',
                    { 'bg-success': status === 'SALE' },
                    { 'bg-danger': status === 'SOLD_OUT' },
                )}>{status}</span>
            </div>

            <div className="flex justify-content-between align-items-center">
                <div className="flex flex-col">
                    <span onClick={() => detail(id)} className="text-dark fw-bold text-hover-success">{name}</span>
                    <span className="text-gray-400">{mainCategory}-{subCategory}</span>
                    <span className="fw-bold">{price}원</span>
                </div>
                <div>
                    <a onClick={() => cart(product.id)}><i className="icon-finance-100 h-line-icon-pro me-3 text-hover-success"></i></a>
                    {likeRender()}


                </div>
            </div>
        </div>
    )
}

export { ShopProductComponent }