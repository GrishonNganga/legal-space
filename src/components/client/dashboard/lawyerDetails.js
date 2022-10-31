import { useEffect, useState } from "react"

import { StarIcon } from '@heroicons/react/24/solid';

import profile from '../../../assets/profile.png'

import { Button, Input, TextArea, Calendar } from '../../../components/ui'

const LawyerDetails = ({ setMiddleTopNavText }) => {
    const [bookAppointment, setBookAppointment] = useState(false)
    const [appointmentBooked, setAppointmentBooked] = useState(false) 

    useEffect(() => {
        setMiddleTopNavText("Lawyer Details")
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* Replace with your content */}
            <div className="">
                <div className="flex flex-col gap-y-5">
                    <div className="w-full flex justify-center">
                        <div className="w-3/4 md:w-1/4 relative">
                            <img src={profile} className="w-full" />
                            <div className="absolute top-3/4 w-full flex justify-center">
                                <div className="flex flex-col bg-white p-4 rounded-md text-center w-10/12 shadow-md">
                                    <div className="text-[#126B59] font-semibold text-xl text-center">
                                        Alexander Johannsen
                                    </div>
                                    <div className="text-gray-400 font-semibold text-">
                                        Criminal Lawyer
                                    </div>
                                    <div className="flex gap-x-2 justify-center items-center">
                                        <div className='-ml-2 text-sm text-gray-500'>
                                            East Dakota
                                        </div>
                                        <div className='w-2 h-2 bg-gray-400 rounded-full'>

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
                        </div>
                    </div>
                    {
                        !bookAppointment &&
                        <LawyerInfo setBookAppointment={setBookAppointment} />
                        ||
                        <>
                            <BookAppointment setMiddleTopNavText={setMiddleTopNavText} setAppointmentBooked={setAppointmentBooked}/>
                        </>
                    }
                </div>
            </div>
            
        </div>
    )
}
export default LawyerDetails

const LawyerInfo = ({ setBookAppointment }) => {
    return (
        <div>
            <div className="mt-20 w-full justify-center">
                <div class="grid grid-rows-2 grid-cols-2 md:grid-cols-3 md:grid-rows-1 grid-flow-col gap-4">
                    <div className="flex flex-col gap-y-4 p-4 bg-white shadow grow-0">
                        <div>
                            Cases handled
                        </div>
                        <div className="text-[#DEAB52]">
                            68+
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4 p-4 bg-white shadow">
                        <div>
                            Experience
                        </div>
                        <div className="text-[#DEAB52]">
                            7 yrs+
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4 p-4 bg-white shadow">
                        <div>
                            Endorsements
                        </div>
                        <div className="text-[#DEAB52]">
                            885+
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-5">
                <div className="flex justify-between">
                    <div className="text-xl font-semibold text-legalGreen">
                        About Lawyer
                    </div>
                    <div>
                        <div className="bg-[#B8C1BF] text-legalGreen p-2 rounded-lg font-semibold text-sm">
                            Available
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occvero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occ
                </div>
            </div>
            <div className="flex flex-col mt-5">
                <div className="flex justify-between">
                    <div className="text-xl font-semibold text-legalGreen">
                        Location
                    </div>
                </div>
                <div className="h-20">

                </div>
                <div className="w-full my-5">
                    <div className="bg-[#C4C4C4] w-full flex justify-center rounded-md" onClick={() => { setBookAppointment(true) }}>
                        <div className="text-white font-semibold p-4">
                            Book Appointment
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const BookAppointment = ({ setMiddleTopNavText }) => {
    const [step, setStep] = useState(1)

    useEffect(() => {
        setMiddleTopNavText("Book appointment")
    }, [])

    return (
        <div className="mt-20">
            {
                step === 1 &&
                <div className="flex flex-col my-5">
                    <div className="flex justify-between items-center">
                        <div className="text-xl font-semibold text-legalGreen">
                            Appointment for
                        </div>
                        <div>
                            <div className="bg-[#B8C1BF] text-legalGreen p-2 rounded-lg font-semibold text-sm">
                                Available
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col gap-y-3">
                        <div>
                            <Input
                                id="names"
                                type="text"
                                name="names"
                                placeholder=""
                                label="Name, Surname"
                                className={"border-0 bg-gray-100"}
                            />
                        </div>
                        <div>
                            <Input
                                id="contact"
                                type="text"
                                name="contact"
                                placeholder=""
                                label="Contact number"
                                className={"border-0 bg-gray-100"}
                            />
                        </div>
                        <div>
                            <TextArea
                                id="caseDetails"
                                name="caseDetails"
                                placeholder=""
                                label="Let me know more about your case"
                                className={"border-0 bg-gray-100"}
                            />
                        </div>
                        <div>
                            <Button text={"Next"} type="secondary" onClick={() => { setStep(prevState => prevState + 1) }} />
                        </div>
                    </div>
                </div>
            }
            {
                step === 2 &&
                <div className="flex flex-col my-5">
                    <div className="flex">
                        <div className="text-xl font-semibold text-legalGreen">
                            Select Appointment Date
                        </div>
                    </div>
                    <div>
                        <Calendar />
                    </div>
                    <div>
                        <div className="text-xl font-semibold text-legalGreen mt-5">
                            Select Appointment Time
                        </div>
                    </div>
                    <div class="grid grid-rows-3 grid-cols-3 grid-flow-row gap-4 mt-5">
                        <div className="w-full py-4 border rounded-full flex justify-center items-center">
                            8:00 AM
                        </div>
                        <div className="w-full py-4 border rounded-full flex justify-center items-center">
                            9:00 AM
                        </div>
                        <div className="w-full py-4 border border-[#DEAB52] text-[#DEAB52] rounded-full flex justify-center items-center">
                            10:00 AM
                        </div>
                        <div className="w-full py-4 border rounded-full flex justify-center items-center">
                            11:00 AM
                        </div>
                        <div className="w-full py-4 border rounded-full flex justify-center items-center">
                            12:00 PM
                        </div>
                        <div className="w-full py-4 border rounded-full flex justify-center items-center">
                            13:00 PM
                        </div>
                        <div className="w-full py-4 bg-[#DEAB52] text-white rounded-full flex justify-center items-center">
                            14:00 PM
                        </div>
                        <div className="w-full py-4 border rounded-full flex justify-center items-center">
                            15:00 PM
                        </div>
                        <div className="w-full py-4 border rounded-full flex justify-center items-center">
                            16:00 PM
                        </div>
                    </div>
                    <div className="mt-5">
                        <Button text="Next" type="secondary"/> 
                    </div>
                </div>
            }
        </div>
    )
}
