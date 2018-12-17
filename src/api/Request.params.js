import axios from "axios";

//const baseUrl = "http://127.0.0.1:8000";
export const baseUrl = "https://pbge.herokuapp.com/";
const json = "application/json";

export const createTokenRequest = token =>
    axios.create({
        baseURL: baseUrl,
        headers: {
            Accept: json,
            "Content-Type": json,
            Authorization: `Bearer ${token}`
        }
    });

export const createRequest = () =>
    axios.create({
        baseURL: baseUrl,
        headers: {
            Accept: json,
            "Content-Type": json,
        }
    });
