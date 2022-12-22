import React, { useState } from "react";
import { useCreateCategoryMutation, useGetCategoriesQuery } from "../../app/store/category/category.api";
import { Loading } from "../../components/Loading/Loading";

export const CreateCategory = () => {
    const [createCategory] = useCreateCategoryMutation();
    const { isLoading, data } = useGetCategoriesQuery({
        main: false,
        leaf: null,
    });
    const [currentCategory, setCurrentCategory] = useState<{
        parent: string | null,
        name: string,
    }>({
        parent: null,
        name: "",
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCurrentCategory({
            ...currentCategory,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            createCategory(currentCategory);
            setCurrentCategory({
                parent: null,
                name: ""
            })
        } catch (e) {
            const message = e instanceof Error ? e.message : "unknown error";
            console.log(message);
        }
    }

    const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const selectValue = e.target.value;
        console.log("here");
        setCurrentCategory({
            ...currentCategory,
            parent: selectValue === "no parent" ? null : selectValue,
        });
    }

    if (isLoading) {
        return (
            <>
            <Loading />
            </>
        );
    }

    return (
        <>
        <form className="flex flex-col w-1/2 justify-center" onSubmit={onSubmit}>
            <select onChange={onSelect}>
                <option key="no parent">Без родительской категории</option>
                {
                    data ? (
                        data.map((category) => {
                            return <option key={category}>{ category }</option>
                        })
                    ) : (<></>)
                }
            </select>
            <input name="name" placeholder="Категория" onInput={handleInput}></input>
            <button className="bg-red-500">Создать</button>
        </form>
        </>
    );
}