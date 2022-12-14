import { useEffect } from "react"

const Engagements = ({ setMiddleTopNavText }) => {
    useEffect(() => {
        setMiddleTopNavText("Engagements")
    }, [])
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="mt-24">
                No Engagements yet
            </div>
        </div>
    )
}

export default Engagements