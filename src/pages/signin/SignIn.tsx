import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { authService } from "../../app/api/Auth";
import { errorState } from "../../app/states/Error.state";
import { userState } from "../../app/states/User.state";
import { User } from "../../app/types/User";
import "../../styles/css/SignIn.css"

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
        <div className="container">
            <form className="form" onSubmit={onSubmit}>
                <text className="text-signin">Авторизация</text>
                <div className="input-form">
                    <input placeholder="Электронная почта" className="input" onInput={handleInput}></input>
                    <input placeholder="Пароль" type="password" className="input" onInput={handleInput}></input>
                </div>

                <div className="signup">
                    <text className="text-signup">Нет аккаунта?</text>
                    <a href="/signUp" className="a-signup">Зарегистрироваться</a>
                </div>

                <button className="button-signin">Подтвердить</button>
            </form>
        </div>
        </>
    )
}