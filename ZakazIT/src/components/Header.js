import React from 'react';
import { View, Text, ViewStyle, StyleSheet, TextStyle } from 'react-native';

const Header = ({
    title,
    containerStyle,
    leftComponent,
    rightComponent,
    titleStyle,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {/* Left */}
            {leftComponent}
            {/* Title */}
            <View style={styles.containerTitle}>
                <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
            </View>
            {/* Right */}
            {rightComponent}
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
    },
    containerTitle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleStyle: {
        color: 'black',
        fontSize: 18,
        fontWeight: "600",
    },
});
