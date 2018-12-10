const SESSION_KEY = "session_token";
const CHECK_ROUTE = "/me";

export const authRequest = Auth => (route, credentials) => {
    return Auth.post(route, credentials);
};

export const tokenChecker = Check => () => {
    return Check.get(CHECK_ROUTE);
};

export function saveToken(token) {
    localStorage.setItem(SESSION_KEY, token);
}

export function getToken() {
    return localStorage.getItem(SESSION_KEY);
}

export function removeToken() {
    localStorage.removeItem(SESSION_KEY);
}