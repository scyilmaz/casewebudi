import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import { addToCart } from "../../redux/basketSlice";
import { useDispatch } from "react-redux";

const ProductDetail = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const { product } = route.params;
  const [addToCardLoading, setAddToCardLoading] = useState(false);

  const handleAddToCartClick = () => {
    dispatch(addToCart(product));
    setAddToCardLoading(true);
    setTimeout(() => {
      setAddToCardLoading(false);
    }, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.title}>
        <Text style={styles.titleText}>{product.title}</Text>
      </View>
      <View style={styles.desc}>
        <Text style={styles.desHeaderText}>Açıklama</Text>
        <Text style={styles.descriptionText}>{product.description}</Text>
        <View style={styles.bottomContainer}>
          <View style={styles.inContainer}>
            <Text style={styles.priceText}>Price</Text>
            <Text style={styles.price}>{product.price} TL</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.inBuy,
              addToCardLoading && { backgroundColor: "#324837" },
            ]}
            onPress={handleAddToCartClick}
          >
            {!addToCardLoading && (
              <Icon name="basket-outline" style={styles.icons} />
            )}
            {addToCardLoading && (
              <ActivityIndicator size="small" color="#fff" />
            )}
            <Text
              style={[
                styles.buyText,
                addToCardLoading && { color: "#fff", marginLeft: 6 },
              ]}
            >
              {addToCardLoading ? "SEPETE EKLENDİ" : "SEPETE EKLE"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  image: {
    marginTop: 10,
    backgroundColor: "#fff",
    resizeMode: "cover",
    width: "100%",
    height: 240,
    borderRadius: 9,
  },
  title: {
    marginVertical: 17,
    borderBottomColor: "#DCDADA",
    borderBottomWidth: 1,
  },
  titleText: {
    fontSize: 24,
    color: "#000000",
    fontFamily: "Urbanist-Bold",
  },
  desc: {
    flexDirection: "column",
    marginVertical: 20,
  },
  desHeaderText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 18,
    marginBottom: 18,
  },
  descriptionText: {
    fontFamily: "Urbanist-Regular",
  },
  bottomContainer: {
    flexDirection: "row",
    marginVertical: 60,
  },
  inContainer: {
    flex: 1,
    flexDirection: "column",
  },
  inBuy: {
    flex: 1,
    marginVertical: 3.5,
    backgroundColor: "#41644A",
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontSize: 24,
    color: "#000000",
    fontFamily: "Urbanist-Bold",
  },
  priceText: {
    fontSize: 18,
    marginBottom: 12,
    marginVertical: 2,
    color: "#000000",
    fontFamily: "Urbanist-Bold",
  },
  icons: {
    fontSize: 23,
    color: "#fff",
  },
  buyText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: "Urbanist-Bold",
    color: "#fff",
  },
});

export default ProductDetail;
