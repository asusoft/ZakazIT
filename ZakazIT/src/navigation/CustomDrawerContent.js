import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList
} from "@react-navigation/drawer";

import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import icons from "../../assets/constants/icons";

import { useAuthContext } from "../contexts/AuthContext";

const CustomDrawerItem = ({ label, icon, isFocused }) => {
  const { signOut } = useAuthContext()
  return (
    <TouchableOpacity
      style={[
        styles.drawerItem,
        { backgroundColor: isFocused ? COLORS.transparentBlack : null }
      ]}
      onPress={signOut}
    >
      <Image style={styles.drawerImage} source={icon} />
      <Text style={styles.drawerItemLabel}> {label} </Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = (props) => {
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
            style={{ height: 130, width: 130, borderRadius: 20 }}
          />
        </View>
        <View style={{ flex: 1, marginBottom: 20, height: 600 }}>
          <DrawerItemList {...props} />
          <View style={{ position: "absolute", bottom: 0 }}>
            <CustomDrawerItem label={"Logout"} icon={icons.cross} />
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: "row",
    height: 50,
    marginBottom: 10,
    alignItems: "center",
    paddingLeft: 15,
    borderRadius: 12
  },
  drawerImage: {
    width: 25,
    height: 25,
    tintColor: COLORS.white
  },
  drawerItemLabel: {
    marginLeft: 15,
    color: COLORS.white,
    fontSize: 20
  }
});
