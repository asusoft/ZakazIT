//import liraries
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, SafeAreaView } from 'react-native';
import COLORS from '../../assets/constants/colors';
import icons from '../../assets/constants/icons';
import TopButtons from '../components/RestaurantInfoScreenComponents/TopButtons';

// create a component
const DishInfoScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { dish, previous_screen } = route.params;
    const goBack = () => {
        navigation.goBack();
    }


    const [selectedSize, setSelectedSize] = useState('2');
    const [quantity, setQuantity] = useState(1);

    const size = dish.sizes[parseInt(selectedSize) - 1];
    const Price = size.price * quantity;

    const [price, setPrice] = useState(Price);

    const updatePrice = () => {
        let index = parseInt(selectedSize) - 1
        const size = dish.sizes[parseInt(selectedSize) - 1];
        let price = size.price;
        const newPrice = price * quantity;
        setPrice(newPrice);
    }


    const onAdd = () => {
        setQuantity(quantity + 1);
        const size = dish.sizes[parseInt(selectedSize) - 1];
        const newQuantity = quantity + 1;
        const newPrice = size.price * newQuantity;
        setPrice(newPrice);
    }

    const onMinus = () => {
        let newQuantity;

        if (quantity > 1) {
            setQuantity(quantity - 1);
            newQuantity = quantity - 1;
            const size = dish.sizes[parseInt(selectedSize) - 1];
            const newPrice = size.price * newQuantity;
            setPrice(newPrice);
        }
    }
    function RenderSizes() {
        return (
            <View style={styles.sizeView}>
                <Text style={{ color: COLORS.black, fontSize: 18 }}>Sizes:</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginLeft: 20,
                    }}>
                    {dish.sizes.map((item, index) => {
                        return (
                            <Pressable
                                onPress={() => { setSelectedSize(item.id.toString()); updatePrice() }}
                                style={{
                                    marginRight: 10,
                                    height: 40,
                                    width: 75,
                                    backgroundColor: selectedSize === item.id.toString()
                                        ? COLORS.primary
                                        : COLORS.background,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                    padding: 5
                                }}
                            >
                                <Text style={{
                                    fontSize: 18,
                                    color: selectedSize === item.id.toString()
                                        ? COLORS.white
                                        : COLORS.grey,

                                }}
                                >
                                    {item.name}</Text>
                            </Pressable>
                        );
                    })}
                </View>
            </View>
        )
    }

    function RenderCheckout() {
        return (
            <Pressable style={styles.Pick}>
                <View style={{ flexDirection: "row", borderRadius: 20 }}>
                    <Pressable onPress={
                        onMinus
                    }
                        style={{
                            backgroundColor: COLORS.lightGray,
                            height: 60, width: 40,
                            borderTopLeftRadius: 20,
                            borderBottomLeftRadius: 20,
                            alignItems: 'center',
                            justifyContent: "center"
                        }}
                    >
                        <Image style={{ height: 30, width: 35 }} source={icons.minus} />
                    </Pressable>

                    <View style={{
                        backgroundColor: COLORS.lightGray,
                        height: 60, width: 40,
                        alignItems: 'center',
                        justifyContent: "center"
                    }}
                    >
                        <Text style={{
                            fontSize: 30,
                            color: COLORS.black,
                            fontWeight: "600"
                        }}
                        > {quantity}
                        </Text>
                    </View>

                    <Pressable onPress={
                        onAdd
                    }
                        style={{
                            backgroundColor: COLORS.lightGray,
                            height: 60, width: 40,
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20,
                            alignItems: 'center',
                            justifyContent: "center"
                        }}
                    >
                        <Image style={{ height: 30, width: 35, tintColor: COLORS.red }} source={icons.plus} />
                    </Pressable>
                </View>

                <View
                    style={{
                        backgroundColor: COLORS.primary,
                        height: 60, flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: "space-between",
                        marginLeft: 15,
                        borderRadius: 20,
                        padding: 10
                    }}
                >
                    <Text style={{ fontSize: 18, color: COLORS.light, fontWeight: "500" }}> Add to cart</Text>
                    <Text style={{ fontSize: 18, color: COLORS.light, fontWeight: "700" }}> ₽{price}</Text>
                </View>
            </Pressable>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.Header}>
                <TopButtons back={goBack} item={dish} />
            </View>
            {/* Info */}
            <View style={styles.itemContent}>
                <View style={styles.itemInfo}>
                    <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 10 }}>{dish.name}</Text>
                    <Text style={{ fontSize: 16, }}>{dish.description}</Text>
                    <View style={{ marginTop: 30, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, fontWeight: "600", }}>{dish.price}</Text>
                        <Text style={{ fontSize: 20, fontWeight: "600", marginLeft: 10 }}>{dish.price}</Text>
                        <Text style={{ fontSize: 20, fontWeight: "600", marginLeft: 10 }}>{dish.price}</Text>
                    </View>
                    {RenderSizes()}
                </View>
                <Image style={styles.itemImage} source={{ uri: dish.image }} />
                {RenderCheckout()}
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
    Header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 100,
        flexDirection: 'row',
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 10,
        backgroundColor: COLORS.primary
    },
    itemContent: {
        height: "100%",
        marginTop: 30,
        backgroundColor: COLORS.primary,
        alignItems: "center",
    },
    itemImage: {
        position: 'absolute',
        top: 10,
        height: 250,
        width: 250,
        borderRadius: 150
    },
    itemInfo: {
        backgroundColor: COLORS.secondary,
        height: "100%",
        width: "100%",
        padding: 20,
        top: 125,
        paddingTop: 170,
        borderRadius: 40,
    },
    sizeView: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    },
    Pick: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        bottom: 50,
        right: 30,
        left: 30,
        height: 60,
        borderRadius: 20
    }
});

//make this component available to the app
export default DishInfoScreen;
