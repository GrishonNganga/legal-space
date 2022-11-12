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

export const logoutRequest = async () => {
    return await api
        .post("/auth/logout")
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};

export const userChangePasswordRequest = async (data) => {
    return await api
        .patch("/auth/changePassword", data)
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

export const editFirmRequest = async (data) => {
    return await api
        .patch("/firm/edit", data)
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};

export const getSpecificLawyerRequest = async (lawyerId) => {
    return await api
        .get("/lawyer/" + lawyerId)
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};

export const getLawyersPerCategoryRequest = async (categoryId) => {
    return await api
        .get("/category/get/" + categoryId)
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};
export const getSpecificAppointmentRequest = async (appointmentId) => {
    return await api
        .get("/appointment/lawyer/get/" + appointmentId)
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};

export const getSpecificClientAppointmentRequest = async (appointmentId) => {
    return await api
        .get("/appointment/client/get/" + appointmentId)
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};

export const getLawyerBookedDatesRequest = async (data) => {
    return await api
        .post("/appointment/booked_dates", data)
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

export const getLawyerCasesRequest = async (stage) => {
    return await api
        .post("/case/lawyer/cases", stage)
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};

export const searchLawyersRequest = async () => {
    return await api
        .post("/user/search/lawyer", { query: " " })
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};

export const getLawyersRequest = async () => {
    return await api
        .get("/lawyer/lawyers")
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
}

export const getLawyerAppointmentsByStatusRequest = async (stage) => {
    return await api
        .post(`/appointment/lawyer/appointments`, stage)
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};

export const getClientAppointmentsByStatusRequest = async (stage) => {
    return await api
        .post(`/appointment/client/appointments`, stage)
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};

export const createFirmRequest = async (data) => {
    return await api
        .post("/firm/create", data)
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};

export const lawyerEditAppointmentRequest = async (appointmentId, data) => {
    return await api
        .patch("/appointment/lawyer/edit/" + appointmentId, data)
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};

export const clientEditAppointmentRequest = async (appointmentId, data) => {
    return await api
        .patch("/appointment/client/edit/" + appointmentId, data)
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};

export const clientCreateAppointmentRequest = async (data) => {
    return await api
        .post("appointment/create", data)
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};

