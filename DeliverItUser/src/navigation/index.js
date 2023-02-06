import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./DrawerNavigation";
import ProfileScreen from "../screens/ProfileScreen";
import SignIn from "../screens/SignIn";

import { useAuthContext } from "../contexts/AuthContext";

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
    const { dbUser, authUser } = useAuthContext();

    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }} >
            {
                authUser ? (
                    dbUser ? (
                        <RootStack.Screen name="Index" component={DrawerNavigation} />
                    ) : (
                        <RootStack.Screen name="ProfileStack" component={ProfileScreen} />
                    )
                ) : (
                    <RootStack.Screen name="SignIn" component={SignIn} />
                )
            }
        </RootStack.Navigator>
    )
}


export default RootNavigator