import React, {FC, useState} from "react";
import {useForm} from "@mantine/form";
import {Button, Grid, Text, Stack, TextInput, Title, SimpleGrid} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {signup} from "./api/signup";


export type SignUpFormType = {
    email: string;
    password: string;
};

export const SignUpPage: FC = () => {
    const [signUpFailed, setsignUpFailed] = useState<1 | null>(null);
    const navigate = useNavigate();
    const form = useForm<SignUpFormType>({
        initialValues: {
            email: "",
            password: "",
        }
    });
    const handleSubmit = async (data: SignUpFormType) => {
        try {
            await signup(data);
            navigate("/login");
        } catch (e) {
            setsignUpFailed(1);
        }
    };
    const handleLoginClicked = async () => {
        navigate("/login");
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
                    <Title size="120">Quizavi</Title>
                </div>
            </Grid.Col>
            <Grid.Col span={{base: 12, md: 6, lg: 6}}>
                <Stack gap="xl" align="center">
                    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                        <TextInput w="350px" required type="email" label="Email" {...form.getInputProps("email")} />
                        <TextInput w="350px" mt="20" required type="password"
                                   label="Password" {...form.getInputProps("password")} />
                        <SimpleGrid cols={2} spacing="xl" mt="20" m="10">
                            <Button w="150px" variant="light" color="indigo" onClick={() => handleLoginClicked()}>Log
                                in</Button>
                            <Button w="150px" variant="gradient"
                                    gradient={{from: 'indigo', to: 'cyan', deg: 119}}
                                    type="submit">Sign up</Button>
                        </SimpleGrid>
                    </form>
                    <Text c="red"
                          style={{
                              visibility:
                                  signUpFailed === 1
                                      ? 'visible'
                                      : 'hidden',
                          }}>
                        Sign up failed.
                    </Text>
                </Stack>
            </Grid.Col>
        </Grid>
    );
};
