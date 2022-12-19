import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { errorState } from "../../app/states/Error.state";
import { categoryService } from "../../app/api/Category";

export const CreateCategory = () => {
    const [err, setErr] = useRecoilState(errorState);
    const [state, setState] = useState({
        name: "",
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await categoryService.createCategory(state);
        } catch (e) {
            const message = e instanceof Error ? e.message : "unknown error";
            setErr(message);
        }
    }

    return (
        <>
        <form onSubmit={onSubmit}>
            <input name="name" placeholder="Категория" onInput={handleInput}></input>
            <button>Создать</button>
        </form>
        </>
    );
}