import React from 'react';
import '../../styles/css/Welcome.css'
import { useNavigate } from "react-router-dom"
import { userAuthorized } from '../../app/states/User.state';
import { useRecoilValue } from 'recoil';

export const Welcome = () => {
    const authorized = useRecoilValue(userAuthorized);
    let buttonText = authorized ? "Личный кабинет" : "Войти";

    const navigate = useNavigate();
    return (
        <>
            <header>
                <button className='header-button' onClick={() => {
                    authorized ? navigate("/profiles") : navigate("/signIn") }
                }>{ buttonText }</button>
            </header>
        </>
    );
}