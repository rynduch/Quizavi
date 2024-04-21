import ky from "ky";
import {API_URL} from "../../../config";

export const deleteQuiz = async (quizId: number) => {
    return ky.delete(`${API_URL}/quiz/${quizId}`, {credentials: "include"}).json();
}