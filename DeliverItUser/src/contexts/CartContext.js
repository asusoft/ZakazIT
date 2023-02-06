import React, { Children, createContext, useContext, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Cart, CartItem, Sizes } from "../models";
import { useAuthContext } from "./AuthContext";

const CartContext = createContext({});

const CartContextProvider = ({ children }) => {
    const { dbUser } = useAuthContext();

    const [restaurant, setRestaurant] = useState(null);
    const [cart, setCart] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const total = cartItems.reduce(
        (sum, cartItem) => sum + cartItem.price, 0
    )

    React.useEffect(() => {
        DataStore.query(Cart, (crt) => crt.and(crt => [
            crt.restaurantID.eq(restaurant.id),
            crt.userID.eq(dbUser.id)
        ])).then(carts => setCart(carts[0]));
    }, [dbUser, restaurant])

    React.useEffect(() => {
        if (cart) {
            DataStore.query(CartItem, (ci) =>
                ci.cartID.eq(cart.id))
                .then(setCartItems)
        }
    }, [cart])

    const addDishToCart = async (dish, size_id, quantity) => {
        // get existing cart or create new one
        let theCart = cart || await createNewCart();

        const size = await DataStore.query(Sizes, size_id);
        let sizePrice = size.price || 0;
        const price = sizePrice * quantity;

        const newDish = await DataStore.save(
            new CartItem({
                quantity,
                Dish: dish,
                cartID: theCart.id,
                sizeID: size_id,
                price: price
            })
        );
        setCartItems([...cartItems, newDish]);

        // Check if a cart item with the given size is already added

        {/* const existingCartItem = await DataStore.query(CartItem, (ci) => ci.and(ci => [
            ci.cartID.eq(theCart.id),
            ci.sizeID.eq(size_id)
        ])).then(ci => ci[0]);

        console.log(totalPrice)
        // If a cart item with the given size already exists, update the quantity
        if (existingCartItem) {
            let newQuantity = quantity
            await DataStore.save(
                CartItem.copyOf(existingCartItem, (updated) => {
                    updated.quantity = newQuantity;
                })
            );
        } else {
            // add item to cart
            const newDish = await DataStore.save(
                new CartItem({
                    quantity,
                    Dish: dish,
                    cartID: theCart.id,
                    sizeID: size_id
                })
            );
            setCartItems([...cartItems, newDish]);
        } */}
    };

    const createNewCart = async () => {
        const newCart = DataStore.save(
            new Cart({
                userID: dbUser.id,
                restaurantID: restaurant.id
            })
        )
        setCart(newCart);
        return newCart
    }

    return (
        <CartContext.Provider
            value={{
                addDishToCart,
                setRestaurant,
                cart,
                cartItems,
                restaurant,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;

export const useCartContext = () => useContext(CartContext);