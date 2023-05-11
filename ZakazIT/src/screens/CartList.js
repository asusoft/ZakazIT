//import liraries
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
} from "react-native";
import COLORS from "../../assets/constants/colors";
import icons from "../../assets/constants/icons";
import profile from "../../assets/constants/profile";
import Header from "../components/Header";
import { SwipeListView } from "react-native-swipe-list-view";
import { useDrawerStatus } from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context'

import { useCartContext } from "../contexts/CartContext";

import { db } from "../../config";


// create a component
const CartList = () => {
    const drawerIsOpen = useDrawerStatus();
    const navigation = useNavigation();
    const { userCarts, deleteCart, setRestaurant, restaurant } = useCartContext();

    const [carts, setCarts] = useState(null);

    const handleDeleteCart = async (id) => {
        await deleteCart(id)
    };

    React.useEffect(() => {
        if (userCarts) {
            setCarts(userCarts)
        }
    }, [userCarts])

    const handleOnPress = async (restaurantt) => {
        setRestaurant(null);
        await setRestaurant(restaurantt)
        navigation.navigate("CartScreen")
    }

    function RenderHeader() {
        return (
            <Header
                title="MY CARTS"
                containerStyle={{
                    height: 50,
                    marginHorizontal: 20,
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

    const RenderCarts = () => {
        return (
            <SwipeListView
                data={carts}
                key={item => `${item.id}`}
                contentContainerStyle={{
                    marginTop: 10,
                    marginHorizontal: 20,
                    paddingBottom: 20,
                }}
                disableRightSwipe={true}
                rightOpenValue={-65}
                renderItem={(data, rowMap) => {
                    return (
                        <Pressable
                            onPress={() => handleOnPress(data.item.restaurant)}
                            style={{
                                height: 80,
                                backgroundColor: COLORS.secondary,
                                ...styles.cardHolder,
                            }}>
                            {/* Food Image */}
                            <View style={{ width: 50, height: 50, marginLeft: 10, marginRight: 10, borderRadius: 10, justifyContent: 'center', borderWidth: 1, borderColor: COLORS.lightGray, alignItems: 'center' }}>
                                <Image
                                    resizeMode="contain"
                                    source={{
                                        uri: data.item.restaurant?.image,
                                    }}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        position: 'absolute',
                                        borderRadius: 15
                                    }}
                                />
                            </View>
                            {/* Food Info */}
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: COLORS.black, fontSize: 16, fontWeight: '600', marginStart: 20 }}>
                                    {data.item.restaurant?.name}
                                </Text>
                            </View>
                        </Pressable>
                    )
                }}

                renderHiddenItem={(data, rowMap) => {
                    return (
                        <Pressable
                            onPress={() => handleDeleteCart(data.item.id)}
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                backgroundColor: COLORS.primary,
                                ...styles.cardHolder,
                            }}
                        >
                            <Image style={{ height: 20, width: 20, marginRight: 10 }} source={icons.deleteIcon} />
                        </Pressable>
                    );
                }}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {RenderHeader()}

            {
                carts?.length > 0 ? RenderCarts() :
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: '600',
                            opacity: 0.5
                        }}>You do not have any cart</Text>
                    </View>

            }
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    cardHolder: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
        borderRadius: 10,

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
        backgroundColor: COLORS.primary,
        borderRadius: 20
    }
});

//make this component available to the app
export default CartList;
