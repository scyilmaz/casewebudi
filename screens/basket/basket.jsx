import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BasketCard from "../../components/basketCard";
import { clearBasket } from "../../redux/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";

const BasketScreen = ({ navigation }) => {
  const basket = useSelector((state) => state.basket);
  const dispatch = useDispatch();
  const basketItems = basket.products;

  const totalPrice = basketItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleClearBasket = async () => {
    dispatch(clearBasket());
    showMessage({
      message: "Başarılı",
      description: "Tüm ürünler sepetinizden silindi",
      type: "success",
      icon: "auto",
      floating: true,
      duration: 1000,
    });
    await new Promise((resolve) => setTimeout(resolve, 1200));
    navigation.navigate("Home");
  };

  if (basketItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Icon name="basket-outline" style={styles.icons} />
          <Text style={styles.headerText}>Sepetim</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewEmpty}>
          <Image source={require("../../assets/emty.png")} />
          <Text style={styles.emptyText}>Sepetiniz boş</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon name="basket-outline" style={styles.icons} />
        <Text style={styles.headerText}>Sepetim</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {basketItems.map((item) => (
          <BasketCard key={item.id} product={item} />
        ))}
      </ScrollView>
      <View style={styles.totalPriceContainer}>
        <TouchableOpacity onPress={handleClearBasket}>
          <Text style={styles.clearBasketText}>Tüm Ürünleri Sil</Text>
        </TouchableOpacity>
        <Text style={styles.totalPriceText}>Toplam Fiyat: {totalPrice} TL</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginVertical: 32,
    alignItems: "center",
  },
  icons: {
    fontSize: 29,
    color: "#41644A",
  },
  headerText: {
    marginHorizontal: 12,
    fontSize: 24,
    fontFamily: "Urbanist-Bold",
  },
  totalPriceContainer: {
    flexDirection: "row",
    margin: 16,
  },
  totalPriceText: {
    fontSize: 18,
    fontFamily: "Urbanist-Bold",
  },
  scrollViewEmpty: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
  },
  clearBasketText: {
    fontSize: 18,
    marginRight: 60,
    fontFamily: "Urbanist-Bold",
  },
  emptyText: {
    fontSize: 18,
    marginTop: 24,
    fontFamily: "Urbanist-Bold",
  },
});

export default BasketScreen;
