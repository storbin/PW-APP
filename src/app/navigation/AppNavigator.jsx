import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { RootNavigator } from "./navigators/RootNavigator";
import { AuthNavigator } from "./navigators/AuthNavigator";
import { useSelector } from "react-redux";
import { MyTheme } from "../styles/theme";
import { LoadingScreen } from "../../screens/LoadingScreen";

export const AppNavigation = () => {
  const { isAuth, didTryAutoLogin } = useSelector((state) => {
    return {
      isAuth: !!state.auth.id_token,
      didTryAutoLogin: state.auth.didTryAutoLogin,
    };
  });

  return (
    <NavigationContainer theme={MyTheme}>
      {isAuth && <RootNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <LoadingScreen />}
    </NavigationContainer>
  );
};
