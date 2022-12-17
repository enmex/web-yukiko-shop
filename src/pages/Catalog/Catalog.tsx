import { ProductList } from "../Cart/Styles";
import { Container, ProductEntry, SearchButton, SearchContainer, SearchInput } from "./Styles";

export const Catalog = () => {
    return (
        <>
        <Container>
            <SearchContainer>
                <SearchInput />
                <SearchButton />
            </SearchContainer>
            <ProductList>
                <ProductEntry>Товар 1</ProductEntry>
            </ProductList>
        </Container>
        </>
    );
}