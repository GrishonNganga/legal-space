import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { CheckIcon, PencilIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

import mpesa from '../../assets/mpesa.png'

import { Input, Modal, Button } from '../../components/ui'

import { userStore } from '../../stores'

const Payment = () => {
    const plans = [
        {
            name: "Basic",
            benefits: [
                "Individual plan",
                "Access to up to 5 clients per month",
                "High rank recommendation",
                "Keep track of analytics"
            ],
            packages: [
                {
                    name: "Monthly",
                    text: "Cancel Anytime",
                    amount: 2,
                    frequency: "m"
                },
                {
                    name: "Annual",
                    text: "Save up to 30%",
                    amount: 17,
                    frequency: "y"
                }
            ]
        },
        {
            name: "Advance",
            benefits: [
                "Law firm plan",
                "Access unlimited clients per month",
                "High rank recommendation",
                "Keep track of analytics",
                "Onboard all  firm lawyers",
                "This is advanced"
            ],
            packages: [
                {
                    name: "Monthly",
                    text: "Cancel Anytime",
                    amount: 4,
                    frequency: "m"
                },
                {
                    name: "Annual",
                    text: "Save up to 30%",
                    amount: 25,
                    frequency: "y"
                }
            ]
        }
    ]

    const navigate = useNavigate()
    const user = userStore(state => state.user)

    const [step, setStep] = useState(1)
    const [paymentSuccess, setPaymentSuccess] = useState(false)

    const [plan, setPlan] = useState(plans[0])
    const [selectedPackage, setSelectedPackage] = useState(1)
    const [discount, setDiscount] = useState(0)

    return (
        <div className='relative'>
            {
                step === 1 &&
                <SelectPlan step={step} setStep={setStep} user={user} plans={plans} plan={plan} setPlan={setPlan} selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} />
            }
            {
                step === 2 &&
                <CompletePayment finishPayment={setPaymentSuccess} user={user} plan={plan} selectedPackage={selectedPackage} discount={discount} />
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

export default Payment

const SelectPlan = ({ step, setStep, user, plans, plan, setPlan, selectedPackage, setSelectedPackage }) => {
    const [editPlan, setEditPlan] = useState(false)

    return (
        <div className="py-4 px-4">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-gray-900">Hello {user?.firstName}</h1>
                <h1 className="mt-2 font-semibold text-[#183A33]">Please select a plan for you</h1>

            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4 flex flex-col">
                    <div className='relative flex justify-between items-center font-semibold'>
                        <div className={`text-3xl font-bold ${plan?.name === "Advance" ? "text-legalYellow" : ""}`}>
                            {
                                !editPlan &&
                                <span>
                                    {plan.name}  Plan
                                </span>
                            }
                        </div>
                        <div>
                            <PencilIcon className='w-5 h-5 text-gray-300' onClick={() => { setEditPlan(true) }} />
                        </div>
                        <div className={`${!editPlan && "hidden"} absolute flex flex-col gap-2 w-full  bg-white shadow-xl p-3 ${editPlan && 'top-0' || 'top-8'}`}>
                            <div className='text-xl font-semibold pt-2'>
                                Select plan
                            </div>
                            {
                                plans.map((currPlan, index) => {
                                    if (currPlan?.name === plan?.name) {
                                        return (
                                            <div className='border rounded-xl flex justify-between p-4 items-center hover:bg-gray-50 cursor-pointer'>
                                                <div className='flex gap-x-3 items-center'>
                                                    <div>
                                                        <input type="checkbox" checked={true}
                                                            className={`appearance-none styledRadio block w-full p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-legalYellow sm:text-sm checked:bg-legalGreen checked:chec  checked:text-white checked:rounded-full checked:border-transparent checked:accent-legalGreen`}
                                                        />
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <div className='font-bold text-xl'>
                                                            {currPlan?.name} Plan
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className='border rounded-xl flex justify-between p-4 items-center hover:bg-gray-50 cursor-pointer' onClick={() => { setPlan(plans[index]); setEditPlan(false) }}>
                                                <div className='flex gap-x-3 items-center'>
                                                    <div>
                                                        <input type="radio"
                                                            className={`appearance-none block w-full p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-legalYellow sm:text-sm`}
                                                        />
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <div className='font-bold text-xl'>
                                                            {currPlan?.name} Plan
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }

                                })
                            }
                        </div>
                    </div>
                    <div className='flex flex-col mt-5 gap-y-3 justify-center'>
                        {
                            plan.benefits.map(benefit => {
                                return (
                                    <div className='flex gap-x-3'>
                                        <div>
                                            <CheckIcon className='w-5 h-5 text-legalBlue font-semibold' />
                                        </div>
                                        <div>
                                            {benefit}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='mt-10 flex flex-col gap-y-5'>
                        {
                            plan?.packages?.map((pack, index) => {
                                if (selectedPackage === index) {
                                    return (
                                        <div className='border border-legalGreen bg-[#F1F5FB] rounded-xl flex justify-between p-4 items-center'>
                                            <div className='flex gap-x-3 items-center'>
                                                <div>
                                                    <input type="checkbox" checked={true}
                                                        className={`appearance-none styledRadio block w-full p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-legalYellow sm:text-sm checked:bg-legalGreen checked:chec  checked:text-white checked:rounded-full checked:border-transparent checked:accent-legalGreen`}
                                                    />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <div className='font-bold text-3xl'>
                                                        {pack?.name}
                                                    </div>
                                                    <div
                                                        className='text-gray-300 text-sm font-semibold'>
                                                        {
                                                            pack?.text
                                                        }
                                                    </div>

                                                </div>
                                            </div>
                                            <div>
                                                <span className='font-bold'>${pack?.amount}</span> <span className='text-gray-400 font-semibold'>/{pack?.frequency}</span>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className='border rounded-xl flex justify-between p-4 items-center hover:bg-gray-50 cursor-pointer' onClick={() => { setSelectedPackage(index) }} >
                                            <div className='flex gap-x-3 items-center'>
                                                <div>
                                                    <input type="radio"
                                                        className={`appearance-none block w-full p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-legalYellow sm:text-sm`}
                                                    />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <div className='font-bold text-3xl'>
                                                        {pack?.name}
                                                    </div>
                                                    <div
                                                        className='text-gray-300 text-sm font-semibold'>
                                                        {
                                                            pack?.text
                                                        }
                                                    </div>

                                                </div>
                                            </div>
                                            <div>
                                                <span className='font-bold'>${pack?.amount}</span> <span className='text-gray-400 font-semibold'>/{pack?.frequency}</span>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }

                    </div>
                    <div className='mt-10'>
                        <Button text="Choose plan" type="secondary" onClick={() => { setStep(prevState => prevState + 1) }} active={true} />
                    </div>
                </div>
                {/* /End replace */}
            </div>
        </div >
    )
}

const CompletePayment = ({ finishPayment, user, plan, selectedPackage, discount }) => {
    const paymentMethods = [
        {
            name: "M-PESA",
            img: mpesa,
            type: "mpesa"
        },
        {
            name: "Paypal",
            type: "paypal"
        },
        {
            name: "Debit or Credit Card",
            type: "card"
        }
    ]
    const [method, setMethod] = useState("card")
    return (
        <div className="py-4 px-4">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-gray-900">Hello {user?.firstName}</h1>
                <h1 className="mt-2 font-semibold text-[#183A33] text-lg">Please select a payment method</h1>

            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8">
                {/* Replace with your content */}
                <div className='flex flex-col gap-y-3 p-3 bg-gray-50 rounded-md'>
                    {
                        paymentMethods?.map(paymentMethod => {
                            return (
                                <div className='flex justify-between items-center bg-white p-3 rounded-md'>
                                    <div className='flex gap-x-2 items-center'>
                                        <div className=''>
                                            <input type="radio"
                                                className={`appearance-none block w-full p-3 border-8 border-gray-300 rounded-full shadow-sm focus:outline-none sm:text-sm checked:bg-legalGreen`}
                                            />
                                        </div>
                                        <div className='text-legalBlue'>
                                            {paymentMethod?.name}
                                        </div>
                                    </div>
                                    {
                                        paymentMethod?.img &&
                                        <div className='shrink-0'>
                                            <img src={paymentMethod?.img} alt="Mpesa logo" className='w-full h-full' />
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                    {
                        method === "card" &&
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
                    }
                </div>
                <div className='mt-5 flex flex-col bg-gray-200 p-4 rounded-2xl gap-y-5'>
                    <div className='text-lg font-semibold text-legalGreen'>
                        Summary
                    </div>
                    <div className='flex flex-col gap-y-5'>
                        <div className='flex justify-between'>
                            <div>
                                {plan?.name} {plan?.packages[selectedPackage]?.name} Plan
                            </div>
                            <div>
                                USD {plan?.packages[selectedPackage]?.amount}
                            </div>
                        </div>
                        {
                            discount > 0 &&
                            <div className='flex justify-between text-legalYellow'>
                                <div>
                                    Discount
                                </div>
                                <div>
                                    USD {discount}
                                </div>
                            </div>
                        }
                        <div className='flex justify-between'>
                            <div>
                                VAT
                            </div>
                            <div>
                                USD {(plan?.packages[selectedPackage]?.amount * 0.16).toFixed(2)}
                            </div>
                        </div>
                        <div className='border-b border-gray-900 w-full h-2 '>

                        </div>
                        <div className='flex justify-between'>
                            <div>
                                Total
                            </div>
                            <div>
                                USD {
                                    ((plan?.packages[selectedPackage]?.amount + plan?.packages[selectedPackage]?.amount * 0.16).toFixed(2)) - discount}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <Button text="Complete payment" type="secondary" onClick={() => { finishPayment(true) }} active={true} />
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