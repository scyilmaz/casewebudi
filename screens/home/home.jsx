import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import BasketIconCount from "../../components/basketCount";
import { selectBasketCount } from "../../redux/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { API_ROUTES } from "../../api/apiroutes";
import { useSelector } from "react-redux";
import Card from "../../components/card";
import axios from "axios";

const HomeScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const basketCount = useSelector(selectBasketCount);
  const auth = useSelector((state) => state.auth.token);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${API_ROUTES.products}?page=${page}`, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      const responseData = response.data;

      setIsLoading(false);
      setIsRefreshing(false);
      setIsFetchingMore(false);
      setTotalPages(responseData.products.last_page);

      if (page === 1) {
        setProducts(responseData.products.data);
      } else {
        setProducts((prevProducts) => [
          ...prevProducts,
          ...responseData.products.data,
        ]);
      }
    } catch (error) {
      Alert.alert("Hata", "Sunucuda beklenmedik bir sorun oluştu");
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
    getProducts();
  };

  const handleLoadMore = () => {
    if (!isFetchingMore && page < totalPages) {
      setIsFetchingMore(true);
      setPage(page + 1);
      getProducts();
    }
  };

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={{ alignItems: "center" }}>
        <ActivityIndicator color="#000" />
      </View>
    );
  };

  const renderItem = ({ item }) => <Card product={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.personTab}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Icon name="menu" style={styles.personIcon} />
        </TouchableOpacity>
        <Text style={styles.personName}>{user.name}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Basket")}>
          <BasketIconCount iconName="basket-outline" count={basketCount} />
        </TouchableOpacity>
      </View>

      <View style={{ marginHorizontal: 10 }}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            style={{ marginBottom: 80 }}
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            onRefresh={handleRefresh}
            refreshing={isRefreshing}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
            numColumns={2}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  personTab: {
    flexDirection: "row",
    marginVertical: 32,
    marginHorizontal: 24,
    alignItems: "center",
  },
  personIcon: {
    fontSize: 32,
  },
  personName: {
    flex: 1,
    paddingTop: 4,
    marginHorizontal: 12,
    fontSize: 16,
    fontFamily: "Urbanist-Bold",
    color: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});

export default HomeScreen;
