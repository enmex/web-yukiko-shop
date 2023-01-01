import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { CartProductItem } from "../../components/Item/CartProductItem";
import { Navbar } from "../../components/Navbar/Navbar";
import { translit } from "../../utils/translit";
import { removeAllCartProducts, removeCartProduct } from "../../app/store/cart/cart.slice";
import { useClearCartMutation, useDeleteProductFromCartMutation } from "../../app/store/cart/cart.api";
import { AuthState } from "../../app/store/auth/auth.types";

export const Cart = (
    props: {
        auth: AuthState
    }
) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const cart = useAppSelector(state => state.persistedReducer.cart);
    const [clearCart] = useClearCartMutation();
    const [deleteProduct] = useDeleteProductFromCartMutation();

    const onCartClear = () => {
        dispatch(removeAllCartProducts());

        if (props.auth.isAuthorized && cart.products.length > 0) {
            clearCart();
        }
    }

    const onProductDelete = (productID: string) => {
        dispatch(removeCartProduct(productID));
        deleteProduct(productID);
    }

    return (
        <>
        <div className="flex flex-col">
            <Navbar auth={props.auth} />
            <div className="justify-center p-4">
                {cart.products.length ? (
                    cart.products.map(product => ((
                        <CartProductItem onDelete={() => onProductDelete(product.productID)} onClick={() => navigate("/products/" + translit(product.name))} key={product.name} product={{
                            productID: product.productID,
                            name: product.name,
                            price: product.price,
                            quantity: product.quantity,
                            photoUrl: product.photoUrl
                        }} />
                    ))))
                     : 
                    (
                        <div className="flex justify-center">
                            <h1 className="font-bold text-stone-700 text-[3rem]">Корзина пустая</h1>
                        </div>
                    )
                }
            </div>
            {cart.products.length > 0 && (
                <>
                <div className="text-end mr-5">
                    <h1 className="text-cyan-700 text-[3rem]">Итого: {cart.totalPrice}</h1>
                </div>
                <div className="flex justify-start ml-10 m-4">
                    <button 
                        className="bg-black p-4 rounded-lg font-sans text-white transition-all hover:bg-red-600" 
                        onClick={onCartClear}>Очистить корзину
                    </button>
                </div>
                </>
            )}        
        </div>
        </>
    );
}