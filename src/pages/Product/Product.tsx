import { productState } from "../../app/states/Product.state";
import { useRecoilState } from "recoil";
import { Container, ProductDescription, ProductName, ProductPhoto } from "./Styles";

export const ProductInfo = () => {
    const [product] = useRecoilState(productState);

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