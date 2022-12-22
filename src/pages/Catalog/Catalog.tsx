import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useGetCategoriesQuery } from "../../app/store/category/category.api";
import { setCategoryName } from "../../app/store/category/category.slice";
import { CategoryButton } from "../../components/Button/CategoryButton";
import { Loading } from "../../components/Loading/Loading";
import { getRoles } from "@testing-library/react";

export const Catalog = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);

    const {isLoading, isError, data: mainCategories} = useGetCategoriesQuery({
        main: true,
        leaf: null,
    });
    const navigate = useNavigate();

    const onClickCategory = (categoryName: string) => {
        try {
            dispatch(setCategoryName(categoryName));
            navigate("/catalog/" + categoryName);   
        } catch (e) {
            const message = e instanceof Error ? e.message : "unknown error";
            console.log(message);
        }
    }

    if (isLoading) {
        return (
            <>
            <Loading />
            </>
        );
    }

    if (!mainCategories || !mainCategories.length) {
        return (
            <>
            <h1>Каталог пуст, милорд</h1>
            <h2>Советую добавить категорий</h2>
            <button className="bg-slate-500" onClick={() => navigate("/categories/create")}>Создать категорию</button>
            </>
        );
    }

    return (
        <>
        <div className="block justify-center">
            <div className="flex justify-center p-4">
                {mainCategories.map((category) => {
                    return <CategoryButton key={category} photoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOaVhh5NgLiJdQFdq1jEXPGW6B5eSXD2IRaRO4gQxk1zHp_vbzb47CQ_tEuBQ0bm-y_cE&usqp=CAU" onClick={() => onClickCategory(category)}>{category}</CategoryButton>;
                })}
            </div>
            {
                auth.accessType === "ADMIN"
                 ? (<button className="bg-blue-500" onClick={() => navigate("/categories/create")}>Создать категорию</button>)
                 : (<></>)
            }
        </div>
        </>
    );
}