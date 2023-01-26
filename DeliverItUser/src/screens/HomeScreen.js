import React from 'react'
import { FlatList, SafeAreaView, ScrollView, Dimensions, StatusBar, Platform, StyleSheet, Text, View } from 'react-native';


import COLORS from '../../assets/constants/colors';
import Header from '../components/HomeScreenComponents/Header';
import SearchBar from '../components/HomeScreenComponents/SearchBar';


export default function HomeScreen() {
  return (
    <SafeAreaView style={[styles.container, styles.droidSafeArea]}>
      <Header />
      <SearchBar />
      </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  RestourantItemContainer: {
    marginVertical: 10,
    marginRight: 20,
    marginLeft: 10,
  },

  SectionHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginStart: 25,
  },

  CategoryItems: {
    borderRadius: 20,
    paddingLeft: 10,
    margin: 10,
  },

  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 0
  },
});
