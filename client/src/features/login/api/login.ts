import {API_URL} from "../../../config";

export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/authorization/login`, {
        method: 'POST',
        headers: {
            ContentType: 'application/json',
            Authorization: 'Basic ' + window.btoa(email + ":" + password),
        },
        credentials: 'include'
    });
    if (response.status !== 200) throw new Error('Login failed');
    return await response.text();
}