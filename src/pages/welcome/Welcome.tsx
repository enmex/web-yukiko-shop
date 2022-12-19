import { useNavigate } from "react-router";
import { Aside } from "../../components/Aside/Styles";
import { CategoryEntry, CategoryList } from "./Styles";
import { useEffect, useState } from "react";
import { categoryService } from "../../app/api/Category";

export const Welcome = () => {
    const [mainCategories, setMainCategories] = useState<string[]>([]);
    const navigate = useNavigate();
 
    useEffect(() => { 
        categoryService.getMainCategories().then((response) => {
            setMainCategories(response.data);    
        })
    }, []);

    return (
        <>
        <Aside>
            <CategoryList>
                {mainCategories.map((category) => {
                    return <CategoryEntry onClick={() => navigate("/catalog/categories/" + category)}>{ category }</CategoryEntry>
                })}
            </CategoryList>
        </Aside>
        </>
    );
}