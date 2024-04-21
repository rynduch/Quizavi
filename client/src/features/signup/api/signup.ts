import {API_URL} from "../../../config";
import ky from "ky";
import {SignUpFormType} from "../SignUpPage";

export const signup = async (data: SignUpFormType) => {
    try {
        return ky.post(`${API_URL}/user`, {json: data, credentials: "include"}).json<SignUpFormType>();
    } catch (response) {
        throw new Error('Sign up failed');
    }
}