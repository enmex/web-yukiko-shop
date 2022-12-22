import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Container, Form, FormHeader, Input, InputForm, SubmitButton } from "./Styles";
import { useSignInMutation } from "../../app/store/auth/auth.api";
import { useAppDispatch } from "../../app/store";
import { setToken } from "../../app/store/auth/auth.slice";

export const SignIn = () => {
    const dispatch = useAppDispatch();
    const [signIn, {isLoading}] = useSignInMutation();
    const [state, setState] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        try {
            signIn({
                ...state,
            }).unwrap().then((res) => {
                dispatch(setToken(res));
            })
            navigate("/");
        } catch (e) {
            const message = e instanceof Error ? e.message : "unknown error";
            console.log(message);
        }
    }

    return (
        <>
        <Container>
            <Form onSubmit={onSubmit}>
                <FormHeader>Авторизация</FormHeader>
                <InputForm>
                    <Input name="email" placeholder="Электронная почта" className="input" onInput={handleInput}></Input>
                    <Input name="password" placeholder="Пароль" type="password" className="input" onInput={handleInput}></Input>
                </InputForm>

                <span className="text-signup">Впервые на сайте, анон-кун?</span>
                <a href="/verification" className="a-signup">Зарегистрироваться</a>

                <SubmitButton className="submit-button">Подтвердить</SubmitButton>
            </Form>
        </Container>
        </>
    )
}