import { useRecoilState } from "recoil";
import { productState } from "../../app/states/Product.state";
import React, { useState } from "react";
import { errorState } from "../../app/states/Error.state";
import { productService } from "../../app/api/Product";
import { Container, ProductDescription, ProductName, ProductPhoto } from "./Styles";

export const ProductEdit = () => {
    const [, setErr] = useRecoilState(errorState);
    const [product] = useRecoilState(productState);
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
            await productService.createProduct({
                ...state,
            });
        } catch (e) {
            const message = e instanceof Error ? e.message : "unknown error";
            setErr(message);
        }
    }

    return (
        <>
        <Container>
            <ProductPhoto />
            <ProductName>{ product.name }</ProductName>
            <ProductDescription>{ product.description }</ProductDescription>
        </Container>
        </>
    );
}