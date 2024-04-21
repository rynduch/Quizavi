import {
    Button,
    Paper,
    Radio,
    Stack,
    TextInput, Group, Center, Stepper,
} from "@mantine/core";
import {IconArrowForward, IconArrowLeft, IconArrowRight, IconMinus, IconPlus} from "@tabler/icons-react";
import {DragDropContext, Droppable, Draggable} from '@hello-pangea/dnd';
import {UseFormReturnType} from "@mantine/form";
import {useState} from "react";
import {QuestionsCreateType} from "../../types/QuestionsCreateType";

interface QuestionCreateFormProps {
    form: UseFormReturnType<QuestionsCreateType>;
    numberOfQuestions: number;
}
export const QuestionsCreateForm: React.FC<QuestionCreateFormProps> = ({form, numberOfQuestions}) => {
    const [q_active, setQ_active] = useState(0);
    const nextStep = () => {
        setQ_active((current) => {
            // console.log("Current Step:", current);
            //console.log("Number of Questions:", numberOfQuestions);
            //console.log("Data length: ", form.values.data.length);
            return current < numberOfQuestions - 1 ? current + 1 : current;
        });
    };

    const prevStep = () => {
        setQ_active((current) => {
            // console.log("Current Step:", current);
            return current > 0 ? current - 1 : current;
        });
    };

    const a_form = form.values.data[q_active].answerData.map((answer, a_index) => (
        <Draggable key={a_index} index={a_index} draggableId={a_index.toString()}>
            {(provided) => (
                <Group ref={provided.innerRef} mt="xs" {...provided.draggableProps}>
                    <Center {...provided.dragHandleProps}>
                        <IconArrowForward size="1.2rem"/>
                    </Center>
                    <TextInput
                        withAsterisk
                        label={`Answer ${a_index + 1}`}
                        placeholder="Enter Answer"
                        {...form.getInputProps(`data.${q_active}.answerData.${a_index}.answerContent`)}
                    />
                    <Radio
                        iconColor="white"
                        color="indigo"
                        label="Correct"
                        name="correctAnswer"
                        checked={form.values.data[q_active].answerData[a_index].correct}
                        onChange={() => {
                            const updatedAnswers = form.values.data.map((question, questionIndex) => {
                                if (questionIndex === q_active) {
                                    const updatedAnswerData = question.answerData.map((ans, ansIndex) => ({
                                        ...ans,
                                        correct: ansIndex === a_index,
                                    }));
                                    return {
                                        ...question,
                                        answerData: updatedAnswerData,
                                    };
                                }
                                return question;
                            });
                            form.setValues({
                                ...form.values,
                                data: updatedAnswers,
                            });
                        }}
                    />
                </Group>
            )}
        </Draggable>
    ));
    const addAnswer = () => {
        const activeQuestion = form.values.data[q_active];
        if (activeQuestion.questionData.numberOfAnswers < 6) {
            form.insertListItem(`data.${q_active}.answerData`, {
                index: activeQuestion.questionData.numberOfAnswers + 1,
                answerContent: '',
                correct: false
            });
            form.setFieldValue(`data.${q_active}.questionData.numberOfAnswers`, activeQuestion.questionData.numberOfAnswers + 1);
        } else {
            return "Number of answers must be between 2 and 6.";
        }
    };
    const removeAnswer = () => {
        const activeQuestion = form.values.data[q_active];
        if (activeQuestion.questionData.numberOfAnswers > 2) {
            const lastIndex = activeQuestion.questionData.numberOfAnswers - 1;
            form.removeListItem(`data.${q_active}.answerData`, lastIndex);
            form.values.data[q_active].answerData.forEach((answer) => {
                answer.correct = false;
            });
            form.values.data[q_active].answerData[0].correct = true;
            form.setFieldValue(`data.${q_active}.questionData.numberOfAnswers`, lastIndex);
        } else {
            return "Number of answers must be between 2 and 6.";
        }
    };
    return (
        <Paper shadow="xs" p="xl">
            <form>
                <Stepper iconSize={20} size="xs" color="indigo" active={q_active}>
                    {Array.from({length: numberOfQuestions}, (_, index) => (
                        <Stepper.Step key={index} color="indigo">
                            <Stack gap={"lg"}>
                                <TextInput
                                    withAsterisk
                                    label="Question"
                                    placeholder="Enter question"
                                    {...form.getInputProps(`data.${q_active}.questionData.questionContent`)}
                                />
                                <DragDropContext
                                    onDragEnd={({destination, source}) =>
                                        destination?.index !== undefined &&
                                        form.reorderListItem(`data.${q_active}.answerData`, {
                                            from: source.index,
                                            to: destination.index,
                                            //index: index,
                                        })
                                    }
                                >
                                    <Droppable droppableId={`dnd-list-${index}`} direction="vertical">
                                        {(provided) => (
                                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                                {a_form}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </Stack>
                        </Stepper.Step>
                    ))}
                </Stepper>
                <Group justify="center" mt="md" gap="xl">
                    <Button color="indigo" variant="outline" onClick={removeAnswer}>
                        {<IconMinus/>}
                    </Button>
                    <Button color="indigo" variant="outline" onClick={addAnswer}>
                        {<IconPlus/>}
                    </Button>
                    {q_active !== 0 && (
                        <Button color="cyan"
                                variant="outline"
                                onClick={prevStep}>{<IconArrowLeft size={14}/>}
                        </Button>
                    )}
                    {q_active !== numberOfQuestions - 1 && (
                        <Button color="cyan"
                                variant="outline"
                                gradient={{from: 'indigo', to: 'cyan', deg: 119}}
                                onClick={nextStep}>{<IconArrowRight size={14}/>}
                        </Button>
                    )}
                </Group>
            </form>
        </Paper>
    );
};


