import ky from "ky";
import {QuizInfoCreateType} from "../../../types/QuizInfoCreateType";
import {QuizInfoType} from "../../../types/QuizInfoType";
import {API_URL} from "../../../config";

export const createQuiz = async (data: QuizInfoCreateType) => {
    return ky.post(`${API_URL}/quiz`, {json: data, credentials: "include"}).json<QuizInfoType>();
}