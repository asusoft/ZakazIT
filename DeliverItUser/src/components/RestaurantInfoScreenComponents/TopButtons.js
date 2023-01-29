//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import icons from '../../../assets/constants/icons';
import COLORS from '../../../assets/constants/colors';

// create a component
const TopButtons = ({ back, item }) => {
    return (
        <View style={styles.container}>
            {/* Back Button */}
            <Pressable
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: 40,
                    width: 40,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: COLORS.lightGray,
                    backgroundColor: COLORS.transparentBlack
                }}
                onPress={back}
            >
                <Image
                    source={icons.back}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.lightGray
                    }}
                />
            </Pressable>

            {/* Like Button */}
            <Pressable
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: 40,
                    width: 40,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: COLORS.lightGray,
                    backgroundColor: COLORS.transparentBlack
                }}
                onPress={back}
            >
                <Image
                    source={item?.isFavorite ? icons.heartFilled : icons.heart}
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.red
                    }}
                />

            </Pressable>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 90,
        flexDirection: 'row',
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 10
    },
});

//make this component available to the app
export default TopButtons;
