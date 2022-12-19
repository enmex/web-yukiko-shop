import styled from "styled-components";

export const Container = styled.div`
    display: block;
    width: 100%;
    height: 100%;
`;

export const ProductPhoto = styled(Container)`
    width: 100%;
    height: 10%;
`;

export const ProductName = styled(Container)`
    width: 100%;
    text-align: left;
`;

export const ProductDescription = styled(Container)`
    width: 100%;
    text-align: left;
    border-radius: 4px;
`;

export const ProductPhotoEditButton = styled.button`
    width: 100%;
    height: 30%;
    background-color: transparent;
`;