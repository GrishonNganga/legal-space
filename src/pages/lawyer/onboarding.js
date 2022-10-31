import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Notification, Input, Button, SplashCircles, ImageUpload, TextArea } from "../../components/ui"

import { DocumentIcon } from "@heroicons/react/24/solid"

import { userStore } from "../../stores"

const Onboarding = () => {
    const user = userStore(state => state.user)
    const navigate = useNavigate()

    const [step, setStep] = useState(1)
    const [onboardingDetails, setOnboardingDetails] = useState({
        represents: "individual",
        image: "",
        practicingCertificate: "",
        admissionNumber: ""
    })

    useEffect(() => {
        const currentStep = sessionStorage.getItem('onboarding')
        if (currentStep) {
            setStep(parseInt(currentStep))
        }
    }, [])

    useEffect(() => {
        if (user?.onboarding) {
            navigate('/dashboard')
        }
    }, [user])

    return (
        <>
            {
                step === 1 &&
                <Step1 onboardingDetails={onboardingDetails} setOnboardingDetails={setOnboardingDetails} step={step} setStep={setStep} />
            }
            {
                step === 2 &&
                <Step2 onboardingDetails={onboardingDetails} setOnboardingDetails={setOnboardingDetails} step={step} setStep={setStep} />
            }
        </>
    )
}
export default Onboarding

