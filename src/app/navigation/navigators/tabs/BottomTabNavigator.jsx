import React from "react";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";

import { TransferListScreen } from "../../../../screens/payment/TransferListScreen";
import { PaymentScreen } from "../../../../screens/payment/PaymentScreen";
import { logOut } from "../../../../screens/auth/AuthScreen/store/actions/logOut";
import { TABS } from "../../../../shared/constants/navigation/tabs";

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();

  return (
    <BottomTab.Navigator
      initialRouteName={TABS.PAYMENTS}
      screenOptions={{
        title: "",
        headerStyle: {
          backgroundColor: colors.WHITE,
          with: 200,
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.BLACK,
        tabBarStyle: {
          backgroundColor: colors.BLACK,
        },
        headerLeft: () => (
          <TouchableOpacity
            style={styles.headerLeft}
            onPress={() => dispatch(logOut())}
          >
            <Ionicons
              name={"return-up-back-outline"}
              size={40}
              color={colors.BLACK}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <BottomTab.Screen
        name={TABS.PAYMENTS}
        component={PaymentScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={30} color={colors.WHITE} />
          ),
        }}
      />
      <BottomTab.Screen
        name={TABS.TRANSACTIONS}
        component={TransferListScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="reader-outline" size={30} color={colors.WHITE} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const makeStyles = (colors) =>
  StyleSheet.create({
    headerLeft: {
      paddingLeft: 20,
      // transform: [
      //   {
      //     rotate: "180deg",
      //   },
      // ],
    },
  });
