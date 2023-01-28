import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import RestaurantInfoScreen from "../screens/RestaurantInfoScreen";
import DishInfoScreen from "../screens/DishInfoScreen";
import CartScreen from "../screens/Cart";

import DrawerView from './DrawerView';
import COLORS from '../../assets/constants/colors';
import CustomDrawerContent from './CustomDrawerContent'
import CheckoutScreen from "../screens/CheckoutScreen";
import Payment from "../screens/Payment";
import OrdersScreen from "../screens/OrdersScreen";


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen
                name="HomeTabs"
                component={HomeTabs}
            />
        </Stack.Navigator>
    )
}

const Stacks = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stacks.Navigator screenOptions={{ headerShown: false }} >
            <Stacks.Screen
                name="Home"
                component={HomeScreen}
            />
            <Stacks.Screen
                name="Restaurants"
                component={RestaurantStackNavigator}
            />
            <Stacks.Screen
                name="Cart"
                component={CartStackNavigator}
            />
            <Stacks.Screen
                name="Orders"
                component={OrdersStackNavigator}
            />
        </Stacks.Navigator>
    )
}



const Drawer = createDrawerNavigator();

const HomeTabs = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: "#FF0000"
        }}>
            <Drawer.Navigator
                initialRouteName="Home"
                drawerType="slide"
                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                        width: 250,
                        backgroundColor: COLORS.primary
                    },
                    overlayColor: "transparent",
                    drawerLabelStyle: {
                        fontWeight: "bold",
                        fontSize: 20,
                        marginStart: 5

                    },
                    drawerActiveTintColor: COLORS.white,
                    drawerInactiveTintColor: COLORS.dark,
                    activeBackgroundColor: 'white',
                    drawerItemStyle: { backgroundColor: null },
                    swipeEnabled: true,
                    sceneContainerStyle: {
                        backgroundColor: COLORS.primary,
                    }
                }}
                drawerContent={props => {
                    return <CustomDrawerContent {...props} />;
                }}
            >
                <Drawer.Screen
                    name="Home">
                    {props => (
                        <DrawerView styler={styles.container}>
                            <StackNavigator {...props} />
                        </DrawerView>
                    )}
                </Drawer.Screen>
            </Drawer.Navigator>
        </View>
    )
}

const RestaurantStack = createNativeStackNavigator();

const RestaurantStackNavigator = () => {
    return (
        <RestaurantStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="RestaurantInfoScreen"
        >
            <RestaurantStack.Screen
                name="RestaurantInfoScreen"
                component={RestaurantInfoScreen}
            />
            <RestaurantStack.Screen
                name="DishInfoScreen"
                component={DishInfoScreen}
            />
        </RestaurantStack.Navigator>
    );
};

const CartStack = createNativeStackNavigator();

const CartStackNavigator = () => {
    return (
        <CartStack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <CartStack.Screen
                name="CartScreen"
                component={CartScreen}
            />
            <CartStack.Screen
                name="CheckoutScreen"
                component={CheckoutScreen}
            />
            <CartStack.Screen
                name="Payment"
                component={Payment}
            />
        </CartStack.Navigator>
    );
};

const OrdersStack = createNativeStackNavigator();
const OrdersStackNavigator = () => {
    return (
        <OrdersStack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <OrdersStack.Screen
                name="OrdersScreen"
                component={OrdersScreen}
            />
        </OrdersStack.Navigator>
    );
};

export default RootNavigator

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
    },
}); 