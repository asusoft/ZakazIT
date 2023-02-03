import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import icons from "../../assets/constants/icons";


const CustomDrawerItem = ({ onPress, label, icon, isFocused }) => {
  return (
    <TouchableOpacity
      style={[
        styles.drawerItem,
        { backgroundColor: isFocused ? COLORS.transparentBlack : null },
      ]}
      onPress={onPress}>
      <Image style={styles.drawerImage} source={icon} />
      <Text style={styles.drawerItemLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView
      style={{
        paddingVertical: 30
      }}
    >
      <View
        style={{
          marginLeft: 20
        }}
      >
        <View
          style={{
            marginLeft: 15,
            marginVertical: 10
          }}
        >
          <Image
            source={images.logo1_white}
            style={{ height: 130, width: 130, borderRadius: 20, }}
          />
        </View>
        <View style={{ flex: 1, marginBottom: 20, height:600}}>

          <DrawerItemList {...props} />

          <View style={{ position: 'absolute', bottom: 0}}>
            <CustomDrawerItem label={'Logout'} icon={icons.cross} />
          </View>
          {/*} <CustomDrawerItem 
            label={'Home'} 
            icon={icons.home} 
            isFocused={selectedTab === screens.home}
            onPress={() => {
              setSelectedTab(screens.home);
              navigation.navigate('Home');
            }}/>
          <CustomDrawerItem 
            label={'My Cart'} 
            icon={icons.cart} 
            isFocused={selectedTab === screens.cart}
            onPress={() => {
              setSelectedTab(screens.cart);
              navigation.navigate('Cart');
            }}
            />
          <CustomDrawerItem 
            navigation={navigation} 
            label={'My Orders'} 
            icon={icons.list} 
            isFocused={selectedTab === screens.order}
            onPress={() => {
              setSelectedTab(screens.order);
              navigation.navigate('Orders');
            }}
            />
          <CustomDrawerItem 
            navigation={navigation} 
            label={'My Cards'} 
            icon={icons.cards} 
            isFocused={selectedTab === screens.profile}
            onPress={() => {
              setSelectedTab(screens.profile);
              navigation.navigate('Cards');
            }}
            /> */}
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: 'row',
    height: 50,
    marginBottom: 10,
    alignItems: 'center',
    paddingLeft: 15,
    borderRadius: 12,
  },
  drawerImage: {
    width: 25,
    height: 25,
    tintColor: COLORS.white,
  },
  drawerItemLabel: {
    marginLeft: 15,
    color: COLORS.white,
    fontSize: 20
  },
});


