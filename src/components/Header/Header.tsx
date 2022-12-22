import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";

export const HeaderComponent = () => {
    const navigate = useNavigate();
    
    return (
        <>
        <header className="flex py-2 px-4 h-auto mb-2 w-screen mx-auto justify-center bg-black text-white">
            <div className="flex px-10 w-1/2">
                <button className="flex p-4 w-fit h-12 bg-red-400" onClick={() => navigate("/")}>Главная</button>
                <nav className="flex justify-center px-10">
                    <button className="border mx-4 hover:bg-white hover:text-black transition" onClick={() => navigate("/catalog")}>Каталог</button>
                    <button className="border mx-4 hover:bg-white hover:text-black transition" onClick={() => navigate("/cart")}>Корзина</button>
                    <button className="border mx-4 hover:bg-white hover:text-black transition" onClick={() => navigate("/about")}>О нас</button>
                </nav>
                <div className="">
                    <button onClick={() => navigate("/profile")}>
                        <FontAwesomeIcon icon={faUser} size="2x" />
                    </button>
                    <button onClick={() => navigate("/cart")}>
                        <FontAwesomeIcon icon={faCartShopping} size="2x" />
                    </button>
                </div>
            </div>
        </header>
        </>
    )
}