import {Paper, Table, Stack, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import {listResult} from "./api/result";
import {ResultType} from "../../types/ResultType";

export const ResultList = () => {
    const [data, setData] = useState<ResultType[]>([]);
    useEffect(() => {
        listResult().then((response) => setData(response));
    }, [])
    const table = data.map((element, index) => (
        <Table.Tr key={element.createdAt.toString()}>
            <Table.Td>{index + 1}</Table.Td>
            <Table.Td>{element.quizTitle}</Table.Td>
            <Table.Td>{element.points}</Table.Td>
            <Table.Td>{element.quizNumberOfQuestions}</Table.Td>
            <Table.Td>{Math.round((element.points / element.quizNumberOfQuestions) * 100)}</Table.Td>
            <Table.Td>{element.createdAt.toString()}</Table.Td>
        </Table.Tr>
    ));
    return (
        <Paper m='xl' radius='xl' h='80vh' shadow='xl'>
            <Stack m='xl'>
                <Title order={3} mt="xl">Results</Title>
                <Table.ScrollContainer minWidth={500} type="native">
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>No.</Table.Th>
                                <Table.Th>Quiz title</Table.Th>
                                <Table.Th>Correct answers</Table.Th>
                                <Table.Th>Number of questions</Table.Th>
                                <Table.Th>Score [%]</Table.Th>
                                <Table.Th>Date</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{table}</Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Stack>
        </Paper>
    );
}