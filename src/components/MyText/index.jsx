import React from "react";
import { Text, View } from "react-native";

import { StyleSheet } from "react-native";

import { useTheme } from "@react-navigation/native";

export const MyText = (props) => {
  const { color, style, isError, children } = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const customStyles = isError
    ? {
        ...styles.error,
        ...style,
      }
    : {
        ...styles.text,
        ...style,
        color,
      };

  return (
    <View style={isError && styles.errorContainer}>
      <Text style={customStyles} {...props}>
        {children}
      </Text>
    </View>
  );
};

const makeStyles = (colors) =>
  StyleSheet.create({
    text: {
      fontSize: 20,
      color: colors.BLACK,
      fontFamily: "open-regular",
    },
    errorContainer: {
      marginVertical: 5,
    },
    error: {
      color: colors.ERROR,
      fontSize: 15,
      fontWeight: "bold",
    },
  });
