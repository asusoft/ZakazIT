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
            // Check for existing cart item with the same size

            const snapshot = await db.collection("CartItem").where("size", "==", size).get();

            if (!snapshot.empty) {
                const itemRef = snapshot.docs[0].ref;
                const updatedQuantity = quantity;
                const updatedPrice = size.price * updatedQuantity;
                await itemRef.update({ quantity: updatedQuantity, price: updatedPrice });
            } else {
                let sizePrice = size.price || 0;
                const price = sizePrice * quantity;

                const cartItemRef = db.collection('CartItem').doc();
                let itemDish = {}
                await db.collection('Dish').doc(dish.id).get().then(dishDoc => {
                    if (dishDoc.exists) {
                        const itemDishID = dishDoc.id;
                        itemDish = { ...dishDoc.data(), id: itemDishID };
                    }
                });

                let itemSize = {}
                await db.collection('Sizes').doc(size.id).get().then(sizeDoc => {
                    if (sizeDoc.exists) {
                        const itemSizeID = sizeDoc.id;
                        itemSize = { ...sizeDoc.data(), id: itemSizeID };
                    }
                });

                const newCartItem = {
                    quantity: quantity,
                    dish: itemDish,
                    cartID: theCart.id,
                    size: itemSize,
                    price: price
                };

                await db.collection("CartItem").doc(cartItemRef.id).set({ ...newCartItem, id: cartItemRef.id })
                setCartItems([...cartItems, { ...newCartItem, id: cartItemRef.id }]);
            }
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

        await db.collection("Cart").doc(cartRef.id).set({ ...newCart, id: cartRef.id })

        setCart({ ...newCart, id: cartRef.id });
        return { ...newCart, id: cartRef.id };
    };

    const onPlus = async (cartItem_ID, size) => {

        const snapshot = await db.collection("CartItem").where("id", "==", cartItem_ID).get();

        if (!snapshot.empty) {
            const itemRef = snapshot.docs[0].ref;
            const itemQuantity = snapshot.docs[0].data().quantity;
            if(itemQuantity < 99) {
                const updatedQuantity = itemQuantity + 1;
                const updatedPrice = size.price * updatedQuantity;
                await itemRef.update({ quantity: updatedQuantity, price: updatedPrice });
            }
        }
    }

    const onMinus = async (cartItem_ID, size) => {

        const snapshot = await db.collection("CartItem").where("id", "==", cartItem_ID).get();

        if (!snapshot.empty) {
            const itemRef = snapshot.docs[0].ref;
            const itemQuantity = snapshot.docs[0].data().quantity;

            if(itemQuantity > 1) {
                const updatedQuantity = itemQuantity - 1;
                const updatedPrice = size.price * updatedQuantity;
                await itemRef.update({ quantity: updatedQuantity, price: updatedPrice });
            }
        }
    }

    const onRemove = async (cartItem_ID) => {
        await db.collection("CartItem").doc(cartItem_ID).delete()

        let newLength = cartItems.length -1;
        if(newLength < 1){
            await db.collection("Cart").doc(cart.id).delete()
        }
    }

    return (
        <CartContext.Provider
            value={{
                addDishToCart,
                setRestaurant,
                cart,
                cartItems,
                restaurant,
                total,
                onPlus,
                onMinus, 
                onRemove
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;

export const useCartContext = () => useContext(CartContext);