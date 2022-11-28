import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'

import { Button, Notification, Modal, TextArea } from '../../ui';

import { getSpecificClientAppointment, getClientAppointmentsByStatus, clientEditAppointment, clientRateAppointment } from '../../../data/controller'
import { userStore } from '../../../stores';
import { CalendarIcon, ClockIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';

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

    useEffect(() => {
        setMiddleTopNavText("Appointments")
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (user) {
            setLoading(true)
            getClientAppointmentsByStatus().then(response => {
                setLoading(false)
                if (response?.status === "success") {
                    setAppointments(response.data?.appointments)
                }
            })
        }
    }, [user])

    return (
        <div className="py-4 px-2 min-h-screen">
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
                                            <img src={appointment?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43w5sOU4JiJkoPKcLHGWIa51_5RlYgLDMuxkFMbasuLuVWjAhO3rgF2Q3nn8ZfBwmVwQ&usqp=CAU"} className="w-12 h-12 rounded-full" />
                                            <div className='flex flex-col' onClick={() => { navigate(appointment?._id) }}>
                                                <div className='font-semibold text-base capitalize'>
                                                    <span>{appointment?.lawyerId.firstName}</span> <span> {appointment?.lawyerId?.lastName}</span>
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
                                                <div className='mt-5 text-gray-500 tracking-wide'>
                                                    {
                                                        appointment?.description
                                                    }
                                                </div>
                                                {
                                                    appointment?.stage === "pending" &&
                                                    <div className='mt-5'>
                                                        <Button text="Cancel appointment" type="secondary" active={true} />
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
    const [loadingCancelledRequest, setLoadingCancelledRequest] = useState(false)
    const [info, setInfo] = useState({ message: "", type: "" })
    const [showRateAppointmentModal, setShowRateAppointmentModal] = useState(false)
    useEffect(() => {
        setMiddleTopNavText("Appointment Details")
    }, [])

    useEffect(() => {
        const appointmentId = location.pathname.split('/')[3]
        setLoading(true)
        getSpecificClientAppointment(appointmentId).then(response => {
            setLoading(false)
            if (response?.status === "success") {
                setAppointment(response?.data?.appointment)
            }
        })
    }, [location])

    const cancelRequest = (id) => {
        setLoadingCancelledRequest(true)
        clientEditAppointment(id, { stage: "cancelled" }).then(response => {
            setLoadingCancelledRequest(false)
            if (response?.status === "success") {
                window.location.reload()
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
                            <div className='font-semibold text-base flex gap-x-1 capitalize'>
                                <span>
                                    {
                                        appointment?.lawyerId?.firstName
                                    }
                                </span>
                                <span>
                                    {
                                        appointment?.lawyerId?.lastName
                                    }
                                </span>
                            </div>
                            <div className='flex gap-x-3 items-center'>
                                <div className=' text-gray-400 text-sm'>
                                    {appointment?.subject}
                                </div>
                            </div>
                            {/* <div className='flex gap-x-3 items-center'>
                                <div className='text-xs text-gray-500'>
                                    lawyer {appointment?.lawyer?.location?.split("-")[3]} offices
                                </div>
                            </div> */}
                            <div>

                            </div>
                        </div>
                    </div>
                    <div className=''>
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
                        {
                            appointment?.stage === "pending" &&
                            <div className='mb-3 flex items-center gap-x-2 bg-gray-100 rounded-md p-3'>
                                <div className='flex gap-x-2 items-center'>
                                    <div>
                                        <InformationCircleIcon className='w-5 h-5 text-yellow-500' />
                                    </div>
                                    <div className=' text-yellow-500'>
                                        Awaiting lawyer confirmation
                                    </div>
                                </div>
                            </div>
                        }
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

                        <div className='mt-5 text-gray-500 tracking-wide'>
                            {
                                appointment?.description
                            }
                        </div>
                        <div className='flex flex-col gap-y-5 mt-5'>
                            {
                                appointment?.stage === "pending" &&
                                <div className='mt-5'>
                                    <Button text="Cancel appointment" type="" active={true} loading={loadingCancelledRequest} onClick={() => { cancelRequest(appointment._id) }} />
                                </div>
                            }
                        </div>
                        <div className='flex flex-col gap-y-5 mt-5'>
                            {
                                appointment?.stage === "completed" && !appointment?.ratingId &&
                                <div className='mt-5'>
                                    <Button text="Rate your appointment" type="" active={true} onClick={() => { setShowRateAppointmentModal(true) }} />
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
            {
                showRateAppointmentModal ?
                    <div className='absolute top-0 w-full  h-full'>
                        <div className='w-full h-full backdrop-blur-sm flex justify-center items-center z-40'>
                            <Modal open={showRateAppointmentModal} setOpen={(prevState) => { setShowRateAppointmentModal(prevState => !prevState) }} ui={<RateAppointmentModal appointment={appointment} />} />
                        </div>
                    </div>
                    :
                    <>

                    </>
            }
        </div>
    )
}

const RateAppointmentModal = ({ appointment }) => {
    console.log(appointment)
    const navigate = useNavigate()
    const [description, setDescription] = useState("")
    const [selectedRating, setSelectedRating] = useState(null)
    const [enableRating, setEnableRating] = useState(false)
    const [loadingRating, setLoadingRating] = useState(false)

    useEffect(() => {
        if (selectedRating && description !== "") {
            setEnableRating(true)
        } else {
            setEnableRating(false)
            return
        }
    }, [description, selectedRating])

    const handleSubmit = () => {
        setLoadingRating(true)
        clientRateAppointment(appointment?._id, { rating: selectedRating, comment: description }).then(response => {
            setLoadingRating(false)
            if (response?.status === "success") {
                window.location.reload()
            } else {
                console.log(response)
            }
        })
    }

    return (
        <div className='w-full flex flex-col items-center gap-y-4'>
            <div className='text-gray-500 trext-sm'>
                How was your appointment?
            </div>
            <div className='flex'>
                {
                    [...Array(5)].map((idx, index) => {
                        if (selectedRating > index) {
                            return (
                                <div key={index}>
                                    <StarIcon className='w-9 h-9 text-yellow-500' />
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className='cursor-pointer' onClick={() => { setSelectedRating(index + 1) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className='w-3/4'>
                <TextArea
                    id="description"
                    name="description"
                    type="text"
                    placeholder={"Tell us about your experience"}
                    autoComplete="text"
                    required
                    onChange={(e) => { setDescription(e.target.value) }}
                />
            </div>
            <div className='w-full md:w-1/2'>
                <Button type="secondary" text="Complete" active={enableRating} loading={loadingRating} onClick={handleSubmit} />
            </div>
        </div>
    )
}