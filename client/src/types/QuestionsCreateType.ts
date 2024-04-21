export type QuestionsCreateType = {
    data: {
        questionData: {
            questionContent: string;
            numberOfAnswers: number;
            index: number;
        };
        answerData: {
            index: number;
            answerContent: string;
            correct: boolean;
        }[];
    }[];
}