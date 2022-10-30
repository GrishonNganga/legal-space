import { Routes, Route } from 'react-router-dom'

import Payment from './payment'
import Profile from './profile'

const Settings = ({setMiddleTopNavText}) => {
    return (
        <Routes>
            <Route path="/profile" element={<Profile setMiddleTopNavText={setMiddleTopNavText}/>} />
            <Route path="/payment" element={<Payment />} />
        </Routes>
    )
}

export default Settings

