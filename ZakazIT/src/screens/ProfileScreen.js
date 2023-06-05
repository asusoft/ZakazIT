//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Alert } from 'react-native';
import COLORS from '../../assets/constants/colors'
import Header from '../components/Header';
import icons from '../../assets/constants/icons';
import { useDrawerStatus } from "@react-navigation/drawer";
import { SafeAreaView } from 'react-native-safe-area-context';

import { db, auth } from '../../config';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

// create a component
const ProfileScreen = () => {
    const { dbUser } = useAuthContext();
    const drawerIsOpen = useDrawerStatus();
    const navigation = useNavigation();

    function RenderHeader() {
        return (
            <Header
                title="MY PROFILE"
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
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Image
                            source={drawerIsOpen === "closed" ? icons.menu : icons.cross}
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
            {RenderHeader()}
            <Pressable onPress={() => navigation.push("CardScreen")}>
                <Text>Go to cards Screen</Text>
            </Pressable>
            <Pressable onPress={() => navigation.push("EditProfile")}>
                <Text>Edit Profile</Text>
            </Pressable>
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
        bottom: 50,
        right: 30,
        left: 30,
        height: 80,
        borderRadius: 20,
        backgroundColor: COLORS.primary
    }
});

//make this component available to the app
export default ProfileScreen;
