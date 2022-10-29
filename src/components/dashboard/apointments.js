import { useEffect } from 'react';

import { Button } from '../ui';

const Appointments = ({ setMiddleTopNavText }) => {

    useEffect(() => {
        setMiddleTopNavText("Appointments")
        //eslint-disable-next-line
    }, [])

    return (
        <div className="py-4 px-4">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="mt-2 font-semibold text-[#183A33] text-xl">Appointment requests</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="">
                    <div className='flex flex-col gap-y-5 mt-4'>
                        <div className='flex flex-col gap-y-3 shadow-md p-5 rounded-md'>
                            <div className='flex gap-x-2 items-start'>
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
                            <div className=''>
                                <div className='flex gap-x-2 mt-3'>
                                    <div>
                                        Date
                                    </div>
                                    <div>
                                        4/09/2022
                                    </div>
                                </div>
                                <div className='flex gap-x-2 mt-3'>
                                    <div>
                                        Time
                                    </div>
                                    <div>
                                        11 AM
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occ
                                </div>
                                <div className='mt-5'>
                                    <Button text="Accept request" type="secondary" />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-y-3 shadow-md p-5 rounded-md'>
                            <div className='flex gap-x-2 items-start'>
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
                            <div className='hidden'>
                                <div className='flex gap-x-2 mt-3'>
                                    <div>
                                        Date
                                    </div>
                                    <div>
                                        4/09/2022
                                    </div>
                                </div>
                                <div className='flex gap-x-2 mt-3'>
                                    <div>
                                        Time
                                    </div>
                                    <div>
                                        11 AM
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occ
                                </div>
                                <div className='mt-5'>
                                    <Button text="Accept request" type="secondary" />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-y-3 shadow-md p-5 rounded-md'>
                            <div className='flex gap-x-2 items-start'>
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
                            <div className='hidden'>
                                <div className='flex gap-x-2 mt-3'>
                                    <div>
                                        Date
                                    </div>
                                    <div>
                                        4/09/2022
                                    </div>
                                </div>
                                <div className='flex gap-x-2 mt-3'>
                                    <div>
                                        Time
                                    </div>
                                    <div>
                                        11 AM
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occ
                                </div>
                                <div className='mt-5'>
                                    <Button text="Accept request" type="secondary" />
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

export default Appointments