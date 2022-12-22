import { useEffect } from "react";
import { useAppSelector } from "../../app/store";
import { Container, OrdersContainer, ProfileContainer } from "./Styles"
import { useNavigate } from "react-router";


export const Profile = () => {
    const auth = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuthorized) {
            navigate("/signIn");
        }
    })

    return (
        <>
        <Container>
            <ProfileContainer>Здесь профиль</ProfileContainer>
            <OrdersContainer>Здесь заказы</OrdersContainer>
        </Container>
        </>
    );
}