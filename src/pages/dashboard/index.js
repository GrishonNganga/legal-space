import { useState, useEffect } from 'react'
import { useLocation, Routes, Route } from 'react-router-dom'

import { Sidebar } from '../../components/dashboard/sidebar'
import { MiddleTopNav } from '../../components/dashboard/navigation'

import Main from '../../components/dashboard'
// import Companies from '../components/dashboard/pages/companies'

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [collapsedMenu, setCollapsedMenu] = useState(false)
    const [refreshPage, setRefreshPage] = useState(true)
    const [currentRoute, setCurrentRoute] = useState()
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
        <>
            <div>
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} collapsedMenu={collapsedMenu} currentRoute={currentRoute} routePrefix={routePrefix} />
                <div className={`md:pl-64 flex flex-col flex-1 ${collapsedMenu && "md:pl-16 ease-in-out duration-300"}`}>
                    <MiddleTopNav setSidebarOpen={setSidebarOpen} setCollapsedMenu={setCollapsedMenu} />
                    <main className="flex-1">
                        <div>
                            <Routes>
                                {<Route path="/" exact element={<Main />} />
                                /*<Route path="/companies/*" element={<Companies />} /> */}
                                {/* <Route path="/settings" exact element={<Settings />} /> */}
                            </Routes>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Dashboard