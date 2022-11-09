import { Routes, Route } from 'react-router-dom'

import Payment from './payment'
import Profile from './profile'
import Logout from '../../../components/dashboard/logout'

const Settings = ({ setMiddleTopNavText }) => {
    return (
        <Routes>
            <Route path="/profile/*" element={<Profile setMiddleTopNavText={setMiddleTopNavText} />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/logout" element={<Logout setMiddleTopNavText={setMiddleTopNavText} />} />
        </Routes>
    )
}

export default Settings

