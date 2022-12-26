import { Button } from "antd";
import { MouseEventHandler } from "react";

export const CategoryButton = (props: {
    onClick: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement>,
    photoUrl: string,
    buttonText: string
}) => {
    return (
        <>
        <Button onClick={props.onClick} className="flex w-[400px] h-[400px] justify-center">
            <img
                src={props.photoUrl}
                className="max-w-sm h-auto transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
                alt=""
            />
            <span className="absolute font-bold text-orange-600 text-[5rem]">{props.buttonText}</span>
        </Button>
        </>
    );
}