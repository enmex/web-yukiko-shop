import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { authService } from "../../app/api/Auth";
import { errorState } from "../../app/states/Error.state";
import { userAuthorized, userState } from "../../app/states/User.state";
import "../../styles/css/AuthForm.css"

export const CodeVerification = () => {
    const authorized = useRecoilValue(userAuthorized);
    const [user, setUser] = useRecoilState(userState);
    const [, setErr] = useRecoilState(errorState);
    const [state, setState] = useState({
        code: 0,
    });

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                if (!authorized) {
                    await authService.sendVerifyCode({
                        email: user.profile.email
                    })
                }
            } catch (e) {
                const message = e instanceof Error ? e.message : "unknown error";
                setErr(message);
            }
        })()
    }, [authorized, navigate, setErr, user.profile.email]);

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

            setUser(apiResponse);
            localStorage.setItem("user", JSON.stringify(apiResponse));
            navigate("/")
        } catch (e) {
            const message = e instanceof Error ? e.message : "unknown error";
            setErr(message);
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault(); 
        try {
            const value = parseInt(e.target.value);
            setState({
                code: value,
            });
        } catch(e) {
            const message = e instanceof Error ? e.message : "unknown error";
            setErr(message);
        }
    };

    return (
        <>
        <div className="container">
            <form className="form" onSubmit={onSubmit}>
                <div className="form-header">Код верификации</div>
                <div className="input-form">
                    <input name="code" placeholder="Код верификации" className="input" onInput={handleInput}></input>
                </div>

                <button className="submit-button">Подтвердить</button>
            </form>
        </div>
        </>
    );
}