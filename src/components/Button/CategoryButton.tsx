import { Button } from "antd";
import { MouseEventHandler } from "react";

export const CategoryButton = (props: {
    onClick: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement>,
    photoUrl: string,
    buttonText: string
}) => {
    const style = "flex w-[400px] h-[400px] justify-center bg-[url(" + props.photoUrl + ")]";
    return (
        <>
        <Button onClick={props.onClick} className={style} >
            <span className="absolute font-bold text-orange-600 text-[3rem]">{props.buttonText}</span>
        </Button>
        </>
    );
}