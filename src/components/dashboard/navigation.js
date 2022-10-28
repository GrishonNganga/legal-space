import {
    Bars2Icon,
    BellIcon
} from '@heroicons/react/24/outline'

export const MiddleTopNav = ({ setSidebarOpen, setCollapsedMenu }) => {
    return (
        <div className="w-full sticky top-0 z-10 flex items-center justify-between bg-white p-4">
            <div>
                <button
                    type="button"
                    className="h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset"
                    onClick={() => { setSidebarOpen(prevState => !prevState); setCollapsedMenu(prevState => !prevState) }}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Bars2Icon className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
            <div className='font-extrabold text-[#C4C4C4]'>
                Lawyerspace.io
            </div>

            <div className="">
                <div className="w-full flex items-center">
                    <button
                        type="button"
                        className="bg-white rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                    >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                </div>
            </div>
        </div>
    )
}