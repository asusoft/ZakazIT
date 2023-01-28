//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import COLORS from '../../../assets/constants/colors';

// create a component
const OrderList = ({orders, navigation}) => {
    return (
        <View style={{ margin: 20, marginTop: 10 }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}>
                <View
                    style={{
                        flex: 1
                    }}>
                    {orders.map((item, index) => {
                        return (
                            <View
                                style={{
                                    marginRight: 30,
                                    height: 170,
                                    width: "100%",
                                    backgroundColor: COLORS.secondary,
                                    borderRadius: 20,
                                    marginBottom: 10,
                                }}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                                    <Image style={{
                                        width: 75,
                                        height: 75,
                                        margin: 10,
                                        borderRadius: 20,
                                        alignSelf: 'flex-start',
                                        top: 0,
                                    }}
                                        source={
                                            {
                                                uri: item.restaurant.image
                                            }

                                        }
                                    />
                                    <View style={{ justifyContent: 'space-between', paddingBottom: 10, flex: 1 }}>
                                        <Text style={{
                                            fontSize: 18,
                                            fontWeight: "600",
                                            marginTop: 10

                                        }}
                                            numberOfLines={1}
                                        >
                                            {item.restaurant.name}</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: "600",
                                            opacity: 0.5,
                                            marginTop: 5
                                        }}>28 Jan, 20:23 - {item.items.length} items</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: "600",
                                            marginTop: 5
                                        }}>Order {item.status}</Text>
                                    </View>
                                    <View style={{ alignItems: "flex-end", marginTop: 10, marginEnd: 10 }}>
                                        <Text style={{ alignSelf: "flex-end", fontSize: 20, fontWeight: "800", color: COLORS.primary }}>${item.total}</Text>
                                    </View>
                                </View>
                                <View style={{ height: "40%", width: "100%", flexDirection: 'row', paddingEnd: 40, paddingBottom: 15 }}>
                                    <Pressable style={{ backgroundColor: COLORS.primary, ...styles.buttons }}>
                                        <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.white }}>Re-order</Text>
                                    </Pressable>
                                    <Pressable onPress={() => navigation.push('OrderDetailsScreen', {order: item})} style={{ backgroundColor: COLORS.lightGray2, ...styles.buttons }}>
                                        <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.primary }}>Details</Text>
                                    </Pressable>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

// define your styles
const styles = StyleSheet.create({
    buttons: {
        height: "100%",
        width: "50%",
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

//make this component available to the app
export default OrderList;
