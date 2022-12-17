import styled from "styled-components";

export const Container = styled.div`
    width: 50%;
    height: 100%;
    display: block;
`;

export const SearchContainer = styled.div`
    display: flex;
    width: 100%;
    height: 10%;
`;

export const SearchInput = styled.input`
    width: 90%;
    border: 5px solid pink;
`;

export const SearchButton = styled.button`
    width: 5%;
    padding: 1em;
    background-color: lime;
`;

export const Button = styled.button``;

export const ProductList = styled.div`
    display: block;
    flex-direction: row;
`;

export const ProductEntry = styled.div`
    width: 100%;
    padding: 2%;
    border: 3px solid black;
`;