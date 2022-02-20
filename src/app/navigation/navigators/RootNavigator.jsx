import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { BottomTabNavigator } from "./tabs/BottomTabNavigator";

const Stack = createStackNavigator();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
