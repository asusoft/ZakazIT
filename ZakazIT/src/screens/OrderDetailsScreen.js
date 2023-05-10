//import liraries
import React, { Component, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    ScrollView
} from "react-native";
import COLORS from "../../assets/constants/colors";
import icons from "../../assets/constants/icons";
import { SafeAreaView } from 'react-native-safe-area-context'
import { useOrderContext } from "../contexts/OrderContext";
import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../../config";

// create a component
const OrderdetailsScreen = ({ navigation, route }) => {
    const { order } = route.params;
    const { dbUser } = useAuthContext();

    const [orderItems, setOrderItems] = useState([])

    console.log(order)

    React.useEffect(() => {
        db.collection("OrderItems").where("orderID", "==", order.id)
        .onSnapshot((querySnapshot) => {
            const itemList = [];
            querySnapshot.forEach((doc) => {
                const itemID = doc.id;
                const item = doc.data()
                itemList.push({ ...item, id: itemID.toString() });
            });
            setOrderItems(itemList)
        });
    }, [order])

    function RenderHeader() {
        return (
            <View style={styles.Header}>
                {/* Back Button */}
                <Pressable
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: 35,
                        width: 35,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: COLORS.dark,
                        backgroundColor: COLORS.background
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.dark
                        }}
                    />
                </Pressable>

                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "600",
                        marginTop: 10
                    }}
                >
                    ORDER DETAILS
                </Text>

                <Pressable
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: 35,
                        width: 35,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: COLORS.dark,
                        backgroundColor: COLORS.background
                    }}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Image
                        source={icons.support}
                        style={{
                            width: 20,
                            height: 20
                        }}
                    />
                </Pressable>
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            {RenderHeader()}

            <View style={{ flex: 1 }}>
                {/* Info */}
                <ScrollView showsVerticalScrollIndicator={false} style={{
                    marginHorizontal: 10,
                    padding: 10, backgroundColor: COLORS.secondary,
                }}
                >
                    <View
                        style={{
                            borderBottomWidth: 0.2,
                            borderBottomColor: COLORS.grey,
                            paddingBottom: 15
                        }}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <View>
                                <Text style={{ right: 0, fontSize: 14, fontWeight: "600" }}>
                                    #23679290
                                </Text>
                                <Text style={{ fontSize: 16, fontWeight: "600", opacity: 0.6 }}>
                                    Jan 28, 20:37
                                </Text>
                            </View>

                            <Text style={{ position: "absolute", right: 0, fontSize: 16 }}>
                                {order.status}
                            </Text>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: 16, fontWeight: "600", opacity: 0.6 }}>
                                Deliverd to
                            </Text>
                            <Text style={{ right: 0, fontSize: 14, fontWeight: "600" }}>
                                {dbUser.address}
                            </Text>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: 14, fontWeight: "600", opacity: 0.6 }}>
                                Payment method
                            </Text>
                            <Text style={{ right: 0, fontSize: 14, fontWeight: "600" }}>
                                order.paymentMethod
                            </Text>
                        </View>
                    </View>

                    {/* Items */}

                    <View
                        style={{
                            borderBottomWidth: 0.2,
                            borderBottomColor: COLORS.grey,
                            paddingBottom: 15,
                            marginTop: 20
                        }}
                    >
                        {
                            orderItems.map((item, index) => {
                                return (
                                    <View key={index} style={{ flexDirection: "row", marginBottom: 10 }}>
                                        <View>
                                            <Text style={{ right: 0, fontSize: 14, fontWeight: "600" }}>
                                                {item.dish.name}
                                            </Text>
                                            <Text
                                                style={{ fontSize: 14, fontWeight: "600", opacity: 0.6 }}
                                            >
                                                {item.size.name} x {item.quantity}
                                            </Text>
                                        </View>

                                        <Text
                                            style={{ position: "absolute", right: 0, fontSize: 14 }}
                                        >
                                            ${item.price}
                                        </Text>
                                    </View>
                                )
                            })
                        }
                    </View>

                    {/* Bill */}

                    <View
                        style={{
                            borderBottomWidth: 0.2,
                            borderBottomColor: COLORS.grey,
                            paddingBottom: 15,
                            marginTop: 20
                        }}
                    >
                        <View style={{ flexDirection: "row", marginBottom: 10 }}>
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: "700", opacity: 0.6 }}>
                                    Sub total
                                </Text>
                            </View>

                            <Text style={{ position: "absolute", right: 0, fontSize: 16 }}>
                                $ {order.subTotal}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: 10 }}>
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: "700", opacity: 0.6 }}>
                                    Delivery Fee
                                </Text>
                            </View>

                            <Text style={{ position: "absolute", right: 0, fontSize: 16 }}>
                                $ {order.deliveryFee}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: 10 }}>
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: "700" }}>Paid</Text>
                            </View>

                            <Text
                                style={{
                                    position: "absolute",
                                    right: 0,
                                    fontSize: 16,
                                    fontWeight: "700"
                                }}
                            >
                                $ {order.total}
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Footer */}
                <Pressable style={styles.Footer}>
                    <Text
                        style={{ fontSize: 24, color: COLORS.light, fontWeight: "800" }}
                    >
                        {" "}
                        Order again
                    </Text>
                </Pressable>

            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    Header: {
        left: 0,
        right: 0,
        height: 85,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 10,
        justifyContent: "space-between"
    },
    Footer: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "center",
        padding: 20,
        alignItems: "center",
        bottom: 50,
        right: 30,
        left: 30,
        height: 80,
        backgroundColor: COLORS.primary,
        borderRadius: 20
    }
});

//make this component available to the app
export default OrderdetailsScreen;
