import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import StackNavigator from "./navigations/StackNavigation";
import FlashMessage from "react-native-flash-message";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  const [fontsLoaded] = useFonts({
    "Urbanist-Regular": require("./assets/fonts/Urbanist-Regular.ttf"),
    "Urbanist-Medium": require("./assets/fonts/Urbanist-Medium.ttf"),
    "Urbanist-Bold": require("./assets/fonts/Urbanist-Bold.ttf"),
    Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <StatusBar style="dark" />
          <StackNavigator />
        </SafeAreaView>
      </NavigationContainer>
      <FlashMessage style={{ marginTop: 35 }} position="top" />
    </Provider>
  );
}

export default App;
