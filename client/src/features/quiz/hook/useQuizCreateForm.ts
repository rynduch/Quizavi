import {useForm} from "@mantine/form";
import {QuizInfoCreateType} from "../../../types/QuizInfoCreateType";

export const useQuizCreateForm = () => {
    return useForm<QuizInfoCreateType>({
        initialValues: {
            title: "",
            description: "",
            numberOfQuestions: 10
        },
        validate: {
            title: (value) => {
                if (value.length < 1) {
                    return "Title field is required.";
                }
                if (value.length > 50) {
                    return "Title cannot be longer than 50 characters.";
                }
            },
            description: (value) => {
                if (value.length > 150) {
                    return "Description cannot be longer than 150 characters.";
                }
                if (value.length < 1) {
                    return "Description field is required.";
                }
            },
            numberOfQuestions: (value) => {
                if (value < 1 || value > 100) {
                    return "Number of questions must be between 1 and 100.";
                }
            },
        }
    });
}