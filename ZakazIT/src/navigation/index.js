import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./DrawerNavigation";
import ProfileScreen from "../screens/ProfileScreen";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

import { useAuthContext } from "../contexts/AuthContext";

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
    const { dbUser, authUser } = useAuthContext();

    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {authUser
                ? <RootStack.Screen name="Index" component={DrawerNavigation} />
                : <RootStack.Screen name="Auth" component={AuthStackNavigator} />}
        </RootStack.Navigator>
    )
}

const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="SignUp"
        >
            <AuthStack.Screen
                name="SignUp"
                component={SignUp}
            />
            <AuthStack.Screen
                name="SignIn"
                component={SignIn}
            />
        </AuthStack.Navigator>
    );
};


export default RootNavigator