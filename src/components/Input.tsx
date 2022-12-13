import { placeholder } from "@babel/types";

export const Input = (props: {
    placeholder: string,
    class: string,
    onUpdate: Function;
}) => {
    return (
        <></>
        //<input className={props.class} placeholder={props.placeholder} onchange={props.onUpdate}></input>
    );
}