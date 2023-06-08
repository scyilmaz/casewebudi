import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import axios from "axios";
import { API_ROUTES } from "../../api/apiroutes";

import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/authSlice";

const CustomDrawer = ({ navigation }) => {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_ROUTES.categories, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setCategories(response.data.categories);
    } catch (error) {
      Alert.alert("Hata", error);
    }
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const logout = async () => {
    try {
      await dispatch(setLogout());
      !authToken && navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Hata", error);
    }
  };

  const goToScreen = (screenName, category) => {
    navigation.navigate(screenName, { categoryId: category.id });
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => goToScreen("Detail", item)}>
      <Text style={styles.categoryItem}>- {item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={styles.drawerItem}>Ana Sayfa</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleCategories}>
        <Text style={styles.categoryHeader}>Kategoriler</Text>
      </TouchableOpacity>

      {showCategories &&
        categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => goToScreen("Detail", item)}
          >
            <Text style={styles.categoryItem}>- {item.title}</Text>
          </TouchableOpacity>
        ))}

      <TouchableOpacity
        style={{ marginTop: showCategories ? 20 : 0 }}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.drawerItem}>Profilim</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Text style={styles.drawerItem}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 80,
  },
  drawerItem: {
    fontSize: 18,
    fontFamily: "Urbanist-Bold",
    marginBottom: 16,
    paddingBottom: 5,
  },
  categoryHeader: {
    fontSize: 18,
    fontFamily: "Urbanist-Bold",
    marginBottom: 16,
    paddingBottom: 10,
  },
  categoryItem: {
    fontFamily: "Urbanist-Regular",
    fontSize: 18,
    marginBottom: 10,
  },
});

export default CustomDrawer;
