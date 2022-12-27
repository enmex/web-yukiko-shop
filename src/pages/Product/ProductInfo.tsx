import { useNavigate } from "react-router";
import { useAppSelector } from "../../app/store";
import { useGetProductQuery } from "../../app/store/product/product.api";
import { Loading } from "../../components/Loading/Loading";
import { Layout, Image, Button } from "antd";
import { Navbar } from "../../components/Navbar/Navbar";
import { AccessType } from "../../app/store/auth/auth.types";
import { useGetAccessTypeQuery } from "../../app/store/auth/auth.api";

export const ProductInfo = () => {
    const auth = useAppSelector(state => state.persistedReducer.auth);
    const productState = useAppSelector(state => state.persistedReducer.product);
    const { isLoading, data: product } = useGetProductQuery(productState.id, {
        skip: productState.id.length === 0
    });
    const {data: accessType} = useGetAccessTypeQuery();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <>
            <Loading />
            </>
        );
    }

    const onAddToCart = () => {
        console.log('onAddToCart');
    }

    return (
        <>
        <Layout className="flex justify-center align-middle">
            <Navbar />
            <Image src={product?.photoUrl} width={"50%"} />
            <h1 className="font-bold text-[5rem]">{ product?.name }</h1>
            <h2 className="font-sans text-lg">{ product?.description }</h2>
            <h3 className="justify-end">Цена: { product?.price }Руб/шт.</h3>
                {auth.isAuthorized && (
                    accessType === AccessType.ADMIN
                     ? (<Button onClick={() => navigate("products/edit")}>Редактировать</Button>)
                     : (<Button onClick={onAddToCart}>В корзину</Button>)
                )}
        </Layout>
        </>
    );
}