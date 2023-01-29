//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, Image, SafeAreaView } from 'react-native';
import COLORS from '../../assets/constants/colors';
import icons from '../../assets/constants/icons';

// create a component
const Payment = ({ navigation, route }) => {
    const { isSuccess, paymentMethod } = route.params;
    const handleClick = () => {
        isSuccess ? navigation.navigate('Orders') :
        navigation.goBack()
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* Message */}

            <View style={styles.Message}>

                <Image style={{
                    height: 120,
                    width: 120,
                    borderRadius: 25,
                    resizeMode: "cover",
                    marginBottom: 10,
                    tintColor: isSuccess ? COLORS.green :
                        COLORS.red

                }}
                    source={
                        isSuccess ? icons.correct :
                            icons.cancel
                    } />
                <Text style={{ fontSize: 24, fontWeight: "600" }}> {isSuccess ? `Congratulations!` :
                    `Oppss!`}</Text>
                <Text style={{ fontSize: 18 }}> {isSuccess ? 'Payment was successfully made!' : 'Payment was not successfully made!'} </Text>

            </View>

            {/* Info */}

            <View style={styles.Info}>
                <View style={{ flexDirection: 'row', borderBottomWidth: 2, justifyContent: "space-between", paddingBottom: 15 }}>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>Total amount</Text>
                    <View style={{ alignItems: "flex-end" }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "600",
                            marginBottom: 5,
                            color: isSuccess ? COLORS.green :
                            COLORS.red
                        }}
                        >
                            $300
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 5, opacity: 0.5 }}>28.01.2023</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: "space-between", paddingBottom: 15, marginTop: 10 }}>
                    <Image style={{height:50, width: 50, resizeMode: "contain"}} source={icons.mastercard} />
                    <View style={{ alignItems: "flex-end" }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "600",
                            marginBottom: 5,
                        }}
                        >
                            Abubakar Shehu Umar
                        </Text>
                        <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 5, opacity: 0.5 }}>**** **** **** 5903</Text>
                    </View>
                </View>


            </View>

            {/* Footer */}
            <Pressable onPress={handleClick} style={styles.Footer}>
                <Text style={{ fontSize: 24, color: COLORS.light, fontWeight: "800" }}> {isSuccess ? `Go to Order` : `Change Payment method`}</Text>
            </Pressable>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    Message: {
        alignItems: 'center',
        justifyContent: 'center',
        height: "30%",
        width: "85%",
        backgroundColor: COLORS.secondary,
        borderRadius: 40,
        marginHorizontal: 100
    },
    Info: {
        marginTop: 50,
        padding: 20,
        paddingHorizontal: 35,
        height: "20%",
        width: "85%",
        backgroundColor: COLORS.secondary
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
export default Payment;
