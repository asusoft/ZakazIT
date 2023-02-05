import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./DrawerNavigation";
import ProfileScreen from "../screens/ProfileScreen";

import { useAuthContext } from "../contexts/AuthContext";

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
    const {dbUser} = useAuthContext();

    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }} >
            {
                dbUser ? (
                    <RootStack.Screen name="Index" component={DrawerNavigation} />
                ) : (
                    <RootStack.Screen name="ProfileStack" component={ProfileScreen} />
                )
            }
        </RootStack.Navigator>
    )
}


export default RootNavigator