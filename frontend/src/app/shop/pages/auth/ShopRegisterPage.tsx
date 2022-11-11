
import clsx from 'clsx'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { ShopUseAuth } from './core/ShopAuth'
import { register } from '../../api/ShopUserApi';

const userSchema = Yup.object().shape({
    email: Yup.string()
        .email("잘못된 이메일 형식입니다.")
        .required("이메일은 필수 입력 사항 입니다."),
    name: Yup.string()
        .min(2, '이름은 두 글자 이상이여야 합니다.')
        .max(10, '이름은 열 글자 이하 입니다.')
        .required("이른은 필수 입력 사항 입나다."),
    password: Yup.string()
        .min(4, "비밀번호는 4자 이상이여야 합니다.")
        .max(20, "비밀번호는 최대 20자 입니다.")
        .required("비밀번호는 필수 입력 사항 입니다."),
    confirmPassword: Yup.string()
        .required("필수 입력 사항 입니다.")
        .when('password', {
            is: (val: string) => (!!(val && val.length > 0)),
            then: Yup.string().oneOf([Yup.ref('password')], '입력하신 비밀번호와 일치하지 않습니다.')
        })
})

const initialValues = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    role: 'USER'
}

const ShopRegisterPage = () => {
    const [loading, setLoading] = useState(false)
    const { setCurrentUser, saveAuth } = ShopUseAuth()
    const formik = useFormik({
        initialValues,
        validationSchema: userSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            setLoading(true)
            try {
                const { data: user } = await register(
                    values.email,
                    values.password,
                    values.name,
                    values.role
                )

                if (user.errorMessage) {
                    setStatus(user.errorMessage)
                    setSubmitting(false)
                    setLoading(false)
                    return
                }

                setCurrentUser(user)
                saveAuth(user)
            } catch (error) {
                setSubmitting(false)
                setLoading(false)
            }
        }
    })

    return (
        <div className="bg-white flex-grow-1">
            <div className="flex p-8 px-lg-20 justify-content-center">
                <div className="col-md-6 col-lg-5 border border-gray-light-v2 rounded-1 px-8 py-14 mw-600px">
                    <div className="fw-light fs-2 text-center mb-6">회원가입</div>

                    <div>
                        {formik.status ? (
                            <div className='mb-lg-15 alert alert-danger'>
                                <div className='alert-text font-weight-bold'>{formik.status}</div>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>

                    <form className="py-5" onSubmit={formik.handleSubmit} noValidate id="sign_form" autoComplete='off'>
                        <div className="input-group mb-8">
                            <div className='flex flex-col flex-grow-1'>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        {...formik.getFieldProps('email')}
                                        className={clsx(
                                            'form-control form-con ftrol-lg',
                                            '',
                                            { 'is-invalid': formik.touched.email && formik.errors.email },
                                            { 'is-valid': formik.touched.email && !formik.errors.email }
                                        )}
                                        placeholder="이메일"
                                        autoComplete='off'

                                    />
                                    <label htmlFor="floatingInput" className='text-muted'>이메일</label>
                                </div>
                                {formik.touched.email && formik.errors.email && (
                                    <div className='fv-plugins-message-container'>
                                        <span role='alert' className='text-muted ps-2'>{formik.errors.email}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="input-group mb-8">
                            <div className='flex flex-col flex-grow-1'>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        {...formik.getFieldProps('name')}
                                        className={clsx(
                                            'form-control form-con ftrol-lg',
                                            '',
                                            { 'is-invalid': formik.touched.name && formik.errors.name },
                                            { 'is-valid': formik.touched.name && !formik.errors.name }
                                        )}
                                        placeholder="이름"
                                        maxLength={10}
                                        autoComplete='off'


                                    />
                                    <label htmlFor="floatingInput" className='text-muted'>이름</label>
                                </div>
                                {formik.touched.name && formik.errors.name && (
                                    <div className='fv-plugins-message-container'>
                                        <span role='alert' className='text-muted ps-2'>{formik.errors.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>


                        <div className="input-group mb-8">
                            <div className='flex flex-col flex-grow-1'>
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        {...formik.getFieldProps('password')}
                                        className={clsx(
                                            'form-control form-con ftrol-lg',
                                            '',
                                            { 'is-invalid': formik.touched.password && formik.errors.password },
                                            { 'is-valid': formik.touched.password && !formik.errors.password }
                                        )}
                                        placeholder="비밀번호"
                                        autoComplete='off'


                                    />
                                    <label htmlFor="floatingInput" className='text-muted'>비밀번호</label>
                                </div>
                                {formik.touched.password && formik.errors.password && (
                                    <div className='fv-plugins-message-container'>
                                        <span role='alert' className='text-muted ps-2'>{formik.errors.password}</span>
                                    </div>
                                )}
                            </div>
                        </div>


                        <div className="input-group mb-8">
                            <div className='flex flex-col flex-grow-1'>
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        {...formik.getFieldProps('confirmPassword')}
                                        className={clsx(
                                            'form-control form-con ftrol-lg',
                                            '',
                                            { 'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword },
                                            { 'is-valid': formik.touched.confirmPassword && !formik.errors.confirmPassword }
                                        )}
                                        placeholder="비밀번호 확인"
                                    />
                                    <label htmlFor="floatingInput" className='text-muted'>비밀번호 확인</label>
                                </div>
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                    <div className='fv-plugins-message-container'>
                                        <span role='alert' className='text-muted ps-2'>{formik.errors.confirmPassword}</span>
                                    </div>
                                )}
                            </div>
                        </div>


                        <div className="flex justify-content-end align-items-center ms-2 mb-8">
                            <div>
                                <a className="text-success text-hover-primary fs-7 fw-bolder" href="./login.html"
                                >로그인 하러가기</a
                                >
                            </div>
                        </div>

                        <button type='submit'
                            className="btn btn-success w-100 mb-20"
                            disabled={formik.isSubmitting || !formik.isValid}
                        >
                            {loading ? (
                                <span className='indicator-progress' style={{ display: 'block' }}>
                                    회원가입을 진행 하고 있습니다...
                                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                </span>
                            ) : (
                                <span>회원가입</span>
                            )
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export { ShopRegisterPage }