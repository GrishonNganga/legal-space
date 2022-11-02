import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Notification, Input, Button, SplashCircles, ImageUpload, TextArea } from "../../components/ui"

import { TrashIcon } from "@heroicons/react/24/solid"
import { DocumentIcon } from "@heroicons/react/24/outline"

import { userStore } from "../../stores"

import { getDownloadURL } from "firebase/storage";
import { firebaseUpload } from "../../data/api/unauthenticatedRequests"
import { editUser } from "../../data/controller"

const Onboarding = () => {
    const user = userStore(state => state.user)
    const navigate = useNavigate()

    const [step, setStep] = useState(1)
    const [onboardingDetails, setOnboardingDetails] = useState({
        firstName: "",
        lastName: "",
        represents: "individual",
        image: "",
        practicingCertificate: "",
        admissionNumber: "",
        description: "",
        // casesHandled: 0,
        yearsOfExprience: 0,
        phone: ""
    })

    useEffect(() => {
        const currentStep = localStorage.getItem('onboarding')
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
                <Step2 onboardingDetails={onboardingDetails} setOnboardingDetails={setOnboardingDetails} step={step} setStep={setStep} navigate={navigate} />
            }
        </>
    )
}
export default Onboarding

const Step1 = ({ onboardingDetails, setOnboardingDetails, step, setStep }) => {
    const onboardingInputsForStep1 = ["represents", "image", "practicingCertificate", "admissionNumber", "firstName", "lastName"]
    const [info, setInfo] = useState({ message: "", type: "" })
    const [loading, setLoading] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [uploadingImagePercentage, setUploadingImagePercentage] = useState(0)
    const [uploadingPracticeCertificate, setUploadingPracticeCertificate] = useState(false)
    const [uploadingPracticeCertificatePercentage, setUploadingCertificatePercentage] = useState(0)
    const [completedUploadingImage, setCompletedUploadingImage] = useState(false)
    const [completedUploadingCert, setCompletedUploadingCert] = useState(false)
    const [stepCompleted, setStepCompleted] = useState(false)

    useEffect(() => {
        let completed
        for (const key in onboardingDetails) {
            if (onboardingInputsForStep1.includes(key) && onboardingDetails[key] === "") {
                completed = false
                break
            }
            completed = true
        }
        setStepCompleted(completed)
        return
    }, [onboardingDetails])

    const handleSubmit = () => {
        setInfo({ type: "error", message: "" })
        let error
        for (const key in onboardingDetails) {
            if (onboardingInputsForStep1.includes(key) && onboardingDetails[key] === "") {
                error = true
                setInfo({ type: "error", message: `${key} can't be empty` })
                break
            }
        }
        if (error) {
            return
        }
        setLoading(true)
        editUser(onboardingDetails).then(response => {
            setLoading(false)
            if (response?.status === "success") {
                setInfo({ type: "success", message: `Profile updated successfully` })
                setTimeout(() => {
                    localStorage.setItem('onboarding', step + 1)
                    setStep(prevState => prevState + 1)

                }, 1000)
            } else {
                setInfo({ type: "error", message: response.message })

            }
        })
    }

    const upload = (e, type) => {
        const file = e.target.files[0]
        if (type === 'cert') {
            setUploadingPracticeCertificate(true)
            const uploadTask = firebaseUpload(file, 'docs');
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setUploadingCertificatePercentage(progress);
                },
                (err) => { },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setUploadingPracticeCertificate(false);
                        setOnboardingDetails((prevState) => ({ ...prevState, practicingCertificate: url }));
                        setCompletedUploadingCert(true)
                    });
                }
            );
        }
        if (type === 'image') {
            setUploadingImage(true)
            const uploadTask = firebaseUpload(file, 'images');
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setUploadingImagePercentage(progress);
                },
                (err) => { },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setUploadingImage(false);
                        setOnboardingDetails((prevState) => ({ ...prevState, image: url }));
                        setCompletedUploadingImage(true)
                    });
                }
            );
        }

    }

    const remove = (type) => {
        if (type === "cert") {
            setUploadingCertificatePercentage(false)
            setCompletedUploadingCert(false)
            setOnboardingDetails(prevState => ({ ...prevState, "practicingCertificate": "" }))
        }
        if (type === "image") {
            setUploadingImage(false)
            setCompletedUploadingImage(false)
            setOnboardingDetails(prevState => ({ ...prevState, "image": "" }))

        }
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
                                            className="appearance-none h-12 w-12 rounded-md focus:outline-none focus:border-legalYellow focus:ring-legalYellow border border-gray-300 text-[#6F8BA4] checked:bg-legalGreen styledRadio"
                                            onChange={() => { setOnboardingDetails(prevState => ({ ...prevState, "represents": "individual" })) }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-1">
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            label="First name"
                                            required
                                            onChange={(e) => { setOnboardingDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-1">
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            label="Last Name"
                                            required
                                            onChange={(e) => { setOnboardingDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-1">
                                        {
                                            (uploadingImage &&
                                                <div className="flex gap-x-2 border p-3 rounded-md items-center">
                                                    <div>
                                                        <DocumentIcon className="w-8 h-8 text-legalGreen" />
                                                    </div>
                                                    <div className="h-2 bg-legalGreen transition-all rounded-full" style={{ width: `${uploadingImagePercentage}%` }}>

                                                    </div>
                                                </div>) ||

                                            (!uploadingImage && !completedUploadingImage &&
                                                < ImageUpload
                                                    id="profilePhoto"
                                                    name="profilePhoto"
                                                    label="Upload your profile photo"
                                                    required
                                                    accept={"image/*"}
                                                    onChange={(e) => { upload(e, 'image') }}
                                                />)
                                            ||
                                            (completedUploadingImage && !uploadingImage &&
                                                <div className="flex justify-between gap-x-2 border p-2 rounded-md items-center">
                                                    <div>
                                                        <img src={onboardingDetails.image} className="w-10 h-10" />
                                                    </div>
                                                    <div className="ml-5">
                                                        <div className="rounded-md font-semibold ">
                                                            <TrashIcon className="w-7 h-7 text-red-500" onClick={() => { remove('image') }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>

                                <div>
                                    <div className="mt-1">
                                        {
                                            (uploadingPracticeCertificate &&
                                                <div className="flex gap-x-2 border p-3 rounded-md items-center">
                                                    <div>
                                                        <DocumentIcon className="w-8 h-8 text-legalGreen" />
                                                    </div>
                                                    <div className="h-2 bg-legalGreen transition-all rounded-full" style={{ width: `${uploadingPracticeCertificatePercentage}%` }}>

                                                    </div>
                                                </div>) ||
                                            (!uploadingPracticeCertificate && !completedUploadingCert &&
                                                <ImageUpload
                                                    id="certificate"
                                                    name="certificate"
                                                    label="Upload your current Practicing Certificate"
                                                    required
                                                    onChange={(e) => { upload(e, 'cert') }}
                                                    accept=".pdf"
                                                />)
                                            ||
                                            (completedUploadingCert && !uploadingPracticeCertificate &&
                                                <div className="flex justify-between gap-x-2 border p-2 rounded-md items-center">
                                                    <div className="flex gap-x-2 items-center">
                                                        <div>
                                                            <DocumentIcon className="w-8 h-8 text-legalGreen" />
                                                        </div>
                                                        <div className="text-legalGreen font-semibold underline" onClick={() => { window.open(onboardingDetails.practicingCertificate, '_blank'); }}>
                                                            View
                                                        </div>
                                                    </div>
                                                    <div className="ml-5">
                                                        <div className="rounded-md font-semibold ">
                                                            <TrashIcon className="w-7 h-7 text-red-500" onClick={() => { remove('cert') }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
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
                                            onChange={(e) => { setOnboardingDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Button text="Next" type="secondary" onClick={handleSubmit} loading={loading} active={stepCompleted} />
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

const Step2 = ({ onboardingDetails, setOnboardingDetails, navigate }) => {
    const onboardingInputsForStep2 = ["description", "yearsOfExperience", "phone"]
    const [info, setInfo] = useState({ message: "", type: "" })
    const [loading, setLoading] = useState(false)
    const [stepCompleted, setStepCompleted] = useState(false)

    useEffect(() => {
        let completed
        for (const key in onboardingDetails) {
            if (onboardingInputsForStep2.includes(key) && (onboardingDetails[key] === "" || !onboardingDetails[key])) {
                completed = false
                break
            }
            completed = true
        }
        setStepCompleted(completed)
        return
    }, [onboardingDetails])

    const handleSubmit = () => {
        setInfo({ type: "error", message: "" })
        let error
        for (const key in onboardingDetails) {
            if (onboardingInputsForStep2.includes(key) && onboardingDetails[key] === "") {
                error = true
                setInfo({ type: "error", message: `${key} can't be empty` })
                break
            }
        }
        if (error) {
            return
        }
        setLoading(true)
        editUser(onboardingDetails).then(response => {
            setLoading(false)
            if (response?.status === "success") {
                setInfo({ type: "success", message: `Profile updated successfully` })
                setTimeout(() => {
                    navigate('/dashboard/settings/payment')
                }, 1000)
            } else {
                setInfo({ type: "error", message: response.message })

            }
        })
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
                                onboardingDetails?.represents === "individual" ?
                                    <div className="space-y-6 w-4/5 md:w-2/3">
                                        <div className="hidden w-full md:flex justify-center py-8 md:py-0">
                                            <div className="text-2xl text-legalYellow font-semibold">
                                                You are one step away, Complete profile
                                            </div>
                                        </div>

                                        <div>

                                            <div className="mt-1">
                                                <TextArea
                                                    id="desctiption"
                                                    name="description"
                                                    type="text"
                                                    label="Tell us about yourself"
                                                    autoComplete="text"
                                                    required
                                                    onChange={(e) => { setOnboardingDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                                                />
                                            </div>
                                            {/* <div>
                                                <div className="mt-1">
                                                    <Input
                                                        id="numberOfCases"
                                                        name="numberOfCases"
                                                        type="text"
                                                        label="Cases handled"
                                                        autoComplete="number"
                                                        required
                                                        onChange={(e) => { setOnboardingDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                                                    />
                                                </div>
                                            </div> */}
                                            {/* <div>
                                                <div>
                                                    <label htmlFor={"areasOfPractice"} className="block text-sm font-medium text-legalBlue pb-2"
                                                    >
                                                        Areas of practice
                                                    </label>
                                                    <select
                                                        id="areasOfPractice"
                                                        name="areasOfPractice"
                                                        className={`block w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-legalYellow sm:text-sm`}
                                                    >
                                                        <option></option>

                                                    </select>
                                                </div>
                                            </div> */}
                                            <div>
                                                <div className="mt-1">
                                                    <Input
                                                        id="yearsOfExperience"
                                                        name="yearsOfExperience"
                                                        type="text"
                                                        label="Years in experience"
                                                        autoComplete="number"
                                                        required
                                                        onChange={(e) => { setOnboardingDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="mt-1">
                                                    <Input
                                                        id="phone"
                                                        name="phone"
                                                        type="text"
                                                        label="Phone number"
                                                        autoComplete="text"
                                                        required
                                                        onChange={(e) => { setOnboardingDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Button text="Complete" type="secondary" onClick={handleSubmit} loading={loading} active={stepCompleted} />
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