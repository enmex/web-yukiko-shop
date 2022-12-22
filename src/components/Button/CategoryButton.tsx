import { FormEventHandler } from "react";

export const CategoryButton = (props: {
    children: string,
    onClick: FormEventHandler<HTMLFormElement>,
    photoUrl: string,
}) => {
    return (
        <>
        <form onClick={props.onClick} className="relative w-1/2 px-[10rem] cursor-pointer">
            <img src={props.photoUrl} className="flex object-contain hover:object-scale-down" alt="dummy"/>
            <button 
                className="flex" 
            >
                {props.children}
            </button>
        </form>
        </>
    );
}