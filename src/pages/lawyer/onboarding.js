// This code is not legible at all!!! WILL BE REFACTORED!!!!
import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

import { Notification, Input, Button, SplashCircles, ImageUpload, TextArea } from "../../components/ui"

import { TrashIcon } from "@heroicons/react/24/solid"
import { ChevronDownIcon, DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline"

import { userStore } from "../../stores"

import { getDownloadURL } from "firebase/storage";
import { firebaseUpload } from "../../data/api/unauthenticatedRequests"

import { editUser, getAllAreasOfPractice, createFirm, editFirm } from "../../data/controller"

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
        numberOfCases: 0,
        yearsOfExperience: 0,
        phone: "",
        areasOfPractice: [],
        onboardingStep: 0,
        firmName: "",
        email: "",
        phone: ""
    })

    useEffect(() => {
        if (user?.onboarding) {
            navigate('/dashboard')
        }
        if (user && !user?.onboarding) {
            setStep(user?.onboardingStep || 1)
        }
        if (user?.represents) {
            setOnboardingDetails(prevState => ({ ...prevState, "represents": user?.represents }))
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
    const onboardingInputsForStep1 = ["represents", "image", "practicingCertificate", "admissionNumber"]
    const firmInputs = ["firmName", "email", "phone"]
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
        setOnboardingDetails(prevState => ({ ...prevState, "onboardingStep": 2 }))
    }, [])

    useEffect(() => {
        let completed
        for (const key in onboardingDetails) {
            if (onboardingInputsForStep1.includes(key) && onboardingDetails[key] === "") {
                completed = false
                break
            }
            if (onboardingDetails.represents === "firm") {
                if (firmInputs.includes(key) && onboardingDetails[key] === "") {
                    completed = false
                    break
                }
            }
            completed = true
        }
        setStepCompleted(completed)
        return
    }, [onboardingDetails])

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

    const handleSubmit = () => {
        setInfo({ message: "", type: "" })
        let error
        for (const key in onboardingDetails) {
            if (onboardingInputsForStep1.includes(key) && onboardingDetails[key] === "") {
                error = true
                setInfo({ type: "error", message: `${key} can't be empty` })
                break
            }
            if (onboardingDetails.represents === "firm") {
                if (firmInputs.includes(key) && onboardingDetails[key] === "") {
                    error = true
                    setInfo({ type: "error", message: `${key} can't be empty` })
                    break
                }
            }
        }

        if (error) {
            return
        }
        setLoading(true)
        Object.keys(onboardingDetails).forEach(key => {
            if ((onboardingDetails[key] === '' || !onboardingDetails[key] || onboardingDetails[key]?.length === 0)) {
                delete onboardingDetails[key];
            }
        });
        if (onboardingDetails.represents === "firm") {
            delete onboardingDetails.admissionNumber
            createFirm(onboardingDetails).then(response => {
                setLoading(false)
                if (response?.status === "success") {
                    setInfo({ type: "success", message: `Company created successfully` })
                    editUser({ onboardingStep: step + 1, represents: "firm" }).then(userResponse => {
                        if (userResponse?.status === "success") {
                            setInfo({ type: "success", message: `Profile updated successfully` })
                            setStep(prevState => prevState + 1)
                        } else {
                            setInfo({ type: "error", message: userResponse?.message })
                        }
                    })
                } else {
                    setInfo({ type: "error", message: response.message })

                }
            })
        } else {
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
                        <div className="bg-white w-full h-full flex justify-center pt-12">
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
                                {
                                    onboardingDetails?.represents === "firm" &&
                                    <div className="ease-in-out duration-500">
                                        <div>
                                            <div className="mt-1">
                                                <Input
                                                    id="firmName"
                                                    name="firmName"
                                                    type="text"
                                                    label="Firm name"
                                                    required
                                                    value={onboardingDetails.firmName}
                                                    onChange={(e) => { setOnboardingDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mt-1">
                                                <Input
                                                    id="firmEmail"
                                                    name="email"
                                                    type="email"
                                                    label="Firm email"
                                                    required
                                                    value={onboardingDetails.email}
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
                                                    label="Company phone number"
                                                    required
                                                    value={onboardingDetails.phone}
                                                    onChange={(e) => { setOnboardingDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                }
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
                                            value={onboardingDetails.admissionNumber}
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
    const onboardingInputsForStep2 = ["description", "yearsOfExperience", "numberOfCases", "areasOfPractice"]
    const individualInputs = ["phone"]
    const user = userStore(state => state.user)
    const storeUser = userStore(state => state.storeUser)

    const [info, setInfo] = useState({ message: "", type: "" })
    const [loading, setLoading] = useState(false)
    const [stepCompleted, setStepCompleted] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])

    const categoriesRef = useRef(null)

    useEffect(() => {
        setOnboardingDetails(prevState => ({ ...prevState, "onboardingStep": 2 }))
        getAllAreasOfPractice().then(response => {
            if (response?.status === "success") {
                setCategories(response.data.categories)
            }
        })
    }, [])

    useEffect(() => {
        let completed
        for (const key in onboardingDetails) {
            if (onboardingInputsForStep2.includes(key) && (onboardingDetails[key] === "" || !onboardingDetails[key] || onboardingDetails[key]?.length === 0)) {
                completed = false
                break
            }
            if (onboardingDetails.represents === "individual") {
                if (individualInputs.includes(key) && (onboardingDetails[key] === "" || !onboardingDetails[key] || onboardingDetails[key]?.length === 0)) {
                    completed = false
                    break
                }
            }
            completed = true
        }
        setStepCompleted(completed)
        return
    }, [onboardingDetails])

    useEffect(() => {
        setOnboardingDetails(prevState => ({ ...prevState, 'areasOfPractice': selectedCategories.map(cat => cat._id) }))
    }, [selectedCategories])

    const addSelectedCategory = (e) => {
        const category = categories.find(cat => cat._id === e.target.value)
        if (category) {
            setSelectedCategories(prevState => ([...prevState, category]))
            const newCategories = categories.filter(cat => cat?._id !== e.target.value)
            setCategories(newCategories)
            categoriesRef.current.value = ""
        }
    }

    const removeSelectedCategory = (category) => {
        const newSelectedCategories = selectedCategories.filter(cat => cat._id !== category._id)
        setSelectedCategories(newSelectedCategories)
        setCategories(prevState => ([...prevState, category]))
    }

    const handleSubmit = () => {
        setInfo({ type: "error", message: "" })
        let error
        for (const key in onboardingDetails) {
            if (onboardingInputsForStep2.includes(key) && onboardingDetails[key] === "") {
                error = true
                setInfo({ type: "error", message: `${key} can't be empty` })
                break
            }
            if (onboardingDetails.represents === "individual") {
                if (individualInputs.includes(key) && (onboardingDetails[key] === "" || !onboardingDetails[key] || onboardingDetails[key]?.length === 0)) {
                    error = true
                    setInfo({ type: "error", message: `${key} can't be empty` })
                    break
                }
            }
        }
        if (error) {
            return
        }
        Object.keys(onboardingDetails).forEach(key => {
            if ((onboardingDetails[key] === '' || !onboardingDetails[key] || onboardingDetails[key]?.length === 0)) {
                delete onboardingDetails[key];
            }
            if (individualInputs.includes(key)) {
                delete onboardingDetails[key];
            }
        });
        setLoading(true)
        if (onboardingDetails.represents === "firm") {
            editFirm(onboardingDetails).then(response => {
                setLoading(false)
                if (response?.status === "success") {
                    setInfo({ type: "success", message: `Company updated successfully` })
                    const updatedUser = { ...user, ...response?.data?.user }
                    storeUser(updatedUser)
                    setTimeout(() => {
                        navigate('/dashboard')
                    }, 1000)
                } else {
                    setInfo({ type: "error", message: response.message })

                }
            })
        } else {
            editUser(onboardingDetails).then(response => {
                setLoading(false)
                if (response?.status === "success") {
                    setInfo({ type: "success", message: `Profile updated successfully` })
                    const updatedUser = { ...user, ...response?.data?.user }
                    storeUser(updatedUser)
                    setTimeout(() => {
                        navigate('/dashboard')
                    }, 1000)
                } else {
                    setInfo({ type: "error", message: response.message })

                }
            })
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
                                            <div>
                                                <div className="mt-1">
                                                    <Input
                                                        id="numberOfCases"
                                                        name="numberOfCases"
                                                        type="number"
                                                        label="Cases handled"
                                                        autoComplete="number"
                                                        required
                                                        onChange={(e) => { setOnboardingDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-1">
                                                <div>
                                                    <label htmlFor={"areasOfPractice"} className="block text-sm font-medium text-legalBlue pb-2"
                                                    >
                                                        Areas of practice
                                                    </label>
                                                    {
                                                        selectedCategories?.length > 0 &&
                                                        <div className="flex border p-3 rounded-md mb-2">
                                                            <div className="flex gap-x-2 flex-wrap gap-y-2 z-20 bg-white">
                                                                {
                                                                    selectedCategories?.map(category => {
                                                                        return (
                                                                            <div className="px-2 py-1 border border-legalYellow text-legalYellow font-semibold rounded-full text-sm flex space-x-1 items-center transition-all ease-in-out">
                                                                                <div>
                                                                                    {category.title}
                                                                                </div>
                                                                                <div onClick={() => { removeSelectedCategory(category) }}>
                                                                                    <XMarkIcon className="w-4 h-4 text-legalYellow" />
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>

                                                    }
                                                    <div className="">
                                                        <select
                                                            id="areasOfPractice"
                                                            name="areasOfPractice"
                                                            className={`w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-legalYellow sm:text-sm`}
                                                            onChange={addSelectedCategory}
                                                            ref={categoriesRef}
                                                        >
                                                            <option className="text-gray-500">Select areas of practice</option>
                                                            {
                                                                categories?.map(category => {
                                                                    return (
                                                                        <option value={category?._id} className="text-gray-100">{category?.title}</option>

                                                                    )
                                                                })
                                                            }

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
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
                                                    id="description"
                                                    name="description"
                                                    type="text"
                                                    label="Tell us about your firm"
                                                    autoComplete="text"
                                                    required
                                                    onChange={(e) => { setOnboardingDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                                                />
                                            </div>
                                            <div>
                                                <div className="mt-1">
                                                    <Input
                                                        id="numberOfCases"
                                                        name="numberOfCases"
                                                        type="text"
                                                        label="Cases handled"
                                                        autoComplete="text"
                                                        required
                                                        onChange={(e) => { setOnboardingDetails(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-1">
                                            <div>
                                                <label htmlFor={"areasOfPractice"} className="block text-sm font-medium text-legalBlue pb-2"
                                                >
                                                    Areas of practice
                                                </label>
                                                {
                                                    selectedCategories?.length > 0 &&
                                                    <div className="flex border p-3 rounded-md mb-2">
                                                        <div className="flex gap-x-2 flex-wrap gap-y-2 z-20 bg-white">
                                                            {
                                                                selectedCategories?.map(category => {
                                                                    return (
                                                                        <div className="px-2 py-1 border border-legalYellow text-legalYellow font-semibold rounded-full text-sm flex space-x-1 items-center transition-all ease-in-out">
                                                                            <div>
                                                                                {category.title}
                                                                            </div>
                                                                            <div onClick={() => { removeSelectedCategory(category) }}>
                                                                                <XMarkIcon className="w-4 h-4 text-legalYellow" />
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>

                                                }
                                                <div className="">
                                                    <select
                                                        id="areasOfPractice"
                                                        name="areasOfPractice"
                                                        className={`w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-legalYellow sm:text-sm`}
                                                        onChange={addSelectedCategory}
                                                        ref={categoriesRef}
                                                    >
                                                        <option className="text-gray-500">Select areas of practice</option>
                                                        {
                                                            categories?.map(category => {
                                                                return (
                                                                    <option value={category?._id} className="text-gray-100">{category?.title}</option>

                                                                )
                                                            })
                                                        }

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
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
                                            <Button text="Complete" type="secondary" onClick={handleSubmit} loading={loading} active={stepCompleted} />
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