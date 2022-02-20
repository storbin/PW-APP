import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthScreen } from "../../../screens/auth/AuthScreen";
import { TABS } from "../../../shared/constants/navigation/tabs";

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStackNavigator.Screen name={TABS.AUTH} component={AuthScreen} />
    </AuthStackNavigator.Navigator>
  );
};
