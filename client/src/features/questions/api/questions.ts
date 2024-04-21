import ky from "ky";
import {API_URL} from "../../../config";
import {QuestionAndAnswersType} from "../../../types/QuestionAndAnswersType";
import {QuizInfoType} from "../../../types/QuizInfoType";

export const Questions = async (id: number) => {
    const quiz = await ky.get(`${API_URL}/quiz/${id}`, {credentials: "include"}).json<QuizInfoType>();
    const questions: QuestionAndAnswersType[] = [];
    for (let i = 1; i <= quiz.numberOfQuestions; i++) {
        const question = await ky.get(`${API_URL}/quiz/${id}/question/${i}`, {credentials: "include"}).json<QuestionAndAnswersType>();
        questions.push(question);
    }
    return questions;
}