import { useNavigate } from "react-router";
import { useAppDispatch } from "../../app/store";
import { useGetCategoryQuery } from "../../app/store/category/category.api";
import { setCategory } from "../../app/store/category/category.slice";
import { Button, Layout } from "antd";
import { CategoryButton } from "../../components/Button/CategoryButton";
import { ProductButton } from "../../components/Button/ProductButton";
import { Navbar } from "../../components/Navbar/Navbar";
import { Product } from "../../app/types/Product";
import { translit } from "../../utils/translit";
import { Category } from "../../app/types/Category";
import { AccessType, AuthState } from "../../app/store/auth/auth.types";
import { useGetAccessTypeQuery } from "../../app/store/auth/auth.api";
import { NotFound } from "../404";

export const Subcategories = (
    props: {
        auth: AuthState
    }
) => {
    const dispatch = useAppDispatch();
    const splits = window.location.href.split("/");
    const categoryID = splits[splits.length - 2];
    const {data: accessType} = useGetAccessTypeQuery();
    const navigate = useNavigate();

    const {isError, data: category} = useGetCategoryQuery(categoryID, {
        skip: categoryID.length === 0
    });

    if (isError) {
        return (
            <>
            <NotFound />
            </>
        );
    }

    const onClickCategory = (category: Category) => {
        dispatch(setCategory(category.id));
        navigate("/catalog/" + category.id + "/" + translit(category.name));
    }

    const onClickProduct = (product: Product) => {
        navigate("/products/" + product.id + "/" + translit(product.name));          
    }

    if (!category?.children || category.children.length === 0) {
        const productList = !category?.products || category?.products.length === 0
             ? "Товаров нет, милорд"
             : category?.products.map((product) => {
                return <ProductButton
                        key={product.id} 
                        buttonText={product.name}
                        photoUrl={product.photoUrl}
                        onClick={() => onClickProduct(product)}
                        />
             });
        return (
            <>
            <Layout>
                <Navbar auth={props.auth}/>
                <Layout className="flex flex-col justify-around items-center flex-wrap">
                    {productList}
                </Layout>
                {
                    accessType === AccessType.ADMIN
                    && (<button onClick={() => navigate("/products/edit")}>Добавить товар</button>)
                }
            </Layout>
            </>
        );
    }

    return (
        <>
        <Layout>
            <Navbar auth={props.auth} />
            <Layout className="flex flex-col justify-around flex-wrap">
                {category.children.map((category) => {
                    return <CategoryButton 
                        key={category.id} 
                        buttonText={category.name}
                        photoUrl={category.photoUrl}
                        onClick={() => onClickCategory(category)}
                    />;
                })}
            </Layout>
            {
                accessType === AccessType.ADMIN
                && (<Button className="bg-blue-500" onClick={() => navigate("/categories/create")}>Создать категорию</Button>)
            }
        </Layout>
        </>
    );
}