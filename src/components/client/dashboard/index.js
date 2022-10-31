import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

import { Input } from '../../ui';

const Main = ({ setMiddleTopNavText }) => {
    const navigate = useNavigate()

    useEffect(() => {
        setMiddleTopNavText("Lawyerspace.io")
    })

    return (
        <div className="p-2">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-gray-900">Hello Bendon</h1>
                <h1 className="mt-2 font-semibold text-[#183A33] text-xl">Find the best lawyers here</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
                {/* Replace with your content */}
                <div className="py-4">
                    <div className='flex justify-between items-center gap-x-2 '>
                        <div className='w-full'>
                            <Input type={"text"} placeholder="Search anything here" Icon={MagnifyingGlassIcon} className="pl-8 placeholder-legalGreen text-legalGreen z-50 border-0 bg-gray-100" iconClassName={"text-legalGreen ml-2"} />
                        </div>
                        <div>
                            <div className='bg-[#DEAB52] p-1.5 rounded-md mt-2'>
                                <AdjustmentsHorizontalIcon className='w-7 h-7 text-white' />
                            </div>
                        </div>
                    </div>
                    <div className='mt-8 flex justify-between items-center'>
                        <div className='font-semibold text-md'>
                            Category
                        </div>
                        <div className='font-semibold text-gray-400 text-sm'>
                            View all
                        </div>
                    </div>
                    <div className='mt-5 flex gap-x-2 overflow-scroll no-scrollbar text-sm'>
                        <div className='px-4 py-2 border border-legalGreen text-gray-500 rounded-md'>
                            Family
                        </div>
                        <div className='px-4 py-2 border-0 text-white bg-legalGreen rounded-md'>
                            General
                        </div>
                        <div className='px-4 py-2 border border-legalGreen text-gray-500 rounded-md'>
                            Criminal
                        </div>
                        <div className='px-4 py-2 border border-legalGreen text-gray-500 rounded-md'>
                            Criminal
                        </div>
                    </div>
                    <div className='mt-8 flex justify-between items-center'>
                        <div className='font-semibold text-md'>
                            Top lawyers near you
                        </div>
                        <div className='font-semibold text-gray-400 text-sm'>
                            View all
                        </div>
                    </div>
                    <div className='mt-5 flex flex-col gap-y-4'>
                        <div className='flex justify-between items-center bg-white p-2 rounded-md shadow' onClick={() => { navigate('lawyer/1') }}>
                            <div className='flex gap-x-2 items-center'>
                                <div className='w-8 h-8 bg-gray-200 rounded-full shrink-0'>

                                </div>
                                <div className='flex flex-col'>
                                    <div className='font-semibold text-base'>
                                        Alexander Johansen
                                    </div>
                                    <div className='flex gap-x-3 items-center'>
                                        <div className=' text-gray-400 text-sm'>
                                            Criminal representation
                                        </div>
                                        <div className='w-1 h-1 bg-gray-400'>

                                        </div>
                                        <div className='-ml-2 text-xs text-gray-500'>
                                            East Dakota
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-x-1 items-center'>
                                <div>
                                    <StarIcon className='w-5 h-5 text-[#DEAB52]' />
                                </div>
                                <div className='text-xs text-[#DEAB52]'>
                                    4.6
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between items-center bg-white p-2 rounded-md shadow'>
                            <div className='flex gap-x-2 items-center'>
                                <div className='w-8 h-8 bg-gray-200 rounded-full shrink-0'>

                                </div>
                                <div className='flex flex-col'>
                                    <div className='font-semibold text-base'>
                                        Robert Lewangoaski
                                    </div>
                                    <div className='flex gap-x-3 items-center'>
                                        <div className=' text-gray-400 text-sm'>
                                            Intellectual
                                        </div>
                                        <div className='w-1 h-1 bg-gray-400'>

                                        </div>
                                        <div className='-ml-2 text-xs text-gray-500'>
                                            South Borneo
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-x-1 items-center'>
                                <div>
                                    <StarIcon className='w-5 h-5 text-[#DEAB52]' />
                                </div>
                                <div className='text-xs text-[#DEAB52]'>
                                    4.6
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between items-center bg-white p-2 rounded-md shadow'>
                            <div className='flex gap-x-2 items-center'>
                                <div className='w-8 h-8 bg-gray-200 rounded-full shrink-0'>

                                </div>
                                <div className='flex flex-col'>
                                    <div className='font-semibold text-base'>
                                        Robert Lewangoaski
                                    </div>
                                    <div className='flex gap-x-3 items-center'>
                                        <div className=' text-gray-400 text-sm'>
                                            Intellectual
                                        </div>
                                        <div className='w-1 h-1 bg-gray-400'>

                                        </div>
                                        <div className='-ml-2 text-xs text-gray-500'>
                                            South Borneo
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-x-1 items-center'>
                                <div>
                                    <StarIcon className='w-5 h-5 text-[#DEAB52]' />
                                </div>
                                <div className='text-xs text-[#DEAB52]'>
                                    4.6
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between items-center bg-white p-2 rounded-md shadow'>
                            <div className='flex gap-x-2 items-center'>
                                <div className='w-8 h-8 bg-gray-200 rounded-full shrink-0'>

                                </div>
                                <div className='flex flex-col'>
                                    <div className='font-semibold text-base'>
                                        Robert Lewangoaski
                                    </div>
                                    <div className='flex gap-x-3 items-center'>
                                        <div className=' text-gray-400 text-sm'>
                                            Intellectual
                                        </div>
                                        <div className='w-1 h-1 bg-gray-400'>

                                        </div>
                                        <div className='-ml-2 text-xs text-gray-500'>
                                            South Borneo
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-x-1 items-center'>
                                <div>
                                    <StarIcon className='w-5 h-5 text-[#DEAB52]' />
                                </div>
                                <div className='text-xs text-[#DEAB52]'>
                                    4.6
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between items-center bg-white p-2 rounded-md shadow'>
                            <div className='flex gap-x-2 items-center'>
                                <div className='w-8 h-8 bg-gray-200 rounded-full shrink-0'>

                                </div>
                                <div className='flex flex-col'>
                                    <div className='font-semibold text-base'>
                                        Robert Lewangoaski
                                    </div>
                                    <div className='flex gap-x-3 items-center'>
                                        <div className=' text-gray-400 text-sm'>
                                            Intellectual
                                        </div>
                                        <div className='w-1 h-1 bg-gray-400'>

                                        </div>
                                        <div className='-ml-2 text-xs text-gray-500'>
                                            South Borneo
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-x-1 items-center'>
                                <div>
                                    <StarIcon className='w-5 h-5 text-[#DEAB52]' />
                                </div>
                                <div className='text-xs text-[#DEAB52]'>
                                    4.6
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between items-center bg-white p-2 rounded-md shadow'>
                            <div className='flex gap-x-2 items-center'>
                                <div className='w-8 h-8 bg-gray-200 rounded-full shrink-0'>

                                </div>
                                <div className='flex flex-col'>
                                    <div className='font-semibold text-base'>
                                        Robert Lewangoaski
                                    </div>
                                    <div className='flex gap-x-3 items-center'>
                                        <div className=' text-gray-400 text-sm'>
                                            Intellectual
                                        </div>
                                        <div className='w-1 h-1 bg-gray-400'>

                                        </div>
                                        <div className='-ml-2 text-xs text-gray-500'>
                                            South Borneo
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-x-1 items-center'>
                                <div>
                                    <StarIcon className='w-5 h-5 text-[#DEAB52]' />
                                </div>
                                <div className='text-xs text-[#DEAB52]'>
                                    4.6
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* /End replace */}
            </div>
        </div >
    )
}

export default Main