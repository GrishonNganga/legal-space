import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { validateResetPasswordData } from '../validator'
import { changePassword, validateResetToken } from '../data/controller'

import { Button, Input, Notification } from '../components/ui'

import { userStore } from '../stores'
import SplashScreen from './splashScreen'

const ResetPassword = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const storeUser = userStore(state => state.storeUser)
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [tokenValid, setTokenValid] = useState(false)
    const [validatingToken, setValidatingToken] = useState(false)
    const [message, setMessage] = useState(false)
    const [info, setInfo] = useState({ message: "", type: "" })
    const [token, setToken] = useState("")
    const [passwordValid, setPasswordValid] = useState(false)

    useEffect(() => {
        const resetToken = location.pathname.split("/")[2]
        setToken(resetToken)
        setValidatingToken(true)
        validateResetToken(resetToken).then(response => {
            setValidatingToken(false)
            if (response?.status === "success") {
                setTokenValid(true)
            } else {
                setMessage(response?.message)
            }
        })

    }, [location])

    useEffect(() => {
        if (password?.length > 6 && password === confirmPassword) {
            setPasswordValid(true)
        } else {
            setPasswordValid(false)
        }
    }, [password, confirmPassword])

    const handleSubmit = async () => {
        if (token === "") {
            setInfo({ message: "Token not valid. Try again later", type: "error" })
            return
        }

        const validationResult = await validateResetPasswordData({ password: password, confirmPassword: confirmPassword })
        if (!validationResult.status) {
            setInfo({ message: validationResult.message, type: "error" })
            return
        }
        setInfo({ message: "", type: "" })
        setLoading(true)
        changePassword({ newPassword: password, resetLink: token }).then(response => {
            setLoading(false)
            setInfo({ message: response.message, type: response.status })
            if (response.status === "success") {
                storeUser(null)
                setTimeout(() => {
                    navigate('/signin')
                }, 2000)
            }
        })
    }

    return (
        <div className='w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-2'>
            {
                !validatingToken && tokenValid &&
                <div className='md:w-1/3 bg-white p-12'>
                    <div>
                        <Notification type={info?.type} message={info?.message} />
                    </div>
                    <div>
                        LegalSpace
                    </div>
                    <div className='text-gray-600 text-2xl font-semibold tracking-wide mt-3'>
                        New Password
                    </div>
                    <div className='mt-3 text-gray-500'>
                        Enter your new password
                    </div>
                    <div>
                        <div className="mt-3">
                            <Input
                                id={"reset-password"}
                                type={"password"}
                                name={"password"}
                                label=""
                                placeholder={"Enter your new password"}
                                autoComplete={""}
                                required={true}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </div>
                        <div className="mt-5">
                            <Input
                                id={"confirm-password"}
                                type={"password"}
                                name={"confirmPassword"}
                                label=""
                                placeholder={"Confirm password"}
                                autoComplete={""}
                                required={true}
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                            />
                        </div>
                    </div>
                    <div className='mt-5'>
                        <Button text={"Change password"} loading={loading} active={passwordValid} onClick={handleSubmit} />
                    </div>
                </div>
            }
            {
                validatingToken &&
                <SplashScreen />
            }
            {
                !validatingToken && !tokenValid &&
                <div className='md:w-1/3 w-full bg-white p-12'>
                    <div>
                        LegalSpace
                    </div>
                    <div className='text-red-500 font-semibold tracking-wide mt-3'>
                        {message}
                    </div>
                    <div className='mt-5'>
                        <Button text={"Try again"} active={true} loading={loading} onClick={() => { navigate('/forgot-password') }} />
                    </div>
                </div>
            }
        </div>
    )
}

export default ResetPassword