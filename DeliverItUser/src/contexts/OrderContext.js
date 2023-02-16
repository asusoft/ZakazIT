import React, { createContext, useContext, useState } from "react";
import { useAuthContext } from "./AuthContext";
import firebase from "firebase";

import { db } from "../../config";
import { useCartContext } from "./CartContext";

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
    const { dbUser } = useAuthContext();
    const { restaurant, total, cartItems, cart } = useCartContext();
    const dbUserID = dbUser?.id

    const [orders, setOrders] = useState(null);

    React.useEffect(() => {
        if (dbUserID) {

            db.collection("Orders")
                .where("userID", "==", dbUserID)
                .onSnapshot(snapshot => {
                    snapshot.docs.map(doc => 
                        setOrders(snapshot.docs.map(doc => doc.data()))
                    );
                   
                });
        }

    }, [dbUser])

    const createOrder = async (isDelivery) => {
        const orderRef = db.collection('Orders').doc();

        const newOrder = {
            userID: dbUserID,
            restaurant: restaurant,
            subTotal: total,
            total: isDelivery ? restaurant.deliveryFee + total : total,
            deliveryFee: isDelivery ? restaurant.deliveryFee : 0,
            status: 0,
            userID: dbUserID,
            id: orderRef.id,
        };

        await db.collection("Orders").doc(orderRef.id).set({ ...newOrder })

        // add all basketDishes to the order

        cartItems.map(async (item) => {
            const orderItemRef = db.collection('OrderItems').doc();

            const newOrderItem = {
                quantity: item.quantity,
                dish: item.dish,
                orderID: orderRef.id,
                size: item.size,
                price: item.price,
                id: orderItemRef.id
            };

            await db.collection("OrderItems").doc(orderItemRef.id).set({ ...newOrderItem })
            await db.collection("CartItem").doc(item.id).delete()
        })

        // delete basket
        await db.collection("Cart").doc(cart.id).delete();

        setOrders([...orders, newOrder]);

        return newOrder;
    }

    return (
        <OrderContext.Provider
            value={{
                orders,
                createOrder,
            }}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);