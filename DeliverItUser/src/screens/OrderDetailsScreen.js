//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import COLORS from "../../assets/constants/colors";
import icons from "../../assets/constants/icons";
import profile from "../../assets/constants/profile";

// create a component
const OrderdetailsScreen = ({ navigation, route }) => {
    const { order } = route.params;

    function RenderHeader() {
        return (
            <View style={styles.Header}>
                {/* Back Button */}
                <Pressable
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: 45,
                        width: 45,
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
                            width: 25,
                            height: 25,
                            tintColor: COLORS.dark
                        }}
                    />
                </Pressable>

                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "600",
                        marginTop: 10,
                    }}
                >
                    ORDER DETAILS
                </Text>

                <Pressable
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: 45,
                        width: 45,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: COLORS.dark,
                        backgroundColor: COLORS.background
                    }}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Image
                        source={icons.support}
                        style={{
                            width: 25,
                            height: 25,
                        }}
                    />
                </Pressable>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            {/* Header */}
            {RenderHeader()}

            <View style={{ padding: 20, backgroundColor: COLORS.secondary, flex: 1 }}>
                {/* Info */}

                <View style={{ borderBottomWidth: 0.2, borderBottomColor: COLORS.grey, paddingBottom: 15 }}>
                    <View style={{ flexDirection: "row" }}>
                        <View>
                            <Text style={{ right: 0, fontSize: 16, fontWeight: "700" }}>
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
                        <Text style={{ fontSize: 16, fontWeight: "700", opacity: 0.6 }}>
                            Deliverd to
                        </Text>
                        <Text style={{ right: 0, fontSize: 16, fontWeight: "700" }}>
                            {profile.myProfile.address}
                        </Text>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: "700", opacity: 0.6 }}>
                            Payment method
                        </Text>
                        <Text style={{ right: 0, fontSize: 16, fontWeight: "700" }}>
                            {order.paymentMethod}
                        </Text>
                    </View>
                </View>

                {/* Items */}

                <View style={{ borderBottomWidth: 0.2, borderBottomColor: COLORS.grey, paddingBottom: 15, marginTop: 20 }}>
                    {order.items.map((item, index) => {
                        return (
                            <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                <View>
                                    <Text style={{ right: 0, fontSize: 16, fontWeight: "700" }}>
                                        {item.name}
                                    </Text>
                                    <Text style={{ fontSize: 16, fontWeight: "600", opacity: 0.6 }}>
                                        small x 3
                                    </Text>
                                </View>

                                <Text style={{ position: "absolute", right: 0, fontSize: 16 }}>
                                    ${item.price}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                {/* Bill */}

                <View style={{ borderBottomWidth: 0.2, borderBottomColor: COLORS.grey, paddingBottom: 15, marginTop: 20 }}>

                    <View style={{ flexDirection: "row", marginBottom: 10 }}>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: "700", opacity: 0.6 }}>
                                Sub total
                            </Text>
                        </View>

                        <Text style={{ position: "absolute", right: 0, fontSize: 16 }}>
                            $ 270
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 10 }}>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: "700", opacity: 0.6 }}>
                                Delivery Fee
                            </Text>
                        </View>

                        <Text style={{ position: "absolute", right: 0, fontSize: 16 }}>
                            $ 30
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 10 }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: "700", }}>
                                Paid
                            </Text>
                        </View>

                        <Text style={{ position: "absolute", right: 0, fontSize: 16, fontWeight: "700" }}>
                            $ {order.total}
                        </Text>
                    </View>
                </View>
                <Pressable style={styles.Footer}>
                    <Text style={{ fontSize: 24, color: COLORS.light, fontWeight: "800" }}> Order again</Text>
                </Pressable>

                {/* Footer */}
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    Header: {
        top: 35,
        left: 0,
        right: 0,
        height: 90,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 10,
        marginBottom: 25,
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
