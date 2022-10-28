import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const Main = () => {
    return (
        <div className="py-4 px-4">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-gray-900">Hello Bendon</h1>
                <h1 className="text-gray-900 mt-2 font-semibold text-[#183A33]">Your cases are waiting</h1>

            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                    <div className="bg-legalGreen p-5 flex justify-between items-center rounded-lg gap-x-3">
                        <div className="flex flex-col gap-y-4">
                            <div className="text-white font-extrabold">
                                Complete your profile to access your clients
                            </div>
                            <div className="text-gray-500">
                                Your profile is 75% complete
                            </div>
                        </div>
                        <div>
                            <CircularProgressbar
                                className="w-32 h-32 font-extrabold text-center" value={75} text={`${75}%`} counterClockwise={true} strokeWidth={10}
                                styles={
                                    buildStyles({
                                        // trailColor: `#C6A85C40`,
                                        pathColor: "#C6A85C",
                                        textColor: "white",
                                        backgroundColor: "#C6A85C",
                                        strokeLinecap: 'round',
                                    })
                                }
                            >
                            </CircularProgressbar>
                        </div>
                    </div>
                    <div class="mt-4 grid grid-rows-2 grid-cols-2 gap-4">
                        <div className=' bg-[#C8D0CE] rounded px-8 flex flex-col text-center gap-y-5 py-4'>
                            <div className='text-legalGreen'>
                                Cases handled
                            </div>
                            <div className='text-legalYellow'>
                                0
                            </div>
                        </div>
                        <div className=' bg-[#C8D0CE] rounded px-8 flex flex-col text-center gap-y-5 py-4'>
                            <div className='text-legslGreen'>
                                Pending appointments
                            </div>
                            <div className='text-legalYellow'>
                                3
                            </div>
                        </div>
                        <div className=' bg-[#C8D0CE] rounded px-8 flex flex-col text-center gap-y-5 py-4'>
                            <div className='text-legslGreen'>
                                Reviews
                            </div>
                            <div className='text-legalYellow'>
                                0
                            </div>
                        </div>
                        <div className=' bg-[#C8D0CE] rounded px-8 flex flex-col text-center gap-y-5 py-4'>
                            <div className='text-legslGreen'>
                                Total cases
                            </div>
                            <div className='text-legalYellow'>
                                0
                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='flex justify-between'>
                            <div className='font-semibold trxt-2xl'>
                                Appointment requests
                            </div>
                            <div className='text-[#D4D4D4] font-semibold'>
                                View all
                            </div>
                        </div>
                        <div className='flex flex-col gap-y-2 mt-4'>
                            <div className='flex gap-x-2 items-center shadow-md p-3'>
                                <div className='w-8 h-8 bg-gray-200 rounded-full'>

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
                            <div className='flex gap-x-2 items-center shadow-md p-3'>
                                <div className='w-8 h-8 bg-gray-200 rounded-full'>

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
                        </div>

                    </div>
                </div>
                {/* /End replace */}
            </div>
        </div >
    )
}

export default Main