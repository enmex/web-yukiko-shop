import { useNavigate } from "react-router";

export const Welcome = () => {
    const navigate = useNavigate();

    return (
        <>
        <h1>Это главная страница, пока пустая, но все еще впереди</h1>
        <button onClick={() => navigate("/catalog")}>Перейти в каталог</button>
        </>
    );
}