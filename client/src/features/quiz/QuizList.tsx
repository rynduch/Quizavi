import {QuizInfoType} from "../../types/QuizInfoType";
import {QuizListItem} from "./QuizListItem";
import {Combobox, Group, Input, InputBase, SimpleGrid, useCombobox} from "@mantine/core";
import {useEffect, useState} from "react";
import {listFilterQuiz, listQuiz} from "./api/quiz";

export const QuizList = () => {
    const [data, setData] = useState<QuizInfoType[]>([]);
    const [valueSortBy, setValueSortBy] = useState<string | null>(null);
    const [valueSortOrder, setValueSortOrder] = useState<string | null>(null);
    useEffect(() => {
        if (valueSortBy && valueSortOrder) {
            listFilterQuiz(valueSortBy, valueSortOrder).then((response) => setData(response));
        } else {
            listQuiz().then((response) => setData(response));
        }
    }, [valueSortBy, valueSortOrder])

    const sortBy = ['createdAt', 'title', 'numberOfQuestions'];
    const sortOrder = ['asc', 'desc'];
    const comboboxSortBy = useCombobox({
        onDropdownClose: () => comboboxSortBy.resetSelectedOption(),
    });
    const comboboxSortOrder = useCombobox({
        onDropdownClose: () => comboboxSortBy.resetSelectedOption(),
    });
    const optionsSortBy = sortBy.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));
    const optionsSortOrder = sortOrder.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));
    return (
        <div style={{width: '100%'}}>
            <Group justify="flex-end">
                <Combobox
                    store={comboboxSortBy}
                    onOptionSubmit={(val) => {
                        setValueSortBy(val);
                        comboboxSortBy.closeDropdown();
                    }}
                    width="175"
                >
                    <Combobox.Target>
                        <InputBase
                            component="button"
                            type="button"
                            pointer
                            rightSection={<Combobox.Chevron/>}
                            rightSectionPointerEvents="none"
                            onClick={() => comboboxSortBy.toggleDropdown()}
                            mb="xl"
                            w="175"
                        >
                            {valueSortBy || <Input.Placeholder>Sort by</Input.Placeholder>}
                        </InputBase>
                    </Combobox.Target>

                    <Combobox.Dropdown>
                        <Combobox.Options>{optionsSortBy}</Combobox.Options>
                    </Combobox.Dropdown>
                </Combobox>
                <Combobox
                    store={comboboxSortOrder}
                    onOptionSubmit={(val) => {
                        setValueSortOrder(val);
                        comboboxSortOrder.closeDropdown();
                    }}
                    width="120"
                >
                    <Combobox.Target>
                        <InputBase
                            component="button"
                            type="button"
                            pointer
                            rightSection={<Combobox.Chevron/>}
                            rightSectionPointerEvents="none"
                            onClick={() => comboboxSortOrder.toggleDropdown()}
                            mb="xl"
                            w="120"
                        >
                            {valueSortOrder || <Input.Placeholder>Sort order</Input.Placeholder>}
                        </InputBase>
                    </Combobox.Target>

                    <Combobox.Dropdown>
                        <Combobox.Options>{optionsSortOrder}</Combobox.Options>
                    </Combobox.Dropdown>
                </Combobox>
            </Group>
            <SimpleGrid cols={{base: 2, sm: 2, lg: 4}}
                        spacing={'xl'}
                        verticalSpacing={'xl'}>
                {data.map((item) => <QuizListItem key={item.id} item={item}/>)}
            </SimpleGrid>
        </div>
    )
}