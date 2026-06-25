import { createContext, useEffect, useState } from "react";
import { addToCart, getCart } from '../api/cartApi';
import { updateCartQuantity, removeCartItem } from "../api/cartApi";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    // MOVE OUTSIDE
    const fetchCart = async () => {
        try {
            setLoading(true);

            const data = await getCart();

            setCart(data?.items || []);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const clearCart = () => {
        setCart([]);
    }

    const addtocart = async (item) => {
        try {

            await addToCart({
                itemId: item._id,
                dishName: item.dishName,
                price: item.price,
                image: item.image,
                quantity: 1
            });

            fetchCart();

        } catch (err) {
            console.log(err);
        }
    };

    const plusItem = async (id, quantity) => {
        try {

            await updateCartQuantity(id, quantity + 1);

            fetchCart();

        } catch (error) {
            console.log(error);
        }
    };

    const minusItem = async (id, currentQuantity) => {
        try {

            if (currentQuantity <= 1) return;

            await updateCartQuantity(id, currentQuantity - 1);

            fetchCart();

        } catch (err) {
            console.log(err);
        }
    };

    const deleteItem = async (id, setOpen) => {
        try {

            const updatedcart = await removeCartItem(id);

            if (updatedcart.items.length === 0) {
                setOpen(false);
            }

            fetchCart();

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <CartContext.Provider
            value={{
                addtocart,
                fetchCart,
                cart,
                plusItem,
                minusItem,
                deleteItem,
                loading,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};