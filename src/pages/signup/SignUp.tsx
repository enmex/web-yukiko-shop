import { useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { authService } from "../../app/api/Auth";
import { errorState } from "../../app/states/Error.state";
import { userState } from "../../app/states/User.state";
import { User } from "../../app/types/User";
import "../../styles/css/SignUp.css"

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
            const apiResponse = await authService.signUp({
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                password: state.password
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
        } catch(e) {
            const message = e instanceof Error ? e.message : "unknown error";
            setErr(message);
        }
    }

    return (
        <>
        <div className="container">
            <form className="form" onSubmit={onSubmit}>
                <text className="text-signup">Регистрация</text>
                <div className="input-form">
                    <input name="firstName" placeholder="Имя" onInput={handleInput}></input>
                    <input name="lastName" placeholder="Фамилия" onInput={handleInput}></input>
                    <input name="email" placeholder="Электронная почта" onInput={handleInput}></input>
                    <input name="password" placeholder="Пароль" type="password" onInput={handleInput}></input>
                    <input placeholder="Повторите пароль" type="password"></input>
                </div>

                <button className="button-signup">Подтвердить</button>
            </form>
        </div>
        </>
    );
}