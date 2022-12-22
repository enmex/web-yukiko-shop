import { useNavigate } from "react-router";
import { Container, ProductDescription, ProductName, ProductPhoto } from "./Styles";

export const ProductInfo = () => {
    const navigate = useNavigate();

    return (
        <>
        <Container>
            <ProductPhoto />
            <ProductName>{ }</ProductName>
            <ProductDescription>{  }</ProductDescription>
            <button onClick={() => navigate("products/edit")}>Редактировать</button>
        </Container>
        </>
    );
}