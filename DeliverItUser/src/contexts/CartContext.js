import React, { createContext, useContext, useState } from "react";
import { useAuthContext } from "./AuthContext";

import { db } from "../../config";

const CartContext = createContext({});

const CartContextProvider = ({ children }) => {
    const { dbUser } = useAuthContext();

    const [restaurant, setRestaurant] = useState(null);
    const [cart, setCart] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const dbUserID = dbUser?.id
    const cartRestaurantID = restaurant?.id

    const total = cartItems.reduce(
        (sum, cartItem) => sum + cartItem.price, 0
    )


    React.useEffect(() => {
        setCart(null)
        if (dbUserID && cartRestaurantID) {
            db.collection("Cart")
                .where("restaurantID", "==", restaurant.id)
                .where("userID", "==", dbUser?.id)
                .onSnapshot((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const cartData = doc.data();
                        const cartObject = { ...cartData };
                        setCart(cartObject)
                    });
                }
                );
        }
    }, [dbUser, restaurant])

    React.useEffect(() => {
        setCartItems([])
        if (cart) {
            db.collection("CartItem").where("cartID", "==", cart.id)
                .onSnapshot((querySnapshot) => {
                    const cartItemList = [];
                    querySnapshot.forEach((doc) => {
                        const itemID = doc.id;
                        const item = doc.data()
                        cartItemList.push({ ...item, id: itemID.toString() });
                    });
                    setCartItems(cartItemList)
                });
        }
    }, [cart])

    const addDishToCart = async (dish, size, quantity) => {
        try {
            // get existing cart or create new one
            let theCart = cart || await createNewCart();

            let sizePrice = size.price || 0;
            const price = sizePrice * quantity;

            const cartItemRef = db.collection('CartItem').doc();
            const dishRef = db.collection('Dish').doc(dish.id);

            const newCartItem = {
                quantity: quantity,
                dish: dishRef,
                cartID: theCart.id,
                sizeID: size.id,
                price: price
            };

            await db.collection("CartItem").add({ ...newCartItem, id: cartItemRef.id })
            setCartItems([...cartItems, { ...newCartItem, id: cartItemRef.id }]);

        } catch (error) {
            alert(error.message)
        }
    };

    const createNewCart = async () => {
        const cartRef = db.collection('Cart').doc();
        const newCart = {
            userID: dbUserID,
            restaurantID: cartRestaurantID
        };

        await db.collection("Cart").add({ ...newCart, id: cartRef.id })

        setCart({ ...newCart, id: cartRef.id });
        return { ...newCart, id: cartRef.id };
    };

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