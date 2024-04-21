import {Button, Text, Title, Group, Stepper} from "@mantine/core";
import React, {useState} from "react";
import {QuizInfoCreateForm} from "./QuizInfoCreateForm";
import {IconArrowLeft, IconArrowRight, IconCheck} from "@tabler/icons-react";
import {QuestionsCreateForm} from "../questions/QuestionsCreateForm";
import {useQuizCreateForm} from "./hook/useQuizCreateForm";
import {useQuestionsCreateForm} from "../questions/hook/useQuestionsCreateForm";
import {useNavigate} from "react-router-dom";
import {createQuizGeneral} from "./api/create-quiz-general";

export const QuizGeneralCreateForm = () => {
    const quizForm = useQuizCreateForm();
    const questionAndAnswersForm = useQuestionsCreateForm();
    const [active, setActive] = useState(0);
    const navigate = useNavigate();
    const nextStep = () => {
        setActive((current) => {
            if (current === 0) {
                if (quizForm.validate().hasErrors) {
                    return current;
                }
                const numberOfQuestions = quizForm.values.numberOfQuestions;
                const currentDataLength = questionAndAnswersForm.values.data.length;
                if (numberOfQuestions > currentDataLength) {
                    //console.log("currentDataLength:", currentDataLength);
                    //console.log("numberOfQuestions:", numberOfQuestions);
                    for (let i = currentDataLength; i < numberOfQuestions; i++) {
                        questionAndAnswersForm.values.data.push(
                            {
                                questionData: {
                                    questionContent: '',
                                    numberOfAnswers: 4,
                                    index: i + 1,
                                },
                                answerData: Array.from({length: 4}, (_, j) => ({
                                    index: j + 1,
                                    answerContent: '',
                                    correct: j === 0,
                                })),
                            }
                        );
                    }
                    //console.log("currentDataLength:", questionAndAnswersForm.values.data.length);
                } else if (numberOfQuestions < currentDataLength) {
                    for (let i = currentDataLength - 1; i >= numberOfQuestions; i--) {
                        questionAndAnswersForm.removeListItem('data', i);
                    }
                    //console.log("currentDataLength:", currentDataLength);
                    //console.log("numberOfQuestions:", numberOfQuestions);
                }
                // console.log("Current Step:", current);
                return current + 1;
            } else {
                //console.log("Current Step:", current);
                const validationResult = questionAndAnswersForm.validate();
                if (validationResult.hasErrors) {
                    //console.log("Validation Errors:", validationResult.errors);
                    return current;
                }
                return (current < 2 ? current + 1 : current);
            }
        });
    };
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const backToMain = () => {
        createQuizGeneral(quizForm.values, questionAndAnswersForm.values);
        navigate('/quiz');
    }
    return (
        <>
            <Stepper color="indigo" active={active}>
                <Stepper.Step color="indigo" label="First step" description="Quiz information">
                    <QuizInfoCreateForm form={quizForm}/>
                </Stepper.Step>
                <Stepper.Step color="indigo" label="Second step" description="Question information">
                    <QuestionsCreateForm form={questionAndAnswersForm}
                                         numberOfQuestions={quizForm.values.numberOfQuestions}/>
                </Stepper.Step>
                <Stepper.Step color="indigo" label="Final step" description="Summary">
                    {active === 2 &&
                        <>
                            <Title mt='20px'>{quizForm.values.title}</Title>
                            <Text>{quizForm.values.description}</Text>
                            <Text>Number of questions: {quizForm.values.numberOfQuestions}</Text>
                            <br></br>
                            {Array.from({length: quizForm.values.numberOfQuestions}, (_, index) => {
                                return (
                                    <div key={index}>
                                        <Text
                                            size="xl">{questionAndAnswersForm.values.data[index].questionData.questionContent}</Text>
                                        {questionAndAnswersForm.values.data[index].answerData.map(({
                                                                                                       answerContent,
                                                                                                       correct
                                                                                                   }, i) => {
                                            return (
                                                <div key={i}>
                                                    <Text>{i + 1}. {answerContent} </Text>
                                                    <Text size="xs">{correct.toString()}</Text>
                                                </div>
                                            );
                                        })}
                                        <br></br>
                                    </div>
                                );
                            })}
                        </>
                    }
                </Stepper.Step>
            </Stepper>
            <Group justify="flex-end" mt="xl">
                {active !== 0 && (
                    <Button color="indigo"
                            variant="light"
                            rightSection={<IconArrowLeft size={14}/>}
                            onClick={prevStep}>
                        Back
                    </Button>
                )}
                {active !== 2 && <Button variant="gradient"
                                         gradient={{from: 'indigo', to: 'cyan', deg: 119}}
                                         rightSection={<IconArrowRight size={14}/>}
                                         onClick={nextStep}>Next step
                </Button>}
                {active === 2 && <Button variant="gradient"
                                         gradient={{from: 'indigo', to: 'cyan', deg: 119}}
                                         rightSection={<IconCheck size={14}/>}
                                         onClick={backToMain}>Confirm
                </Button>}
            </Group>
        </>
    );
}
