//import liraries
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import COLORS from "../../assets/constants/colors";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import FormInput from "../components/FormInput";

import { useAuthContext } from "../contexts/AuthContext";

import { auth } from "../../config";
import { useNavigation } from "@react-navigation/native";

// create a component
const SignIn = () => {
    const navigation = useNavigation();
    const { setAuthUser } = useAuthContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSignUp = async () => {
        navigation.navigate("SignUp");
    };

    const signOut = () => {
        auth
            .signOut()
            .then(function () {
                console.log("Signed out");
            })
            .catch(error => alert(error.message));
    };

    const onSignIn = async () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                setAuthUser(user);
            })
            .catch(error => alert(error.message));
    };

    function RenderHeader() {
        return (
            <Header
                title="Sign In"
                containerStyle={{
                    height: 50,
                    marginHorizontal: 20,
                    marginTop: 10
                }}
                titleStyle={{}}
                leftComponent={<View style={{ width: 40 }} />}
                rightComponent={<View style={{ width: 40 }} />}
            />
        );
    }

    function RenderForm() {
        return (
            <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                <FormInput
                    label="Email"
                    placeholder="email.example.com"
                    value={email}
                    inputContainerStyle={{
                        borderColor: COLORS.grey
                    }}
                    onChange={value => {
                        setEmail(value);
                    }}
                />
                <View style={{ marginTop: 15 }}>
                    <FormInput
                        label="Password"
                        value={password}
                        placeholder="Password"
                        inputContainerStyle={{
                            borderColor: COLORS.grey
                        }}
                        onChange={value => {
                            setPassword(value);
                        }}
                    />
                </View>
            </View>
        );
    }

    function RenderFooter() {
        return (
            <Pressable onPress={onSignIn} style={{ bottom: 50, ...styles.Footer }}>
                <Text style={{ fontSize: 24, color: COLORS.light, fontWeight: "800" }}>
                    Sign In
                </Text>
            </Pressable>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {RenderHeader()}
            {RenderForm()}

            <View
                style={{ marginHorizontal: 20, flexDirection: "row", marginTop: 25 }}
            >
                <Text style={{ fontSize: 16 }}>New to ЗаказIT? </Text>
                <Pressable onPress={onSignUp}>
                    <Text style={{ fontSize: 16, color: COLORS.primary }}>
                        Sign Up here
                    </Text>
                </Pressable>
            </View>

            {RenderFooter()}
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    Footer: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "center",
        padding: 20,
        alignItems: "center",
        right: 30,
        left: 30,
        height: 80,
        borderRadius: 20,
        backgroundColor: COLORS.primary
    }
});

//make this component available to the app
export default SignIn;
