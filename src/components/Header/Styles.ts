import styled from "styled-components";

export const Header = styled.header`
    display: flex;
    padding: 1em;
    background-color: #e6399b;
    justify-content: center;
    align-items: center;
`;

export const NavBar = styled.nav`
    display: flex;
    width: 90%;
    justify-content: center;
    align-items: center;
`;

export const Button = styled.button`
    color: #fff;
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
        background-color: #8106a9;
        color: #000;
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
