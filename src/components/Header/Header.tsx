import { useRecoilValue } from "recoil";
import { userAuthorized } from "../../app/states/User.state"
import { Button, Header, Logo, LogoButton, Nav, NavBar } from "./Styles";
import { useNavigate } from "react-router";

export const HeaderComponent = () => {
    const authorized = useRecoilValue(userAuthorized);
    const navigate = useNavigate();
    
    return (
        <>
        <Header>
            <Nav>
                <LogoButton>
                    <Logo />
                </LogoButton>
                <NavBar>
                    <Button onClick={
                        () => {authorized ? navigate("/profile") : navigate("/signIn")}
                    }>{ authorized ? "Личный кабинет" : "Войти" }</Button>
                </NavBar>
            </Nav>
        </Header>
        </>
    )
}