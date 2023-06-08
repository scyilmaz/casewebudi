import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CategoryDetail from "../screens/productDetail/categoryDetail";
import ProductDetail from "../screens/productDetail/productDetail";
import ProfileScreen from "../screens/settings/profile";
import RegisterScreen from "../screens/auth/register";
import BasketScreen from "../screens/basket/basket";
import CheckMail from "../screens/auth/chechMail";
import LoginScreen from "../screens/auth/login";
import DrawerNavigator from "./drawer";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const StackNavigator = () => {
	const token = useSelector((state) => state.auth.token);

	return (
		<Stack.Navigator>
			{!token && (
				<>
					<Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
					<Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
					<Stack.Screen
						name='CheckMail'
						component={CheckMail}
						options={{
							title: "Şifre Kurtarma",
						}}
					/>
				</>
			)}
			{token && (
				<>
					<Stack.Screen name='Home' component={DrawerNavigator} options={{ headerShown: false }} />
					<Stack.Screen name='Profile' component={ProfileScreen} />
					<Stack.Screen name='Detail' component={CategoryDetail} options={{ title: "Kategori" }} />
					<Stack.Screen name='ProductDetail' component={ProductDetail} options={{ title: "Ürün Detay" }} />

					<Stack.Screen
						name='Basket'
						component={BasketScreen}
						options={{
							title: "Sepetim",
						}}
					/>
				</>
			)}
		</Stack.Navigator>
	);
};

export default StackNavigator;
