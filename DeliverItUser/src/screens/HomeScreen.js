import React from 'react'
import { FlatList, SafeAreaView, ScrollView, Dimensions, StatusBar, Platform, StyleSheet, Text, View, Image } from 'react-native';
import dummyData from '../../assets/constants/dummyData';
import COLORS from '../../assets/constants/colors';
import Header from '../components/HomeScreenComponents/Header';
import SearchBar from '../components/HomeScreenComponents/SearchBar';
import Categories from '../components/HomeScreenComponents/Categories';
import RestaurantItem from '../components/HomeScreenComponents/RestaurantItem';


export default function HomeScreen() {
  return (
    <SafeAreaView style={[styles.container, styles.droidSafeArea]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <SearchBar />
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: 20, marginBottom: 10 }}>
            <Text style={styles.SectionHeader}>Popular Catergories</Text>
            <Text style={{ fontSize: 15, alignSelf: "flex-end" }}>See all </Text>
          </View>
          <Categories categories={dummyData.dishCategories} />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: 20, marginBottom: 10 }}>
          <Text style={styles.SectionHeader}>Restaurants</Text>
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
});
