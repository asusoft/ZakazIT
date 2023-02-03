import React from 'react'
import { FlatList, ScrollView, Dimensions, StatusBar, Platform, StyleSheet, Text, View, Image, TouchableOpacity, Pressable, useWindowDimensions } from 'react-native';
import dummyData from '../../assets/constants/dummyData';
import COLORS from '../../assets/constants/colors';
import Header from '../components/HomeScreenComponents/Header';
import SearchBar from '../components/HomeScreenComponents/SearchBar';
import Categories from '../components/HomeScreenComponents/Categories';
import RestaurantItem from '../components/HomeScreenComponents/RestaurantItem';
import profile from '../../assets/constants/profile';
import { useNavigation } from '@react-navigation/native';
import icons from '../../assets/constants/icons';
import { SafeAreaView } from 'react-native-safe-area-context'


export default function HomeScreen() {
  const {height} = useWindowDimensions()
  const navigation = useNavigation();

  function RenderCart() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 70,
          width: 70,
          borderRadius: 35,
          backgroundColor: COLORS.primary,
        }}
      >
        <Image
          source={icons.cart}
          style={{
            width: 45,
            height: 45,
            tintColor: COLORS.white
          }}
        />

        <View style={styles.badge}>
          <Text style={styles.quantityNumber}>3</Text>
        </View>

      </View>
    )
  }
  return (
    <SafeAreaView style={[styles.container, styles.droidSafeArea]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header profile={profile.myProfile} />
        <SearchBar />
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: 20, marginBottom: 10 }}>
            <Text style={styles.SectionHeader}>Explore Catergories</Text>
            <Pressable onPress={() => navigation.navigate('Profile')}>
              <Text style={{ fontSize: 15, alignSelf: "flex-end" }}>See all </Text>
            </Pressable>
          </View>
          <Categories categories={dummyData.dishCategories} />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: 20, marginBottom: 10 }}>
          <Text style={styles.SectionHeader}>Popular Restaurants</Text>
        </View>
        <FlatList data={dummyData.Restaurants}
          renderItem={({ item }) => <RestaurantItem restaurant={item} />}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  SectionHeader: {
    fontSize: 20,
    fontWeight: "500",
    marginStart: 25,
    marginTop: 10
  },

  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 5,
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  quantityNumber: {
    ...Platform.select({
      android: { lineHeight: 17 },
      ios: { lineHeight: 0 },
    }),
    fontSize: 14,
  },
});
