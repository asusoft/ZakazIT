//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native';
import COLORS from '../../assets/constants/colors';
import Header from '../components/Header';
import icons from '../../assets/constants/icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDrawerStatus } from '@react-navigation/drawer';
import dummyData from '../../assets/constants/dummyData';
import RestaurantItem from '../components/HomeScreenComponents/RestaurantItem';
import MenuItem from '../components/RestaurantInfoScreenComponents/MenuItem';

// create a component
const Favorites = ({ navigation }) => {
    const drawerIsOpen = useDrawerStatus();
    const [restaurants, setRestaurants] = useState(dummyData.Restaurants)
    const [favRestaurants, setFavRestaurants] = useState()
    const [favDishes, setFavDishes] = useState()
    const [option, setOption] = useState(0);


    React.useEffect(() => {
        let newList = []
        restaurants.map((item) => {
            { item?.isFavorite ? newList.push(item) : [] }
        })
        newList.length > 0 ? setFavRestaurants(newList) : []
    }, [restaurants])

    React.useEffect(() => {
        let newDishList = []
        restaurants.map((restaurant) => {
            restaurant.dishes.map((dish) => {
                dish?.isFavorite ? newDishList.push(dish) : []
            })
            setFavDishes(newDishList)
        })
    }, [restaurants])

    function RenderHeader() {
        return (
            <Header
                title="MY FAVORITES"
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
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Image
                            source={drawerIsOpen === 'open' ? icons.cross : icons.menu}
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

    function RenderOptions() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20
            }}>
                <Pressable
                    onPress={() => setOption(0)}
                    style={{
                        height: 50,
                        width: 110,
                        backgroundColor: COLORS.primary,
                        opacity: option == 0 ? 1 : 0.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 12
                    }}>
                    <Text style={{
                        fontSize: 18, color: COLORS.white, fontWeight: '600'
                    }}>Restaurants</Text>

                </Pressable>

                <Pressable
                    onPress={() => setOption(1)}
                    style={{
                        height: 50,
                        width: 100,
                        backgroundColor: COLORS.primary,
                        opacity: option == 1 ? 1 : 0.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 12,
                        marginStart: 20
                    }}>
                    <Text style={{
                        fontSize: 18, color: COLORS.white, fontWeight: '600'
                    }}>Dishes</Text>

                </Pressable>

            </View>
        )
    }

    function RenderList() {
        return (
            <View>
                {
                    option == 0 ?
                        <FlatList data={favRestaurants}
                            renderItem={({ item }) => <RestaurantItem restaurant={item} />}
                            showsVerticalScrollIndicator={false}
                        />
                        :
                        <FlatList
                            data={favDishes}
                            keyExtractor={item => `${item.id}`}
                            renderItem={({ item }) => <MenuItem item={item} />}
                            showsVerticalScrollIndicator={false}
                        />
                }
            </View>
        )
    }
    return (

        <SafeAreaView style={[styles.container, styles.droidSafeArea]}>
            {/* Header */}
            {RenderHeader()}
            {/* Options */}
            {RenderOptions()}
            {/* List */}
            {RenderList()}
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
