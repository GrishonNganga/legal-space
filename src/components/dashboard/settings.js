import { Routes, Route } from 'react-router-dom'

import { CheckIcon } from '@heroicons/react/24/outline'

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
                                        className={`appearance-none block w-full p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-legalYellow sm:text-sm checked:bg-legalGreen checked:chec  checked:text-white checked:rounded-full checked:border-transparent checked:accent-legalGreen`}
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
                        <Button text="Choose plan" type="secondary" />
                    </div>
                </div>
                {/* /End replace */}
            </div>
        </div >
    )
}