import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'

import { CalendarIcon, ClockIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

import { Button, Notification } from '../../ui';

import { getSpecificAppointment, getLawyerAppointmentsByStatus, lawyerEditAppointment } from '../../../data/controller'
import { userStore } from '../../../stores';
const Appointments = ({ setMiddleTopNavText }) => {
    return (
        <Routes>
            <Route exact path="/" element={<ViewAppointments setMiddleTopNavText={setMiddleTopNavText} />} />
            <Route path="/:id" element={<ViewAppointment setMiddleTopNavText={setMiddleTopNavText} />} />
        </Routes>
    )
}
export default Appointments

const ViewAppointments = ({ setMiddleTopNavText }) => {
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const monthNames = ["Jan", "Feb", "March", "Apr", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    const user = userStore(state => state.user)
    const navigate = useNavigate()
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(false)
    const [showMore, setShowMore] = useState()
    const [loadingAcceptRequest, setLoadingAcceptRequest] = useState(false)

    useEffect(() => {
        setMiddleTopNavText("Appointments")
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (user) {
            setLoading(true)
            getLawyerAppointmentsByStatus().then(response => {
                setLoading(false)
                if (response?.status === "success") {
                    setAppointments(response.data?.appointments)
                }
            })
        }
    }, [user])

    const acceptRequest = (id) => {
        setLoadingAcceptRequest(true)
        lawyerEditAppointment(id, { stage: "accepted" }).then(response => {
            setLoadingAcceptRequest(false)
            if (response?.status === "success") {
                window.location.reload()
            }
        })
    }

    return (
        <div className="py-4 px-2">
            <div className="max-w-7xl mx-auto px-2">
                <h1 className="mt-2 font-semibold text-[#183A33] text-xl">Appointments</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="">
                    <div className='flex flex-col gap-y-5 mt-4'>
                        {
                            !loading && appointments?.map((appointment, index) => {
                                return (
                                    <div key={index} className='flex flex-col gap-y-3 shadow-md p-4 rounded-md' onClick={() => { setShowMore(index) }}>
                                        <div className='flex gap-x-2 items-start'>
                                            <img src={appointment?.clientId?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43w5sOU4JiJkoPKcLHGWIa51_5RlYgLDMuxkFMbasuLuVWjAhO3rgF2Q3nn8ZfBwmVwQ&usqp=CAU"} className="w-12 h-12 rounded-full" />
                                            <div className='flex flex-col' onClick={() => { navigate(appointment?._id) }}>
                                                <div className='font-semibold text-base'>
                                                    <span>{appointment?.clientId.firstName}</span> <span> {appointment?.clientId?.lastName}</span>
                                                </div>
                                                <div className='flex gap-x-3 items-center'>
                                                    <div className=' text-gray-400 text-sm'>
                                                        {appointment?.subject}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            showMore === index &&
                                            <div className='transition-all ease-in-out duration-500'>
                                                <div className='flex items-center justify-between gap-x-2 bg-gray-100 rounded-md p-3'>
                                                    <div className='flex gap-x-2 items-center'>
                                                        <div>
                                                            <CalendarIcon className='w-5 h-5 text-gray-500' />
                                                        </div>
                                                        <div className='font-semibold text-gray-500'>
                                                            {dayNames[new Date(appointment?.date)?.getDay()]}, {monthNames[new Date(appointment?.date)?.getMonth()]} {new Date(appointment?.date)?.getDate()}
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-x-2 items-center'>
                                                        <div>
                                                            <ClockIcon className='w-5 h-5 text-gray-500' />
                                                        </div>
                                                        <div className='font-semibold text-gray-500'>
                                                            {new Date(appointment?.date)?.toLocaleTimeString([], { hour12: true })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='mt-5'>
                                                    {
                                                        appointment?.description
                                                    }
                                                </div>
                                                {
                                                    appointment?.stage === "pending" &&
                                                    <div className='mt-5'>
                                                        <Button text="Accept request" type="secondary" active={true} onClick={() => { acceptRequest(appointment._id) }} loading={loadingAcceptRequest} />
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                        {
                            !loading && appointments?.length === 0 &&
                            <div className='flex justify-center mt-20'>
                                <div>
                                    You don't have any appointments
                                </div>
                            </div>
                        }
                        {
                            loading && [...Array(6)].map(idx => {
                                return (
                                    <div key={idx} className='w-full flex flex-col gap-y-3 shadow-lg p-5 rounded-md'>
                                        <div className='w-full flex gap-x-2 items-start h-full'>
                                            <div>
                                                <div className='w-10 h-10 bg-gray-300 animate-pulse rounded-full'>

                                                </div>
                                            </div>
                                            <div className='w-full flex flex-col gap-y-2'>
                                                <div className='font-semibold text-base w-1/2 h-4 bg-gray-300 animate-pulse rounded-md'>

                                                </div>
                                                <div className='font-semibold text-base w-1/2 h-4 bg-gray-300 animate-pulse rounded-md'>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                {/* /End replace */}
            </div>
        </div >
    )
}

const ViewAppointment = ({ setMiddleTopNavText }) => {
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const monthNames = ["Jan", "Feb", "March", "Apr", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    const user = userStore(state => state.user)
    const location = useLocation()
    const [appointment, setAppointment] = useState()
    const [loading, setLoading] = useState(false)
    const [loadingAcceptRequest, setLoadingAcceptRequest] = useState(false)
    const [loadingCompleteRequest, setLoadingCompleteRequest] = useState(false)
    const [loadingRejectRequest, setLoadingRejectRequest] = useState(false)
    const [info, setInfo] = useState({ message: "", type: "" })

    useEffect(() => {
        setMiddleTopNavText("Appointment Details")
    }, [])

    useEffect(() => {
        const appointmentId = location.pathname.split('/')[3]
        setLoading(true)
        getSpecificAppointment(appointmentId).then(response => {
            setLoading(false)
            if (response?.status === "success") {
                setAppointment(response?.data?.appointment)
            }
        })
    }, [location])

    const acceptRequest = (id) => {
        setLoadingAcceptRequest(true)
        lawyerEditAppointment(id, { stage: "accepted" }).then(response => {
            setLoadingAcceptRequest(false)
            if (response?.status === "success") {
                setAppointment(response?.data?.updatedAppointment)
            }
        })
    }

    const completeRequest = (id) => {
        setLoadingCompleteRequest(true)
        lawyerEditAppointment(id, { stage: "completed" }).then(response => {
            setLoadingCompleteRequest(false)
            if (response?.status === "success") {
                setInfo({ message: "Appointment closed successfully", type: "success" })
                setTimeout(() => {
                    setAppointment(response?.data?.updatedAppointment)

                }, 1000)

            } else {
                setInfo({ message: response?.message, type: "error" })
            }
        })
    }

    return (
        <div className='px-2'>
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="mt-2 font-semibold text-[#183A33] text-xl">Appointment</h1>
            </div>
            <div>
                <Notification type={info.type} message={info.message} />
            </div>
            {
                !loading &&

                <div className='flex flex-col gap-y-3 shadow-md p-5 rounded-md'>
                    <div className='flex gap-x-2 items-start'>
                        <img src={appointment?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43w5sOU4JiJkoPKcLHGWIa51_5RlYgLDMuxkFMbasuLuVWjAhO3rgF2Q3nn8ZfBwmVwQ&usqp=CAU"} className="w-12 h-12 rounded-full" />
                        <div className='flex flex-col'>
                            <div className='font-semibold text-base flex gap-x-1'>
                                <span>
                                    {
                                        appointment?.clientId?.firstName
                                    }
                                </span>
                                <span>
                                    {
                                        appointment?.clientId?.lastName
                                    }
                                </span>
                            </div>
                            <div className='flex gap-x-3 items-center'>
                                <div className=' text-gray-400 text-sm'>
                                    {appointment?.subject}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        {
                            appointment?.stage === "cancelled" &&
                            <div className='mb-3 flex items-center gap-x-2 bg-gray-100 rounded-md p-3'>
                                <div className='flex gap-x-2 items-center'>
                                    <div>
                                        <InformationCircleIcon className='w-5 h-5 text-red-500' />
                                    </div>
                                    <div className=' text-red-500'>
                                        Appontment cancelled
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            appointment?.stage === "completed" &&
                            <div className='mb-3 flex items-center gap-x-2 bg-gray-100 rounded-md p-3'>
                                <div className='flex gap-x-2 items-center'>
                                    <div>
                                        <InformationCircleIcon className='w-5 h-5 text-green-500' />
                                    </div>
                                    <div className=' text-green-500'>
                                        Appointment completed
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            appointment?.stage === "accepted" && new Date(appointment?.date) >= new Date() &&
                            <div className='mb-3 flex items-center gap-x-2 bg-gray-100 rounded-md p-3'>
                                <div className='flex gap-x-2 items-center'>
                                    <div>
                                        <InformationCircleIcon className='w-5 h-5 text-green-500' />
                                    </div>
                                    <div className=' text-green-500'>
                                        Upcoming appointment
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            appointment?.stage === "accepted" && new Date(appointment?.date) < new Date() &&
                            <div className='mb-3 flex items-center gap-x-2 bg-gray-100 rounded-md p-3'>
                                <div className='flex gap-x-2 items-center'>
                                    <div>
                                        <InformationCircleIcon className='w-5 h-5 text-red-500' />
                                    </div>
                                    <div className=' text-red-500'>
                                        Appointment expired
                                    </div>
                                </div>
                            </div>
                        }
                        <div className='flex items-center justify-between gap-x-2 bg-gray-100 rounded-md p-3'>
                            <div className='flex gap-x-2 items-center'>
                                <div>
                                    <CalendarIcon className='w-5 h-5 text-gray-500' />
                                </div>
                                <div className='font-semibold text-gray-500'>
                                    {dayNames[new Date(appointment?.date)?.getDay()]}, {monthNames[new Date(appointment?.date)?.getMonth()]} {new Date(appointment?.date)?.getDate()}
                                </div>
                            </div>
                            <div className='flex gap-x-2 items-center'>
                                <div>
                                    <ClockIcon className='w-5 h-5 text-gray-500' />
                                </div>
                                <div className='font-semibold text-gray-500'>
                                    {new Date(appointment?.date)?.toLocaleTimeString([], { hour12: true })}
                                </div>
                            </div>
                        </div>
                        <div className='mt-5'>
                            {
                                appointment?.description
                            }
                        </div>
                        <div className='flex flex-col gap-y-5 mt-5'>
                            {
                                appointment?.stage === "pending" &&
                                <>
                                    <div className=''>
                                        <Button text="Accept request" type="secondary" active={true} onClick={() => { acceptRequest(appointment._id) }} loading={loadingAcceptRequest} />
                                    </div>
                                    <div className=''>
                                        <Button text="Reject request" type="" active={true} />
                                    </div>
                                </>
                            }
                            {
                                appointment?.stage === "accepted" && new Date(appointment?.date) >= new Date() &&
                                <div className='mt-5'>
                                    <Button text="Complete appointment" type="secondary" active={true} loading={loadingCompleteRequest} onClick={() => { completeRequest(appointment._id) }} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                ||
                <div className='flex flex-col gap-y-3 shadow-md p-5 rounded-md'>
                    <div className='w-full flex gap-x-2 items-start h-full'>
                        <div>
                            <div className='w-10 h-10 bg-gray-300 animate-pulse rounded-full'>

                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-y-2'>
                            <div className='font-semibold text-base w-1/2 h-4 bg-gray-300 animate-pulse rounded-md'>

                            </div>
                            <div className='font-semibold text-base w-1/2 h-4 bg-gray-300 animate-pulse rounded-md'>

                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-4'>
                        <div className='flex gap-x-2 mt-3 w-full h-4 bg-gray-300 rounded-md animate-pulse'>

                        </div>
                        <div className='flex gap-x-2 mt-3 w-full h-4 bg-gray-300 rounded-md animate-pulse'>

                        </div>
                        <div className='flex gap-x-2 mt-3 w-full h-20 bg-gray-300 rounded-md animate-pulse'>

                        </div>

                    </div>
                </div>
            }
        </div>
    )
}
