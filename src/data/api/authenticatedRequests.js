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
 