import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./DrawerNavigation";

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }} >
            <RootStack.Screen name="Index" component={DrawerNavigation} />
        </RootStack.Navigator>
    )
}


export default RootNavigator