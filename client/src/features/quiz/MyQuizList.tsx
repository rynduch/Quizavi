import {useEffect, useState} from "react";
import {QuizInfoType} from "../../types/QuizInfoType";
import {myListQuiz} from "./api/quiz";
import {SimpleGrid} from "@mantine/core";
import {MyQuizListItem} from "./MyQuizListItem";

export const MyQuizList = () => {
    const [data, setData] = useState<QuizInfoType[]>([]);
    useEffect(() => {
        myListQuiz().then((response) => setData(response));
    }, [])
    return (
        <div style={{width: '100%'}}>
            <SimpleGrid cols={{base: 2, sm: 2, lg: 4}}
                        spacing={'xl'}
                        verticalSpacing={'xl'}>
                {data.map((item) => <MyQuizListItem key={item.id} item={item}/>)}
            </SimpleGrid>
        </div>
    )
}