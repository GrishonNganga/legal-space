import { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from 'react-router-dom'

import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { StarIcon } from "@heroicons/react/24/solid"

import { Toggle, Button, Input, Notification } from "../../ui"

import { userStore } from "../../../stores"

import { editUser, getLawyerAppointmentsByStatus, userChangePassword } from "../../../data/controller"

const Profile = ({ setMiddleTopNavText }) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProfileHome setMiddleTopNavText={setMiddleTopNavText} />} />
                <Route path="/password-reset" element={<PasswordReset setMiddleTopNavText={setMiddleTopNavText} />} />
                <Route path="/previous-engagements" element={<PreviousEngagements setMiddleTopNavText={setMiddleTopNavText} />} />
            </Routes>
        </>
    )
}
export default Profile

const ProfileHome = ({ setMiddleTopNavText }) => {
    const navigate = useNavigate()
    const user = userStore(state => state.user)
    const storeUser = userStore(state => state.storeUser)
    const [userDetails, setUserDetails] = useState()
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState({ message: "", type: "" })

    useEffect(() => {
        setMiddleTopNavText("My Profile")
    }, [])

    const updateUser = (details) => {
        setLoading(true)
        editUser(details).then(response => {
            setLoading(false)
            if (response?.status === "success") {
                const updatedUser = { ...user, ...response?.data?.user }
                storeUser(updatedUser)
                setUserDetails()
                setInfo({ type: "success", message: `Profile updated successfully` })
            } else {
                setInfo({ type: "error", message: response.message })
            }
        })
    }

    return (
        <div className="w-full py-4 px-2">
            <div className="w-full max-w-7xl mx-auto sm:px-6 md:px-8">
                <div>
                    <Notification type={info.type} message={info.message} />
                </div>
                {/* Replace with your content */}
                <div className="w-full py-4 flex flex-col">
                    <div className="w-full flex flex-col items-center gap-y-4 flex-wrap">
                        <div className="w-1/2">
                            <img src={user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43w5sOU4JiJkoPKcLHGWIa51_5RlYgLDMuxkFMbasuLuVWjAhO3rgF2Q3nn8ZfBwmVwQ&usqp=CAU"} className="" />
                        </div>
                        <div className="text-lg">
                            <span>{user?.firstName}</span> <span>{user?.lastName}</span>
                        </div>
                        <div className="grow-0 w-full text-center text-lg font-semibold text-gray-300 truncate">
                            <span>
                                {user?.email}
                            </span>
                        </div>
                        {
                            user?.paid &&
                            <div className="flex flex-col w-full text-center border border-legalGray rounded">
                                <div className="w-full flex justify-center items-center bg-legalGreen py-1 space-x-2">
                                    <div>
                                        <StarIcon className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="text-white text-sm">
                                        {
                                            user?.subscriptionId?.name?.split("_").join(" ")
                                        }
                                    </div>
                                </div>
                                <div className="bg-gray-50 py-2">
                                    Expires on {
                                        new Date().setDate(new Date(user?.subscriptionId?.createdAt).getMonth() + (user?.subscriptionId?.duration === "monthly" ? 1 : 12))
                                    }
                                </div>
                            </div>
                            ||
                            <div className="flex flex-col w-full text-center border border-legalGray rounded">
                                <div className="w-full flex justify-center items-center bg-legalGreen py-1 space-x-2">
                                    <div>
                                        <StarIcon className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="text-white text-sm">
                                        Freemium plan
                                    </div>

                                </div>
                                <div className="bg-gray-50 py-2 text-blue-400 underline" onClick={() => { navigate("/dashboard/settings/payment") }}>
                                    Upgrade to premium
                                </div>
                            </div>
                        }
                        <div className="w-full flex flex-col p-3 px-5 divide-y">
                            <div className="flex justify-between p-4">
                                <div className="text-gray-400">
                                    User Name
                                </div>
                                <div>
                                    <span>{user?.firstName}</span> <span>{user?.lastName}</span>
                                </div>
                            </div>
                            <div className="flex justify-between p-4">
                                <div className="text-gray-400">
                                    Email
                                </div>
                                <div>
                                    {user?.email}
                                </div>
                            </div>
                            <div className="flex justify-between p-4">
                                <div className="text-gray-400" onClick={() => { navigate('password-reset') }}>
                                    Reset Password
                                </div>
                                <div>
                                    ************
                                </div>
                            </div>
                            {
                                user?.paid &&
                                <div className="flex justify-between p-4">
                                    <div className="text-gray-400">
                                        Availability
                                    </div>
                                    <div>
                                        <Toggle enabled={user?.available} setEnabled={() => { updateUser({ available: !user?.available }) }} />
                                    </div>
                                </div>
                            }
                            <div className="flex justify-between p-4">
                                <div className="text-gray-400" onClick={() => { navigate('previous-engagements') }}>
                                    Previous engagements
                                </div>
                            </div>
                            <div className="flex justify-between p-4">
                                <div className="text-gray-400">
                                    Document uploads
                                </div>
                                <div>
                                    <ChevronRightIcon className="w-8 h-8 text-gray-300 font-bold" />
                                </div>
                            </div>
                            <div className="flex flex-col justify-between p-4">
                                <div className="text-gray-400">
                                    About me
                                </div>
                                <div className="text-sm">
                                    {user?.description}
                                </div>
                            </div>
                            <div className="flex gap-x-3 p-4 items-center overflow-x-scroll">
                                <div className="shrink-0 text-gray-400">
                                    Areas of practice
                                </div>
                                <div className="w-full flex gap-x-1 text-xs items-center">
                                    {
                                        user?.areasOfPractice?.length > 0 &&
                                        user?.areasOfPractice.map((practice, idx) => {
                                            return (
                                                <div key={idx} className="px-3 py-1 bg-[#EDF5F3] rounded-full">
                                                    {practice?.title}
                                                </div>
                                            )
                                        })
                                        ||
                                        <div className="px-3 py-1 bg-[#EDF5F3] rounded-full">
                                            None
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="flex justify-between p-4">
                                <div className="text-gray-400">
                                    Years of practice
                                </div>
                                <div className="text-gray-400">
                                    {user?.yearsOfExperience || 0}
                                </div>
                            </div>
                            <div className="mt-3">
                                <Button text="Done" type="secondary" active={true} onClick={() => { navigate("/dashboard") }} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* /End replace */}
            </div>
        </div >
    )
}


const PasswordReset = ({ setMiddleTopNavText }) => {
    const navigate = useNavigate()

    const storeUser = userStore(state => state.storeUser)

    const [passwordDetails, setPasswordDetails] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [completedFields, setCompletedFields] = useState(false)
    const [info, setInfo] = useState({ message: "", type: "" })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setMiddleTopNavText("Password")
    }, [])

    useEffect(() => {
        let completed = true
        for (const key in passwordDetails) {
            if (passwordDetails[key] === "" || !passwordDetails[key]) {
                completed = false
                break
            }
        }
        if (passwordDetails.oldPassword.length < 5 || passwordDetails.newPassword.length < 5) {
            completed = false
            return
        }

        if (passwordDetails.newPassword !== passwordDetails.confirmPassword) {
            completed = false
            return
        }

        if (passwordDetails.newPassword === passwordDetails.oldPassword) {
            completed = false
            return
        }

        setCompletedFields(completed)
    }, [passwordDetails])

    const changePassword = () => {
        setInfo({ message: "", type: "error" })
        for (const key in passwordDetails) {
            if (passwordDetails[key] === "" || !passwordDetails[key]) {
                setInfo({ message: `${key} can't be empty`, type: "error" })
                return
            }
        }
        setLoading(true)
        userChangePassword({ oldPassword: passwordDetails.oldPassword, newPassword: passwordDetails.newPassword }).then(response => {
            setLoading(false)
            if (response?.status === "success") {
                setInfo({ message: `Password changed successfully, please log in again`, type: "success" })
                setTimeout(() => {
                    storeUser(null)
                    navigate('/signin')
                }, 1000)
            } else {
                setInfo({ message: response?.message, type: "error" })
            }
        })
    }
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-screen">
            <div>
                <Notification type={info.type} message={info.message} />
            </div>
            <div className="flex flex-col justify-between">
                <div className="flex flex-col h-full">
                    <div>
                        <div className="mt-1">
                            <Input
                                id="oldPassword"
                                name="oldPassword"
                                type="password"
                                label="Old Password"
                                autoComplete="false"
                                placeholder={"********"}
                                required
                                onChange={(e) => { setPasswordDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="mt-1">
                            <Input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                label="New Password"
                                autoComplete="false"
                                placeholder={"********"}
                                required
                                onChange={(e) => { setPasswordDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="mt-1">
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                label="Confirm Password"
                                placeholder={"********"}
                                autoComplete="false"
                                required
                                onChange={(e) => { setPasswordDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <Button text="Save changes" type={"secondary"} active={completedFields} onClick={changePassword} loading={loading} />
                </div>
            </div>
        </div>
    )

}

const PreviousEngagements = ({ setMiddleTopNavText }) => {
    const [engagements, setEngagements] = useState([])
    const user = userStore(state => state.user)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setMiddleTopNavText("Engagements")
    }, [])

    useEffect(() => {
        setLoading(true)
        getLawyerAppointmentsByStatus().then(response => {
            setLoading(false)
            if (response?.status === "success") {
                setEngagements(response?.data?.appointments)
            }
        })
    }, [user])

    return (
        <div className="w-full py-4 px-2">
            <div className="w-full max-w-7xl mx-auto sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className='flex flex-col gap-y-5 p-3'>
                    {
                        !loading && engagements?.map((engagement, idx) => {
                            if (engagement?.stage === "completed" || engagement?.stage === "closed") {
                                return (
                                    <div key={idx} className='flex flex-col gap-y-3 shadow-md p-5 rounded-md'>
                                        <div className='flex gap-x-2 items-start'>
                                            <img src={engagement?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43w5sOU4JiJkoPKcLHGWIa51_5RlYgLDMuxkFMbasuLuVWjAhO3rgF2Q3nn8ZfBwmVwQ&usqp=CAU"} className="w-12 h-12 rounded-full" />
                                            <div className='flex flex-col'>
                                                <div className='font-semibold text-base flex gap-x-1'>
                                                    <span>
                                                        {
                                                            engagement?.clientId?.firstName
                                                        }
                                                    </span>
                                                    <span>
                                                        {
                                                            engagement?.clientId?.lastName
                                                        }
                                                    </span>
                                                </div>
                                                <div className='flex gap-x-3 items-center'>
                                                    <div className=' text-gray-400 text-sm'>
                                                        {
                                                            engagement?.subject
                                                        }
                                                    </div>
                                                    {
                                                        user?.location &&
                                                        <div className='w-1 h-1 bg-gray-400'>

                                                        </div>
                                                    }
                                                    <div className='-ml-2 text-xs text-gray-500'>
                                                        {user?.location}
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
                                                    {new Date(engagement?.date)?.toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className='flex gap-x-2 mt-3'>
                                                <div>
                                                    Time
                                                </div>
                                                <div>
                                                    {new Date(engagement?.date)?.toLocaleTimeString([], { hour12: true })}
                                                </div>
                                            </div>
                                            <div className='mt-5'>
                                                {
                                                    engagement?.description
                                                }
                                            </div>
                                        </div>
                                        {
                                            engagement?.stage === "closed" &&
                                            <div className="w-full flex mt-4">
                                                <div>
                                                    <div className="border border-red-500 px-4 py-2 rounded-md text-red-500">
                                                        Closed
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {
                                            engagement?.stage === "completed" &&
                                            <div className="w-full flex mt-4">
                                                <div>
                                                    <div className="border border-green-500 px-4 py-2 rounded-md text-green-500">
                                                        Completed
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                            }
                        })
                        ||
                        loading && [...Array(3)].map(idx => {
                            return (
                                <div key={idx} className='flex flex-col gap-y-3 shadow-md p-5 rounded-md'>
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
                            )
                        })

                    }
                </div>
            </div>
        </div>
    )
}