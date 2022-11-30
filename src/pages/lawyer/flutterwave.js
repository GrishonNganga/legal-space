import { CheckCircleIcon } from "@heroicons/react/20/solid"
import { useNavigate } from "react-router-dom"

import { Button } from "../../components/ui"

const Flutterwave = () => {
    const navigate = useNavigate()
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
                        <CheckCircleIcon className="w-20 h-20 text-green-500"/>
                    </div>
                </div>
                <div className=' text-gray-500 mt-8 text-center'>
                    You have successfully subscribed to Legalspace Counsel Monthly Plan
                </div>
                <div className='mt-5'>
                    <Button text={"Visit dashboard"} active={true} onClick={() => { navigate('/forgot-password') }} />
                </div>
            </div>

        </div>
    )
}
export default Flutterwave