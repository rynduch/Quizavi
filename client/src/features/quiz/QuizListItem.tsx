import {QuizInfoType} from "../../types/QuizInfoType";
import {Button, Card, Group, Image, Text} from "@mantine/core";
import {FC, memo} from "react";
import {useNavigate} from "react-router-dom";

interface QuizListItemProps {
    item: QuizInfoType;
}

export const QuizListItem: FC<QuizListItemProps> = memo(({item}) => {
    const navigate = useNavigate();
    const image_src = item.imageSrc || "https://placehold.co/400x200";
    return (
        <Card
            shadow="xl"
            radius="xl"
        >
            <Card.Section>
                <Image
                    src={image_src}
                    h={175}
                    alt="No way!"
                />
            </Card.Section>
            <Card.Section ml="xs" mr="xs" h={125}>
                <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500} size="lg" mt="nd">{item.title}</Text>
                </Group>
                <Text mt="xs" c="dimmed" size="sm">{item.description}</Text>
                <Text mt="xs" c="dimmed" size="sm">Number of questions: {item.numberOfQuestions}</Text>
            </Card.Section>
            <Card.Section withBorder={true} ml="xs" mr="xs" mb="xs">
                <Button color="indigo" fullWidth mt="md" radius="md"
                        onClick={() => navigate(`/quiz/${item.id}`)}>
                    Start
                </Button>
            </Card.Section>
        </Card>
    )
});
