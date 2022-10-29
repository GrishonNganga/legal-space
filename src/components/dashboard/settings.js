import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { CheckIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'


import mpesa from '../../assets/mpesa.png'

import { Input, Modal } from '../../components/ui'

import { Button } from '../ui'
const Settings = () => {
    return (
        <Routes>
            <Route path="/payment" element={<Payment />} />
        </Routes>
    )
}

export default Settings

const Payment = () => {
    const navigate = useNavigate()

    const [step, setStep] = useState(1)
    const [paymentSuccess, setPaymentSuccess] = useState(false)

    return (
        <div className='relative'>
            {
                step === 1 &&
                <SelectPlan step={step} setStep={setStep} />
            }
            {
                step === 2 &&
                <CompletePayment finishPayment={setPaymentSuccess} />
            }
            {
                paymentSuccess &&
                <div className='absolute top-0 w-full h-full'>
                    <div className='w-full h-full backdrop-blur-sm flex justify-center items-center z-40'>
                        <Modal open={paymentSuccess} setOpen={() => { setPaymentSuccess(prevState => !prevState); navigate('/dashboard') }} ui={<PaymentSuccessModal />} />
                    </div>
                </div>
            }
        </div>
    )
}

const SelectPlan = ({ step, setStep }) => {
    return (
        <div className="py-4 px-4">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-gray-900">Hello Bendon</h1>
                <h1 className="mt-2 font-semibold text-[#183A33]">Please select a plan for you</h1>

            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4 flex flex-col">
                    <div className='text-3xl font-bold'>
                        Basic Plan
                    </div>
                    <div className='flex flex-col mt-5 gap-y-3 justify-center'>
                        <div className='flex gap-x-3'>
                            <div>
                                <CheckIcon className='w-5 h-5 text-legalBlue font-semibold' />
                            </div>
                            <div>
                                Individual plan
                            </div>
                        </div>
                        <div className='flex gap-x-3'>
                            <div>
                                <CheckIcon className='w-5 h-5 text-legalBlue font-semibold' />
                            </div>
                            <div>
                                Access to up to 5 clients per month
                            </div>
                        </div>
                        <div className='flex gap-x-3'>
                            <div>
                                <CheckIcon className='w-5 h-5 text-legalBlue font-semibold' />
                            </div>
                            <div>
                                High rank recommendation
                            </div>
                        </div>
                        <div className='flex gap-x-3'>
                            <div>
                                <CheckIcon className='w-5 h-5 text-legalBlue font-semibold' />
                            </div>
                            <div>
                                Keep track of analytics
                            </div>
                        </div>
                    </div>
                    <div className='mt-10 flex flex-col gap-y-5'>
                        <div className='border rounded-xl flex justify-between p-4 items-center hover:bg-gray-50 cursor-pointer' >
                            <div className='flex gap-x-3 items-center'>
                                <div>
                                    <input type="radio"
                                        className={`appearance-none block w-full p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-legalYellow sm:text-sm`}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='font-bold text-3xl'>
                                        Monthly
                                    </div>
                                    <div
                                        className='text-gray-300 text-sm font-semibold'>
                                        Cancel Anytime
                                    </div>

                                </div>
                            </div>
                            <div>
                                <span className='font-bold'>$2</span> <span className='text-gray-400 font-semibold'>/m</span>
                            </div>
                        </div>
                        <div className='border border-legalGreen bg-[#F1F5FB] rounded-xl flex justify-between p-4 items-center' >
                            <div className='flex gap-x-3 items-center'>
                                <div>
                                    <input type="checkbox" checked={true}
                                        className={`appearance-none styledRadio block w-full p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-legalYellow sm:text-sm checked:bg-legalGreen checked:chec  checked:text-white checked:rounded-full checked:border-transparent checked:accent-legalGreen`}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <div className='font-bold text-3xl'>
                                        Annual
                                    </div>
                                    <div
                                        className='text-gray-300 text-sm font-semibold'>
                                        Save up to 30%
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span className='font-bold'>$17</span> <span className='text-gray-400 font-semibold'>/y</span>
                            </div>
                        </div>
                    </div>
                    <div className='mt-10'>
                        <Button text="Choose plan" type="secondary" onClick={() => { setStep(prevState => prevState + 1) }} />
                    </div>
                </div>
                {/* /End replace */}
            </div>
        </div >
    )
}

const CompletePayment = ({ finishPayment }) => {
    return (
        <div className="py-4 px-4">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-gray-900">Hello Bendon</h1>
                <h1 className="mt-2 font-semibold text-[#183A33] text-lg">Please select a payment method</h1>

            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8">
                {/* Replace with your content */}
                <div className='flex flex-col gap-y-3 p-3 bg-gray-50 rounded-md'>
                    <div className='flex justify-between items-center bg-white p-3 rounded-md'>
                        <div className='flex gap-x-2 items-center'>
                            <div className=''>
                                <input type="radio"
                                    className={`appearance-none block w-full p-3 border-8 border-gray-300 rounded-full shadow-sm focus:outline-none sm:text-sm checked:bg-legalGreen`}
                                />
                            </div>
                            <div className='text-legalBlue'>
                                M-PESA
                            </div>
                        </div>
                        <div className='shrink-0'>
                            <img src={mpesa} alt="Mpesa logo" className='w-full h-full' />
                        </div>
                    </div>
                    <div className='flex justify-between items-center bg-white p-3 rounded-md'>
                        <div className='flex gap-x-2 items-center'>
                            <div className=''>
                                <input type="radio"
                                    className={`appearance-none block w-full p-3 border-8 border-gray-300 rounded-full shadow-sm focus:outline-none sm:text-sm checked:bg-legalGreen`}
                                />
                            </div>
                            <div className='text-legalBlue'>
                                PayPal
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center bg-white p-3 rounded-md'>
                        <div className='flex gap-x-2 items-center'>
                            <div className=''>
                                <input type="radio" checked={true}
                                    className={`appearance-none block w-full p-3 border-8 border-gray-300 rounded-full shadow-sm focus:outline-none sm:text-sm checked:bg-legalGreen`}
                                />
                            </div>
                            <div className='text-legalBlue'>
                                Debit or Credit Card
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col mt-3 gap-y-3'>
                        <div>
                            <div className="mt-1">
                                <Input
                                    id="cardholderName"
                                    name="cardholderName"
                                    type="text"
                                    label="Cardholder's name*"
                                    autoComplete="off"
                                    required
                                    className={"border-0"}
                                    placeholder="Jane Doe"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mt-1">
                                <Input
                                    id="cardNumber"
                                    name="cardNumber"
                                    type="text"
                                    label="Card Number*"
                                    autoComplete="off"
                                    required
                                    className={"border-0"}
                                    placeholder="0000 0000 0000"
                                />
                            </div>
                        </div>
                        <div className='flex gap-x-3'>
                            <div className="mt-1">
                                <Input
                                    id="expiry"
                                    name="expiry"
                                    type="text"
                                    label="Expiry Date*"
                                    autoComplete="off"
                                    required
                                    className={"border-0"}
                                    placeholder="07/24"
                                />
                            </div>
                            <div className="mt-1">
                                <Input
                                    id="cvv"
                                    name="cvv"
                                    type="text"
                                    label="CVV*"
                                    autoComplete="off"
                                    required
                                    className={"border-0"}
                                    placeholder=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-5 flex flex-col bg-gray-200 p-4 rounded-2xl gap-y-5'>
                    <div className='text-lg font-semibold text-legalGreen'>
                        Summary
                    </div>
                    <div className='flex flex-col gap-y-5'>
                        <div className='flex justify-between'>
                            <div>
                                Basic Annual Plan
                            </div>
                            <div>
                                USD 20
                            </div>
                        </div>
                        <div className='flex justify-between text-legalYellow'>
                            <div>
                                Discount
                            </div>
                            <div>
                                USD 17
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div>
                                VAT
                            </div>
                            <div>
                                USD 1.99
                            </div>
                        </div>
                        <div className='border-b border-gray-900 w-full h-2 '>

                        </div>
                        <div className='flex justify-between'>
                            <div>
                                Total
                            </div>
                            <div>
                                USD 17
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <Button text="Complete payment" type="secondary" onClick={() => { finishPayment(true) }} />
                </div>
                {/* /End replace */}
            </div>
        </div >
    )
}


const PaymentSuccessModal = () => {

    return (
        <div className='w-full flex flex-col items-center gap-y-4'>
            <div className='text-3xl font-semibold text-center px-4 text-legalGreen'>
                Payment successful
            </div>
            <div className='p-1 bg-legalGreen rounded-full'>
                <CheckCircleIcon className='w-8 h-8 text-white' />
            </div>
        </div>
    )
}