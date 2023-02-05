//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Alert } from 'react-native';
import COLORS from '../../assets/constants/colors'
import Header from '../components/Header';
import icons from '../../assets/constants/icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormInput from "../components/FormInput";

import { Auth, DataStore } from 'aws-amplify';
import { User } from '../models';
import { useAuthContext } from '../contexts/AuthContext';

// create a component
const ProfileScreen = ({ navigation }) => {
    const { dbUser } = useAuthContext();
    const [name, setName] = useState(dbUser?.name || "");
    const [address, setAddress] = useState(dbUser?.address || "");
    const [lng, setLng] = useState(dbUser?.lng + "" || "0");
    const [lat, setLat] = useState(dbUser?.lat + "" || "0");

    const { sub, setDbUser } = useAuthContext();

    const onSave = async () => {
        dbUser ? await updateUser() : await createUser()

        navigation.goBack()
    }

    const updateUser = async () => {
        try {
            const user = await DataStore.save(
                User.copyOf(dbUser, (updated) => {
                    updated.name = name;
                    updated.address = address;
                    updated.lat = parseFloat(lat);
                    updated.lng = parseFloat(lng);
                })
            )
            setDbUser(user);
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    }

    const createUser = async () => {
        try {
            const user = await DataStore.save(
                new User({
                    name,
                    address,
                    lat: parseFloat(lat),
                    lng: parseFloat(lng),
                    sub
                })
            );
            setDbUser(user);
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    }

    function RenderHeader() {
        return (
            <Header
                title="PROFILE"
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
                    placeholder={name}
                    value={name}
                    inputContainerStyle={{
                        borderColor: COLORS.grey
                    }}
                    onChange={value => {
                        setName(value);
                    }}
                />
                <FormInput
                    label="Address"
                    value={address}
                    placeholder={address}
                    inputContainerStyle={{
                        borderColor: COLORS.grey
                    }}
                    onChange={value => {
                        setAddress(value);
                    }}
                />
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <FormInput
                        label="Latitude"
                        keyboardType="number-pad"
                        value={lat}
                        placeholder={lat}
                        containerStyle={{
                            flex: 1,
                        }}
                        inputContainerStyle={{
                            borderColor: COLORS.grey
                        }}
                        onChange={value => {
                            setLat(value);
                        }}
                    />
                    <FormInput
                        label="Longitude"
                        value={lng}
                        placeholder={lng}
                        keyboardType="number-pad"
                        containerStyle={{
                            flex: 1,
                            marginLeft: 10,
                        }}
                        inputContainerStyle={{
                            borderColor: COLORS.grey
                        }}
                        onChange={value => {
                            setLng(value);
                        }}
                    />
                </View>
            </View>
        )
    }

    function RenderFooter() {
        return (
            <Pressable onPress={onSave} style={styles.Footer}>
                <Text style={{ fontSize: 24, color: COLORS.light, fontWeight: "800" }}>
                    Save
                </Text>
            </Pressable>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {RenderHeader()}
            {RenderForm()}
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
