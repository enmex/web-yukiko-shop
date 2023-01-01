import { useNavigate } from "react-router";
import { useAppDispatch } from "../../app/store";
import { useGetCategoriesQuery } from "../../app/store/category/category.api";
import { setCategory } from "../../app/store/category/category.slice";
import { Button, Layout } from "antd";
import { Navbar } from "../../components/Navbar/Navbar";
import { CategoryButton } from "../../components/Button/CategoryButton";
import { CategoryEnum } from "../../app/store/category/category.types";
import { translit } from "../../utils/translit";
import { useGetAccessTypeQuery } from "../../app/store/auth/auth.api";
import { AccessType, AuthState } from "../../app/store/auth/auth.types";
import { Loading } from "../../components/Loading/Loading";

export const Catalog = (
    props: {
        auth: AuthState
    }
) => {
    const dispatch = useAppDispatch();
    const {isLoading, data: accessType} = useGetAccessTypeQuery();

    const {data: mainCategories} = useGetCategoriesQuery({
        type: CategoryEnum.ROOT
    });
    const navigate = useNavigate();

    const onClickCategory = (category: {
        id: string,
        name: string,
        photoUrl: string
    }) => {
        dispatch(setCategory(category.id));
        navigate("/catalog/" + category.id + "/" + translit(category.name));   
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
                <Navbar auth={props.auth}/>
                <Layout className="grid justify-center">
                    <Layout className="flex m-4 mb-2 flex-col justify-center">
                        <h1>Каталог пуст, милорд</h1>
                        {accessType === AccessType.ADMIN && (
                            <>
                            <h2>Добавь категорий</h2>
                            <Button onClick={() => navigate("/categories/create")}>Создать категорию</Button>
                            </>
                        )}
                    </Layout>
                </Layout>
            </Layout>
            </>
        );
    }

    return (
        <>
        <Layout>
            <Navbar auth={props.auth}/>
            <Layout className="grid justify-center w-full p-5">
                {mainCategories.map((category) => {
                    return <CategoryButton
                        key={category.id} 
                        onClick={() => onClickCategory(category)} 
                        photoUrl={category.photoUrl} 
                        buttonText={category.name}
                    />
                })}
            </Layout>
            {
                accessType === AccessType.ADMIN &&
                (<Button onClick={() => navigate("/categories/create")}>Создать категорию</Button>)
            }
        </Layout>
        </>
    );
}