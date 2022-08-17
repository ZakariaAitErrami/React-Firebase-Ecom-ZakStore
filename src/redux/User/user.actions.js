import userTypes from "./user.types";

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENET_USER,
    payload: user
})