import { useRecoilValue } from "recoil";
import { userAuthorized } from "../../app/states/User.state";
import { Button, Container, ProductEntry, ProductList } from "./Styles";
import { useNavigate } from "react-router";

export const Cart = () => {
    const authorized = useRecoilValue(userAuthorized);
    const navigate = useNavigate();

    return (
        <>
        <Container>
            <ProductList>   
                <ProductEntry>Товар 1</ProductEntry>
                <ProductEntry>Товар 2</ProductEntry>
                <ProductEntry>Товар 3</ProductEntry>
                <Button onClick={() =>
                    authorized ? navigate("/orders/submit") : navigate("/signIn")
                }>{ authorized ? "Купить" : "Войти в аккаунт" }</Button>
            </ProductList>
        </Container>
        </>
    );
}