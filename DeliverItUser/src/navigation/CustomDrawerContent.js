import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  DrawerContentScrollView,
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

const CustomDrawerContent = ({ navigation }) => {
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
            source = {images.logo1_white}
            style={{ height: 130, width: 130, borderRadius: 20,}}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <CustomDrawerItem navigation={navigation} label={'Home'} icon={icons.home} isFocused={true}/>
          <CustomDrawerItem navigation={navigation} label={'My Cart'} icon={icons.cart} />
          <CustomDrawerItem navigation={navigation} label={'My Orders'} icon={icons.list} />
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


