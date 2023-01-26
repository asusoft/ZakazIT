import { Image, Pressable, StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import COLORS from '../../../assets/constants/colors';
import icons from '../../../assets/constants/icons';

const Categories = ({ categories }) => {
    const onPress = () => {
        console.warn('Category Pressed')
    }

    return (
        <View style={{ marginHorizontal: 15, marginBottom: 5, flexDirection: "row" }}>
            <FlatList
                data={categories}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.CategoryItems}
                renderItem={({ item }) => {
                    return (
                        <Pressable onPress={onPress} style={styles.CategoryItem}>
                            <Image source={{ uri: item.icon }} style={styles.ItemIcon} />
                            <Text style={styles.CategoryName}>{item.name}</Text>
                            <Text >From ₽120 </Text>
                        </Pressable>
                    );
                }}
            />
        </View>
    );
};

export default Categories;


const styles = StyleSheet.create({
    CategoryItem: {
        backgroundColor: COLORS.secondary,
        margin: 8,
        width: 140,
        height: 200,
        borderRadius: 25,
        justifyContent: "flex-start",
        padding: 15,
    },

    CategoryName: {
        fontSize: 15,
        fontWeight: "500",
        marginTop: 20
    },

    ItemIcon: {
        height: 110,
        width: 110,
    }
});
