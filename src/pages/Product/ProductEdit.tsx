import React, { useState } from "react";
import { Container } from "./Styles";
import { useCreateProductMutation } from "../../app/store/product/product.api";
import { useAppSelector } from "../../app/store";
import { useGetCategoriesQuery } from "../../app/store/category/category.api";

export const ProductEdit = () => {
    const [createProduct, {isLoading}] = useCreateProductMutation();
    const parentCategory = useAppSelector(state => state.category);
    const {data: categories} = useGetCategoriesQuery({
        main: null,
        leaf: true,
    });

    const [state, setState] = useState({
        name: "",
        description: "",
        categoryName: "",
        path: "",
        price: 0,
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.name.includes("price")) {
            const value = parseInt(e.target.value);
            setState({
                ...state,
                price: value,
            });
        } else {
            setState({
                ...state,
                [e.target.name]: e.target.value,
            });
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            createProduct({
                name: state.name,
                description: state.description,
                price: state.price,
                categoryName: state.categoryName,
                path: state.path
            });
            
        } catch (e) {
            const message = e instanceof Error ? e.message : "unknown error";
            console.log(message);
        }
    }

    const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        console.log("here");
        setState({
            ...state,
             categoryName: e.target.value
        });
    }

    return (
        <>
        <Container>
            <div>Создание товара</div>
            <form onSubmit={onSubmit}>
                <input name="name" placeholder="Наименование товара" onInput={handleInput}></input>
                <input name="description" placeholder="Описание товара" onInput={handleInput}></input>
                <input name="price" placeholder="Цена товара" type="number" onInput={handleInput}></input>
                <select onChange={onSelect}>
                    <option selected disabled hidden>Категория</option>
                    {categories?.map((category) => {
                        return <option key={category}>{ category }</option>
                    })}
                </select>
                <button>Подтвердить</button>
            </form>
        </Container>
        </>
    );
}