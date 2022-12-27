import { useAppSelector } from "../../app/store";
import { useState } from "react";

export const Navbar = () => {
    const auth = useAppSelector(state => state.persistedReducer.auth);
    const [hovered, setHovered] = useState(false);
    
    return (
        <>
        <header className="bg-gray-900 py-4">
            <div className="container mx-auto flex items-center justify-between px-4">
                <a onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} href="/" className="text-white hover:text-gray-400 focus:text-gray-400">
                    {
                        hovered ? (<img src="/logo64violet.png" alt="Yukiko Shop" className="transition-opacity h-14 w-14" />)
                         : (<img src="/logo64.png" alt="Yukiko Shop" className="transition-opacity h-14 w-14" />)
                    }
                </a>
                <nav className="flex items-center">
                    <a href={auth.isAuthorized ? "/profile" : "/signIn"} className="px-2 py-1 font-medium text-white hover:text-gray-400 focus:text-gray-400">{auth.isAuthorized ? "Профиль" : "Войти"}</a>
                    <a href="/catalog" className="px-2 py-1 font-medium text-white hover:text-gray-400 focus:text-gray-400">Каталог</a>
                </nav>
            </div>
        </header>
        </>
    );
}