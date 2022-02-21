import React from "react";
import { View, Text, TextInput } from "react-native";

import { MyText } from "../../MyText";

import { StyleSheet } from "react-native";

import { useTheme } from "@react-navigation/native";

export const MyTextInput = (props) => {
  const { label, errorText, touched } = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label && label}</Text>
      <TextInput style={styles.input} {...props} />
      {errorText && touched && (
        <View style={styles.errorContainer}>
          <MyText isError>{errorText}</MyText>
        </View>
      )}
    </View>
  );
};

const makeStyles = (colors) =>
  StyleSheet.create({
    wrapper: {
      width: "100%",
    },
    label: {
      fontFamily: "open-regular",
      fontSize: 20,
      marginVertical: 10,
      color: colors.BLACK,
    },
    input: {
      fontSize: 20,
      color: colors.BLACK,
      fontFamily: "open-regular",
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderBottomColor: colors.BLACK,
      borderBottomWidth: 1,
    },
    errorContainer: {
      marginVertical: 5,
    },
    errorText: {
      color: colors.ERROR,
      fontSize: 15,
      fontWeight: "bold",
    },
  });
