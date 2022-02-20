import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";

import { useTheme } from "@react-navigation/native";
import { setDidTryAl } from "./auth/AuthScreen/store/actions/setDidTryAl";
import { authenticate } from "./auth/AuthScreen/store/actions/authenticate";

import { StyleSheet } from "react-native";

export const LoadingScreen = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  useEffect(() => {
    const trySignIn = async () => {
      const id_token = await AsyncStorage.getItem("token");

      if (!id_token) {
        dispatch(setDidTryAl());
        return;
      }

      dispatch(authenticate({ id_token }));
    };

    trySignIn();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={colors.BLACK} />
    </View>
  );
};

const makeStyles = (colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
