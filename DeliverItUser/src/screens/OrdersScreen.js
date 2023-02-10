//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ActivityIndicator , ScrollView, FlatList} from 'react-native';
import COLORS from '../../assets/constants/colors';
import icons from '../../assets/constants/icons';
import OrderList from '../components/OrderScreenComponents/OrderList';
import { useDrawerStatus } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context'

import Header from '../components/Header';

import { useOrderContext } from '../contexts/OrderContext';

// create a component
const OrdersScreen = ({ navigation }) => {
    const { orders } = useOrderContext();
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

    if (!orders) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size={"large"} color={COLORS.primary} />
            </View>)
    } else return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            {RenderHeader()}
            {/* List */}
            <View style={{ margin: 20, marginTop: 10 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}>
                    <FlatList
                        style={{
                            flex: 1
                        }}
                        data={orders}
                        keyExtractor={item => `${item.id}`}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <OrderList order={item} navigation={navigation} />
                        )}
                    >
                    </FlatList>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background,
    },
});

//make this component available to the app
export default OrdersScreen;
