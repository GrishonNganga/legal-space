import { useEffect } from "react"

import profile from '../../assets/profile.png'
import { ChevronRightIcon } from "@heroicons/react/24/outline"

import { Toggle, Button } from "../ui"
const Profile = ({ setMiddleTopNavText }) => {
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
                                <div className="text-gray-400">
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
                                <div className="text-gray-400">
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
                                <Button text="Done" type="secondary" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* /End replace */}
            </div>
        </div >
    )
}

export default Profile