import React, { useState } from "react";
import { useCreateCategoryMutation, useGetCategoriesQuery } from "../../app/store/category/category.api";
import { Loading } from "../../components/Loading/Loading";
import { Button, Form, Input, Layout, Select } from "antd";
import { ImageUpload } from "../../components/ImageUpload/ImageUpload";
import { Navbar } from "../../components/Navbar/Navbar";
import { AuthState } from "../../app/store/auth/auth.types";

export const CreateCategory = (
    props: {
        auth: AuthState
    }
) => {
    const [createCategory] = useCreateCategoryMutation();
    const { isLoading, data } = useGetCategoriesQuery({});
    const [currentCategory, setCurrentCategory] = useState<{
        parent: string | null,
        name: string,
        photoUrl: string
        id: string
    }>({
        id: "",
        parent: null,
        name: "",
        photoUrl: "",
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCurrentCategory({
            ...currentCategory,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = () => {
        createCategory(currentCategory);
        setCurrentCategory({
            id: "",
            photoUrl: "",
            parent: null,
            name: ""
        });
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

    const onImageChange = (id: string, photoUrl: string) => {
        setCurrentCategory({
            ...currentCategory,
            id: id,
            photoUrl: photoUrl
        })
    }

    return (
        <>
        <Layout>
            <Navbar auth={props.auth}/>
            <h1 className="ml-2 mt-4 font-mono">Создание товара</h1>
            <Form onFinish={onSubmit}>
                <Form.Item>
                    <ImageUpload 
                        setStateCallback={onImageChange}
                        photoUrl={currentCategory.photoUrl}
                        />
                </Form.Item>
                <Form.Item>
                    <Input name="name" placeholder="Наименование категории" onInput={handleInput}></Input>
                </Form.Item>
                <Form.Item>
                    <Select onChange={onSelect}>
                        {data?.map((category) => {
                            return <Select.Option key={category.name}>{ category.name }</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Button onClick={onSubmit}>Подтвердить</Button>
            </Form>
        </Layout>
        </>
    );
}