//import liraries
import { useRoute } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable, SafeAreaView } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import COLORS from '../../assets/constants/colors';
import Header from '../components/CartScreenComponents/Header';
import dummyData from '../../assets/constants/dummyData';
import icons from '../../assets/constants/icons';

const cart = dummyData.cart;

const renderCartList = () => {
    return (
        <SwipeListView
            data={cart}
            key={item => `${item.id}`}
            contentContainerStyle={{
                marginTop: 10,
                paddingHorizontal: 10,
                paddingBottom: 10 * 2,
            }}
            disableRightSwipe={true}
            rightOpenValue={-75}
            renderItem={(data, rowMap) => {
                return (
                    <View
                        style={{
                            height: 100,
                            backgroundColor: COLORS.lightGray2,
                            ...styles.cartItemContainer,
                        }}>
                        {/* Food Image */}
                        <View style={{ width: 90, height: 100, marginLeft: 10, marginRight: 10, borderRadius: 20, justifyContent: 'center'}}>
                            <Image
                                source={{ uri: data.item.image}}
                                style={{
                                    width: '80%',
                                    height: '80%',
                                    position: 'absolute',
                                    borderRadius: 10
                                }}
                            />
                        </View>
                        {/* Food Info */}
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: COLORS.black }}>
                                {data.item.name}
                            </Text>
                            <Text style={{ color: COLORS.primary}}>
                                ${data.item.price}
                            </Text>
                        </View>
                        {/* Quantity */}
                    </View>
                )
            }}

            renderHiddenItem={(data, rowMap) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      backgroundColor: COLORS.primary,
                      ...styles.cartItemContainer,
                    }}
                  >
                    <Image style={{height: 20, width: 20, marginRight: 10}} source={icons.deleteIcon} />
                    </View>
                );
              }}

        />
    )
}
// create a component
const CartScreen = ({ navigation }) => {

    const checkout = () => {
        navigation.navigate("CheckoutScreen")
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
            {renderCartList()}
            {/* Footer */}
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
