import { useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { errorState } from "../../app/states/Error.state";
import { userState } from "../../app/states/User.state";
import { Container, Form, FormHeader, Input, InputForm, SubmitButton } from "./Styles";

export const SignUp = () => {
    const [user, setUser] = useRecoilState(userState);
    const [, setErr] = useRecoilState(errorState);
    const [state, setState] = useState({
        firstName: user.profile.firstName ?? "",
        lastName: user.profile.lastName ?? "",
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
            setUser({
                ...user,
                profile: {
                    ...state,
                }
            });

            navigate("/verification");
        } catch(e) {
            const message = e instanceof Error ? e.message : "unknown error";
            setErr(message);
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
                    <Input name="email" placeholder="Электронная почта" onInput={handleInput}></Input>
                    <Input name="password" placeholder="Пароль" type="password" onInput={handleInput}></Input>
                    <Input name="passwordRepeat" placeholder="Повторите пароль" type="password"></Input>
                </InputForm>

                <SubmitButton>Подтвердить</SubmitButton>
            </Form>
        </Container>
        </>
    );
}