//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Alert } from 'react-native';
import COLORS from '../../assets/constants/colors'
import Header from '../components/Header';
import icons from '../../assets/constants/icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormInput from "../components/FormInput";

import { useAuthContext } from "../contexts/AuthContext";

import { auth } from '../../config'


// create a component
const SignIn = ({ navigation }) => {
    const user = auth.currentUser;

    const { setAuthUser } = useAuthContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signOut = () => {
        auth.signOut().then(function () {
            console.log('Signed out');
        }).catch(error => alert(error.message))
    }

    const onSignIn = async () => {
        auth.signInWithEmailAndPassword(email, password).then(userCredentials => {
            const user = userCredentials.user;
            setAuthUser(user)
            console.log('Signe In with:', user.email);
        }).catch(error => alert(error.message))
    }

    const onSignUp = async () => {
        auth.createUserWithEmailAndPassword(email, password).then(userCredentials => {
            const user = userCredentials.user;
            console.log('Created a User In with:', user.email);
        }).catch(error => alert(error.message))
    }

    const showUser = () => {
        alert(user.email)
    }

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
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={icons.back}
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

    function RenderForm() {
        return (
            <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                <FormInput
                    label="Name"
                    placeholder={email}
                    value={email}
                    inputContainerStyle={{
                        borderColor: COLORS.grey
                    }}
                    onChange={value => {
                        setEmail(value);
                    }}
                />
                <FormInput
                    label="Password"
                    value={password}
                    placeholder={password}
                    inputContainerStyle={{
                        borderColor: COLORS.grey
                    }}
                    onChange={value => {
                        setPassword(value);
                    }}
                />
            </View>
        )
    }

    function RenderFooter() {
        return (
            <Pressable
                onPress={onSignUp} style={{ bottom: 50, ...styles.Footer }}>
                <Text style={{ fontSize: 24, color: COLORS.light, fontWeight: "800" }}>
                    Sign Up
                </Text>
            </Pressable>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {RenderHeader()}
            {RenderForm()}
            <Pressable onPress={signOut}>
                <Text>SignOut</Text>
            </Pressable>

            <Pressable onPress={showUser}>
                <Text>Show User</Text>
            </Pressable>

            <Pressable onPress={onSignIn} style={{
                bottom: 150, ...styles.Footer
            }}>
                <Text style={{ fontSize: 24, color: COLORS.light, fontWeight: "800" }}>
                    Sign In
                </Text>
            </Pressable>

            {RenderFooter()}

        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
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
