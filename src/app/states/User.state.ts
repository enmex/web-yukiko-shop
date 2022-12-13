import { atom, selector } from "recoil";
import { User } from "../types/User";
import axios from "axios";

export const getDefaultUser = (): User => {
    const cache = localStorage.getItem("user");
    if (!cache) {
        return {
            auth: {
                access: {
                    token: "",
                    expiresAt: null,
                },
                refresh: {
                    token: "",
                    expiresAt: null,
                },
            },
            profile: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            }
        }
    }
    const user = JSON.parse(cache) as User;
    axios.defaults.headers.common["Authorization"] = "Bearer " + user.auth.access.token;
    return user;
}

export const userState = atom<User>({
    key: "userState",
    default: getDefaultUser(),
});

export const userAuthorized = selector({
    key: "loggedOn",
    get: ({ get }) => {
        const user = get(userState);
        const now = new Date().getTime();

        return user?.auth.access.token?.length 
            && user.auth.access?.expiresAt
            && now < user.auth.access.expiresAt;
    }
});