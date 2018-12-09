import axios from "axios";

const baseUrl = "http://127.0.0.1:8000";
const accept = "application/json";

export const createTokenRequest = token =>
    axios.create({
        baseURL: baseUrl,
        headers: {
            Accept: accept,
            Authorization: `Bearer ${token}`
        }
    });

export const createRequest = () =>
    axios.create({
        baseURL: baseUrl,
        headers: {
            Accept: accept
        }
    });
