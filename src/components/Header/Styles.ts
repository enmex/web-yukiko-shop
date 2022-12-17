import styled from "styled-components";

export const Header = styled.header`
    display: flex;
    width: 100vw;
    height: 5vh;
    background-color: #8106A9;
    justify-content: center;
    align-items: center;
`;

export const NavBar = styled.nav`
    display: flex;
    width: 90%;
    justify-content: center;
    align-items: center;
`

export const Button = styled.button`
    font-size: 1em;
    padding: 0.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    border: none;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    cursor: pointer;
    background: transparent;
    transition: 0.5s;

    &:hover {
        border-top: none;
        border-bottom: none;
        background-color: #e9fb00;
    }   
`;

export const LogoButton = styled.a`
    background-color: #e9fb00;
    display: block;
    width: 10%;
`;

export const Nav = styled.div`
    display: flex;
    width: 70%;
`;
