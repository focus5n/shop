import React, { useState } from 'react'
import * as Yup from 'yup';
import clsx from 'clsx';
import { ShopUseAuth } from './core/ShopAuth';
import { useFormik } from 'formik';
import { login } from '../../api/ShopUserApi';

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .required('필수 입력 사항입니다'),
    password: Yup.string()
        .required('필수 입력 사항입니다'),
});

const initialValues = {
    email: '',
    password: '',
};


const ShopLoginPage = () => {
    const [loading, setLoading] = useState(false);
    const { saveAuth, setCurrentUser } = ShopUseAuth();

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            setLoading(true);
            try  {
                const { data: user } = await login(values.email, values.password)

                if (user.data === '해당 사용자가 존재하지 않습니다.') {
                    setStatus("이메일이 틀립니다")
                    setSubmitting(false)
                    setLoading(false)
                    return
                }

                if (user.data === 'Bad credentials') {
                    setStatus("비밀번호가 틀립니다")
                    setSubmitting(false)
                    setLoading(false)
                    return
                }
                setCurrentUser(user.data)
                saveAuth(user.data)
            } catch (error) {
                saveAuth(undefined)
                setStatus('로그인 정보가 일치하지 않습니다.')
                setSubmitting(false)
                setLoading(false)
            }
        },
    });

    return (
        <div className="bg-white flex-grow-1">
            <div className="flex p-8 px-lg-20 justify-content-center">
                <div className="col-md-6 col-lg-5 border border-gray-light-v2 rounded-1 px-8 py-14 mw-600px">
                    <div className="fw-light fs-2 text-center mb-6">로그인</div>

                    {formik.status ? (
                        <div className="mb-4 alert alert-danger">
                            <div className="alert-text font-weight-bold">{formik.status}</div>
                        </div>
                    ) : (
                        <div className="mb-4 bg-light-info-white p-1 ps-0 rounded">
                            <div className="text-black text-gray-600 text-center fs-4">계정이 없다면 계정을 생성 해주세요</div>
                        </div>
                    )}

                    <form className="py-5" onSubmit={formik.handleSubmit} noValidate id="sign_form" autoComplete='off'>
                        <div className='flex flex-col mb-10'>
                            <div className="input-group">
                                <div className="bg-white input-group-text w-45px justify-content-center py-6">
                                    <i className="icon-finance-067 h-line-icon-pro"></i>
                                </div>
                                <input
                                    {...formik.getFieldProps('email')}

                                    className={clsx(
                                        'form-control form-con border border-gray-light-v3 rounded-2 rounded-start-0 ftrol-lg',

                                    )}
                                    placeholder="이메일을 입력 해주세요"
                                />
                            </div>
                
                        </div>

                        <div className="input-group mb-10">
                            <div className="bg-white input-group-text w-45px justify-content-center py-6">
                                <i className="icon-media-094 h-line-icon-pro"></i>
                            </div>
                            <input
                                {...formik.getFieldProps('password')}
                                type="password"
                                className="form-control form-control-flush border border-gray-light-v3 rounded-2 rounded-start-0"
                                placeholder="비밀번호를 입력 해주세요"
                            />
                        </div>

                        <div className="flex justify-content-between align-items-center ms-2 mb-15">
                            <div className="flex">
                                <input className="me-2" type="checkbox" />
                                <span>로그인 유지</span>
                            </div>
                            <div>
                                <a className="text-success text-hover-primary" href="./signup.html">회원가입 하러가기</a>
                            </div>
                        </div>

                        <button type='submit'
                            className="btn btn-success w-100 mb-20"
                            disabled={formik.isSubmitting || !formik.isValid}
                        >
                            {loading ? (
                                <span className='indicator-progress' style={{ display: 'block' }}>
                                    로그인 시도중...
                                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                </span>
                            ) : (
                                <span>로그인</span>
                            )
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export { ShopLoginPage }