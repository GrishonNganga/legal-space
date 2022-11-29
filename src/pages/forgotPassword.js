import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { validateForgetPasswordData } from '../validator'
import { forgotPassword } from '../data/controller'

import { Button, Input, Notification } from '../components/ui'

import { userStore } from '../stores'

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [info, setInfo] = useState({ message: "", type: "" })
    const [emailSent, setEmailSent] = useState(false)
    const [emailProvided, setEmailProvided] = useState(false)

    useEffect(() => {
        validateEmail().then(result => {
            if (result) {
                setEmailProvided(true)
            } else {
                setEmailProvided(false)
            }
        })

    }, [email])

    const validateEmail = async () => {
        const validationResult = await validateForgetPasswordData(email)
        if (!validationResult.status) {
            return false
        }
        return true
    }

    const handleSubmit = async () => {
        const validationResult = await validateForgetPasswordData(email)
        if (!validationResult.status) {
            setInfo({ message: validationResult.message, type: "error" })
            return
        }
        setInfo({ message: "", type: "" })
        setLoading(true)
        forgotPassword(email).then(response => {
            setLoading(false)
            setInfo({ message: response?.message, type: response?.status })
            setTimeout(() => {
                setEmailSent(true)
            }, 1000)
        })
    }

    return (
        <div className='w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-2'>
            <div className='md:w-1/3 bg-white p-12'>
                <div>
                    <Notification type={info?.type} message={info?.message} />
                </div>
                <div className='mt-3'>
                    LegalSpace
                </div>
                <div className='text-gray-600 text-2xl font-semibold tracking-wide mt-3'>
                    Forgot Password
                </div>
                <div className='mt-3 text-gray-500'>
                    Enter your registered email address to change your Legalspace account password.
                </div>
                <div>
                    <div className="mt-3">
                        <Input
                            id={"signin-email"}
                            type={"email"}
                            name={"email"}
                            label=""
                            placeholder={"Enter your email address"}
                            autoComplete={"email"}
                            required={true}
                            onChange={(e) => { setEmail(prevState => ({ ...prevState, "email": e.target.value })) }}
                        />
                    </div>
                </div>
                {
                    !emailSent &&
                    <div className='mt-5'>
                        <Button text={"Next"} loading={loading} active={emailProvided} onClick={handleSubmit} type="secondary" />
                    </div>
                }
            </div>
        </div>
    )
}

export default ForgotPassword