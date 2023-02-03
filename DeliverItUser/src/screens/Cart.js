//import liraries
import { useRoute } from '@react-navigation/native';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import COLORS from '../../assets/constants/colors';
import Header from '../components/CartScreenComponents/Header';
import dummyData from '../../assets/constants/dummyData';
import icons from '../../assets/constants/icons';
import { SafeAreaView } from 'react-native-safe-area-context'


// create a component
const CartScreen = ({ navigation }) => {
    const [cart, setCart] = useState(dummyData.cart)

    const handleUpdateQuantity = (newQty, id) => {
        const newMyCartList = cart.map(cl => {
            return cl.id === id ? { ...cl, quantity: newQty } : cl;
        });
        setCart(newMyCartList);
    };

    const handleRemoveFromCart = (id) => {
        let newMyCartList = [...cart];
        const index = cart.findIndex(cart => cart.id === id);
        newMyCartList.splice(index, 1);
        setCart(newMyCartList);
    };

    const renderCartList = () => {

        return (
            <SwipeListView
                data={cart}
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
                        <View
                            style={{
                                height: 80,
                                backgroundColor: COLORS.secondary,
                                ...styles.cartItemContainer,
                            }}>
                            {/* Food Image */}
                            <View style={{ width: 60, height: 60, marginLeft: 10, marginRight: 10, borderRadius: 10, justifyContent: 'center', borderWidth: 1, borderColor: COLORS.lightGray, alignItems: 'center' }}>
                                <Image
                                    source={{ uri: data.item.dish.image }}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        position: 'absolute',
                                        borderRadius: 10
                                    }}
                                />
                            </View>
                            {/* Food Info */}
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: COLORS.black }}>
                                    {data.item.dish.name}
                                </Text>
                                <Text style={{ color: COLORS.primary }}>
                                    ${data.item.sizes.price}
                                </Text>
                                <Text style={{ color: COLORS.black }}>
                                    {data.item.sizes.name}
                                </Text>
                            </View>
                            {/* Quantity */}

                            <View style={{ width: 80, height: 60, marginLeft: 10, marginRight: 10, borderRadius: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                                <Pressable
                                    onPress={() => handleUpdateQuantity(data.item.quantity - 1, data.item.id)} >
                                    <Image
                                        source={icons.minus}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            borderRadius: 10
                                        }}
                                    />
                                </Pressable>
                                <Text>{data.item.quantity}</Text>
                                <Pressable
                                    onPress={() => handleUpdateQuantity(data.item.quantity + 1, data.item.id)} >
                                    <Image
                                        source={icons.plus}
                                        style={{
                                            width: 25,
                                            height: 25,
                                            borderRadius: 10,
                                            tintColor: COLORS.primary
                                        }}
                                    />
                                </Pressable>
                            </View>
                        </View>
                    )
                }}

                renderHiddenItem={(data, rowMap) => {
                    return (
                        <Pressable
                            onPress={() => handleRemoveFromCart(data.item.id)}
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                backgroundColor: COLORS.primary,
                                ...styles.cartItemContainer,
                            }}
                        >
                            <Image style={{ height: 20, width: 20, marginRight: 10 }} source={icons.deleteIcon} />
                        </Pressable>
                    );
                }}

            />
        )
    }

    const checkout = () => {
        navigation.navigate("CheckoutScreen")
    }

    function RenderChooseRestaurant() {
        return (
            <Pressable onPress={() => navigation.navigate('Home')} style={styles.Footer}>
                <Text style={{ fontSize: 22, color: COLORS.light, fontWeight: "600", left: 100 }}> Add Dishes</Text>
            </Pressable>
        )
    }

    function RenderFooter() {
        return (
            <Pressable onPress={checkout} style={styles.Footer}>
                {cart.length > 1 ?
                    <Text style={{ fontSize: 18, color: COLORS.light, fontWeight: "500" }}> {cart.length} items</Text>
                    :
                    <Text style={{ fontSize: 18, color: COLORS.light, fontWeight: "500" }}> {cart.length} item</Text>

                }
                <Text style={{ fontSize: 22, color: COLORS.light, fontWeight: "600" }}> Checkout</Text>
                <Text style={{ fontSize: 18, color: COLORS.light, fontWeight: "500" }}> $10.9</Text>
            </Pressable>
        )
    }

    return (
        
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <Header navigation={navigation} quantity={cart.length} />
            {/* Cart List */}
            {
                cart.length > 0 ? renderCartList()
                    :
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: '600',
                            opacity: 0.5
                        }}>Your cart is empty</Text>
                    </View>
            }

            {/* Footer */}
            {
                cart.length > 0 ?
                    RenderFooter()
                    :
                    RenderChooseRestaurant()
            }
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    leftIconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.gray,
    },
    cartItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    Footer: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
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
export default CartScreen;
