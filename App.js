import React, { useState } from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";

import store from "./src/app/store/index";
import { initAppLoading } from "./src/app/initLoading/initAppLoading";
import { AppNavigation } from "./src/app/navigation/AppNavigator";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  return isReady ? (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </SafeAreaProvider>
  ) : (
    <AppLoading
      startAsync={initAppLoading}
      onFinish={() => setIsReady(true)}
      onError={(err) => console.log(err)}
    />
  );
}
