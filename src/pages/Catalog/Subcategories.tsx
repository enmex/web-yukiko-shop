import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useGetCategoryQuery } from "../../app/store/category/category.api";
import { setCategoryName } from "../../app/store/category/category.slice";
import { useEffect } from "react";

export const Subcategories = () => {
    const dispatch = useAppDispatch();
    const currentCategory = useAppSelector(state => state.category);
    const auth = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    const {data: category} = useGetCategoryQuery(currentCategory.name);

    useEffect(() => {
        const splits = window.location.href.split('/');
        const category = splits[splits.length - 1];

        dispatch(setCategoryName(category));
    });

    const onClickCategory = (categoryName: string) => {
        try {
            dispatch(setCategoryName(categoryName));
            navigate("/catalog/" + categoryName);   
        } catch (e) {
            const message = e instanceof Error ? e.message : "unknown error";
            console.log(message);
        }
    }

    if (!category?.children || category.children.length === 0) {
        const productList = category?.products || category?.products.length === 0
             ? "Товаров нет, милорд"
             : category?.products.map((product) => {
                return <div className="container">{ product.name }</div>
             });
        return (
            <>
            <div>
                Тут должен быть список товаров
                {
                    auth.accessType === "ADMIN"
                    ? (<button onClick={() => navigate("/products/edit")}>Добавить товар</button>)
                    : (<></>)
                }
            </div>
            </>
        );
    }

    return (
        <>
        <div className="container justify-center">
            <div className="flex justify-around p-4">
                {category.children.map((category) => {
                    return <button className="bg-red-500" key={category.name} onClick={() => onClickCategory(category.name)}>{category.name}</button>;
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