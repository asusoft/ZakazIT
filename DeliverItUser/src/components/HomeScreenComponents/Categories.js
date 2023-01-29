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
        flexDirection: 'row',
        backgroundColor: COLORS.secondary,
        margin: 8,
        width: 130,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: "flex-start",
        padding: 15
    },

    CategoryName: {
        fontSize: 12,
        fontWeight: "500",
    },

    ItemIcon: {
        height: 40,
        width: 40,
        marginEnd: 10,
        resizeMode: "contain"
        
    }
});