const Step1 = ({ onboardingDetails, setOnboardingDetails, step, setStep }) => {
    const navigate = useNavigate()
    const [info, setInfo] = useState({ message: "", type: "" })
    const [loading, setLoading] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [uploadingPracticeCertificate, setUploadingPracticeCertificate] = useState(false)



    const handleSubmit = () => {
        let error
        console.log("KEYS", Object.keys(onboardingDetails))
        for (const key in onboardingDetails) {
            console.log("KEY", key)
            console.log("FIELD", onboardingDetails[key])
            if (onboardingDetails[key] === "") {
                error = true
                setInfo({ type: "error", message: `${key} can't be empty` })
                break
            }
        }
        if (error) {
            sessionStorage.setItem('onboarding', step + 1)
            setStep(prevState => prevState + 1)
            return
        }
    }

    const uploadImage = (e) => {

    }

    return (
        <div className="flex flex-1 min-h-full w-full h-screen transition-opacity delay-300">
            <div>
                <Notification type={info.type} message={info.message} />
            </div>
            <div className="w-full md:w-4/5 h-full flex flex-col bg-legalGreen">
                <div className="md:hidden w-full flex justify-center py-8 md:py-0">
                    <div className="text-legalYellow font-semibold">
                        You are one step away, Complete profile
                    </div>
                </div>
                <div className="relative w-full h-full -mt-5 md:mt-0">
                    <div className="md:hidden absolute p-5 w-full h-full">
                        <div className="bg-white opacity-50 w-full h-full">

                        </div>
                    </div>
                    <div className="md:hidden absolute top-6 p-2 w-full h-full ">
                        <div className="bg-white opacity-50 w-full h-full">

                        </div>
                    </div>
                    <div className="absolute top-12 md:top-0 w-full h-full">
                        <div className="bg-white w-full h-full flex justify-center items-center">
                            <div className="space-y-6 w-4/5 md:w-2/3">
                                <div className="hidden w-full md:flex justify-center py-8 md:py-0">
                                    <div className="text-2xl text-legalYellow font-semibold">
                                        You are one step away, Complete profile
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex flex-col items-center gap-y-2">
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                            Law firm
                                        </label>
                                        <input
                                            id="firm"
                                            name="firm"
                                            type="checkbox"
                                            checked={onboardingDetails?.represents === "firm"}
                                            className="appearance-none h-12 w-12 border rounded-md focus:outline-none focus:border-legalYellow focus:ring-legalYellow border-gray-300 text-[#6F8BA4] checked:bg-legalGreen styledRadio"
                                            onChange={(e) => { setOnboardingDetails(prevState => ({ ...prevState, "represents": "firm" })) }}

                                        />
                                    </div>
                                    <div className="flex flex-col items-center gap-y-2">
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                            Individual
                                        </label>
                                        <input
                                            id="individual"
                                            name="individual"
                                            type="checkbox"
                                            checked={onboardingDetails?.represents === "individual"}
                                            className="appearance-none h-12 w-12 rounded-md focus:outline-none focus:border-legalYellow focus:ring-legalYellow border-gray-300 text-[#6F8BA4] checked:bg-legalGreen styledRadio"
                                            onChange={() => { setOnboardingDetails(prevState => ({ ...prevState, "represents": "individual" })) }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-1">
                                        {
                                            uploadingImage &&
                                            <ImageUpload
                                                id="profilePhoto"
                                                name="profilePhoto"
                                                label="Upload your profile photo"
                                                required
                                                onChange={(e) => { uploadImage(e) }}
                                            />
                                            ||
                                            <div className="flex gap-x-2 border p-3 rounded-md items-center">
                                                <div>
                                                    <DocumentIcon className="w-8 h-8 text-legalGreen" />
                                                </div>
                                                <div className="h-2 bg-legalGreen transition-all rounded-full" style={{ width: '100%' }}>

                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>

                                <div>
                                    <div className="mt-1">
                                        <ImageUpload
                                            id="certificate"
                                            name="certificate"
                                            label="Upload your current Practicing Certificate"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="mt-1">
                                        <Input
                                            id="admissionNumber"
                                            name="admissionNumber"
                                            type="text"
                                            label="Admission number"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Button text="Next" type="secondary" onClick={handleSubmit} loading={loading} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-screen hidden lg:flex">
                <SplashCircles />
            </div>
        </div>
    )
}

const Step2 = ({ onboardindingDetails, setOnboardingDetails }) => {
    const navigate = useNavigate()
    const [info, setInfo] = useState({ message: "", type: "" })
    const [loading, setLoading] = useState(false)

    const handleSubmit = () => {

    }

    return (
        <div className="flex flex-1 min-h-full w-full h-screen transition-opacity delay-300">
            <div>
                <Notification type={info.type} message={info.message} />
            </div>
            <div className="w-full md:w-4/5 h-full flex flex-col bg-legalGreen">
                <div className="md:hidden w-full flex justify-center py-8 md:py-0">
                    <div className="text-legalYellow font-semibold">
                        You are one step away, Complete profile
                    </div>
                </div>
                <div className="relative w-full h-full -mt-5 md:mt-0">
                    <div className="md:hidden absolute p-5 w-full h-full">
                        <div className="bg-white opacity-50 w-full h-full">

                        </div>
                    </div>
                    <div className="md:hidden absolute top-6 p-2 w-full h-full ">
                        <div className="bg-white opacity-50 w-full h-full">

                        </div>
                    </div>
                    <div className="absolute top-12 md:top-0 w-full h-full">
                        <div className="bg-white w-full h-full flex justify-center pt-8">
                            {
                                onboardindingDetails?.represents === "individual" ?
                                    <div className="space-y-6 w-4/5 md:w-2/3">
                                        <div className="hidden w-full md:flex justify-center py-8 md:py-0">
                                            <div className="text-2xl text-legalYellow font-semibold">
                                                You are one step away, Complete profile
                                            </div>
                                        </div>

                                        <div>

                                            <div className="mt-1">
                                                <TextArea
                                                    id="about"
                                                    name="about"
                                                    type="text"
                                                    label="Tell us about yourself"
                                                    autoComplete="text"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <div className="mt-1">
                                                    <Input
                                                        id="casesHandled"
                                                        name="casesHandled"
                                                        type="text"
                                                        label="Cases handled"
                                                        autoComplete="text"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mt-1">
                                                <Input
                                                    id="yearsExperience"
                                                    name="yearsExperience"
                                                    type="text"
                                                    label="Years in experience"
                                                    autoComplete="text"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mt-1">
                                                <Input
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    type="text"
                                                    label="Phone number"
                                                    autoComplete="text"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Button text="Complete" type="secondary" onClick={handleSubmit} loading={loading} />
                                        </div>
                                    </div>
                                    :
                                    <div className="space-y-6 w-4/5 md:w-2/3">
                                        <div className="hidden w-full md:flex justify-center py-8 md:py-0">
                                            <div className="text-2xl text-legalYellow font-semibold">
                                                You are one step away, Complete profile
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mt-1">
                                                <TextArea
                                                    id="about"
                                                    name="about"
                                                    type="text"
                                                    label="Tell us about your firm"
                                                    autoComplete="text"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <div className="mt-1">
                                                    <Input
                                                        id="casesHandled"
                                                        name="casesHandled"
                                                        type="text"
                                                        label="Cases handled"
                                                        autoComplete="text"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mt-1">
                                                <Input
                                                    id="yearsExperience"
                                                    name="yearsExperience"
                                                    type="text"
                                                    label="Years in experience"
                                                    autoComplete="text"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mt-1">
                                                <Input
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    type="text"
                                                    label="Phone number"
                                                    autoComplete="text"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Button text="Complete" type="secondary" onClick={handleSubmit} loading={loading} />
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-screen hidden lg:flex">
                <SplashCircles />
            </div>
        </div>
    )
}