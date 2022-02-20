import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { Formik } from "formik";
import { debounce } from "../../../shared/functions/debounce";
import { useDispatch } from "react-redux";

import { getFilteredUserList } from "./store/actions/getFilteredUserList";
import { createTransaction } from "./store/actions/createTransaction";
import { getUserInfo } from "./store/actions/getUserInfo";
import { getListTransactions } from "./store/actions/getListTransactions";
import { MyText } from "../../../components/MyText";
import { UserInfo } from "../../../components/View/UserInfo";
import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { StyleSheet } from "react-native";
import { MyTextInput } from "../../../components/MyInputs/MyTextInput";
import { MyButton } from "../../../components/MyButtons/MyButton";

const initialValues = {
  name: "",
  amount: "",
};

export const PaymentScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const dispatch = useDispatch();

  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const { isLoading } = useSelector((state) => state.auth);

  const { user_info, users_list, transactions_list, error } = useSelector(
    (state) => state.transactions
  );

  const loadUserNames = async (text) => {
    setIsLoadingUsers(true);
    await dispatch(getFilteredUserList({ query: text }));
    setIsLoadingUsers(false);
  };

  const debounceOnSearch = debounce(loadUserNames, 600);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <UserInfo name={user_info?.name} balance={user_info?.balance} />
      ),
    });
  }, [navigation, user_info]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color={colors.WHITE} />
      </View>
    );
  }

  const handleAutocompleteTextChange = ({ handleChange }, text) => {
    if (handleChange) handleChange("name")(text);
    debounceOnSearch(text);
  };

  const handleTouchableOpacityPress = async ({ handleChange }, item) => {
    await loadUserNames("-");
    if (handleChange) {
      handleChange("name")(item.username);
      handleChange("amount")(`${-item.amount}`);
    }
  };

  const handleCreateTransaction = async ({ name, amount }, { resetForm }) => {
    await dispatch(createTransaction({ name, amount }));
    await dispatch(getUserInfo());
    await dispatch(getListTransactions());
    resetForm();
    await loadUserNames("-");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleCreateTransaction}
        >
          {({ handleChange, handleSubmit, values }) => (
            <View style={styles.container}>
              <AutocompleteDropdown
                dataSet={users_list.map((item) => ({
                  id: `${item.id}`,
                  title: item.name,
                }))}
                onChangeText={(text) => {
                  handleAutocompleteTextChange({ handleChange }, text);
                }}
                suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
                useFilter={false}
                textInputProps={{
                  placeholder: "Receive user",
                  autoCorrect: false,
                  autoCapitalize: "none",
                  placeholderTextColor: colors.BLACK,
                  style: {
                    color: colors.BLACK,
                    ...styles.textInput,
                  },
                }}
                loading={isLoadingUsers}
                onSelectItem={async (item) => {
                  item && handleChange("name")(item.title.toString());
                }}
              />
              <MyTextInput
                style={{
                  ...styles.textInput,
                  ...styles.amountInput,
                }}
                placeholder="Type Amount"
                placeholderTextColor={colors.BLACK}
                value={values.amount.match(/^[0-9]*$/) ? values.amount : ""}
                onChangeText={handleChange("amount")}
                keyboardType="numeric"
              />
              <MyText isError>{error}</MyText>
              <View style={styles.buttonWrapper}>
                <MyButton title={"Send"} onPress={() => handleSubmit()} />
              </View>
              <MyText color={colors.WHITE} style={styles.flatListLabel}>
                Recent transactions:
              </MyText>
              <FlatList
                keyExtractor={(item) => `${item.id}`}
                data={transactions_list?.slice(0, 5)}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={styles.userTransactionsItem}
                      onPress={() =>
                        handleTouchableOpacityPress({ handleChange }, item)
                      }
                    >
                      <MyText color={colors.BLACK}>
                        Name: {item.username}
                      </MyText>
                      <MyText color={colors.BLACK}>
                        Amount: {item.amount}
                      </MyText>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const makeStyles = (colors) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.WHITE,
    },
    container: {
      flex: 1,
      width: "100%",
      maxWidth: 350,
      marginTop: 20,
    },
    inputName: {
      position: "relative",
      marginTop: 30,
    },
    autocompleteContainer: {
      flex: 1,
      left: 0,
      position: "absolute",
      right: 0,
      top: 0,
      zIndex: 5,
    },
    buttonWrapper: {
      position: "relative",
    },
    textInput: {
      backgroundColor: colors.WHITE,
      padding: 10,
      fontFamily: "open-regular",
      fontSize: 20,
      borderRadius: 5,
    },
    amountInput: {
      paddingLeft: 15,
      marginBottom: 20,
    },
    flatListLabel: {
      marginTop: 35,
      fontSize: 20,
    },
    userTransactionsItem: {
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      borderRadius: 10,
      height: 50,
      padding: 10,
      alignItems: "center",
      backgroundColor: colors.WHITE,
    },
  });
