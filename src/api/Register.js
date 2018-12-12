export const authRequest = Register => (route, newUser) => {
    return Register.post(route, newUser);
};