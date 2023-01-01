import { Button } from "antd";
import { MouseEventHandler } from "react";

export const CategoryButton = (props: {
    onClick: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement>,
    photoUrl: string,
    buttonText: string
}) => {
    return (
        <>
        <Button onClick={props.onClick} className="flex h-full items-end justify-center" >
            <img src={props.photoUrl} alt="Category" width="70%" height="70%" />
            <span className="absolute font-['Righteous', serif] font-bold text-white text-[7rem]">{props.buttonText}</span>
        </Button>
        </>
    );
}