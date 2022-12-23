import { useNavigate } from "react-router";
import { Container, ProductDescription, ProductName, ProductPhoto } from "./Styles";
import { useAppSelector } from "../../app/store";
import { useGetProductQuery } from "../../app/store/product/product.api";
import { Loading } from "../../components/Loading/Loading";

export const ProductInfo = () => {
    const productState = useAppSelector(state => state.product);
    const { isLoading, data: product } = useGetProductQuery(productState.id, {
        skip: productState.id.length === 0
    });
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <>
            <Loading />
            </>
        );
    }

    return (
        <>
        <Container>
            <ProductPhoto />
            <ProductName>{ product?.name }</ProductName>
            <ProductDescription>{ product?.description }</ProductDescription>
            <div className="flex justify-center bg-slate-400">{ product?.price }</div>
            <button onClick={() => navigate("products/edit")}>Редактировать</button>
        </Container>
        </>
    );
}