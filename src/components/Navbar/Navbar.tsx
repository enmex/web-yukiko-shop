import { useState } from "react";
import { AuthState } from "../../app/store/auth/auth.types";

export const Navbar = (
    props: {
        auth: AuthState
    }
) => {
    const [hovered, setHovered] = useState(false);
    
    return (
        <>
        <header className="bg-black text-black py-4">
            <div className="container mx-auto flex items-center justify-between px-4">
                <a onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} href="/">
                    <img 
                        src={hovered ? "/logo64violet.png" : "/logo64.png" }
                        alt="Yukiko Shop" 
                        className="h-14 w-14" 
                    />
                </a>
                <nav className="flex items-center">
                    <a href={props.auth.isAuthorized ? "/profile" : "/signIn"} className="px-2 py-1 font-medium text-white hover:text-gray-400 focus:text-gray-400">{props.auth.isAuthorized ? "Профиль" : "Войти"}</a>
                    <a href="/catalog" className="px-2 py-1 font-medium text-white hover:text-gray-400 focus:text-gray-400">Каталог</a>
                    <a href="/cart" className="px-2 py-1 font-medium text-white hover:text-gray-400 focus:text-gray-400">Корзина</a>
                </nav>
            </div>
        </header>
        </>
    );
}