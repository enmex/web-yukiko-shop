import React, { useState } from "react";
import { useCreateCategoryMutation, useGetCategoriesQuery } from "../../app/store/category/category.api";
import { Loading } from "../../components/Loading/Loading";
import { Button, Form, Input, Layout, Select } from "antd";
import { NavBar } from "../../components/NavBar/Navbar";

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

    const onSubmit = () => {
        createCategory(currentCategory);
        setCurrentCategory({
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

    return (
        <>
        <Layout>
            <NavBar />
            <h1 className="ml-2 mt-4 font-mono">Создание категории</h1>
            <Form className="flex flex-col justify-center p-5" onFinish={onSubmit}>
                <Form.Item>
                    <Select onChange={onSelect}>
                        {
                            data ? (
                                data.map((category) => {
                                    return <Select.Option key={category.name}>{ category.name }</Select.Option>
                                })
                            ) : (<></>)
                        }
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Input placeholder="Наименование категории" onInput={handleInput}/>
                </Form.Item>
                <Form.Item><Button>Создать</Button></Form.Item>
            </Form>
        </Layout>
        </>
    );
}