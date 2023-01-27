//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../../assets/constants/colors';
import Rating from './Rating';

// create a component

const RestaurantInfo = ({restaurant}) => {
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20, fontWeight: "700"}}>{restaurant.name}</Text>
            <Text style={{fontSize: 16, color: COLORS.grey,opacity: 1}}>{restaurant.address}</Text>
            <Text style={{fontSize: 16, }}>Delivers in {restaurant.minDeliveryTime} - {restaurant.maxDeliveryTime} mins</Text>
            <Rating rating={restaurant.rating}/>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        backgroundColor: COLORS.secondary,
        borderRadius: 15,
        justifyContent: "space-between",
        alignItems: "center"
       
    },
});

//make this component available to the app
export default RestaurantInfo;
