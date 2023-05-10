//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import COLORS from '../../assets/constants/colors';
import dummyData from '../../assets/constants/dummyData';
import icons from '../../assets/constants/icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../components/Header';

import { useCartContext } from '../contexts/CartContext';
import { useOrderContext } from '../contexts/OrderContext';

// create a component
const CartScreen = ({ navigation }) => {

    const [cart, setCart] = useState(dummyData.cart)
    const { cartItems, total, onPlus, onMinus, onRemove, restaurant} = useCartContext();
    const { createOrder } = useOrderContext

    const [cartDishes, setCartDishes] = useState(null)

    React.useEffect(() => {
        setCartDishes(null)
        setCartDishes(cartItems)
    }, [cartItems])

    const handleRemoveFromCart = async (itemID) => {
        await onRemove(itemID);
        let newLength = cartItems.length -1
        if(newLength < 1){
            navigation.goBack()
        }
    };

    const onIncrease =  async (itemID, size) => {
        await onPlus(itemID, size);
    }

    const onDecrease =  async (itemID, size) => {
        await onMinus(itemID, size);
    }

    function RenderHeader() {
        return (
            <Header
                title="MY CART"
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
                rightComponent={
                    <View
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
                    >
                        <Image
                            source={icons.bag}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.dark
                            }}
                        />

                        <View style={styles.badge}>
                            <Text style={styles.quantityNumber}>{cartItems.length}</Text>
                        </View>

                    </View>
                }
            />
        );
    }

    const renderCartList = () => {
        return (
            <SwipeListView
                data={cartDishes}
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
                                    source={{
                                        uri: data.item.dish.image
                                    }}
                                    style={{
                                        width: 45,
                                        height: 45,
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
                                ₽{data.item.price}
                                </Text>
                                <Text style={{ color: COLORS.black }}>
                                {data.item.size.name}
                                </Text>
                            </View>
                            {/* Quantity */}

                            <View style={{ width: 80, height: 60, marginLeft: 10, marginRight: 10, borderRadius: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                                <Pressable
                                   onPress={() => onDecrease(data.item.id, data.item.size)} >
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
                                    onPress={() => onIncrease(data.item.id, data.item.size)} >
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
        navigation.navigate("CheckoutScreen", {restaurant: restaurant, total: total})
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
                {cartItems.length > 1 ?
                    <Text style={{ fontSize: 18, color: COLORS.light, fontWeight: "500" }}> {cartItems.length} items</Text>
                    :
                    <Text style={{ fontSize: 18, color: COLORS.light, fontWeight: "500" }}> {cartItems.length} item</Text>

                }
                <Text style={{ fontSize: 22, color: COLORS.light, fontWeight: "600" }}> Checkout</Text>
                <Text style={{ fontSize: 18, color: COLORS.light, fontWeight: "500" }}> ₽{total}</Text>
            </Pressable>
        )
    }

    return (

        <SafeAreaView style={styles.container}>
            {/* Header */}
            {RenderHeader()}
            {/* Cart List */}
            {
                cartItems.length > 0 ? renderCartList()
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
                cartItems.length > 0 ?
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
    },
    badge: {
        position: 'absolute',
        top: 5,
        right: 5,
        height: 12,
        width: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.primary,
    },
    quantityNumber: {
        color: COLORS.white,
        ...Platform.select({
            android: { lineHeight: 17 },
            ios: { lineHeight: 0 },
        }),
        fontSize: 8,
    },
});

//make this component available to the app
export default CartScreen;
