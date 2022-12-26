import { Menu } from "antd";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../app/store";
import { MenuInfo } from "rc-menu/lib/interface";

export const Navbar = () => {
    const navigate = useNavigate();
    const auth = useAppSelector(state => state.auth);

    const data = auth.isAuthorized ? {
        onClick: () => navigate("/profile"),
        label: "Профиль"
    } : {
        onClick: () => navigate("/signIn"),
        label: "Войти"
    };

    const items = [
        {
            key: "main",
            label: "Главная"
        },
        {
            key: "catalog",
            label: "Каталог"
        },
        {
            key: "user",
            label: data.label
        }
    ];

    const onClick = (info: MenuInfo) => {
        switch (info.key) {
            case "main": 
                navigate("/");
                break;
            case "catalog":
                navigate("/catalog");
                break;
            case "user":
                data.onClick();
                break;
        }
    }
    
    return (
        <>
        <Menu className="flex justify-center bg-gradient-to-r from-gray-700 to-blue-500 text-purple-50" mode="horizontal" onClick={onClick} items={items} />
        </> 
    );
}