import {Button, FileButton, Group, NumberInput, Paper, Stack, Text, Textarea, TextInput} from "@mantine/core";
import {QuizInfoCreateType} from "../../types/QuizInfoCreateType";
import {UseFormReturnType} from "@mantine/form";
import {useState} from "react";
import {IconPhoto} from "@tabler/icons-react";

interface QuizCreateFormProps {
    form: UseFormReturnType<QuizInfoCreateType>;
}

export const QuizInfoCreateForm: React.FC<QuizCreateFormProps> = ({form}) => {
    const [file, setFile] = useState<File | null>(null);
    const handleUploadImage = async (file: File | null) => {
        setFile(file);
        if (file !== null) {
            form.values.imageSrc = URL.createObjectURL(file);
        }
    }
    return (
        <Paper shadow='xs' p='xl'>
            <form>
                <Stack gap={'lg'}>
                    <TextInput
                        withAsterisk
                        label="Title"
                        placeholder="Quiz title"
                        {...form.getInputProps('title')}
                    />
                    <Textarea
                        withAsterisk
                        label="Description"
                        placeholder="Quiz description"
                        {...form.getInputProps('description')}
                    />
                    <NumberInput
                        label="Number of questions"
                        min={1}
                        max={100}
                        {...form.getInputProps('numberOfQuestions')}
                    />
                    <Group justify="center">
                        <FileButton
                            onChange={handleUploadImage}
                            accept="image/png,image/jpeg">
                            {(props) => <Button color="blue" variant="light"
                                                leftSection={<IconPhoto size={14}/>} {...props}>Upload
                                image</Button>}
                        </FileButton>
                    </Group>
                    {file && (
                        <Text size="sm" ta="center" mt="sm">
                            Picked file: {file.name}
                        </Text>
                    )}
                </Stack>
            </form>
        </Paper>
    )
}