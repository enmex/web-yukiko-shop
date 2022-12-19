import { useEffect, useState } from "react";
import { ProductList } from "../Cart/Styles";
import { Button, Container, ProductEntry, SearchButton, SearchContainer, SearchInput } from "./Styles";
import { errorState } from "../../app/states/Error.state";
import { useRecoilState } from "recoil";
import { GetProductsPayload, productService } from "../../app/api/Product";
import { useNavigate } from "react-router";
import { productState } from "../../app/states/Product.state";

export const Catalog = () => {
    const [, setErr] = useRecoilState(errorState);
    const [currentProduct, setCurrentProduct] = useRecoilState(productState);
    const [products, setProducts] = useState<GetProductsPayload>({
        products: [],
    });

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const apiResponse = await productService.getProducts();
                setProducts(apiResponse);
            } catch (e) {
                const message = e instanceof Error ? e.message : "unknown error";
                setErr(message);
            }
        })()
    });

    return (
        <>
        <Button onClick={() => {navigate("/products/edit")}}>Добавить товар</Button>
        <Container>
            <SearchContainer>
                <SearchInput />
                <SearchButton />
            </SearchContainer>
            <ProductList>
                {products.products.map((product) => (
                    <ProductEntry onClick={() => {
                        setCurrentProduct(product);
                        navigate("/catalog/" + product.name);
                }}>{ product.name }</ProductEntry>
                ))}
            </ProductList>
        </Container>
        </>
    );
}