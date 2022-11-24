import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";

import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { StarIcon } from '@heroicons/react/24/solid';

import { Button, Input, TextArea, Calendar, Notification } from '../../../components/ui'

import { getSpecificLawyer, clientCreateAppointment, getLawyerBookedDates } from '../../../data/controller'

import { userStore } from "../../../stores";

const LawyerDetails = ({ setMiddleTopNavText }) => {
    const location = useLocation()
    const lawyer = userStore(state => state.lawyer)
    const setLawyer = userStore(state => state.setLawyer)
    const [bookAppointment, setBookAppointment] = useState(false)
    const [appointmentBooked, setAppointmentBooked] = useState(false)
    const [bookedDates, setBookedDates] = useState([])

    useEffect(() => {
        setMiddleTopNavText("Lawyer Details")
        if (!lawyer) {
            const pathname = location?.pathname?.split('/')
            const lawyerId = pathname[3]
            getSpecificLawyer(lawyerId).then(response => {
                if (response?.status === "success") {
                    setLawyer(response?.data?.lawyer)
                }
            })
        }
    }, [])

    useEffect(() => {
        if (lawyer) {
            getLawyerBookedDates(lawyer?._id).then(response => {
                if (response?.status === "success") {
                    setBookedDates(response?.data?.dates)
                }
            })
        }
    }, [lawyer])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* Replace with your content */}
            <div className="">
                <div className="flex flex-col gap-y-5">
                    <div className="w-full flex justify-center">
                        <div className="w-3/4 md:w-1/4 relative">
                            <img src={lawyer?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43w5sOU4JiJkoPKcLHGWIa51_5RlYgLDMuxkFMbasuLuVWjAhO3rgF2Q3nn8ZfBwmVwQ&usqp=CAU"} className="w-full rounded-md" />
                            <div className="absolute top-3/4 w-full flex justify-center">
                                <div className="flex flex-col bg-white p-4 rounded-md text-center w-10/12 shadow-md">
                                    <div className="text-[#126B59] font-semibold text-xl text-center">
                                        <span> {lawyer?.frstName} </span>  {lawyer?.lastName}
                                    </div>
                                    <div className="text-gray-400 font-semibold text-">
                                        Criminal Lawyer
                                    </div>
                                    <div className="flex gap-x-2 justify-center items-center">
                                        <div className='-ml-2 text-sm text-gray-500'>
                                            {lawyer?.location}
                                        </div>
                                        {
                                            lawyer?.location &&
                                            <div className='w-2 h-2 bg-gray-400 rounded-full'>

                                            </div>
                                        }
                                        <div className='flex gap-x-1 items-center'>
                                            <div>
                                                <StarIcon className='w-5 h-5 text-[#DEAB52]' />
                                            </div>
                                            <div className='text-xs text-[#DEAB52]'>
                                                {
                                                    lawyer?.rating || 0
                                                }
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        !bookAppointment &&
                        <LawyerInfo setBookAppointment={setBookAppointment} lawyer={lawyer} />
                        ||
                        <>
                            <BookAppointment setMiddleTopNavText={setMiddleTopNavText} setAppointmentBooked={setAppointmentBooked} lawyer={lawyer} bookedDates={bookedDates} />
                        </>
                    }
                </div>
            </div>

        </div>
    )
}
export default LawyerDetails

const LawyerInfo = ({ setBookAppointment, lawyer }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
    })

    return (
        <div>
            <div className="mt-20 w-full justify-center">
                <div className="grid grid-rows-2 grid-cols-2 md:grid-cols-3 md:grid-rows-1 grid-flow-col gap-4">
                    <div className="flex flex-col gap-y-4 p-4 bg-white shadow grow-0">
                        <div>
                            Cases handled
                        </div>
                        <div className="text-[#DEAB52]">
                            {lawyer?.casesHandled?.length || 0} {lawyer?.casesHandled?.length > 0 && "+"}
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4 p-4 bg-white shadow">
                        <div>
                            Experience
                        </div>
                        <div className="text-[#DEAB52]">
                            {lawyer?.yearsOfExperience} yrs+
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4 p-4 bg-white shadow">
                        <div>
                            Endorsements
                        </div>
                        <div className="text-[#DEAB52]">
                            -
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
                        {
                            lawyer?.available &&
                            <div className="bg-[#B8C1BF] text-legalGreen p-2 rounded-lg font-semibold text-sm">
                                Available
                            </div>
                            ||
                            <div className="bg-[#d4d4b3] text-legalYellow p-2 rounded-lg font-semibold text-sm">
                                Not available
                            </div>
                        }
                    </div>
                </div>
                <div className="mt-5">
                    {
                        lawyer?.description
                    }
                </div>
            </div>
            <div className="flex flex-col mt-5">
                <div className="flex justify-between">
                    <div className="text-xl font-semibold text-legalGreen">
                        Location
                    </div>
                </div>
                <div className="h-72 md:h-96">
                    <div className='text-sm text-gray-500 w-full h-full'>
                        {
                            isLoaded &&
                            <GoogleMap
                                center={{ lat: -1.2648630155272294, lng: 36.79303435556186 }}
                                mapContainerStyle={{ width: '100%', height: '100%' }} zoom={15}
                                options={{ zoomControl: false, fullscreenControl: false }}
                            >
                                <MarkerF position={{ lat: -1.2648630155272294, lng: 36.79303435556186 }} />
                            </GoogleMap>
                            ||
                            <div className="w-full h-full bg-gray-50 animate-pulse">

                            </div>
                        }
                    </div>
                </div>
                {
                    lawyer?.available &&
                    <div className="w-full my-5">
                        <Button type="secondary" text={"Book appointment"} active={true} onClick={() => { setBookAppointment(true) }} />
                    </div>
                }
            </div>
        </div>
    )
}

