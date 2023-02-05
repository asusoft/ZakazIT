//import liraries
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated, ActivityIndicator } from 'react-native';
import MenuItem from '../components/RestaurantInfoScreenComponents/MenuItem';
import COLORS from '../../assets/constants/colors';
import RestaurantInfo from '../components/RestaurantInfoScreenComponents/RestaurantInfo';
import dummyData from '../../assets/constants/dummyData';
import TopButtons from '../components/RestaurantInfoScreenComponents/TopButtons';

import { DataStore } from 'aws-amplify';
import { Restaurant, Dish } from '../models';

const HEADER_HEIGHT = 370;
// create a component
const RestaurantInfoScreen = ({ navigation, route }) => {
    const { restaurant_ID, previous_screen } = route.params;

    const [restaurant, setRestaurant] = useState()
    const [dishes, setDishes] = useState([])

    React.useEffect(() => {
        DataStore.query(Restaurant, restaurant_ID).then(result => setRestaurant(result))
        DataStore.query(Dish, (dish) => dish.restaurantID.eq(restaurant_ID)).then(result => setDishes(result))
        
    }, [restaurant_ID])

    const cart = dummyData.cart;

    const goBack = () => {
        navigation.navigate(previous_screen);
    }
    const goToCart = () => {
        navigation.navigate("Cart", { initial: false, });
    }

    const scrollY = useRef(new Animated.Value(0)).current;


    function renderRestaurantcardHeader() {
        return (
            <View
                style={{
                    alignItems: "center",
                    overflow: 'hidden',
                    height: HEADER_HEIGHT + 1090,
                    marginTop: -1000,
                    paddingTop: 1000,
                    backgroundColor: COLORS.background
                }}
            >
                <Animated.Image
                    source={{ uri: restaurant?.image }}
                    resizeMode="contain"
                    style={{
                        height: HEADER_HEIGHT,
                        width: "200%",
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                                    outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                                })
                            },
                            {
                                scale: scrollY.interpolate({
                                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                                    outputRange: [2, 1, 1]
                                })
                            }
                        ]
                    }}
                />
                <Animated.View style={{
                    position: "absolute",
                    bottom: 15,
                    left: 30,
                    right: 30,
                    height: 150,
                    transform: [
                        {
                            translateY: scrollY.interpolate({
                                inputRange: [0, 170, 250],
                                outputRange: [0, 0, 100],
                                extrapolate: 'clamp'
                            })
                        }
                    ]
                }}>
                    <RestaurantInfo restaurant={restaurant} />

                </Animated.View>
            </View>
        )
    }

    function renderHearderBar() {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 0,
                    right: 0,
                    height: 90,
                    flexDirection: 'row',
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    paddingBottom: 10
                }}>
                {/* Screen Overlay */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: -20,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: COLORS.secondary,
                        opacity: scrollY.interpolate({
                            inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 80],
                            outputRange: [0, 1],
                        })
                    }}
                />

                {/* Header Bar Title */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        alignItems: "center",
                        justifyContent: "flex-end",
                        paddingBottom: 20,
                        opacity: scrollY.interpolate({
                            inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                            outputRange: [0, 1],
                        }),
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                                    outputRange: [0, 1],
                                    extrapolate: "clamp"
                                })
                            }
                        ]
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>{restaurant.name}</Text>
                </Animated.View>

                <TopButtons back={goBack} item={restaurant} />
            </View>
        )
    }

    function RenderMenuHeader() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    paddingHorizontal: 30,
                    paddingBottom: 10,
                    marginTop: 20,
                    marginBottom: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.lightGray
                }}>

                <Text style={{ flex: 1, fontSize: 26 }}>Menu</Text>
                <Text style={{ color: COLORS.dark, fontSize: 16, marginTop: 5 }}>
                    {dishes?.length} items
                </Text>

            </View>
        )
    }

    function RenderCheckout() {
        return (
            <Pressable onPress={goToCart} style={styles.Checkout}>
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

    if (!restaurant) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size={"large"} color={COLORS.primary} />
            </View>)
    } else return (
        <View style={styles.container}>
            <Animated.FlatList
                data={dishes}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* Header */}
                        {renderRestaurantcardHeader()}
                        {/* Menu Header */}
                        {RenderMenuHeader()}

                    </View>
                }
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { y: scrollY } } }
                ], { useNativeDriver: true })}
                renderItem={({ item }) => (
                    <MenuItem item={item} />
                )}
            >
            </Animated.FlatList>
            {renderHearderBar()}
            {cart.length > 0 ? RenderCheckout() : []}
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background,
    },

    itemImage: {
        height: "45%",
        width: "100%",
        position: "absolute",
    },

    itemInfo: {
        position: "absolute",
        bottom: 10,
        left: 30,
        right: 30,
        height: 100,
    },
    Checkout: {
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
export default RestaurantInfoScreen;
