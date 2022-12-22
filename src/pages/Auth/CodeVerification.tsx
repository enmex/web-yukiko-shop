import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Container, Form, FormHeader, InputForm, SubmitButton } from "./Styles";
import { useSendVerifyCodeMutation } from "../../app/store/auth/auth.api";
import { useAppDispatch } from "../../app/store";
import { setEmail } from "../../app/store/auth/auth.slice";

export const CodeVerification = () => {
    const dispatch = useAppDispatch();
    const [sendVerifyCode] = useSendVerifyCodeMutation();
    const [input, setInput] = useState("");

    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try { 
            sendVerifyCode({
                email: input,
            });
            dispatch(setEmail(input));
            navigate("/signUp");
        } catch (e) {
            const message = e instanceof Error ? e.message : "unknown error";
            console.log(message);
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault(); 
        setInput(e.target.value);
    };

    return (
        <>
        <Container>
            <Form onSubmit={onSubmit}>
                <FormHeader>Код верификации</FormHeader>
                <InputForm>
                    <input name="email" placeholder="Почта" className="input" onInput={handleInput}></input>
                </InputForm>

                <SubmitButton className="submit-button">Подтвердить</SubmitButton>
            </Form>
        </Container>
        </>
    );
}

