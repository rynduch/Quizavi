import React, {useEffect, useState} from "react";
import {Grid, Title, Stack, Paper, Button, Stepper} from "@mantine/core";
import {Questions} from "./api/questions";
import {useNavigate, useParams} from "react-router-dom";
import {QuestionAndAnswersType} from "../../types/QuestionAndAnswersType";
import {IconArrowRight} from "@tabler/icons-react";
import {createResult} from "../result/api/create-result";

export const QuestionsSolveForm = () => {
    const {id} = useParams();
    const [data, setData] = useState<QuestionAndAnswersType[]>([]);
    useEffect(() => {
        Questions(Number(id)).then((response) => setData(response));
    }, [])

    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const numberOfQuestions = data.length;
    const [q_active, setQ_active] = useState(0);
    const [points, setPoints] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedAnswer !== null) {
            setPoints((prevPoints) => data[q_active].answerData[selectedAnswer].correct ? prevPoints + 1 : prevPoints);
        }
    }, [selectedAnswer, q_active, data]);

    const handleButtonClick = (index: number) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(index);
    };

    const handleNextClick = () => {
        setQ_active((current) => {
            console.log("Current Step:", current);
            console.log("Number of Questions:", numberOfQuestions);
            console.log("Points:", points);
            setSelectedAnswer(null);
            return current < numberOfQuestions - 1 ? current + 1 : current;
        });
    };

    const backToMain = () => {
        createResult({
            points: points,
            quizId: Number(id),
        });
        navigate('/quiz');
    }

    return (
        <Paper shadow="xs" p="xl">
            <Stepper iconSize={20} size="xs" color="indigo" active={q_active}>
                {Array.from({length: numberOfQuestions}, (_, index) => (
                    <Stepper.Step key={index} color="indigo">
                        <Title style={{color: "grey"}} order={3}>{index + 1}/{numberOfQuestions}</Title>
                        <Stack gap="xl" align="center" justify="center"
                               style={{width: '100%', height: '100%'}}>
                            <Title order={2} mt="xl" mb="xl">{data[index].questionData.questionContent}</Title>
                            <Grid grow style={{width: '100%', height: '100%'}}>
                                {data[index].questionData.numberOfAnswers &&
                                    Array.from({length: data[index].questionData.numberOfAnswers}).map((_, i) => (
                                        <Grid.Col span={{base: 12, md: 2, lg: 1}}>
                                            <Button
                                                onClick={() => handleButtonClick(i)}
                                                disabled={selectedAnswer !== null}
                                                h="50"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    cursor: selectedAnswer !== null ? "not-allowed" : "pointer",
                                                    backgroundColor:
                                                        i === selectedAnswer
                                                            ? data[index].answerData[i].correct
                                                                ? "green"
                                                                : "red"
                                                            : selectedAnswer !== null
                                                                ? data[index].answerData[i].correct
                                                                    ? "green"
                                                                    : "#6c8ab8"
                                                                : "#6c8ab8",
                                                    color: "white",
                                                }}
                                            >
                                                {data[index].answerData[i].answerContent}
                                            </Button>
                                        </Grid.Col>
                                    ))}
                            </Grid>
                            {selectedAnswer !== null && q_active !== numberOfQuestions - 1 && (
                                <Button
                                    variant="gradient"
                                    gradient={{from: 'indigo', to: 'cyan', deg: 119}}
                                    rightSection={<IconArrowRight size={14}/>}
                                    onClick={handleNextClick}>
                                    Next
                                </Button>
                            )}
                            {selectedAnswer !== null && q_active === numberOfQuestions - 1 && (
                                <Button variant="gradient"
                                        gradient={{from: 'indigo', to: 'cyan', deg: 119}}
                                        rightSection={<IconArrowRight size={14}/>}
                                        onClick={backToMain}>Back to Quizzes
                                </Button>
                            )}
                        </Stack>
                    </Stepper.Step>
                ))}
            </Stepper>
        </Paper>
    );
};
