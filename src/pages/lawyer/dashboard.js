import { useState, useEffect } from 'react'
import { useLocation, Routes, Route, useNavigate } from 'react-router-dom'

import { Sidebar } from '../../components/dashboard/sidebar'
import { MiddleTopNav } from '../../components/dashboard/navigation'

import Main from '../../components/lawyer/dashboard'
import Settings from '../../components/lawyer/dashboard/settings'
import Appointments from '../../components/lawyer/dashboard/apointments'

import { Modal, Button } from '../../components/ui'
import { userStore } from '../../stores'

const Dashboard = () => {
    const user = userStore(state => state.user)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [collapsedMenu, setCollapsedMenu] = useState(false)
    const [refreshPage, setRefreshPage] = useState(true)
    const [currentRoute, setCurrentRoute] = useState()
    const [profileComplete, setProfileComplete] = useState(true)
    const [middleTopNavText, setMiddleTopNavText] = useState("Lawyerspace.io")
    const [onboardingPercentage, setOnboardingPercentage] = useState(0)

    const location = useLocation()
    const routePrefix = "/dashboard"

    useEffect(() => {
        setRefreshPage(false)
    }, [])

    useEffect(() => {
        if (refreshPage) {
            setRefreshPage(false)
        }
    }, [refreshPage])

    useEffect(() => {
        setRefreshPage(true)
        setCurrentRoute(location.pathname)
    }, [location])
    useEffect(() => {
        if (user) {
            setProfileComplete(user?.onboarding)
        }
    }, [user])
    return (
        <div className='relative'>
            <div>
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} collapsedMenu={collapsedMenu} currentRoute={currentRoute} routePrefix={routePrefix} />
                <div className={`md:pl-64 flex flex-col flex-1 ${collapsedMenu && "md:pl-16 ease-in-out duration-300"}`}>
                    <MiddleTopNav setSidebarOpen={setSidebarOpen} setCollapsedMenu={setCollapsedMenu} middleTopNavText={middleTopNavText} />
                    <main className="flex-1">
                        <div>
                            <Routes>
                                {
                                    <>
                                        <Route path="/" exact element={<Main setMiddleTopNavText={setMiddleTopNavText} updateOnboardingPercentage={setOnboardingPercentage} />} />
                                        <Route path="/appointments/*" element={<Appointments setMiddleTopNavText={setMiddleTopNavText} />} />
                                        <Route path="/settings/*" element={<Settings setMiddleTopNavText={setMiddleTopNavText} />} />
                                    </>
                                }
                            </Routes>
                        </div>
                    </main>
                </div>
            </div>
            {
                !profileComplete ?
                    <div className='absolute top-0 w-full  h-full'>
                        <div className='w-full h-full backdrop-blur-sm flex justify-center items-center z-40'>
                            <Modal open={!profileComplete} setOpen={(prevState) => { setProfileComplete(prevState => !prevState) }} ui={<CompleteProfileModal onboardingPercentage={onboardingPercentage} />} />
                        </div>
                    </div>
                    :
                    <>

                    </>
            }
        </div>
    )
}

export default Dashboard

const CompleteProfileModal = ({ onboardingPercentage }) => {
    const navigate = useNavigate()

    return (
        <div className='w-full flex flex-col items-center gap-y-4'>
            <div className='text-3xl font-semibold text-center px-4'>
                Complete your profile to access your clients
            </div>
            <div className='text-gray-500 trext-sm'>
                Your profile is {onboardingPercentage}% complete
            </div>
            <div className='w-full md:w-1/2'>
                <Button type="secondary" text="Complete" active={true} onClick={() => { navigate('/onboarding?type=individual') }} />
            </div>
        </div>
    )
}