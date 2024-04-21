import {AppShell, Burger, Group, Title} from "@mantine/core";
import {Outlet} from "react-router-dom";
import {AppNavBar} from "./AppNavBar";
import {useDisclosure} from "@mantine/hooks";

export const Layout = () => {
    const [opened, {toggle}] = useDisclosure();
    return (
        <AppShell
            header={{height: 60}}
            navbar={{width: 300, breakpoint: 'sm', collapsed: {mobile: !opened}}}
            padding="md"
            bg="var(--mantine-color-gray-light)"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>
                    <Title order={2}>Quizavi</Title>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <AppNavBar/>
            </AppShell.Navbar>
            <AppShell.Main><Outlet/></AppShell.Main>
        </AppShell>
    );
}