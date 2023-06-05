//import liraries
import React, { Component, useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    ScrollView,
    FlatList,
    SafeAreaView
} from "react-native";
import COLORS from "../../assets/constants/colors";
import icons from "../../assets/constants/icons";
import profile from "../../assets/constants/profile";
import { useAuthContext } from "../contexts/AuthContext";

import { useOrderContext } from "../contexts/OrderContext";

// create a component
const CheckoutScreen = ({ navigation, route }) => {
    const { dbUser } = useAuthContext();
    const { restaurant, total } = route.params
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("1");
    const [isDelivery, setIsDelivery] = useState(true);
    const [isSuccess, setIsSuccess] = useState(true);

    const { createOrder } = useOrderContext()

    const subTotal = total;
    const deliveryFee = isDelivery ? restaurant.deliveryFee : 0;
    const finalTotal = subTotal + deliveryFee


    const ref = useRef();
    React.useEffect(() => {
        ref.current?.scrollToIndex({
            index: parseInt(selectedPaymentMethod) - 1,
            animated: true,
            viewPosition: 0.5
        });
    }, [selectedPaymentMethod])

    const handlePayment = async () => {
        await createOrder(isDelivery)
        navigation.navigate("Payment", { isSuccess: isSuccess, total: finalTotal });
    };

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
                        marginTop: 10,
                        marginLeft: "25%"
                    }}
                >
                    CHECKOUT
                </Text>
            </View>
        );
    }

    const DeliveryMethod = () => {
        function RenderDeliver() {
            return (
                <Pressable
                    onPress={() => setIsDelivery(true)}
                    style={{
                        backgroundColor: COLORS.secondary,
                        opacity: isDelivery ? 1 : 0.5,
                        borderWidth: 2,
                        borderColor: isDelivery ? COLORS.primary : COLORS.background,
                        ...styles.deliveryMethod
                    }}
                >
                    <Image
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: isDelivery ? COLORS.primary : [],
                            margin: 10
                        }}
                        source={isDelivery ? icons.check_on : icons.check_off}
                    />
                    <View style={{ margin: 10, flex: 1 }}>
                        <Image
                            style={{
                                height: 30,
                                width: 30,
                                tintColor: COLORS.dark,
                                position: "absolute",
                                alignSelf: "flex-end",
                                top: 0
                            }}
                            source={icons.edit}
                        />
                        <Text style={{ fontSize: 18, fontWeight: "600" }}>
                            Delivery to home
                        </Text>
                        <Text
                            style={{
                                marginTop: 20,
                                fontSize: 16,
                                fontWeight: "600",
                                opacity: 0.5
                            }}
                        >
                            {profile.myProfile.phone}
                        </Text>
                        <Text
                            style={{ fontSize: 16, fontWeight: "600", opacity: 0.5 }}
                            numberOfLines={1}
                        >
                            {dbUser.address}
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "600",
                                position: "absolute",
                                alignSelf: "flex-end",
                                bottom: 0
                            }}
                        >
                            {restaurant.minDeliveryTime} - {restaurant.maxDeliveryTime} mins
                        </Text>
                    </View>
                </Pressable>
            );
        }
        function RenderPickup() {
            return (
                <Pressable
                    onPress={() => setIsDelivery(false)}
                    style={{
                        backgroundColor: COLORS.secondary,
                        opacity: isDelivery ? 0.5 : 1,
                        borderWidth: 2,
                        borderColor: isDelivery ? COLORS.background : COLORS.primary,
                        ...styles.deliveryMethod
                    }}
                >
                    <Image
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: isDelivery ? [] : COLORS.primary,
                            margin: 10
                        }}
                        source={isDelivery ? icons.check_off : icons.check_on}
                    />
                    <View style={{ margin: 10, flex: 1 }}>
                        <Text style={{ fontSize: 18, fontWeight: "600" }}>Self Pickup</Text>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "600",
                                opacity: 0.5,
                                marginTop: 10
                            }}
                            numberOfLines={1}
                        >
                            {restaurant.address}
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "600",
                                position: "absolute",
                                alignSelf: "flex-end",
                                bottom: 0
                            }}
                        >
                            Ready in 35 mins
                        </Text>
                    </View>
                </Pressable>
            );
        }
        return (
            <View style={{ margin: 20, marginTop: 40 }}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>Delivery Method</Text>
                {RenderDeliver()}
                {RenderPickup()}
            </View>
        );
    };

    const PaymentMethod = () => {
        return (
            <View style={{ margin: 20, marginTop: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>Payment Method</Text>

                <FlatList
                    ref={ref}
                    initialScrollIndex={parseInt(selectedPaymentMethod) - 1}
                    onScrollToIndexFailed={() => {
                        const wait = new Promise((resolve) => setTimeout(resolve, 100));
                        wait.then(() => {
                            ref.current?.scrollToIndex({
                                index: parseInt(selectedPaymentMethod) - 1,
                                animated: true,
                            });
                        });
                    }}
                    horizontal
                    snapToAlignment={'center'}
                    showsHorizontalScrollIndicator={false}
                    style={styles.paymentMethod}
                    data={profile.myCards}
                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap"
                            }}
                        >
                            <Pressable
                                onPress={() => {
                                    setSelectedPaymentMethod(item.id.toString());
                                }}
                                style={{
                                    marginRight: 30,
                                    height: 125,
                                    width: 120,
                                    backgroundColor: COLORS.secondary,
                                    alignItems: "center",
                                    borderRadius: 20,
                                    borderWidth: 2,
                                    borderColor:
                                        selectedPaymentMethod === item.id.toString()
                                            ? COLORS.primary
                                            : COLORS.background,
                                    padding: 5,
                                    opacity:
                                        selectedPaymentMethod === item.id.toString() ? 1 : 0.5
                                }}
                            >
                                <Image
                                    style={{
                                        width: 30,
                                        height: 30,
                                        tintColor:
                                            selectedPaymentMethod === item.id.toString()
                                                ? COLORS.primary
                                                : [],
                                        marginTop: 5,
                                        marginLeft: 5,
                                        alignSelf: "flex-start",
                                        top: 0
                                    }}
                                    source={
                                        selectedPaymentMethod === item.id.toString()
                                            ? icons.check_on
                                            : icons.check_off
                                    }
                                />
                                <Image
                                    style={{ width: 50, height: 35, resizeMode: "contain" }}
                                    source={item.type.icon}
                                />
                                <Text
                                    style={{
                                        fontSize: 18,
                                        color: COLORS.dark,
                                        marginTop: 10
                                    }}
                                >
                                    {item.card_no}
                                </Text>
                            </Pressable>
                        </View>
                    )}
                />
            </View>
        );
    };

    function RenderFooter() {
        return (
            <Pressable onPress={handlePayment} style={styles.Payment}>
                <Text style={{ fontSize: 24, color: COLORS.light, fontWeight: "800" }}>
                    {" "}
                    Pay ₽{finalTotal}
                </Text>
            </Pressable>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}

            {RenderHeader()}
            {/* Delivery Method */}

            <DeliveryMethod />

            {/* Payment Method */}

            <PaymentMethod />

            {/* Footer */}
            <View
                style={{
                    height: "100%",
                    backgroundColor: COLORS.secondary,
                    borderTopEndRadius: 55,
                    borderTopStartRadius: 55,
                    padding: 30
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginHorizontal: 20
                    }}
                >
                    <Text style={{ fontSize: 16 }}>Sub Total</Text>
                    <Text style={{ fontSize: 16 }}>₽{subTotal}</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginHorizontal: 20
                    }}
                >
                    <Text style={{ fontSize: 16 }}>Delivery fee</Text>
                    <Text style={{ fontSize: 16 }}>₽{deliveryFee}</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginHorizontal: 20,
                        marginTop: 8
                    }}
                >
                    <Text style={{ fontSize: 20, fontWeight: "600" }}>Total</Text>
                    <Text style={{ fontSize: 20, fontWeight: "600" }}>
                        ₽{finalTotal}
                    </Text>
                </View>
            </View>

            {RenderFooter()}
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
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 15
    },
    deliveryMethod: {
        marginTop: 20,
        height: 120,
        width: "100%",
        flexDirection: "row",
        borderRadius: 20,
        paddingEnd: 15
    },
    paymentMethod: {
        flexDirection: "row",
        marginTop: 20
    },
    Payment: {
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
export default CheckoutScreen;