const BookAppointment = ({ setMiddleTopNavText, lawyer, bookedDates }) => {
    const navigate = useNavigate()
    const currentDate = new Date();
    let thisMonthFirstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const thisMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate()
    let thisMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), thisMonthDays + 7)
    if (thisMonthFirstDay.getDay() !== 1) {
        thisMonthFirstDay = new Date(thisMonthFirstDay.setDate(thisMonthFirstDay.getDate() - thisMonthFirstDay.getDay() + 1))
    }
    if (thisMonthLastDay.getDay() !== 7) {
        thisMonthLastDay = new Date(thisMonthLastDay.setDate(thisMonthLastDay.getDate() + (7 - thisMonthLastDay.getDay())))
    }
    const days = []
    let day = thisMonthFirstDay
    do {
        days.push({
            date: new Date(day),
            events: bookedDates?.filter(bd => ((new Date(bd.date).getFullYear() === day.getFullYear()) && (new Date(bd.date).getMonth() === day.getMonth()) && (new Date(bd.date).getDate() === day.getDate()))),
            isCurrentMonth: day.getMonth() === currentDate.getMonth(),
            isToday: ((day.getDate() === currentDate.getDate()) && (day.getFullYear() === currentDate.getFullYear()) && (day.getMonth() === currentDate.getMonth()))
        })
        day = new Date(day.setDate(day.getDate() + 1))
    } while (thisMonthLastDay >= day)

    const timeIsValid = (date, time) => {
        if (date > currentDate) return true
        return currentDate?.getHours() < time
    }
    const timeSlots = [
        { name: "8 AM", time: 8, available: timeIsValid(currentDate, 8) },
        { name: "9 AM", time: 9, available: timeIsValid(currentDate, 9) },
        { name: "10 AM", time: 10, available: timeIsValid(currentDate, 10) },
        { name: "11 AM", time: 11, available: timeIsValid(currentDate, 11) },
        { name: "12 PM", time: 12, available: timeIsValid(currentDate, 12) },
        { name: "13 PM", time: 13, available: timeIsValid(currentDate, 13) },
        { name: "14 PM", time: 14, available: timeIsValid(currentDate, 14) },
        { name: "15 PM", time: 15, available: timeIsValid(currentDate, 15) },
        { name: "16 PM", time: 16, available: timeIsValid(currentDate, 16) },
    ]
    const [calendarDays, setCalendarDays] = useState(days)
    const [step, setStep] = useState(1)
    const [bookingDetails, setBookingDetails] = useState({
        lawyerId: lawyer?._id,
        subject: "",
        description: "",
        date: null,
        time: null
    })
    const [completeBookingStepOne, setCompleteBookingStepOne] = useState(false)
    const [completeBookingStepTwo, setCompleteBookingStepTwo] = useState(false)
    const [availableSlots, setAvailableSlots] = useState(timeSlots)
    const [selectedDay, setSelectedDay] = useState(calendarDays.find(day => day.isToday))
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState({ message: "", type: "" })

    useEffect(() => {
        setMiddleTopNavText("Book appointment")
    }, [])

    useEffect(() => {
        if (bookingDetails.subject === "" || bookingDetails.description === "" || bookingDetails.subject.length < 3 || bookingDetails.description.length < 6) {
            setCompleteBookingStepOne(false)
        } else {
            setCompleteBookingStepOne(true)
        }

        let completedStepTwo = true
        for (const key in bookingDetails) {
            if (bookingDetails[key] === "" || !bookingDetails[key]) {
                completedStepTwo = false
                break
            }
        }
        setCompleteBookingStepTwo(completedStepTwo)
    }, [bookingDetails])

    useEffect(() => {
        if (selectedDay) {
            setBookingDetails(prevState => ({ ...prevState, date: selectedDay.date }))
            const newAvailableSlots = availableSlots?.map(slot => {
                if (bookingDetails?.time === slot.time) {
                    return { ...slot, available: false }
                }
                if (selectedDay?.events && selectedDay?.events?.find(event => new Date(event?.date)?.getHours() === slot?.time)) {
                    return { ...slot, available: false }
                }
                return { ...slot, available: timeIsValid(selectedDay?.date, slot.time) }
            })
            setAvailableSlots(newAvailableSlots)
        }
    }, [selectedDay])

    const selectDay = (index) => {
        const changedDays = days.map((day, idx) => {
            if (index === idx) {
                setSelectedDay({ ...day, isSelected: true })
                return { ...day, isSelected: true }
            } else {
                return { ...day, isSelected: false }
            }
        })
        setCalendarDays(changedDays)
    }

    const bookDay = (index, time) => {
        const newSlots = availableSlots.map((slot, idx) => {
            if (index === idx) {
                return { ...slot, available: false }
            }
            if (selectedDay?.events && selectedDay?.events?.find(event => new Date(event?.date)?.getHours() === slot?.time)) {
                return { ...slot, available: false }
            }
            return { ...slot, available: timeIsValid(selectedDay?.date, slot.time) }
        })
        setAvailableSlots(newSlots)
        setBookingDetails(prevState => ({ ...prevState, "time": time }))
    }
    const handleSubmit = () => {
        for (const key in bookingDetails) {
            if (bookingDetails[key] === "" || !bookingDetails[key]) {
                setInfo({ message: `${key} can't be empty`, type: "error" })
                break
            }
        }
        setLoading(true)
        const formattedDate = new Date(bookingDetails.date.getFullYear(), bookingDetails.date.getMonth(), bookingDetails.date.getDate(), bookingDetails.time, 0, 0)
        clientCreateAppointment({ lawyerId: bookingDetails.lawyerId, subject: bookingDetails.subject, description: bookingDetails.description, date: formattedDate }).then(response => {
            if (response?.status === "success") {
                setInfo({ message: "Appointment request sent successfully. You will be notified once lawyer reviews the request.", type: "success" })
                setTimeout(() => {
                    navigate(`/dashboard/appointments/${response?.data?.appointment?._id}`)

                }, 3000)
            } else {
                setInfo({ message: response?.message, type: "error" })
            }
        })
    }

    return (
        <div className="mt-20">
            <div>
                <Notification type={info.type} message={info.message} />
            </div>
            {
                step === 1 &&
                <div className="flex flex-col my-5">
                    <div className="flex justify-between items-center">
                        <div className="text-xl font-semibold text-legalGreen">
                            Appointment for
                        </div>
                        <div>
                            {
                                lawyer?.available &&
                                <div className="bg-[#B8C1BF] text-legalGreen p-2 rounded-lg font-semibold text-sm">
                                    Available
                                </div>
                                ||
                                <div className="bg-[#d4d4b3] text-legalYellow p-2 rounded-lg font-semibold text-sm">
                                    Not available
                                </div>
                            }
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col gap-y-3">
                        <div>
                            <Input
                                id="subject"
                                type="text"
                                name="subject"
                                placeholder=""
                                label="Appointment subject"
                                className={"border-0 bg-gray-100"}
                                onChange={(e) => { setBookingDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                            />
                        </div>
                        <div>
                            <TextArea
                                id="description"
                                name="description"
                                placeholder="Tell me more about your case"
                                label="Let me know more about your case"
                                className={"border-0 bg-gray-100"}
                                onChange={(e) => { setBookingDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                            />
                        </div>
                        <div>
                            <Button text={"Next"} type="secondary" onClick={() => { setStep(prevState => prevState + 1) }} active={completeBookingStepOne} />
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
                        <Calendar currentDate={currentDate} days={calendarDays} selectDay={selectDay} />
                    </div>
                    <div>
                        <div className="text-xl font-semibold text-legalGreen mt-5">
                            Select Appointment Time
                        </div>
                    </div>
                    <div className="grid grid-rows-3 grid-cols-3 grid-flow-row gap-4 mt-5">
                        {availableSlots?.map((slot, index) => {
                            return (
                                <div key={index} className={`w-full py-4 border rounded-full flex justify-center items-center ${slot.available && bookingDetails.time !== slot?.time && "border-[#DEAB52] text-[#DEAB52]"} ${bookingDetails?.time === slot.time ? "text-white bg-[#DEAB52] " : "text-gray-300"}`} onClick={() => { slot?.available && bookDay(index, slot.time) }}>
                                    {slot.name}
                                </div>
                            )
                        })}
                    </div>
                    <div className="mt-5">
                        <Button text="Book appointment" type="secondary" active={completeBookingStepTwo} loading={loading} onClick={handleSubmit} />
                    </div>
                </div>
            }
        </div>
    )
}
