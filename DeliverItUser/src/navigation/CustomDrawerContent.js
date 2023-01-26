import "react-native-gesture-handler";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList
} from "@react-navigation/drawer";

import { View, Image, Text } from "react-native";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";

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
            source = {images.logo1_white}
            style={{ height: 130, width: 130, borderRadius: 20 }}
          />
        </View>
            <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
