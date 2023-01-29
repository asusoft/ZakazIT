//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, SafeAreaView } from 'react-native';
import COLORS from '../../assets/constants/colors';
import icons from '../../assets/constants/icons';
import dummyData from '../../assets/constants/dummyData';
import OrderList from '../components/OrderScreenComponents/OrderList';
import { useDrawerStatus } from '@react-navigation/drawer';

// create a component
const OrdersScreen = ({ navigation }) => {
    const orders = dummyData.orders;
    const drawerIsOpen = useDrawerStatus();
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
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Image
                        source={drawerIsOpen === "closed" ? icons.menu : icons.cross}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.dark
                        }}
                    />
                </Pressable>

                <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 10, marginLeft: "25%" }}>MY ORDERS</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            {RenderHeader()}
            {/* List */}
            <OrderList orders={orders} navigation={navigation} />
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    Header: {
        top: 35,
        left: 0,
        right: 0,
        height: 90,
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 10
    }
});

//make this component available to the app
export default OrdersScreen;
