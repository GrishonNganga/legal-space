import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { logout } from '../../data/controller'
import { Spinner } from "../ui"

const Logout = ({ setMiddleTopNavText }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setMiddleTopNavText("Logout")
    }, [])

    const logoutUser = () => {
        setLoading(true)
        logout().then(response => {
            setLoading(false)
            if (response?.status === "success") {
                setTimeout(() => {
                    navigate("/")
                }, 1000)
            }
        })
    }
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-col gap-y-5">
                <div className="text-2xl font-bold text-center">
                    Are you sure you want to sign out of your account?
                </div>
                <div className="w-full flex justify-center">
                    <div className="w-3/4 flex justify-between">
                        <div className="px-4 py-2 bg-red-500 rounded-full text-xl font-bold text-white shadow-md" onClick={logoutUser}>
                            {loading && <Spinner /> || "Logout"}
                        </div>
                        <div className="px-4 py-2 bg-gray-300 rounded-full text-xl font-bold text-black shadow-md">
                            Cancel
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Logout