import { Menu } from "antd";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../app/store";
import { Header } from "antd/es/layout/layout";

export const NavBar = () => {
    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth);
    
    return (
        <>
        <Header>
            <Menu theme="dark" mode="horizontal" selectable={false}>
                <Menu.Item onClick={() => navigate("/")} key={1}>Главная</Menu.Item>
                {
                    auth.isAuthorized
                        ? (<Menu.Item onClick={() => navigate("/profile")} key={2}>Профиль</Menu.Item>)
                        : (<Menu.Item onClick={() => navigate("/signIn")} key={2}>Войти</Menu.Item>)
                }
                <Menu.Item onClick={() => navigate("/catalog")} key={3}>Каталог</Menu.Item>
            </Menu>
        </Header>
        </>
    );
}