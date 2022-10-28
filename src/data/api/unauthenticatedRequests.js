import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": process.env.REACT_APP_BASE_URL,
    },
    withCredentials: true,
});

export const signupUser = async (user) => {
    try {
        return await api
            .post("/auth/register", user)
            .then((response) => response)
            .catch((error) => {
                return error.response;
            });
    } catch (error) {
    }
};

export const signinUser = async (user) => {
    return await api
        .post("/auth/login", user)
        .then((response) => response)
        .catch((error) => {
            return error.response;
        });
};