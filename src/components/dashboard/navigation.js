import { useState, useEffect } from 'react'
import {
    Bars3Icon,
    BellIcon
} from '@heroicons/react/24/outline'

import { SlideOver } from '../ui'

import { getNotifications, clearNotification } from '../../data/controller'
import { userStore } from '../../stores'
import { useNavigate } from 'react-router-dom'

export const MiddleTopNav = ({ setSidebarOpen, setCollapsedMenu, middleTopNavText }) => {
    const user = userStore(state => state.user)
    const [showNotification, setShowNotification] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [unviewedNotification, setUnviewedNotification] = useState(false)

    useEffect(() => {
        getNotifications().then(response => {
            if (response?.status === "success") {
                setNotifications(response?.data)
            }
        })

    }, [])

    useEffect(() => {
        console.log("notifssss", notifications)
        const notViewedNotification = notifications?.find(notification => !notification.id)
        setUnviewedNotification(notViewedNotification)

    }, [notifications])

    return (
        <div className="w-full sticky top-0 z-10 flex items-center justify-between bg-gray-50 p-4">
            <div>
                <button
                    type="button"
                    className="h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset"
                    onClick={() => { setSidebarOpen(prevState => !prevState); setCollapsedMenu(prevState => !prevState) }}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div className='font-extrabold text-[#C4C4C4]'>
                {
                    middleTopNavText
                }
            </div>

            <div className="relative">
                <div className="w-full flex items-center" onClick={() => { setShowNotification(prevState => !prevState) }}>
                    <button
                        type="button"
                        className="bg-white rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                    >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    {
                        unviewedNotification &&
                        <div className='absolute -top-0.5 right-0'>
                            <div className='w-2 h-2 bg-red-500 rounded-full animate-pulse'>

                            </div>
                        </div>
                    }
                    {
                        user?.role === "client" &&
                        <SlideOver open={showNotification} setOpen={setShowNotification} title={"Notifications"} ui={<ClientNotificationsUI notifications={notifications} closeNotifications={setShowNotification(false)} />} />
                    }

                    {
                        user?.role === "lawyer" &&
                        <SlideOver open={showNotification} setOpen={setShowNotification} title={"Notifications"} ui={<LawyerNotificationsUI notifications={notifications} closeNotifications={() => { setShowNotification(false) }} />} />
                    }

                    {/* Profile dropdown */}
                </div>
            </div>
        </div>
    )
}

const ClientNotificationsUI = ({ notifications }) => {
    useEffect(() => {
        notifications?.forEach(notification => {
            clearNotification(notification?._id)
        })
    }, [])

    return (
        <div className='flex flex-col'>
            {
                notifications?.map(notification => {
                    if (!notification?.seen) {
                        return (
                            <div>
                                {
                                    notification.stage === "accepted" &&
                                    <span>
                                        Your appointment request with {notification?.lawyerId?.firstName} has been accepted
                                    </span>
                                }
                                {
                                    notification.stage === "rejected" &&
                                    <span>
                                        Your appointment request with {notification?.lawyerId?.firstName} has been rejected
                                    </span>
                                }
                                {
                                    notification.stage === "completed" &&
                                    <span>
                                        Your appointment with {notification?.lawyerId?.firstName} has been closed
                                    </span>
                                }
                            </div>
                        )
                    }
                })
            }
            {
                notifications?.length === 0 &&
                <div className='flex justify-center'>
                    <div>
                        You don't have any notifications
                    </div>
                </div>
            }
        </div>
    )
}

const LawyerNotificationsUI = ({ notifications, closeNotifications }) => {
    const navigate = useNavigate()

    useEffect(() => {
        notifications?.forEach(notification => {
            clearNotification(notification?._id)
        })
    }, [])

    return (
        <div className='flex flex-col border-t'>
            {
                notifications?.map(notification => {
                    if (notification?.seen) {
                        return (
                            <div className='text-sm hover:bg-gray-50 p-2'>
                                You have a new appointment request. from {notification?.appointmentId?.clientId?.firstName} <span className='underline text-blue-400 hover:cursor-pointer' onClick={() => { closeNotifications(); navigate(`/dashboard/appointments/${notification?.appointmentId?._id}`) }}>View</span>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}