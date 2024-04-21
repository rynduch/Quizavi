import {useForm} from "@mantine/form";

export const useQuestionsCreateForm = () => {
    return useForm({
        initialValues:
            {
                data:
                    [
                        {
                            questionData:
                                {
                                    questionContent: "",
                                    numberOfAnswers: 4,
                                    index: 1,
                                },
                            answerData: Array.from({length: 4}, (_, i) => ({
                                index: i + 1,
                                answerContent: '',
                                correct: i === 0,
                            })),
                        },
                    ]
            },
        validate:
            {
                data:
                    {
                        questionData:
                            {
                                questionContent: (value) => {
                                    if (value.length < 1) {
                                        return "Question field is required.";
                                    }
                                    if (value.length > 200) {
                                        return "Question cannot be longer than 200 characters.";
                                    }
                                },
                                numberOfAnswers: (value) => {
                                    if (value < 2 || value > 6) {
                                        return "Number of answers must be between 2 and 6.";
                                    }
                                }
                            },
                        answerData:
                            {
                                answerContent: (value) => {
                                    if (value.length < 1) {
                                        return "Answer field is required.";
                                    }
                                    if (value.length > 75) {
                                        return "Answer cannot be longer than 75 characters.";
                                    }
                                },
                            },


                    }
            }
    });
}