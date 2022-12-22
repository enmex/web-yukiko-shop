import { Button, Container, ProductEntry, ProductList } from "./Styles";
import { useNavigate } from "react-router";

export const Cart = () => {
    const navigate = useNavigate();

    return (
        <>
        <Container>
            <ProductList>   
                <ProductEntry>Товар 1</ProductEntry>
                <ProductEntry>Товар 2</ProductEntry>
                <ProductEntry>Товар 3</ProductEntry>
            </ProductList>
        </Container>
        </>
    );
}