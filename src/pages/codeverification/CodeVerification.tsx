import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { authService } from "../../app/api/Auth";
import { errorState } from "../../app/states/Error.state";
import { userState } from "../../app/states/User.state";
import "../../styles/css/SignIn.css"

export const CodeVerification = () => {
    const [user, ] = useRecoilState(userState);
    const [, setErr] = useRecoilState(errorState);
    const [state, setState] = useState({
        code: 0,
    });

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                console.log(user.profile.email);
                await authService.sendVerifyCode({
                    email: user.profile.email
                })
            } catch (e) {
                const message = e instanceof Error ? e.message : "unknown error";
                setErr(message);
            }
        })()
    }, [setErr, user.profile.email]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try { 
            const apiResponse = await authService.signUp({
                firstName: user.profile.firstName,
                lastName: user.profile.lastName,
                password: user.profile.password,
                email: user.profile.email,
                code: state.code,
            });

            localStorage.removeItem("userPreSignUp");
            localStorage.setItem("user", JSON.stringify(apiResponse));
            navigate("/")
        } catch (e) {
            const message = e instanceof Error ? e.message : "unknown error";
            setErr(message);
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
    };

    return (
        <>
        <div className="container">
            <form className="form" onSubmit={onSubmit}>
                <div className="text-signin">Код верификации</div>
                <div className="input-form">
                    <input placeholder="Код верификации" className="input" onInput={handleInput}></input>
                </div>

                <button className="button-signin">Подтвердить</button>
            </form>
        </div>
        </>
    );
}