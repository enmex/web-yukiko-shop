import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useGetProductQuery } from "../../app/store/product/product.api";
import { Loading } from "../../components/Loading/Loading";
import { Layout, Image, Button } from "antd";
import { Navbar } from "../../components/Navbar/Navbar";
import { AccessType, AuthState } from "../../app/store/auth/auth.types";
import { useGetAccessTypeQuery } from "../../app/store/auth/auth.api";
import { useState } from "react";
import { useAddProductToCartMutation } from "../../app/store/cart/cart.api";
import { addCartProduct } from "../../app/store/cart/cart.slice"
import { NotFound } from "../404";

export const ProductInfo = (
    props: {
        auth: AuthState
    }
) => {
    const dispatch = useAppDispatch();
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const cart = useAppSelector(state => state.persistedReducer.cart);
    const splits = window.location.href.split('/');
    const productID = splits[splits.length - 2];
    const { isLoading, isError, data: product } = useGetProductQuery(productID, {
        skip: productID.length === 0
    });
    const {data: accessType} = useGetAccessTypeQuery();
    const [addProductToCart] = useAddProductToCartMutation();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <>
            <Loading />
            </>
        );
    };

    if (isError) {
        return (
            <>
            <NotFound />
            </>
        );
    };

    const onAddToCart = () => {
        if (product) {
            dispatch(addCartProduct({
                productID: product.id,
                name: product.name,
                price: product.price,
                photoUrl: product.photoUrl,
                quantity: 1
            }));

            if (props.auth.isAuthorized) {
                addProductToCart({
                    productID: product.id,
                    name: product.name,
                    price: product.price,
                    photoUrl: product.photoUrl
                });
            }

            setIsSuccessMessage(true);
            setTimeout(() => {
                setIsSuccessMessage(false);
            }, 1000);
        }
    }

    const onError = () => {
        setIsErrorMessage(true);
        setTimeout(() => {
            setIsErrorMessage(false);
        }, 1000);
    }

    return (
        <>
        <Layout className="flex justify-center align-middle">
            <Navbar auth={props.auth} />
            <h1 className="font-bold text-[5rem]">{ product?.name }</h1>
            <Image src={product?.photoUrl} width="50%" />
            <h2 className="font-sans text-lg">{ product?.description }</h2>
            <h3 className="justify-end">Цена: { product?.price } Руб/шт.</h3>
                {props.auth.isAuthorized && (
                    accessType === AccessType.ADMIN
                     ? (<Button onClick={() => navigate("products/edit")}>Редактировать</Button>)
                     : (<Button onClick={onAddToCart}>В корзину</Button>)
                )}
            <Button 
                onClick={
                    cart.products.find(product => product.productID === productID) ?
                    onError : onAddToCart
                } 
            >
                В корзину
            </Button>
            {
                isSuccessMessage && (<div className="transition-all font-bold text-green-500">Товар добавлен в корзину!</div>)
            }
            {
                isErrorMessage && (<div className="transition-all font-bold text-red-600">Товар уже есть в корзине!</div>)
            }
        </Layout>
        </>
    );
}