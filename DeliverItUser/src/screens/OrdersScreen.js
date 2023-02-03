//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import COLORS from '../../assets/constants/colors';
import icons from '../../assets/constants/icons';
import dummyData from '../../assets/constants/dummyData';
import OrderList from '../components/OrderScreenComponents/OrderList';
import { useDrawerStatus } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context'

import Header from '../components/Header';

// create a component
const OrdersScreen = ({ navigation }) => {
    const orders = dummyData.orders;
    const drawerIsOpen = useDrawerStatus();
    
    function RenderHeader() {
        return (
            <Header
                title="MY ORDERS"
                containerStyle={{
                    height: 50,
                    marginHorizontal: 20,
                }}
                titleStyle={{}}
                leftComponent={
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
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Image
                            source={drawerIsOpen === 'open' ? icons.cross : icons.menu}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.dark
                            }}
                        />
                    </Pressable>
                }
                rightComponent={<View style={{ width: 40 }} />}
            />
        );
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
});

//make this component available to the app
export default OrdersScreen;
