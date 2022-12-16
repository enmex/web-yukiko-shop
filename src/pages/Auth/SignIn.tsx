import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { authService } from "../../app/api/Auth";
import { errorState } from "../../app/states/Error.state";
import { userState } from "../../app/states/User.state";
import { User } from "../../app/types/User";
import { Container, Form, FormHeader, Input, InputForm, SubmitButton } from "./Styles";

export const SignIn = () => {
    const [, setErr] = useRecoilState(errorState);
    const [user, setUser] = useRecoilState(userState);
    const [state, setState] = useState({
        email: user.profile.email ?? "",
        password: user.profile.password ?? "",
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
            const apiResponse = await authService.signIn({
                email: user.profile.email,
                password: user.profile.password
            });

            const updatedUser: User = {
                ...apiResponse,
                profile: {
                    ...apiResponse.profile,
                    password: state.password,
                }
            }

            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(apiResponse));
            navigate("/");
        } catch (e) {
            const message = e instanceof Error ? e.message : "unknown error";
            setErr(message);
        }
    }

    return (
        <>
        <Container>
            <Form onSubmit={onSubmit}>
                <FormHeader>Авторизация</FormHeader>
                <InputForm>
                    <Input placeholder="Электронная почта" className="input" onInput={handleInput}></Input>
                    <Input placeholder="Пароль" type="password" className="input" onInput={handleInput}></Input>
                </InputForm>

                <span className="text-signup">Впервые на сайте, анон-кун?</span>
                <a href="/signUp" className="a-signup">Зарегистрироваться</a>

                <SubmitButton className="submit-button">Подтвердить</SubmitButton>
            </Form>
        </Container>
        </>
    )
}