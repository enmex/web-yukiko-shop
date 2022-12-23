import { Button } from "antd";
import { MouseEventHandler } from "react";

export const CategoryButton = (props: {
    onClick: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement>,
    photoUrl: string,
}) => {
    return (
        <>
        <Button onClick={props.onClick} className="flex flex-wrap justify-center">
            <img
                src={props.photoUrl}
                className="max-w-sm h-auto transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
                alt=""
            />
        </Button>
        </>
    );
}