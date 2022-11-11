import React from 'react'
import {getAuth} from '../auth/core/ShopAuthHelper'
const ShopMyPage = () => {
    
    const user = getAuth()
    console.log(user)
    return (
        <div className="col-lg-9">
            <div>
                <div className="mb-9">
                    <div className="p-8 pt-3 border border-gray-light-v2">
                        <div className="row border-bottom border-gray-light-v2 py-5">
                            <div className="col-md-6">
                                <div className="fs-5 fw-normal text-gray-800">이름:</div>
                                <div className="fs-5 fw-normal text-gray-800">{user?.name}</div>
                            </div>
                            <div className="col-md-6 pe-9">
                                <div className="flex justify-content-end">
                                    <button className="btn btn-success">수정하기</button>
                                </div>
                            </div>
                        </div>

                        <div className="row border-bottom border-gray-light-v2 py-5">
                            <div className="col-md-6">
                                <div className="fs-5 fw-normal text-gray-800">이메일:</div>
                                <div className="fs-5 fw-normal text-gray-800">{user?.email}
                                </div>
                            </div>
                            <div className="col-md-6 pe-9">
                                <div className="flex justify-content-end">
                                    <button className="btn btn-success">수정하기</button>
                                </div>
                            </div>
                        </div>

                        <div className="row border-bottom border-gray-light-v2 py-5">
                            <div className="col-md-6">
                                <div className="fs-5 fw-normal text-gray-800">연락처:</div>
                                <div className="fs-5 fw-normal text-gray-800">010-4018-6763</div>
                            </div>
                            <div className="col-md-6 pe-9">
                                <div className="flex justify-content-end">
                                    <button className="btn btn-success">수정하기</button>
                                </div>
                            </div>
                        </div>

                        <div className="row border-bottom border-gray-light-v2 py-5">
                            <div className="col-md-6">
                                <div className="fs-5 fw-normal text-gray-800">배송지:</div>
                                <div className="fs-5 fw-normal text-gray-800">서울시 가산동 143-49</div>
                            </div>
                            <div className="col-md-6 pe-9">
                                <div className="flex justify-content-end">
                                    <button className="btn btn-success">수정하기</button>
                                </div>
                            </div>
                        </div>

                        <div className="row pt-5">
                            <div className="col-md-6">
                                <div className="fs-5 fw-normal text-gray-800">포인트:</div>
                                <div className="fs-5 fw-normal text-gray-800">3000</div>
                            </div>
                            <div className="col-md-6 pe-9">
                                <div className="flex justify-content-end">
                                    <button className="btn btn-success">수정하기</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 pe-0">
                        <div className="flex justify-content-end pt-0">
                            <button className="btn btn-success w-100px">업데이트</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ShopMyPage }