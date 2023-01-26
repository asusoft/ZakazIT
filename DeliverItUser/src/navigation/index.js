import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";

import HomeScreen from "../screens/HomeScreen";

import DrawerView from './DrawerView';
import COLORS from '../../assets/constants/colors';
import CustomDrawerContent from './CustomDrawerContent'


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
                        fontWeight: "bold"
                    },
                    drawerActiveTintColor: COLORS.white,
                    drawerInactiveTintColor: COLORS.grey,
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
                            <HomeScreen {...props} />
                        </DrawerView>
                    )}
                </Drawer.Screen>
            </Drawer.Navigator>
        </View>
    )
}

export default RootNavigator

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
    },
}); 