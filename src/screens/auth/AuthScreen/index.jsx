import React, { FC, useState } from "react";
import { ActivityIndicator, Button, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { Formik } from "formik";

import { useTheme } from "@react-navigation/native";
import { authValidate } from "./helpers/validate";
import { logIn } from "./store/actions/logIn";

import { setError } from "./store/actions/setError";
import { useSelector } from "react-redux";
import { MyText } from "../../../components/MyText";

import { StyleSheet } from "react-native";
import { MyTextInput } from "../../../components/MyInputs/MyTextInput";
import { MyButton } from "../../../components/MyButtons/MyButton";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
};

export const AuthScreen = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const authHandler = async ({ email, password, username }) => {
    setIsLoading(true);
    try {
      await dispatch(
        logIn(isSignUp ? { email, password, username } : { email, password })
      );
      setIsLoading(false);
    } catch (err) {
      const { data } = await err.response;

      await dispatch(setError(data));
      setIsLoading(false);
    }
  };

  const submitHandler = (resetForm) => {
    setIsSignUp((isSignUp) => !isSignUp);
    resetForm();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.authContainer}>
        <Formik
          validate={(values) => authValidate(values, isSignUp, setIsValid)}
          initialValues={initialValues}
          onSubmit={(values) => authHandler(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            resetForm,
          }) => (
            <>
              {isSignUp && (
                <MyTextInput
                  label="Enter your username"
                  errorText={errors.username}
                  touched={touched.username}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
              )}
              <MyTextInput
                label="Email"
                errorText={errors.email}
                touched={touched.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <MyTextInput
                label="Password"
                errorText={errors.password}
                touched={touched.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                autoCapitalize="none"
                secureTextEntry
              />
              {isSignUp && (
                <MyTextInput
                  label="Repeat your password"
                  errorText={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  autoCapitalize="none"
                  secureTextEntry
                />
              )}
              <MyText isError>{error}</MyText>
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color={colors.BLACK} />
                  ) : (
                    <MyButton
                      title={isSignUp ? "Sign Up" : "Login"}
                      disabled={!isValid}
                      onPress={handleSubmit}
                    />
                  )}
                </View>
                <View style={styles.button}>
                  <MyButton
                    title={`Switch to ${isSignUp ? "Login" : "Sign Up"}`}
                    onPress={() => submitHandler(resetForm)}
                  />
                </View>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const makeStyles = (colors) =>
  StyleSheet.create({
    gradient: {
      flex: 1,
    },
    screen: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    scrollView: {
      width: "100%",
      maxHeight: 550,
      paddingVertical: 30,
    },
    authContainer: {
      width: "100%",
      maxWidth: 600,
      padding: 15,
      marginBottom: 50,
    },
    buttonContainer: {
      marginTop: 50,
      marginBottom: 0,
    },
    button: {
      marginTop: 10,
    },
  });
