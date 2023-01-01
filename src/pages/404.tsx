export const NotFound = () => {
    return (
        <>
        <div className="flex min-h-screen flex-col justify-center items-center bg-gradient-to-b from-purple-500 to-violet-500 text-white">
            <h1 className="font-bold text-[5rem]">СТРАНИЦА НЕ НАЙДЕНА</h1>
            <h2 className="font-bold text-[5rem]">404</h2>
            <a className="text-[3rem] bg-black px-4 transition-all hover:border-x-orange-50 hover:text-violet-500" href="/">Вернуться</a>
        </div>
        </>
    );
}