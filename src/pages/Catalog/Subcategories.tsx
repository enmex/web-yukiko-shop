import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useGetCategoryQuery } from "../../app/store/category/category.api";
import { setCategory } from "../../app/store/category/category.slice";
import { setProductId } from "../../app/store/product/product.slice";
import { Button, Layout } from "antd";
import { CategoryButton } from "../../components/Button/CategoryButton";
import { ProductButton } from "../../components/Button/ProductButton";
import { Navbar } from "../../components/Navbar/Navbar";
import { Product } from "../../app/types/Product";
import { translit } from "../../utils/translit";
import { Category } from "../../app/types/Category";

export const Subcategories = () => {
    const dispatch = useAppDispatch();
    const currentCategory = useAppSelector(state => state.category);
    const auth = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    const {data: category} = useGetCategoryQuery(currentCategory.id, {
        skip: currentCategory.id.length === 0
    });

    const onClickCategory = (category: Category) => {
        dispatch(setCategory(category.id));
        navigate("/catalog/" + translit(category.name));   
    }

    const onClickProduct = (product: Product) => {
        try {
            dispatch(setProductId(product.id));
            navigate('/products/' + translit(product.name));
        } catch (e) {
            const message = e instanceof Error ? e.message : "unknown error";
            console.log(message);
        }           
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
                <Navbar />
                <Layout className="flex justify-center">
                    {productList}
                </Layout>
                {
                    auth.accessType === "ADMIN"
                    ? (<button onClick={() => navigate("/products/edit")}>Добавить товар</button>)
                    : (<></>)
                }
            </Layout>
            </>
        );
    }

    return (
        <>
        <Layout className="container justify-center">
            <Layout className="flex justify-around p-4">
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
                auth.accessType === "ADMIN"
                ? (<Button className="bg-blue-500" onClick={() => navigate("/categories/create")}>Создать категорию</Button>)
                : (<></>)
            }
        </Layout>
        </>
    );
}