//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Pressable} from 'react-native';
import COLORS from '../../assets/constants/colors';
import Header from '../components/Header';
import icons from '../../assets/constants/icons';
import { SafeAreaView } from 'react-native-safe-area-context'

// create a component
const Favorites = ({navigation}) => {
   
    function RenderHeader() {
        return (
            <Header
                title="MY FAVORITES"
                containerStyle={{
                    height: 50,
                    marginHorizontal: 20,
                    marginTop: 10,
                }}
                titleStyle={{}}
                leftComponent={
                    <Pressable
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: 35,
                            width: 35,
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: COLORS.dark,
                            backgroundColor: COLORS.background
                        }}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Image
                            source={icons.menu}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.dark
                            }}
                        />
                    </Pressable>
                }
                rightComponent={<View style={{ width: 40 }} />}
            />
        );
    }
    return (
        <SafeAreaView style={[styles.container, styles.droidSafeArea]}>
            {/* Header */}
            {RenderHeader()}
            {/* Options */}

            {/* List */}
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
});

//make this component available to the app
export default Favorites;
