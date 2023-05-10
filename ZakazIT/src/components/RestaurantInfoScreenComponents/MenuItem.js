//import liraries
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import COLORS from '../../../assets/constants/colors';
import icons from '../../../assets/constants/icons';



// create a component
const MenuItem = ({ item }) => {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() =>
            navigation.navigate('DishInfoScreen',
                { dish_ID: item.id}
            )
        }
            style={styles.container}>
            <View style={styles.itemImageContainer}>
                <Image style={styles.itemImage} source={{ uri: item.image }} />
            </View>
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription} numberOfLines={1}>{item.description}</Text>
                <Text style={styles.itemPrice}>$</Text>
            </View>
            <View style={styles.itemOptions}>
                <TouchableOpacity style={styles.like}>
                    <Image source={item?.isFavorite ? icons.heartFilled : icons.heart} style={{ height: 20, width: 20 }} />
                </TouchableOpacity>
            </View>
        </Pressable>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 20,
        backgroundColor: COLORS.secondary,
        borderRadius: 15,
        borderBottomColor: COLORS.lightGray,
        borderBottomWidth: 1

    },

    itemImageContainer: {
        height: 100,
        width: 100,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    itemImage: {
        height: "90%",
        width: "90%",
        borderRadius: 10
    },
    itemInfo: {
        flex: 1,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: "space-around"
    },
    itemName: {
        fontSize: 14,
        fontWeight: "600"
    },
    itemDescription: {
        fontSize: 13,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: "600"
    },
});

//make this component available to the app
export default MenuItem;
