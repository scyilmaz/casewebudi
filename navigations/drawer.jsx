import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/home/home";
import CustomDrawer from "./custom/customDrawer";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false }}
    drawerContent={(props) => <CustomDrawer {...props} />}
  >
    <Drawer.Screen name="Ana Sayfa" component={HomeScreen} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
