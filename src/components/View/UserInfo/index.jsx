import React, { FC } from "react";
import { Text, View } from "react-native";

import { StyleSheet } from "react-native";

import { useTheme } from "@react-navigation/native";

export const UserInfo = (props) => {
  const { name, balance } = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.headerTextContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{name}</Text>
      </View>
      <Text style={{ ...styles.headerText, ...styles.headerAmount }}>
        {balance}
      </Text>
    </View>
  );
};

const makeStyles = (colors) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerTextContainer: {
      paddingRight: 20,
    },
    headerText: {
      color: colors.BLACK,
      fontFamily: "open-regular",
      fontSize: 20,
    },
    headerAmount: {
      paddingLeft: 30,
    },
  });
