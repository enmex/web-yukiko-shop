import React, { useState } from "react";
import { useCreateProductMutation } from "../../app/store/product/product.api";
import { useGetCategoriesQuery } from "../../app/store/category/category.api";
import { Layout, Form, Select, Button, Input, Image } from "antd";
import { useUploadPhotoMutation } from "../../app/store/photo/photo.api";
import { CategoryEnum } from "../../app/store/category/category.types";
import { Navbar } from "../../components/Navbar/Navbar";

export const ProductEdit = () => {
    const [createProduct] = useCreateProductMutation();
    const [uploadPhoto] = useUploadPhotoMutation();
    const {data: categories} = useGetCategoriesQuery({
        type: CategoryEnum.LEAF
    });

    const [state, setState] = useState({
        id: "",
        name: "",
        description: "",
        categoryName: "",
        photoUrl: "",
        price: 0,
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const onSubmit = () => {
        try {
            createProduct({
                id: state.id,
                name: state.name,
                description: state.description,
                price: state.price,
                categoryName: state.categoryName,
                photoUrl: state.photoUrl,
            });
        } catch (e) {
            const message = e instanceof Error ? e.message : "unknown error";
            console.log(message);
        }
    }

    const onSelect = (value: string) => {
        setState({
            ...state,
             categoryName: value
        });
    }
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();
        formData.append('image', e.target.files ? e.target.files[0] : '');
        uploadPhoto(formData).unwrap().then((res) => {
            setState({
                ...state,
                id: res.id,
                photoUrl: res.photoUrl
            })
        });
    };

    return (
        <>
        <Layout>
            <Navbar />
            <h1 className="ml-2 mt-4 font-mono">Создание товара</h1>
            <Form onFinish={onSubmit}>
                <Form.Item>
                    <Input
                        type="file"
                        multiple={false}
                        onChange={onChange}
                    />
                    {state.photoUrl.length > 0 && (<><Image className="max-w-[500px] max-h-[500px]" src={state.photoUrl}/></>)}
                </Form.Item>
                <Form.Item>
                    <Input name="name" placeholder="Наименование товара" onInput={handleInput}></Input>
                </Form.Item>
                <Form.Item>
                    <Input name="description" placeholder="Описание товара" onInput={handleInput}></Input>
                </Form.Item>
                <Form.Item>
                    <Input name="price" placeholder="Цена товара" type="number" onInput={handleInput}></Input>
                </Form.Item>
                <Form.Item>
                    <Select onChange={onSelect}>
                        {categories?.map((category) => {
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