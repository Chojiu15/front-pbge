export const registerRequest = Register => (route, newUser) => {
    return Register.post(route, newUser);
};