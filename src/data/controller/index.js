import { signinUser, signupUser, getAllAreasOfPracticeRequest } from '../api/unauthenticatedRequests'
import {
    editUserRequest,
    refreshSession,
    getUserOnboardingPercentageRequest,
    getLawyerCasesByStageRequest,
    getLawyerAppointmentsByStatusRequest
} from '../api/authenticatedRequests'

export const signin = async (userDetails) => {
    const response = await signinUser(userDetails)
    return _returnResponse(response)
}

export const signup = async (userDetails) => {
    const response = await signupUser(userDetails)
    return _returnResponse(response)
}

export const refresh = async () => {
    const response = await refreshSession()
    return _returnResponse(response)
}

export const getAllAreasOfPractice = async () => {
    const response = await getAllAreasOfPracticeRequest()
    return _returnResponse(response)
}

export const editUser = async (userDetails) => {
    const response = await editUserRequest(userDetails)
    return _returnResponse(response)
}

export const getUserOnboardingPercentage = async (stage) => {
    const response = await getUserOnboardingPercentageRequest({ stage: stage })
    return _returnResponse(response)
}

export const getLawyerCasesByStage = async () => {
    const response = await getLawyerCasesByStageRequest()
    return _returnResponse(response)
}

export const getLawyerAppointmentsByStatus = async (userId, status) => {
    const response = await getLawyerAppointmentsByStatusRequest(userId, { status: status })
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