import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";

import DrawerView from './DrawerView';
import COLORS from '../../assets/constants/colors';
import CustomDrawerContent from './CustomDrawerContent'
import HomeScreen from "../screens/HomeScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: "#FF0000"
        }}>
            <Drawer.Navigator
                initialRouteName="Index"
                drawerType="slide"
                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                        width: 250,
                        backgroundColor: COLORS.primary
                    },
                    overlayColor: "transparent",
                    drawerLabelStyle: {
                        fontWeight: "bold",
                        fontSize: 20,
                        marginStart: 5

                    },
                    drawerActiveTintColor: COLORS.white,
                    drawerInactiveTintColor: COLORS.dark,
                    activeBackgroundColor: 'white',
                    drawerItemStyle: { backgroundColor: null },
                    swipeEnabled: true,
                    sceneContainerStyle: {
                        backgroundColor: COLORS.primary,
                    }
                }}
                drawerContent={props => {
                    return <CustomDrawerContent 
                                {...props} 
                                selectedTab={selectedTab} 
                                setSelectedTab={setSelectedTab}
                                />;
                }}
            >
                <Drawer.Screen
                    name="Index">
                    {props => (
                        <DrawerView styler={styles.container}>
                            <HomeScreen {...props} />
                        </DrawerView>
                    )}
                </Drawer.Screen>
            </Drawer.Navigator>
        </View>
    )
}


function mapStateToProps(state) {
    return {
      selectedTab: state.tabReducer.selectedTab
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return{
      setSelectedTab: (selectedTab) => {
        return dispatch (setSelectedTab(selectedTab))
      }
    }
  }

  export default DrawerNavigation;