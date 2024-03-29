import { useState, useEffect } from 'react'
import { useLocation, Routes, Route } from 'react-router-dom'

import { Sidebar } from '../../components/client/dashboard/sidebar'
import { MiddleTopNav } from '../../components/dashboard/navigation'

import Main from '../../components/client/dashboard'
import LawyerDetails from '../../components/client/dashboard/lawyerDetails'
import Appointments from '../../components/client/dashboard/appointments'
import Logout from '../../components/dashboard/logout'
import Profile from '../../components/client/dashboard/clientProfile'
import ClientProfile from '../../components/client/dashboard/clientProfile'
import PasswordReset from '../../components/client/dashboard/resetPassword'

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [collapsedMenu, setCollapsedMenu] = useState(false)
    const [refreshPage, setRefreshPage] = useState(true)
    const [currentRoute, setCurrentRoute] = useState()
    const [middleTopNavText, setMiddleTopNavText] = useState("Legalspace.App")

    const location = useLocation()
    const routePrefix = "/dashboard"
    //These useEffects are used to handle when the url changes without explicit refresh. 
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
    return (
        <div className='relative bg-gray-50'>
            <div>
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} collapsedMenu={collapsedMenu} currentRoute={currentRoute} routePrefix={routePrefix} />
                <div className={`md:pl-64 flex flex-col flex-1 ${collapsedMenu && "md:pl-16 ease-in-out duration-300"}`}>
                    <MiddleTopNav setSidebarOpen={setSidebarOpen} setCollapsedMenu={setCollapsedMenu} middleTopNavText={middleTopNavText} />
                    <main className="flex-1">
                        <div>
                            <Routes>
                                {
                                    <>
                                        <Route path="/" exact element={<Main setMiddleTopNavText={setMiddleTopNavText} />} />
                                        <Route path="/lawyer/:id" exact element={<LawyerDetails setMiddleTopNavText={setMiddleTopNavText} />} />
                                        <Route path="/appointments/*" element={<Appointments setMiddleTopNavText={setMiddleTopNavText} />} />
                                        <Route path='/profile/' element={<ClientProfile setMiddleTopNavText={setMiddleTopNavText} />} />
                                        <Route path="/logout" element={<Logout setMiddleTopNavText={setMiddleTopNavText} />} />
                                        <Route path="/password-reset" element={<PasswordReset setMiddleTopNavText={setMiddleTopNavText} />} />
                                    </>
                                }
                            </Routes>
                        </div>
                    </main>
                </div>
            </div>

        </div>
    )
}

export default Dashboard
