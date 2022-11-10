import { Fragment, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Dialog, Transition, Disclosure } from '@headlessui/react'
import {
    HomeIcon,
    XMarkIcon,
    UserGroupIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const routes = [
    {
        name: 'Dashboard',
        icon: HomeIcon,
        current: false,
        href: '',
    },
    {
        name: 'Appointments',
        icon: UserGroupIcon,
        current: false,
        href: "/appointments",
        enableNavigation: true,
    },
    {
        name: 'Logout',
        icon: ArrowRightOnRectangleIcon,
        current: false,
        href: "/logout",
        enableNavigation: true,
    }
]

export const Sidebar = ({ sidebarOpen, setSidebarOpen, collapsedMenu, currentRoute, routePrefix }) => {
    const navigate = useNavigate()
    const [navigation, setNavigation] = useState(routes)
    useEffect(() => {
        setNavigation(prevState => {
            const updatedNavigation = navigation?.map(nav => {
                if (nav?.children) {
                    let matched = false
                    const updatedSubNav = nav?.children?.map(route => {
                        if ((nav?.enableNavigation && currentRoute?.includes(routePrefix + route?.href)) || (routePrefix + route?.href === currentRoute)) {
                            matched = true
                            return { ...route, current: true }
                        } else {
                            return { ...route, current: false }
                        }
                    })
                    return { ...nav, children: updatedSubNav, current: matched }
                } else {
                    let matched = false
                    if ((nav?.enableNavigation && currentRoute?.includes(routePrefix + nav?.href)) || (routePrefix + nav?.href === currentRoute)) {
                        matched = true
                        return { ...nav, current: true }
                    } else {
                        return { ...nav, current: false }
                    }
                }
            })
            return updatedNavigation
        })
        // eslint-disable-next-line
    }, [currentRoute, routePrefix])
    return (
        <>
            <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} navigate={navigate} currentRoute={currentRoute} routePrefix={routePrefix} navigation={navigation} />

            <DestopSidebar collapsedMenu={collapsedMenu} setSidebarOpen={setSidebarOpen} navigate={navigate} currentRoute={currentRoute} routePrefix={routePrefix} navigation={navigation} />
        </>
    )
}

