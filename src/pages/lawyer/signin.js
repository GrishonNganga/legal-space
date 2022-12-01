import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input, Button, SplashCircles, Notification } from "../../components/ui"

import { userStore } from "../../stores"

import { validateSigninData } from '../../validator'
import { signin } from "../../data/controller"

const Signin = () => {
    const navigate = useNavigate()
    const storeUser = userStore(state => state.storeUser)
    const user = userStore(state => state.user)

    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState({ message: "", type: "" })

    useEffect(() => {
        if(user){
            navigate('/dashboard')
        }
    }, [user])
    const handleSubmit = async () => {
        setInfo({ message: "", type: "" })
        const validationResult = await validateSigninData(userDetails)
        if (!validationResult.status) {
            setInfo({ message: validationResult.message, type: "error" })
            return
        }
        setLoading(true)
        signin(userDetails).then(response => {
            setLoading(false)
            setInfo({ message: response.message, type: response.status })
            if (response.status === "success") {
                storeUser(response.data.user)
                navigate('/dashboard')
            }
        })
    }


    return (
        <div className="flex flex-1 min-h-full w-full h-screen transition-opacity delay-300">
            <div>
                <Notification type={info.type} message={info.message} />
            </div>
            <div className="w-full md:w-4/5 h-full flex flex-col bg-legalGreen">
                <div className="md:hidden w-full flex justify-center py-8 md:py-0">
                    <div className="text-legalYellow font-semibold">
                        You are one step away, Sign in!
                    </div>
                </div>
                <div className="relative w-full h-full -mt-5 md:mt-0">
                    <div className="md:hidden absolute p-5 w-full h-full">
                        <div className="bg-white opacity-50 w-full h-full">

                        </div>
                    </div>
                    <div className="md:hidden absolute top-6 p-2 w-full h-full ">
                        <div className="bg-white opacity-50 w-full h-full">

                        </div>
                    </div>
                    <div className="absolute top-12 md:top-0 w-full h-full">
                        <div className="bg-white w-full h-full flex justify-center pt-8">
                            <div className="space-y-6 w-4/5 md:w-2/3">
                                <div>
                                    <div className="mt-1">
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            label="Email Address"
                                            autoComplete="email"
                                            required
                                            onChange={(e) => { setUserDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="mt-1">
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            label="Password"
                                            autoComplete="false"
                                            required
                                            onChange={(e) => { setUserDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-sm">
                                        <a href="/forgot-password" className="font-medium text-legalYellow hover:opacity-60">
                                            Forgot your password?
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <Button text="Log in" type="secondary" onClick={handleSubmit} loading={loading} active={true} />
                                </div>
                                <div className="mt-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300" />
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-6">
                                        <div className="w-1/2">
                                            <a
                                                href="/signin"
                                                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                                            >
                                                <span className="sr-only">Sign in with Facebook</span>
                                                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </a>
                                        </div>

                                        <div className="w-1/2">
                                            <a
                                                href="/signin"
                                                className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                                            >
                                                <span className="sr-only">Sign in with Twitter</span>
                                                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <span className="text-sm text-legalBlue">
                                            Not a member?
                                        </span>
                                        <span className="ml-2 font-bold text-sm hover:underline cursor-pointer" onClick={() => { navigate('/lawyer-signup') }}>Sign up</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-screen hidden lg:flex">
                <SplashCircles />
            </div>
        </div>
    )
}
export default Signin