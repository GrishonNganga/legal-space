import { useState, useEffect, Fragment, useRef } from 'react'
import { Transition, Dialog  } from '@headlessui/react'

import {
    CheckCircleIcon,
    InformationCircleIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline'

import { XMarkIcon } from '@heroicons/react/24/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const Steps = ({ steps }) => {

    return (
        <nav aria-label="Progress">
            <ol className="flex items-center">
                {steps && steps.map((step, stepIdx) => (
                    <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pr-3 sm:pr-4' : '', 'relative')}>
                        {(step.status === 'complete' || step.status === 'current') ? (
                            <>
                                <a
                                    href="/"
                                    className="relative w-2 h-2 shadow-md flex items-center justify-center bg-legalYellow rounded-full "
                                >
                                    <span
                                        className="h-1 w-1 rounded-full"
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">{step.name}</span>
                                </a>
                            </>
                        ) : (
                            <>
                                <a
                                    href="/"
                                    className="group relative w-2 h-2 shadow-md flex items-center justify-center bg-gray-500 rounded-full"
                                >
                                    <span
                                        className="h-1 w-1 rounded-full"
                                        aria-hidden="true"
                                    />
                                    <span className="sr-only">{step.name}</span>
                                </a>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export const Button = ({ text, onClick, loading, type }) => {

    return (
        <>
            <button
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${type === "secondary" ? "bg-legalGreen text-legalYellow" : "bg-legalYellow text-legalGray"}`}
                onClick={onClick}
            >
                {
                    (!loading && text) || <Spinner />

                }
            </button>
        </>
    )
}

export const Spinner = ({ size }) => {
    return (
        <div role="status" className="transition-all">
            <svg aria-hidden="true" className={`w-5 h-5 font-black text-legalYellow animate-spin ${size === "large" && "w-14 h-14"}`} style={{ fill: `#183A33`, }} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export const SplashCircles = () => {
    return (
        <>
            <div className="hidden md:flex w-full h-full bg-legalGreen flex-col justify-between">
                <div className="w-full h-full flex justify-center items-center relative overflow-hidden pb-72">
                    <div className="absolute w-[343px] h-[343px] border border-gray-500 rounded-full ">

                    </div>
                    <div className="absolute w-[515px] h-[515px] border border-gray-500 rounded-full">

                    </div>
                    <div className="absolute w-[687px] h-[687px] border border-gray-500 rounded-full">

                    </div>
                    <div className="absolute w-[859px] h-[859px] border border-gray-500 rounded-full">

                    </div>
                    <div className="absolute w-[1031px] h-[1031px] border border-gray-500 rounded-full">

                    </div>

                </div>
            </div>
            <div className="w-full h-full flex md:hidden justify-center items-center relative overflow-hidden pb-28">
                <div className="absolute w-[250px] h-[250px] border border-gray-500 rounded-full">

                </div>
                <div className="absolute w-[350px] h-[350px] border border-gray-500 rounded-full">

                </div>
                <div className="absolute w-[450px] h-[450px] border border-gray-500 rounded-full">

                </div>
                <div className="absolute w-[550px] h-[550px] border border-gray-500 rounded-full">

                </div>
                <div className="absolute w-[650px] h-[650px] border border-gray-500 rounded-full">

                </div>

            </div>
        </>
    )
}

export const Input = ({ id, type, name, placeholder, defaultValue, autoComplete, required, className, label, onChange, value, step }) => {

    const types = {
        text: "text",
        email: "email",
        password: "password",
        checkbox: "checkbox",
        number: "number",
    }

    return (
        <>
            {
                label !== "" &&
                <label htmlFor={name} className="block text-sm font-medium text-legalBlue pb-2"
                >
                    {label}
                </label>
            }
            <input
                id={id || ""}
                name={name || ""}
                type={types[type] || "text"}
                step={type === "number" && step}
                autoComplete={autoComplete}
                required={required || false}
                placeholder={placeholder}
                defaultValue={defaultValue}
                className={`appearance-none block w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-legalYellow sm:text-sm ${className}`}
                onChange={onChange}
                value={value}
            />
        </>
    )
}

export const Notification = ({ type, title, message }) => {

    const [show, setShow] = useState(false)

    useEffect(() => {
        if (message !== "") {
            setShow(true)
            setTimeout(() => {
                setShow(false);
            }, 10000)
        } else {
            setShow(false)
        }

    }, [message])

    return (
        <>
            <div
                aria-live="assertive"
                className="fixed inset-0 flex  px-4 py-6 pointer-events-none sm:p-6 sm:items-start top-12 z-50"
            >
                <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                    <Transition
                        show={show}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        {
                                            type === "success" &&
                                            <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                                        }
                                        {
                                            type === "error" &&
                                            <ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                                        }
                                        {
                                            type === "info" &&
                                            <InformationCircleIcon className="h-6 w-6 text-yellow-400" aria-hidden="true" />
                                        }
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-sm font-medium text-gray-900">{title}</p>
                                        <p className="mt-1 text-sm text-gray-500">{message}</p>
                                    </div>
                                    <div className="ml-4 flex-shrink-0 flex">
                                        <button
                                            type="button"
                                            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={() => {
                                                setShow(false)
                                            }}
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    )
}

export const Modal = ({ open, setOpen, ui, title, modalStyle }) => {

    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-xl md:max-w-2xl ${modalStyle}`}>
                                <div className="flex justify-between p-5">
                                    <div className="font-semibold text-gray-600 text-xl">
                                        {title}
                                    </div>
                                    <div>
                                        <XMarkIcon className="w-6 h-6 text-gray-500 cursor-pointer hover:text-black transition-all" onClick={() => { setOpen(false) }} />
                                    </div>
                                </div>
                                <div className="-mt-5 bg-white px-4 pb-4 sm:p-6 sm:pb-4">
                                    {
                                        ui
                                    }
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}