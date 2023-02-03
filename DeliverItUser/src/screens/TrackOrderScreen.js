//import liraries
import React, { Component, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, useWindowDimensions } from 'react-native';
import COLORS from '../../assets/constants/colors';
import Header from '../components/Header';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import icons from '../../assets/constants/icons';
import MapView, { AnimatedRegion, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import constants from '../../assets/constants/constants';
import MapViewDirections from 'react-native-maps-directions';
import utils from '../utils/Utils'
import Rating from '../components/RestaurantInfoScreenComponents/Rating';
import { useRoute } from '@react-navigation/native';
import dummyData from '../../assets/constants/dummyData';

// create a component
const TrackOrderScreen = ({ navigation, route }) => {
    const { order } = route.params;

    const ordersList = dummyData.orders;
    const orderStatuses = dummyData.OrderStatus;
    const [orderStatus, setOrderStatus] = useState( order.status.name)
    const [currentStatus, setCurrentStatus] = useState(1);

    const insets = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();
    const MAP_HEIGHT = width - 100
    const MAP_WIDTH = width - 40

    const mapView = useRef();
    const [region, setRegion] = useState(null);
    const [toLoc, setToLoc] = useState(null);
    const [courierLocation, setCourierLocation] = useState(null);
    const [angle, setAngle] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [duration, setDuration] = useState('');


   React.useEffect(() => {
    setCurrentStatus(order.status.id)
   }, [order])

    React.useEffect(() => {
        let region = {
            latitude: 48.714690,
            longitude: 44.530590,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
        };

        let myLocation = {
            latitude: 48.714690,
            longitude: 44.530590,
        };

        let courierLocation = {
            latitude: 48.756330,
            longitude: 44.478010,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
        };

        setRegion(region)
        setToLoc(myLocation)
        setCourierLocation(courierLocation)

    }, [])

    function RenderHeader() {
        return (
            <Header
                title="ORDER TRACKING"
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
        )
    }

    function RenderStatus(name, index) {
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    opacity: index <= currentStatus
                        ? 1
                        : 0.2,
                    backgroundColor: COLORS.primary
                }}>
                </View>
                <Text style={{ marginTop: 20 }}>{name}</Text>
            </View>

        )
    }

    function Divider(index) {
        return (
            <View style={{
                marginTop: -30,
                marginHorizontal: -8,
                width: 65,
                height: 5,
            }}>

                {index < currentStatus && (
                    <View
                        style={{
                            width: 65,
                            height: 5,
                            backgroundColor: COLORS.primary,
                            zIndex: -1,
                        }}
                    />
                )}
                {index >= currentStatus && (
                    <Image
                        source={icons.dotted_line}
                        style={{
                            width: 65,
                            height: 5,
                            opacity: index < currentStatus
                                ? 1
                                : 0.2,
                            tintColor: COLORS.primary
                        }}
                        resizeMode="cover"
                    />
                )}

            </View>
        )
    }

    function RenderMap() {

        return (
            <MapView
                ref={mapView}
                provider={PROVIDER_GOOGLE}
                style={{
                    margin: 20,
                    width: MAP_WIDTH,
                    height: MAP_HEIGHT,
                    borderRadius: 20,
                }}
                region={region}
                showsUserLocation
                followsUserLocation
            >

                {
                    courierLocation &&
                    <Marker
                        coordinate={courierLocation}
                        anchor={{ x: 0.5, y: 0.5 }}
                    >
                        <View style={{
                            height: 30,
                            width: 30,
                            alignItems: "center",
                            justifyContent: 'center',
                            borderRadius: 20,
                            backgroundColor: COLORS.primary
                        }}>
                            <Image style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.secondary,
                            }} source={icons.delivery} />

                        </View>
                    </Marker>
                }

                {
                    toLoc &&
                    <Marker
                        coordinate={toLoc}
                        anchor={{ x: 0.5, y: 0.5 }}
                    >
                        <View style={{
                            height: 30,
                            width: 30,
                            alignItems: "center",
                            justifyContent: 'center',
                            borderRadius: 20,
                            backgroundColor: COLORS.primary
                        }}>
                            <Image style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.secondary,
                            }} source={icons.home} />

                        </View>
                    </Marker>
                }
                <MapViewDirections
                    origin={courierLocation}
                    destination={toLoc}
                    apikey={constants.GOOGLE_MAP_API_KEY}
                    strokeWidth={5}
                    strokeColor={COLORS.primary}
                    optimizeWaypoints={true}
                    onReady={result => {
                        setDuration(Math.ceil(result.duration));
                        if (!isReady) {
                            mapView.current.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: MAP_WIDTH * 0.1,
                                    left: MAP_WIDTH * 0.1,
                                    top: MAP_HEIGHT * 0.1,
                                },
                            });

                            // Reposition the navigator
                            if (result.coordinates.length >= 2) {
                                let angle = utils.calculateAngle(result.coordinates);
                                setAngle(angle);
                            }
                            setIsReady(true);
                        }
                    }}
                />
            </MapView>
        )
    }

    function RenderOrderStatus() {
        return (
            <View style={{
                flexDirection: 'row',
                margin: 10,
                marginHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {orderStatuses.map((item, index) => (

                    index > 0 && index < orderStatuses.length - 1 ? [
                        RenderStatus(item.name, index),
                        Divider(index)
                    ] : index > 0 && index >= orderStatuses.length - 1 ?
                        RenderStatus(item.name, index)
                        : []


                ))}

            </View>
        )
    }

    function RenderInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 30
            }}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Image source={icons.time} style={{ height: 30, width: 30, tintColor: COLORS.primary, opacity: 3 }} />
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: '700', marginHorizontal: 5, color: COLORS.primary }}>{duration} Mins</Text>
                        <Text style={{ fontSize: 12, fontWeight: '500', marginHorizontal: 5, }}>Estimated delivery time</Text>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <Image source={icons.time} style={{ height: 30, width: 30, tintColor: COLORS.primary, opacity: 3 }} />
                    <View style={{ alignSelf: "flex-end" }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', marginHorizontal: 5, color: COLORS.primary }}>56748</Text>
                        <Text style={{ fontSize: 12, fontWeight: '500', marginHorizontal: 5, }}>order number</Text>
                    </View>
                </View>

            </View>
        )
    }

    function RenderCourierInfo() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: COLORS.secondary,
                marginTop: 20,
                borderTopRightRadius: 40,
                borderTopLeftRadius: 40,
                alignItems: 'center',
                padding: 20,
            }}
            >
                <View style={{
                    height: 75,
                    width: 75,
                    backgroundColor: COLORS.secondary,
                    borderRadius: 10,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: COLORS.lightGray,
                    justifyContent: 'center'
                }}>
                    <Image
                        resizeMode='contain'
                        source={icons.man} style={{
                            height: 70,
                            width: 70,
                        }}
                    />
                </View>
                <View style={{
                    margin: 10,
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600'
                    }}>Asusoft</Text>

                    <Rating rating={4.7} />
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                }}>
                    <View style={{
                        height: 60,
                        width: MAP_WIDTH / 2 - 20,
                        borderRadius: 20,
                        backgroundColor: COLORS.primary,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '500',
                            color: COLORS.white
                        }}> Message </Text>
                    </View>

                    <View style={{
                        height: 60,
                        marginStart: 30,
                        width: MAP_WIDTH / 2 - 20,
                        borderRadius: 20,
                        backgroundColor: COLORS.primary,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '500',
                                color: COLORS.white
                            }}
                        > Call </Text>
                    </View>

                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {/* Header */}
            {RenderHeader()}

            {/* Order Status */}
            {RenderOrderStatus()}

            {
                currentStatus < 4 && currentStatus > 1 ? [
                    RenderMap(),
                    RenderInfo(),
                    RenderCourierInfo(),
                ]
                :
                []
            }

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.background,
        flex: 1
    },
});

//make this component available to the app
export default TrackOrderScreen;