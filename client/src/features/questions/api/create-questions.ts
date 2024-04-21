import ky from "ky";
import {API_URL} from "../../../config";
import {QuestionAndAnswersCreateType} from "../../../types/QuestionAndAnswersCreateType";
import {QuestionAndAnswersType} from "../../../types/QuestionAndAnswersType";

export const createQuestions = async (data: QuestionAndAnswersCreateType, id: number) => {
    return ky.post(`${API_URL}/quiz/${id}/question`, {
        json: data,
        credentials: "include"
    }).json<QuestionAndAnswersType>();
}