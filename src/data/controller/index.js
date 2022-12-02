import { signinUser, signupUser, getAllAreasOfPracticeRequest } from '../api/unauthenticatedRequests'
import {
    editUserRequest,
    refreshSession,
    logoutRequest,
    getUserOnboardingPercentageRequest,
    getLawyerAppointmentsByStatusRequest,
    createFirmRequest,
    editFirmRequest,
    getLawyerCasesRequest,
    getLawyersRequest,
    searchLawyersRequest,
    getSpecificLawyerRequest,
    clientCreateAppointmentRequest,
    getSpecificAppointmentRequest,
    lawyerEditAppointmentRequest,
    clientEditAppointmentRequest,
    clientRateAppointmentRequest,
    userChangePasswordRequest,
    getLawyersPerCategoryRequest,
    getClientAppointmentsByStatusRequest,
    getSpecificClientAppointmentRequest,
    getLawyerBookedDatesRequest,
    passwordResetRequest,
    validateResetTokenRequest,
    changePasswordRequest,
    triggerFlutterwaveCheckoutRequest,
    getNotificationsRequest,
    clearNotificationRequest
} from '../api/authenticatedRequests'

export const signin = async (userDetails) => {
    const response = await signinUser(userDetails)
    return _returnResponse(response)
}

export const signup = async (userDetails) => {
    const response = await signupUser(userDetails)
    return _returnResponse(response)
}

export const forgotPassword = async (email) => {
    const response = await passwordResetRequest(email)
    return _returnResponse(response)
}

export const validateResetToken = async (token) => {
    const response = await validateResetTokenRequest({ resetLink: token })
    return _returnResponse(response)
}

export const changePassword = async (newPassword) => {
    const response = await changePasswordRequest(newPassword)
    return _returnResponse(response)
}

export const refresh = async () => {
    const response = await refreshSession()
    return _returnResponse(response)
}

export const logout = async () => {
    const response = await logoutRequest()
    return _returnResponse(response)
}

export const getAllAreasOfPractice = async () => {
    const response = await getAllAreasOfPracticeRequest()
    return _returnResponse(response)
}

export const searchLawyers = async () => {
    const response = await searchLawyersRequest()
    return _returnResponse(response)
}

export const getLawyers = async () => {
    const response = await getLawyersRequest()
    return _returnResponse(response)
}

export const getLawyersPerCategory = async (categoryId) => {
    const response = await getLawyersPerCategoryRequest(categoryId)
    return _returnResponse(response)
}

export const editUser = async (userDetails) => {
    const response = await editUserRequest(userDetails)
    return _returnResponse(response)
}

export const userChangePassword = async (passwordDetails) => {
    const response = await userChangePasswordRequest(passwordDetails)
    return _returnResponse(response)
}

export const getLawyerBookedDates = async (lawyerDetails) => {
    const response = await getLawyerBookedDatesRequest({ lawyerId: lawyerDetails })
    return _returnResponse(response)
}

export const getUserOnboardingPercentage = async (stage) => {
    const response = await getUserOnboardingPercentageRequest({ stage: stage })
    return _returnResponse(response)
}

export const getSpecificLawyer = async (id) => {
    const response = await getSpecificLawyerRequest(id)
    return _returnResponse(response)
}

export const getSpecificAppointment = async (id) => {
    const response = await getSpecificAppointmentRequest(id)
    return _returnResponse(response)
}

export const getSpecificClientAppointment = async (id) => {
    const response = await getSpecificClientAppointmentRequest(id)
    return _returnResponse(response)
}

export const getLawyerCases = async (stage) => {
    const response = await getLawyerCasesRequest({ stage: stage })
    return _returnResponse(response)
}

export const getLawyerAppointmentsByStatus = async (stageDetails) => {
    const response = await getLawyerAppointmentsByStatusRequest(stageDetails)
    return _returnResponse(response)
}

export const getClientAppointmentsByStatus = async (stageDetails) => {
    const response = await getClientAppointmentsByStatusRequest(stageDetails)
    return _returnResponse(response)
}


export const createFirm = async (firmDetails) => {
    const response = await createFirmRequest(firmDetails)
    return _returnResponse(response)
}

export const clientCreateAppointment = async (appointmentDetails) => {
    const response = await clientCreateAppointmentRequest(appointmentDetails)
    return _returnResponse(response)
}

export const lawyerEditAppointment = async (appointmentId, appointmentDetails) => {
    const response = await lawyerEditAppointmentRequest(appointmentId, appointmentDetails)
    return _returnResponse(response)
}

export const clientEditAppointment = async (appointmentId, appointmentDetails) => {
    const response = await clientEditAppointmentRequest(appointmentId, appointmentDetails)
    return _returnResponse(response)
}

export const clientRateAppointment = async (appointmentId, ratingDetails) => {
    const response = await clientRateAppointmentRequest(appointmentId, ratingDetails)
    return _returnResponse(response)
}

export const triggerFlutterwaveCheckout = async (subscriptionId) => {
    const response = await triggerFlutterwaveCheckoutRequest(subscriptionId)
    return _returnResponse(response)
}

export const getNotifications = async (subscriptionId) => {
    const response = await getNotificationsRequest()
    return _returnResponse(response)
}

export const editFirm = async (firmDetails) => {
    const response = await editFirmRequest(firmDetails)
    return _returnResponse(response)
}

export const clearNotification = async (notificationId) => {
    const response = await clearNotificationRequest(notificationId)
    return _returnResponse(response)
}

const _returnResponse = (response) => {
    switch (true) {
        case response?.status === 200:
            return { status: "success", data: response?.data, message: response?.data?.message }
        case (response?.status >= 400 && response?.status < 500):
            return { status: "error", message: response?.data?.message || "Bad request" }
        case (response?.status >= 500 && response?.status <= 600):
            return { status: "error", message: response?.data?.message }
        default:
            return { status: "error", message: "Something wrong happened" }
    }
}