const MobileSidebar = ({ sidebarOpen, setSidebarOpen, navigate, currentRoute, routePrefix, navigation }) => {
    return (
        <>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex z-40">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(prevState => (!prevState))}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                                    <div className="flex-shrink-0 flex items-center px-4">
                                        LegalSpace
                                    </div>
                                    <div className="mt-5 flex-grow flex flex-col">
                                        <nav className="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
                                            {navigation?.map((item) =>
                                                !item.children ? (
                                                    <div key={item.name} onClick={() => { navigate(routePrefix + item?.href) }}>
                                                        <div
                                                            className={classNames(
                                                                item.current
                                                                    ? 'bg-indigo-50 text-legalYellow border-legalYellow'
                                                                    : `border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900`,
                                                                'group flex items-center px-3 py-2 text-sm font-medium border-l-4'
                                                            )}
                                                        >
                                                            <item.icon
                                                                className={classNames(
                                                                    item.current ? 'text-gray-500 text-legalYellow' : `text-gray-400 group-hover:text-gray-500`,
                                                                    'mr-3 flex-shrink-0 h-6 w-6'
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                            {item.name}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Disclosure as="div" key={item.name} className="space-y-1">
                                                        {({ open }) => (
                                                            <>
                                                                <Disclosure.Button
                                                                    className={classNames(
                                                                        item.current
                                                                            ? 'bg-indigo-100 border-legalYellow text-legalYellow'
                                                                            : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                                        `group w-full flex items-center px-3 py-2 text-sm text-left font-medium border-l-4`
                                                                    )}
                                                                >
                                                                    <item.icon
                                                                        className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                        aria-hidden="true"
                                                                    />
                                                                    <span className="flex-1">{item.name}</span>
                                                                    <svg
                                                                        className={classNames(
                                                                            open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                                                                            'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                                                                        )}
                                                                        viewBox="0 0 20 20"
                                                                        aria-hidden="true"
                                                                    >
                                                                        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                                                                    </svg>
                                                                </Disclosure.Button>
                                                                <Disclosure.Panel className="space-y-1">
                                                                    {item.children.map((subItem) => (
                                                                        <Disclosure.Button
                                                                            key={subItem.name}
                                                                            as="div"
                                                                            className={
                                                                                classNames(
                                                                                    subItem.current ?
                                                                                        "text-gray-900 bg-gray-100 " :
                                                                                        "hover:text-gray-900 hover:bg-gray-200",
                                                                                    "group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md  cursor-pointer"

                                                                                )
                                                                            }
                                                                            onClick={() => { navigate(routePrefix + subItem.href) }}
                                                                        >
                                                                            {subItem.name}
                                                                        </Disclosure.Button>
                                                                    ))}
                                                                </Disclosure.Panel>
                                                            </>
                                                        )}
                                                    </Disclosure>
                                                )
                                            )}
                                        </nav>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

const DestopSidebar = ({ collapsedMenu, navigate, currentRoute, routePrefix, navigation }) => {
    const navRef = useRef(null);

    return (
        <>
            {
                (!collapsedMenu &&
                    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 ease-in-out duration-300">
                        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
                            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                                <div className="flex justify-center flex-shrink-0">
                                    LegalSpace
                                </div>
                                <div className="mt-5 flex-grow flex flex-col">
                                    <nav className="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
                                        {navigation?.map((item) =>
                                            !item.children ? (
                                                <div key={item.name} onClick={() => { navigate(routePrefix + item?.href) }}>
                                                    <div
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-indigo-50 border-legalYellow text-legalYellow'
                                                                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                            'group w-full flex items-center px-3 py-2 text-sm text-left font-medium border-l-4 cursor-pointer'
                                                        )}
                                                    >
                                                        <item.icon
                                                            className={classNames(
                                                                item.href === currentRoute ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                                'mr-3 flex-shrink-0 h-6 w-6'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        {item.name}
                                                    </div>
                                                </div>
                                            ) : (
                                                <Disclosure as="div" key={item.name} className="space-y-1">
                                                    {({ open }) => (
                                                        <>
                                                            <Disclosure.Button
                                                                className={classNames(
                                                                    item.current
                                                                        ? 'bg-indigo-50 border-legalYellow text-legalYellow'
                                                                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                                    'group w-full flex items-center px-3 py-2 text-sm text-left font-medium border-l-4'
                                                                )}
                                                            >
                                                                <item.icon
                                                                    className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                    aria-hidden="true"
                                                                />
                                                                <span className="flex-1">{item.name}</span>
                                                                <svg
                                                                    className={classNames(
                                                                        open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                                                                        'ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                                                                    )}
                                                                    viewBox="0 0 20 20"
                                                                    aria-hidden="true"
                                                                >
                                                                    <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                                                                </svg>
                                                            </Disclosure.Button>
                                                            <Disclosure.Panel className="space-y-1">
                                                                {item.children.map((subItem) => (
                                                                    <Disclosure.Button
                                                                        key={subItem.name}
                                                                        as="div"
                                                                        href={subItem.href}
                                                                        className={
                                                                            classNames(
                                                                                subItem.current ?
                                                                                    "text-gray-900 bg-gray-100" :
                                                                                    "hover:text-gray-900 hover:bg-gray-200",
                                                                                "group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md  cursor-pointer"

                                                                            )
                                                                        } onClick={() => { navigate(routePrefix + subItem?.href) }}
                                                                    >
                                                                        {subItem.name}
                                                                    </Disclosure.Button>
                                                                ))}
                                                            </Disclosure.Panel>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            )
                                        )}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>)
                ||
                <div ref={navRef} className="hidden md:flex md:w-16 md:flex-col md:fixed md:inset-y-0 ease-in-out duration-300">
                    <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">

                            <div className="mt-5 flex-grow flex flex-col">
                                <nav className="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
                                    {navigation?.map((item) =>
                                        !item.children ? (
                                            <div key={item.name} onClick={() => { navigate(routePrefix + item?.href) }}>
                                                <div
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-indigo-50 border-legalYellow text-legalYellow'
                                                            : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                        'group w-full flex items-center px-3 py-2 text-sm text-left font-medium border-l-4 cursor-pointer'
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            item.href === currentRoute ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                            'mr-3 flex-shrink-0 h-6 w-6'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <Disclosure as="div" key={item.name} className="">
                                                {({ open }) => (
                                                    <>
                                                        <Disclosure.Button
                                                            className={classNames(
                                                                item.current
                                                                    ? 'bg-indigo-50 border-legalYellow text-legalYellow'
                                                                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                                                'group w-full flex items-center px-3 py-2 text-sm text-left font-medium border-l-4 relative'
                                                            )}
                                                        >
                                                            <item.icon
                                                                className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel className="absolute left-full -mt-10 z-50 bg-white border w-40">
                                                            {({ close }) => (
                                                                item.children.map((subItem) => (
                                                                    <Disclosure.Button
                                                                        key={subItem.name}
                                                                        as="div"
                                                                        href={subItem.href}
                                                                        className={
                                                                            classNames(
                                                                                subItem.current ?
                                                                                    "text-gray-900 bg-gray-100" :
                                                                                    "hover:text-gray-900 hover:bg-gray-200",
                                                                                "p-2 px-8 flex items-center text-sm font-medium text-gray-600 cursor-pointer"
                                                                            )
                                                                        } onClick={() => { navigate(routePrefix + subItem?.href) }}
                                                                    >
                                                                        <div className="shrink-0">
                                                                            {subItem.name}
                                                                        </div>
                                                                    </Disclosure.Button>
                                                                ))
                                                            )}
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        )
                                    )}
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}