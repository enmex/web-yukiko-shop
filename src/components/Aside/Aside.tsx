import React from "react";
import { Aside, Container } from "./Styles";

export const AsideComponent = (props: {
    children: JSX.Element[]
}) => {
    return (
        <>
        <Container>
            <Aside>
                { props.children }
            </Aside>
        </Container>
        </>
    );
}