import {QuizInfoType} from "../../types/QuizInfoType";
import {ActionIcon, Modal, Button, Card, Group, Image, rem, Text} from "@mantine/core";
import {FC, memo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {IconTrash} from "@tabler/icons-react";
import {deleteQuiz} from "./api/delete-quiz";

interface QuizListItemProps {
    item: QuizInfoType;
}

export const MyQuizListItem: FC<QuizListItemProps> = memo(({item}) => {

    const navigate = useNavigate();

    const image_src = item.imageSrc || "https://placehold.co/400x200";

    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const handleCancelDelete = () => {
        handleCloseModal();
    };
    const handleConfirmDelete = () => {
        handleCloseModal();
        deleteQuiz(item.id);
        window.location.reload();
    };
    return (
        <>
            <Modal opened={isModalOpen} onClose={handleCancelDelete} title="Delete allert">
                <Text>Are you sure you want to delete this object?</Text>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
                    <Button style={{marginRight: '10px'}} onClick={handleCancelDelete}>Cancel</Button>
                    <Button color="red" onClick={handleConfirmDelete}>Confirm</Button>
                </div>
            </Modal>

            <Card shadow="xl" radius="xl">

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
                        <ActionIcon variant="subtle" color="gray" onClick={handleOpenModal}>
                            <IconTrash style={{width: rem(16), height: rem(16)}}/>
                        </ActionIcon>
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
        </>
    )
});
