import React, { useState } from 'react'
import { FlatList, ScrollView, Platform, StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import COLORS from '../../assets/constants/colors';
import Header from '../components/HomeScreenComponents/Header';
import SearchBar from '../components/HomeScreenComponents/SearchBar';
import CategoriesComponent from '../components/HomeScreenComponents/CategoriesComponent';
import RestaurantItem from '../components/HomeScreenComponents/RestaurantItem';
import profile from '../../assets/constants/profile';
import { useNavigation } from '@react-navigation/native';
import icons from '../../assets/constants/icons';
import { SafeAreaView } from 'react-native-safe-area-context'

import { DataStore } from 'aws-amplify';
import { Restaurant, Categories} from '../models'
import { useAuthContext } from '../contexts/AuthContext';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [restaurants, setRestaurants] = useState([])
  const [categories, setCategories] = useState([])

  React.useEffect(() => {
    DataStore.query(Restaurant).then(setRestaurants).catch(function(error) {
      Alert.alert("Error", error.message);
    });
    DataStore.query(Categories).then(setCategories).catch(function(error) {
      Alert.alert("Error", error.message);
    });

  }, [])

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
          <CategoriesComponent categories={categories} />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: 20, marginBottom: 10 }}>
          <Text style={styles.SectionHeader}>Popular Restaurants</Text>
        </View>
        <FlatList data={restaurants}
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
