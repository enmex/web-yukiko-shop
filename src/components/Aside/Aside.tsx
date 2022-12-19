import React from "react";
import { Aside } from "./Styles";

export const AsideComponent = (props: {
    children: JSX.Element[]
}) => {
    return (
        <>
        <Aside>
            { props.children }
        </Aside>
        </>
    );
}