import styled from "styled-components";

export const Container = styled.aside`
    padding: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
    border: 1px solid black;
`;

export const Aside = styled(Container)`
    border: 1px solid pink;
    width: 25%;
`;