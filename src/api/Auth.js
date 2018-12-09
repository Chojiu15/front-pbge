import axios from "axios";

const SESSION_KEY = "session_token";

export const authRequest = Auth => (route, credentials) => {
    return Auth.post(route, credentials);
}

export function saveToken(token) {
    localStorage.setItem(SESSION_KEY, token);
}

export function getToken() {
    return localStorage.getItem(SESSION_KEY);
}

export function removeToken() {
    localStorage.removeItem(SESSION_KEY);
}