import {API_URL} from "../../../config";
import ky from "ky";
import {QuizInfoType} from "../../../types/QuizInfoType";

export const listQuiz = async () => {
    return ky.get(`${API_URL}/quiz`, {credentials: "include"}).json<QuizInfoType[]>();
}
export const myListQuiz = async () => {
    return ky.get(`${API_URL}/quiz/my`, {credentials: "include"}).json<QuizInfoType[]>();
}
export const listFilterQuiz = async (sortBy: string, sortOrder: string) => {
    return ky.get(`${API_URL}/quiz?sortBy=${sortBy}&sortOrder=${sortOrder}`, {credentials: "include"}).json<QuizInfoType[]>();
}