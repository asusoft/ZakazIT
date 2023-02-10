//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, FlatList } from 'react-native';
import COLORS from '../../../assets/constants/colors';
import { useOrderContext } from '../../contexts/OrderContext';

// create a component
const OrderList = ({ order, navigation }) => {
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
                <Image
                    source={{ uri: order?.restaurant?.image }}
                    style={{
                        width: 75,
                        height: 75,
                        margin: 10,
                        borderRadius: 20,
                        alignSelf: 'flex-start',
                        top: 0,
                    }}

                />
                <View style={{ justifyContent: 'space-between', paddingBottom: 10, flex: 1 }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "600",
                        marginTop: 10

                    }}
                        numberOfLines={1}
                    >
                        {order?.restaurant?.name}</Text>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: "600",
                        opacity: 0.5,
                        marginTop: 5
                    }}>28 Jan, 20:23 - item.items.length items</Text>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: "600",
                        marginTop: 5
                    }}>{order?.status.name}</Text>
                </View>
                <View style={{ alignItems: "flex-end", marginTop: 10, marginEnd: 10 }}>
                    <Text style={{ alignSelf: "flex-end", fontSize: 20, fontWeight: "800", color: COLORS.primary }}>${order?.total}</Text>
                </View>
            </View>
            <View style={{ height: "40%", width: "100%", flexDirection: 'row', paddingEnd: 40, paddingBottom: 15 }}>
                <Pressable
                    onPress={() => navigation.push("TrackOrderScreen", { order: item })}
                    style={{ backgroundColor: COLORS.primary, ...styles.buttons }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.white }}>Track order</Text>
                </Pressable>

                <Pressable onPress={() => navigation.push('OrderDetailsScreen', { order: order })} style={{ backgroundColor: COLORS.lightGray2, ...styles.buttons }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: COLORS.primary }}>Details</Text>
                </Pressable>
            </View>
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
