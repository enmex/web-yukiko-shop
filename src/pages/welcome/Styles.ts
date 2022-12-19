import styled from "styled-components";

export const Container = styled.div`
    min-height: 75%;
`;

export const CategoryList = styled.ul`
display: flex;
    flex-direction: column;
    gap: 1em;
    list-style-type: none;
    font-size: 1.5em;
`;

export const CategoryEntry = styled.li`
    text-align: center;
    border-radius: 10px;
    color: #333;
    cursor: pointer;
    line-height: 4em;
    transition: all 0.3s;
    color: #fff;

    &:hover {
        color: #000;
        background-color: #fff;
    }
`;