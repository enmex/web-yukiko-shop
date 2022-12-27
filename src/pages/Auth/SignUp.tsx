import { useState } from "react";
import { useNavigate } from "react-router";
import { Container, Form, FormHeader, Input, InputForm, SubmitButton } from "./Styles";
import { useSignUpMutation } from "../../app/store/auth/auth.api";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { setToken } from "../../app/store/auth/auth.slice";

export const SignUp = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.persistedReducer.auth);
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: user.email,
        password: "",
        code: 0,
    });
    
    const [signUp] = useSignUpMutation();

    const navigate = useNavigate();

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.name === "code") {
            const value = parseInt(e.target.value);
            setState({
                ...state,
                code: value,
            });
        } else {
            setState({
                ...state,
                [e.target.name]: e.target.value,
            });
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        try {
            signUp({
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                password: state.password,
                code: state.code,
            }).unwrap().then((token) => {
                dispatch(setToken(token));
            });      
            navigate("/");
        } catch(e) {
            const message = e instanceof Error ? e.message : "unknown error";
            console.log(message);
        }
    }

    return (
        <>
        <Container>
            <Form onSubmit={onSubmit}>
                <FormHeader>Регистрация</FormHeader>
                <InputForm>
                    <Input name="firstName" placeholder="Имя" onInput={handleInput}></Input>
                    <Input name="lastName" placeholder="Фамилия" onInput={handleInput}></Input>
                    <Input name="password" placeholder="Пароль" type="password" onInput={handleInput}></Input>
                    <Input name="code" placeholder="Код верификации" onInput={handleInput}></Input>
                </InputForm>

                <SubmitButton>Подтвердить</SubmitButton>
            </Form>
        </Container>
        </>
    );
}