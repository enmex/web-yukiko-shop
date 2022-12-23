import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useGetCategoriesQuery } from "../../app/store/category/category.api";
import { setCategoryName } from "../../app/store/category/category.slice";
import { Loading } from "../../components/Loading/Loading";
import { Button, Form, Layout } from "antd";
import { NavBar } from "../../components/NavBar/Navbar";
import { CategoryButton } from "../../components/Button/CategoryButton";

export const Catalog = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);

    const {isLoading, data: mainCategories} = useGetCategoriesQuery({
        main: true,
        leaf: null,
    });
    const navigate = useNavigate();

    const onClickCategory = (categoryName: string) => {
        dispatch(setCategoryName(categoryName));
        navigate("/catalog/" + categoryName);   
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
            <Layout>
                <NavBar />
                <Form className="flex justify-center">
                    <Form.Item>
                        <h1>Каталог пуст, милорд</h1>
                        <h2>Советую добавить категорий</h2>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={() => navigate("/categories/create")}>Создать категорию</Button>
                    </Form.Item>
                </Form>
            </Layout>
            </>
        );
    }

    return (
        <>
        <Layout>
            <NavBar />
                <div className="flex justify-center p-4">
                    {mainCategories.map((category) => {
                        return <CategoryButton onClick={() => onClickCategory(category.name)} photoUrl={category.photoUrl} />
                    })}
                </div>
                {
                    auth.accessType === "ADMIN"
                    ? (<Button onClick={() => navigate("/categories/create")}>Создать категорию</Button>)
                    : (<></>)
                }
        </Layout>
        </>
    );
}