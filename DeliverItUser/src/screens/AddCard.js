//import liraries
import React, { Component, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    SafeAreaView,
    ImageBackground,
    ScrollView
} from "react-native";
import COLORS from "../../assets/constants/colors";
import icons from "../../assets/constants/icons";
import profile from "../../assets/constants/profile";
import Header from "../components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FormInput from "../components/FormInput";

import utils from '../utils/Utils'

// create a component
const AddCartScreen = ({ navigation }) => {
    const cardTypes = profile.cardType;
    const [cardType, setCardType] = useState('');
    const [data, setData] = React.useState([]);

    const insets = useSafeAreaInsets();
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardNumberError, setCardNumberError] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [expireDateError, setExpireDateError] = useState('');
    const [cvv, setCvv] = useState('');
    const [cvvError, setCvvError] = useState('');

    React.useEffect(() => {
        let newArray = cardTypes.map((item) => {
            return { key: item.id, value: item.name }
        })
        setData(newArray)
    }, [])

    const handleAddCard = () => {
        alert(
            cardName + '\n' +
            cardType.name + '\n' +
            cardNumber + '\n' +
            expireDate + '\n' +
            cvv
        )
    }

    function isEnableAddCard() {
        return Boolean(
            cardType !== '' &&
            cardNumber !== '' &&
            expireDate !== '' &&
            cvv !== '' &&
            cardNumberError === '' &&
            expireDateError === '' &&
            cvvError === '',
        );
    }

    function RenderHeader() {
        const insets = useSafeAreaInsets;
        return (
            <Header
                title="ADD NEW CARD"
                containerStyle={{
                    height: 50,
                    marginHorizontal: 20,
                    marginTop: insets.top
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

    function RenderForm() {
        return (
            <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                <FormInput
                    label="Name"
                    value={cardName}
                    inputContainerStyle={{
                        borderColor: COLORS.grey
                    }}
                    onChange={value => {
                        setCardName(value);
                    }}
                />
                <View style={{ marginVertical: 10 }}>
                    <View style={{ marginVertical: 10 }}>
                        <Text>Choose Card Type</Text>
                        <ScrollView horizontal>
                            {
                                cardTypes.map((item) => {
                                    return (
                                        <Pressable
                                            key={item.id}
                                            onPress={() => setCardType(item)}
                                            style={{
                                                justifyContent: 'center',
                                                backgroundColor: COLORS.secondary,
                                                marginEnd: 10,
                                                marginTop: 10,
                                                height: 40,
                                                width: 50,
                                                alignItems: 'center',
                                                borderColor: COLORS.primary,
                                                borderRadius: 8,
                                                opacity: cardType?.id === item.id ? 1 : 0.3
                                            }}
                                        >
                                            <Image
                                                resizeMode="contain"
                                                source={
                                                    item.icon
                                                }
                                                style={{
                                                    height: 45,
                                                    width: 40,
                                                }}
                                            />
                                        </Pressable>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View>

                <FormInput
                    label="Card Number"
                    keyboardType="number-pad"
                    maxLength={16}
                    value={cardNumber}
                    inputContainerStyle={{
                        borderColor: (cardNumber === '' || cardNumberError === '')
                            ? COLORS.grey
                            : COLORS.red
                    }}
                    onChange={(value) => {
                        setCardNumber(value
                            .replace(/\s/g, '')
                            .replace(/(\d{4})/g, '$1 ')
                            .trim(),
                        )
                        utils.validateInput(
                            value,
                            Platform.OS === 'android' ? 16 : 16,
                            setCardNumberError,
                        );
                    }}
                    appendComponent={
                        <View style={{ justifyContent: 'center' }}>
                            <Image
                                resizeMode="contain"
                                source={
                                    cardType?.image
                                }
                                style={{
                                    height: 45,
                                    width: 45,
                                }}
                            />
                        </View>
                    }
                />

                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <FormInput
                        label="Expire Date"
                        keyboardType="number-pad"
                        value={expireDate}
                        placeholder={'MMYY'}
                        maxLength={4}
                        containerStyle={{
                            flex: 1,
                        }}
                        inputContainerStyle={{
                            borderColor: (expireDate === '' || expireDateError === '')
                                ? COLORS.grey
                                : COLORS.red
                        }}
                        onChange={value => {
                            utils.validateInput(value, 4, setExpireDateError);
                            setExpireDate(value);
                        }}
                    />
                    <FormInput
                        label="CVV"
                        value={cvv}
                        placeholder={'123'}
                        keyboardType="number-pad"
                        maxLength={3}
                        containerStyle={{
                            flex: 1,
                            marginLeft: 10,
                        }}
                        inputContainerStyle={{
                            borderColor: (cvv === '' || cvvError === '')
                                ? COLORS.grey
                                : COLORS.red
                        }}
                        onChange={value => {
                            utils.validateInput(value, 3, setCvvError);
                            setCvv(value);
                        }}
                    />
                </View>
            </View>
        )
    }

    function RenderFooter() {
        return (
            <Pressable onPress={handleAddCard} disabled={!isEnableAddCard()} style={{
                opacity: isEnableAddCard() ? 1 : 0.3, ...styles.Footer
            }}>
                <Text style={{ fontSize: 24, color: COLORS.light, fontWeight: "800" }}>
                    Save
                </Text>
            </Pressable>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            {RenderHeader()}
            {RenderForm()}
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
        borderRadius: 20,
        backgroundColor: COLORS.primary
    }
});

//make this component available to the app
export default AddCartScreen;
