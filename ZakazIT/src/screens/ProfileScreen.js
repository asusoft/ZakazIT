//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Alert } from 'react-native';
import COLORS from '../../assets/constants/colors'
import Header from '../components/Header';
import icons from '../../assets/constants/icons';
import { useDrawerStatus } from "@react-navigation/drawer";
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleLineIcons } from "@expo/vector-icons";

import { db, auth } from '../../config';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useOrderContext } from '../contexts/OrderContext';

import images from "../../assets/constants/images";
// create a component
const ProfileScreen = () => {
    const { dbUser } = useAuthContext();
    const { orders } = useOrderContext();


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

            <View style={{
                flex: 1,
                backgroundColor: COLORS.background,
                alignItems: "center",
            }}>

                <View style={{
                    backgroundColor: COLORS.primary,
                    height: "100%",
                    width: "100%",
                    top: 125,
                    paddingTop: 100,
                    alignItems: "center"
                }}>
                    <Text style={{ fontSize: 30, fontWeight: "700" }}>{dbUser?.name}</Text>
                    <SimpleLineIcons name="location-pin" size={15} color="white">
                        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}> {dbUser?.address}</Text>
                    </SimpleLineIcons>

                    <View style={{
                        width: "100%",
                        paddingTop: 20,
                        alignItems: "center",
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                        <Pressable
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 20,
                                backgroundColor: COLORS.secondary,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 25
                            }}
                            onPress={() => navigation.push("CardScreen")}
                        >
                            <Text>MY CARDS</Text>
                        </Pressable>
                        <Pressable
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 20,
                                backgroundColor: COLORS.secondary,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 25
                            }}>
                            <Text>ORDERS</Text>
                            <Text>{orders?.length}</Text>
                        </Pressable>
                        <Pressable
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 20,
                                backgroundColor: COLORS.secondary,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={() => navigation.push("EditProfile")}>
                            <Text>Edit Profile</Text>
                        </Pressable>

                    </View>


                </View>
                <Image resizeMode='stretch' style={{
                    position: 'absolute',
                    top: 10,
                    height: 200,
                    width: 200,
                    borderRadius: 100,
                    backgroundColor: COLORS.secondary,

                }} source={images.profile} />

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
