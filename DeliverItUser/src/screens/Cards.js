//import liraries
import { useDrawerStatus } from "@react-navigation/drawer";
import React, { Component, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    SafeAreaView,
    FlatList,
    ImageBackground,
    useWindowDimensions,
    Animated,
    Dimensions,
    ScrollView
} from "react-native";
import COLORS from "../../assets/constants/colors";
import icons from "../../assets/constants/icons";
import profile from "../../assets/constants/profile";
import images from "../../assets/constants/images";
import dummyData from "../../assets/constants/dummyData";
import Header from "../components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const { width, height } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.85
const ITEM_HEIGHT = ITEM_WIDTH * 0.2
const SPACING = 10


// create a component
const CardScreen = ({ navigation }) => {
    const cards = profile.myCards;
    const drawerIsOpen = useDrawerStatus();


    function RenderHeader() {
        const insets = useSafeAreaInsets;
        return (
            <Header
                title="MY CARDS"
                containerStyle={{
                    height: 50,
                    marginHorizontal: 20,
                    marginTop: insets.top,
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
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={icons.back}
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

    const RenderCards = (card) => {
        return (
            <View key={card.id} style={styles.cardHolder}>
                <Image source={card.type.icon} style={{ height: 40, width: 50, resizeMode: "contain" }} />
                <Text style={{
                    marginHorizontal: 20,
                    fontSize: 18,
                    fontWeight: '600'
                }}>{card.type.name}</Text>

                <Text style={{
                    position: 'absolute',
                    right: 15,

                    fontSize: 12,
                    fontWeight: '600'
                }}>{card.card_no} 1234 1234 1234</Text>
            </View>
        )
    }

    function RenderFooter() {
        return (
            <Pressable style={styles.Footer}>
                <Text style={{ fontSize: 24, color: COLORS.light, fontWeight: "800" }}>
                    Add Card
                </Text>
            </Pressable>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {RenderHeader()}
            <ScrollView style={styles.cardsHolder} contentContainerStyle={{
                justifyContent: 'center',
                alignItems: "center"
            }}>
                {
                    cards.map((card, index) => {
                        return (
                            RenderCards(card)
                        )
                    })

                }
            </ScrollView>
            {RenderFooter()}
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background
    },
    cardsHolder: {
        flex: 1,
    },
    cardHolder: {
        height: ITEM_HEIGHT,
        width: ITEM_WIDTH,
        backgroundColor: COLORS.secondary,
        borderRadius: 10,
        alignItems: "center",
        padding: 20,
        flexDirection: 'row',
        marginBottom: 10

    },
    Footer: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "center",
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
export default CardScreen;
