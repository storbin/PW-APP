import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "@react-navigation/native";

export const MyButton = (props) => {
  const { onPress, title, disabled = false } = props;
  const { colors } = useTheme();
  const styles = makeStyles(colors, disabled);
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const makeStyles = (colors, disabled) =>
  StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: disabled ? colors.GREY : colors.BLACK,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: colors.WHITE,
    },
  });
