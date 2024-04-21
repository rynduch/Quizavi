export type QuestionAndAnswersType = {
    questionData: {
        id: number;
        index: number;
        quizId: number;
        questionContent: string;
        numberOfAnswers: number;
    };
    answerData: {
        id: number;
        questionId: number;
        index: number;
        answerContent: string;
        correct: boolean;
        selected?: boolean;
    }[];
};