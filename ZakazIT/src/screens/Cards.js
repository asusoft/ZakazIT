//import liraries
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
} from "react-native";
import COLORS from "../../assets/constants/colors";
import icons from "../../assets/constants/icons";
import profile from "../../assets/constants/profile";
import Header from "../components/Header";
import { SwipeListView } from "react-native-swipe-list-view";
import { SafeAreaView } from 'react-native-safe-area-context'


// create a component
const CardScreen = ({ navigation }) => {

    const [cards, setCards] = useState(profile.myCards);

    const handleRemoveCard = (id) => {
        let newCardList = [...cards];
        const index = cards.findIndex(cards => cards.id === id);
        newCardList.splice(index, 1);
        setCards(newCardList);
    };

    function RenderHeader() {
        return (
            <Header
                title="MY CARDS"
                containerStyle={{
                    height: 50,
                    marginHorizontal: 20,
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

    const RenderCards = () => {
        return (
            <SwipeListView
                data={cards}
                key={item => `${item.id}`}
                contentContainerStyle={{
                    marginTop: 10,
                    marginHorizontal: 20,
                    paddingBottom: 20,
                }}
                disableRightSwipe={true}
                rightOpenValue={-65}
                renderItem={(data, rowMap) => {
                    return (
                        <View
                            style={{
                                height: 80,
                                backgroundColor: COLORS.secondary,
                                ...styles.cardHolder,
                            }}>
                            {/* Food Image */}
                            <View style={{ width: 50, height: 40, marginLeft: 10, marginRight: 10, borderRadius: 10, justifyContent: 'center', borderWidth: 1, borderColor: COLORS.lightGray, alignItems: 'center' }}>
                                <Image
                                    resizeMode="contain"
                                    source={data.item.type.icon}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        position: 'absolute',
                                        borderRadius: 10
                                    }}
                                />
                            </View>
                            {/* Food Info */}
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: COLORS.black, fontSize: 16, fontWeight: '600', marginStart: 20 }}>
                                    {data.item.type.name}
                                </Text>
                            </View>
                            {/* Quantity */}
                            <View style={{ height: 60, marginLeft: 10, marginRight: 10, borderRadius: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={{ color: COLORS.black }}>
                                    {data.item.card_no} 1234 1234 1234
                                </Text>
                            </View>
                        </View>
                    )
                }}

                renderHiddenItem={(data, rowMap) => {
                    return (
                        <Pressable
                            onPress={() => handleRemoveCard(data.item.id)}
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                backgroundColor: COLORS.primary,
                                ...styles.cardHolder,
                            }}
                        >
                            <Image style={{ height: 20, width: 20, marginRight: 10 }} source={icons.deleteIcon} />
                        </Pressable>
                    );
                }}
            />
        )
    }

    function RenderFooter() {
        return (
            <Pressable onPress={() => navigation.push('AddCardScreen')} style={styles.Footer}>
                <Text style={{ fontSize: 24, color: COLORS.light, fontWeight: "800" }}>
                    Add Card
                </Text>
            </Pressable>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {RenderHeader()}

            {
                cards.length > 0 ? RenderCards() : 
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: '600',
                        opacity: 0.5
                    }}>You have not added any card</Text>
                </View>
            
            }
            
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
    cardHolder: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
        borderRadius: 10,

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
