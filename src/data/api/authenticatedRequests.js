import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": process.env.REACT_APP_BASE_URL,
    },
    withCredentials: true,
});

export const refreshSession = async () => {
    return await api
        .get("/auth/refreshSession")
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};

export const editUserRequest = async (data) => {
    return await api
        .patch("/user/edit", data)
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};

export const getUserOnboardingPercentageRequest = async () => {
    return await api
        .get("/user/onboarding")
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};

export const getLawyerCasesByStageRequest = async (stage) => {
    return await api
        .post("/case/client/cases", stage)
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};

export const getLawyerAppointmentsByStatusRequest = async (userId, status) => {
    return await api
        .post(`/appointment/lawyer/appointments/${userId}`, status)
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};

export const createFirmRequest = async (data) => {
    return await api
        .patch("/firm/create", data)
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};
