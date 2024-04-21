import {createQuiz} from "./create-quiz";
import {createQuestions} from "../../questions/api/create-questions";
import {QuestionsCreateType} from "../../../types/QuestionsCreateType";
import {QuizInfoCreateType} from "../../../types/QuizInfoCreateType";

export const createQuizGeneral = async (quizData: QuizInfoCreateType, questionData: QuestionsCreateType) => {
    const quiz = await createQuiz(quizData);
    for (const questionAndAnswer of questionData.data) {
        await createQuestions(questionAndAnswer, quiz.id);
    }
}