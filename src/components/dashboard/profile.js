import { useEffect } from "react"
import { Routes, Route, useNavigate } from 'react-router-dom'

import profile from '../../assets/profile.png'
import { ChevronRightIcon } from "@heroicons/react/24/outline"

import { Toggle, Button, Input } from "../ui"

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

    useEffect(() => {
        setMiddleTopNavText("My Profile")
    }, [])

    return (
        <div className="w-full py-4 px-2">
            <div className="w-full max-w-7xl mx-auto sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="w-full py-4 flex flex-col">
                    <div className="w-full flex flex-col items-center gap-y-4 flex-wrap">
                        <div>
                            <img src={profile} className />
                        </div>
                        <div className="text-lg">
                            Alexander Johannsen
                        </div>
                        <div className="grow-0 w-full text-center text-lg font-semibold text-gray-300 truncate">
                            <span>
                                alexanderjohannsen@gmail.com
                            </span>
                        </div>

                        <div className="w-full flex flex-col p-3 px-5 divide-y">
                            <div className="flex justify-between p-4">
                                <div className="text-gray-400">
                                    User Name
                                </div>
                                <div>
                                    Alexander Johannsen
                                </div>
                            </div>
                            <div className="flex justify-between p-4">
                                <div className="text-gray-400">
                                    Email
                                </div>
                                <div>
                                    alexanderjohannsen@gmail.com
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
                            <div className="flex justify-between p-4">
                                <div className="text-gray-400">
                                    Notifications
                                </div>
                                <div>
                                    <Toggle enabled={true} setEnabled={() => { }} />
                                </div>
                            </div>
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
                            <div className="flex justify-between p-4 text-gray-400">
                                <div>
                                    About me
                                </div>
                            </div>
                            <div className="flex gap-x-3 p-4 items-center">
                                <div className="shrink-0 text-gray-400">
                                    Areas of practice
                                </div>
                                <div className="w-full flex gap-x-1 text-xs">
                                    <div className="px-3 py-1 bg-[#EDF5F3] rounded-full">
                                        General
                                    </div>
                                    <div className="px-3 py-1 bg-[#EDF5F3] rounded-full">
                                        Family
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between p-4">
                                <div className="text-gray-400">
                                    Years of practice
                                </div>
                                <div className="text-gray-400">
                                    7
                                </div>
                            </div>
                            <div className="mt-3">
                                <Button text="Done" type="secondary" active={true}/>
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
    useEffect(() => {
        setMiddleTopNavText("Password")
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-screen">
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
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <Button text="Save changes" type={"secondary"} />
                </div>
            </div>
        </div>
    )

}

const PreviousEngagements = ({ setMiddleTopNavText }) => {
    useEffect(() => {
        setMiddleTopNavText("Engagements")
    }, [])

    return (
        <div className="w-full py-4 px-2">
            <div className="w-full max-w-7xl mx-auto sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className='flex flex-col gap-y-5 p-3'>
                    <div className='flex flex-col gap-y-3 shadow-md px-5 rounded-md'>
                        <div className='flex gap-x-2 items-center'>
                            <div className='w-10 h-10 bg-gray-200 rounded-full shrink-0'>

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
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-3 shadow-md p-5 rounded-md'>
                        <div className='flex gap-x-2 items-center'>
                            <div className='w-10 h-10 bg-gray-200 rounded-full shrink-0'>

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
                        </div>
                    </div>
                    <div className='flex flex-col gap-y-3 shadow-md p-5 rounded-md'>
                        <div className='flex gap-x-2 items-center'>
                            <div className='w-10 h-10 bg-gray-200 rounded-full shrink-0'>

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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}