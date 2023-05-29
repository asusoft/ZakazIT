//import liraries
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ActivityIndicator } from 'react-native';
import COLORS from '../../assets/constants/colors';
import icons from '../../assets/constants/icons';
import TopButtons from '../components/RestaurantInfoScreenComponents/TopButtons';
import { useCartContext } from '../contexts/CartContext';

import { db } from '../../config';

// create a component
const DishInfoScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dish_ID = route.params?.dish_ID;
    const [sizes, setSizes] = useState([]);
    const [dish, setDish] = useState([])
    const [selectedSize, setSelectedSize] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(null);
    const [size, setSize] = useState(sizes[parseInt(selectedSize)] || {})

    const { addDishToCart } = useCartContext();

    React.useEffect(() => {
        db.collection("Dish").doc(dish_ID)
            .onSnapshot((doc) => {
                const dishData = doc.data()
                const dishObject = { ...dishData, id: dish_ID };
                setDish(dishObject)
            });

        db.collection("Sizes").where("dishID", "==", dish_ID)
            .onSnapshot((querySnapshot) => {
                const sizeList = [];
                querySnapshot.forEach((doc) => {
                    const sizeID = doc.id;
                    const size = doc.data()
                    sizeList.push({ ...size, id: sizeID.toString() });
                    const sortedSizes = sizeList.sort((a, b) => a.price - b.price);
                    setSizes(sortedSizes)
                });
            });
    }, [dish_ID])

    React.useEffect(() => {
        const size = sizes[parseInt(selectedSize)] || {};
        setSize(size)
        setPrice(size.price * quantity);
    }, [sizes, selectedSize, quantity]);


    const goBack = () => {
        navigation.goBack();
    }

    const updatePrice = () => {
        const size = sizes[parseInt(selectedSize)] || {};
        setSize(size)
        let price = size.price;
        const newPrice = price * quantity;
        setPrice(newPrice);
    }

    React.useEffect(() => {
        updatePrice();
    }, [selectedSize])


    const handleAddToCart = async () => {
        await addDishToCart(dish, size, quantity);
        navigation.goBack()
    }

    const onAdd = () => {
        let newQuantity;

        if (quantity < 99) {
            setQuantity(quantity + 1);
            newQuantity = quantity + 1;
            const size = sizes[parseInt(selectedSize)] || {};
            setSize(size)
            const newPrice = size.price * newQuantity;
            setPrice(newPrice);
        }
    }

    const onMinus = () => {
        let newQuantity;

        if (quantity > 1) {
            setQuantity(quantity - 1);
            newQuantity = quantity - 1;
            const size = sizes[parseInt(selectedSize)] || {};
            setSize(size)
            const newPrice = size.price * newQuantity;
            setPrice(newPrice);
        }
    }

    function RenderSizes() {
        const sizesLowercase = sizes.map(size => ({
            name: size.name.charAt(0).toUpperCase() + size.name.slice(1).toLowerCase(),
            price: size.price
        }));
        return (
            <View style={styles.sizeView}>
                <Text style={{ color: COLORS.black, fontSize: 18 }}>Sizes:</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginLeft: 20,
                    }}>
                    {sizesLowercase.map((item, index) => {
                        return (
                            <Pressable
                                key={index}
                                onPress={() => { setSelectedSize(index) }}
                                style={{
                                    marginRight: 10,
                                    height: 40,
                                    width: 75,
                                    backgroundColor: selectedSize === index
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
                                    color: selectedSize === index
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
            <Pressable onPress={handleAddToCart} style={styles.Pick}>
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
                        <Image style={{ height: 30, width: 35, tintColor: COLORS.transparentBlack }} source={icons.minus} />
                    </Pressable>

                    <View style={{
                        backgroundColor: COLORS.lightGray,
                        height: 60, width: 45,
                        alignItems: 'center',
                        justifyContent: "center"
                    }}
                    >
                        <Text style={{
                            fontSize: 25,
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
                        <Image style={{ height: 30, width: 35, tintColor: COLORS.primary }} source={icons.plus} />
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
    if (!dish) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size={"large"} color={COLORS.primary} />
            </View>)
    } else return (
        <View style={styles.container}>
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
                        <Text style={{ fontSize: 20, fontWeight: "600", }}>₽ {price}</Text>
                    </View>
                    {RenderSizes()}
                </View>
                <Image resizeMode='stretch' style={styles.itemImage} source={{ uri: dish?.image }} />
                {RenderCheckout()}
            </View>
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
    Header: {
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
        flex: 1,
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