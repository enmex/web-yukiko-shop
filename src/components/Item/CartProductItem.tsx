import { useDebounce } from "usehooks-ts"
import { useAppDispatch, useAppSelector } from "../../app/store";
import { CartProduct } from "../../app/types/CartProduct";
import { updateCartProductQuantity } from "../../app/store/cart/cart.slice";
import { useUpdateCartProductQuantityMutation } from "../../app/store/cart/cart.api";
import { useEffect } from "react";

export const CartProductItem = (
    props: {
        product: CartProduct
        onClick: () => void
        onDelete: () => void
    }
) => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.persistedReducer.auth);
    const debouncedValue = useDebounce(props.product.quantity, 500);
    const [updateQuantity] = useUpdateCartProductQuantityMutation();

    useEffect(() => {
        if (auth.isAuthorized) {
            updateQuantity({
                productID: props.product.productID,
                quantity: debouncedValue
            });
        }
    }, [debouncedValue]);

    const onIncrementClick = () => {
        dispatch(updateCartProductQuantity({
            productID: props.product.productID,
            name: props.product.name,
            price: props.product.price,
            photoUrl: props.product.photoUrl,
            quantity: props.product.quantity + 1,
        }));
    }

    const onDecrementClick = () => {
        dispatch(updateCartProductQuantity({
            productID: props.product.productID,
            name: props.product.name,
            price: props.product.price,
            photoUrl: props.product.photoUrl,
            quantity: props.product.quantity - 1,
        }));
    };

    return (
        <>
        <div className="flex flex-row justify-center">
            <button onClick={props.onDelete} className="justify-center align-middle transition-all rounded-lg hover:bg-slate-400">
                <img alt="trash-icon" src="trash.svg" className="w-[3rem] h-[3rem]"/>
            </button>
            <div onClick={props.onClick} className="flex w-1/2 justify-between m-2 p-2 flex-row rounded-md bg-black text-white cursor-pointer">
                <div className="flex w-1/3 justify-between">
                    <img
                    className="w-[100px] h-[100px]"
                    src={props.product.photoUrl}
                    alt={props.product.name}
                    />
                    <span className="px-4 text-[1.5rem]">{props.product.name}</span>
                    <span className="font-bold text-[2rem]">Цена: {props.product.price}</span>
                    <span>Количество: {props.product.quantity}</span>
                </div>
            </div>
            <div className="grid"> 
                <button
                    className="text-[2rem] px-4 text-black font-bold bg-white rounded-full transition-all hover:bg-slate-400" 
                    onClick={onIncrementClick}
                >
                    +
                </button>
                <button 
                    className="text-[2rem] px-4 text-black font-bold bg-white rounded-full transition-all hover:bg-slate-400" 
                    onClick={onDecrementClick}
                >
                    -
                </button>
            </div>
        </div>
        
        </>
    );
}