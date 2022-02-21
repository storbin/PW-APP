import React, { FC } from "react";
import { Text, View } from "react-native";

import { StyleSheet } from "react-native";

import { useTheme } from "@react-navigation/native";

export const UserInfo = (props) => {
  const { name, balance } = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.textContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Name: {name}</Text>
      </View>
      <Text style={{ ...styles.text, ...styles.amount }}>PW: {balance}</Text>
    </View>
  );
};

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    textContainer: {
      paddingRight: 20,
    },
    text: {
      color: colors.BLACK,
      fontFamily: "open-regular",
      fontSize: 20,
    },
    amount: {
      paddingLeft: 30,
    },
  });
