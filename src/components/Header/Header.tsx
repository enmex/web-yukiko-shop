import { useRecoilValue } from "recoil";
import { userAuthorized } from "../../app/states/User.state"
import { Button, Header, Nav, NavBar } from "./Styles";
import { useNavigate } from "react-router";

export const HeaderComponent = () => {
    const authorized = useRecoilValue(userAuthorized);
    const navigate = useNavigate();
    
    return (
        <>
        <Header>
            <Nav>
                <Button onClick={() => navigate("/info")}>Главная</Button>
                <NavBar>
                    <Button onClick={() => {authorized ? navigate("/profile") : navigate("/signIn")}}>{ authorized ? "Личный кабинет" : "Войти" }</Button>
                    <Button onClick={() => navigate("/cart")}>Корзина</Button>
                    <Button onClick={() => navigate("/about")}>О нас</Button>
                </NavBar>
            </Nav>
        </Header>
        </>
    )
}