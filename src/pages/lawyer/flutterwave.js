import { CheckCircleIcon } from "@heroicons/react/20/solid"
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import { Button } from "../../components/ui"

const Flutterwave = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [paymentStatus, setPaymentSuccess] = useState(false)

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const paymentStatus = params.get("status")
        if (paymentStatus === "successful") {
            setPaymentSuccess(true)
        } else {
            setPaymentSuccess(false)
        }

    }, [location])
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-2'>

            {/* {
                validatingToken &&
                <SplashScreen />
            } */}

            <div className='md:w-1/3 w-full bg-white p-12'>
                <div className="mb-8">
                    LegalSpace
                </div>
                <div className="flex justify-center">
                    <div>
                        <CheckCircleIcon className="w-20 h-20 text-green-500" />
                    </div>
                </div>
                {
                    paymentStatus &&
                    <div>
                        <div className=' text-gray-500 mt-8 text-center'>
                            You LegalSpace payment was successful
                        </div>
                        <div className='mt-5'>
                            <Button text={"Visit dashboard"} active={true} onClick={() => { navigate('/dashboard') }} />
                        </div>
                    </div>
                }
                {
                    !paymentStatus &&
                    <div>
                        <div className=' text-gray-500 mt-8 text-center'>
                            You Legalspace payment did not go through
                        </div>
                        <div className='mt-5'>
                            <Button text={"Try again"} active={true} onClick={() => { navigate('/dashboard/settings/payment') }} />
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}
export default Flutterwave