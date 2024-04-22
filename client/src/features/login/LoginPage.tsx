import React, {FC, useState} from "react";
import {useForm} from "@mantine/form";
import {Button, Grid, Text, Stack, TextInput, Title, SimpleGrid} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {login} from "./api/login";

type LoginFormType = {
    email: string;
    password: string;
};
export const LoginPage: FC = () => {
    const [loginFailed, setloginFailed] = useState<1 | null>(null);
    const navigate = useNavigate();
    const form = useForm<LoginFormType>({
        initialValues: {
            email: "",
            password: "",
        }
    });
    const handleSubmit = async (data: LoginFormType) => {
        try {
            await login(data.email, data.password);
            navigate("/quiz");
        } catch (e) {
            setloginFailed(1);
        }
    };
    const handleSignUpClicked = () => {
        navigate("/signup");
    }
    return (
        <Grid justify="space-around" align="center" grow gutter="xl" h="97vh" w="97vw"
              style={{display: 'flex', alignItems: 'center'}}>
            <Grid.Col span={{base: 12, md: 6, lg: 6}}
                      style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{
                    backgroundImage: 'linear-gradient(30deg, indigo, cyan)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    <Title size="120" m="50">Quizavi</Title>
                </div>
            </Grid.Col>
            <Grid.Col span={{base: 12, md: 6, lg: 6}}>
                <Stack gap="xl" align="center">
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                        <TextInput w="350px" required type="email" label="Email" {...form.getInputProps("email")} />
                        <TextInput w="350px" mt="20" required type="password"
                                   label="Password" {...form.getInputProps("password")} />
                        <SimpleGrid cols={2} spacing="xl" mt="20" m="10">
                            <Button w="150px" variant="gradient"
                                    gradient={{from: 'indigo', to: 'cyan', deg: 119}}
                                    type="submit">Log in</Button>
                            <Button w="150px" variant="light" color="indigo" onClick={() => handleSignUpClicked()}>Sign
                                up</Button>
                        </SimpleGrid>
                    </form>
                    <Text c="red"
                          style={{
                              visibility:
                                  loginFailed === 1
                                      ? 'visible'
                                      : 'hidden',
                          }}>
                        Login failed.
                    </Text>
                </Stack>
            </Grid.Col>
        </Grid>
    );
};
