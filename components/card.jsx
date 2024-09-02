import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addToCart } from "../redux/basketSlice";
import { useDispatch } from "react-redux";

const Card = ({ product }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [addToCardLoading, setAddToCardLoading] = useState(false);

  const handleCategoryPress = () => {
    if (product.category && product.category.id) {
      navigation.navigate("Detail", { categoryId: product.category.id });
    }
  };

  const handleProductDetail = () => {
    navigation.navigate("ProductDetail", { product: product });
  };

  const handleAddToCartClick = () => {
    dispatch(addToCart(product));
    setAddToCardLoading(true);
    setTimeout(() => {
      setAddToCardLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleProductDetail}>
        <Image
          source={{ uri: product.image || "https://via.placeholder.com/240" }}
          style={styles.image}
        />

        <Text style={styles.title}>{product.title || "boş"}</Text>
      </TouchableOpacity>
      <View style={styles.cardActions}></View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.price}>
          {product.price ? `${product.price} TL` : "boş"}{" "}
        </Text>
      </View>
      <TouchableOpacity onPress={handleCategoryPress}>
        <Text style={styles.category}>{product.category?.title || "boş"} </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.inBuy,
          addToCardLoading && { backgroundColor: "#324837", height: 44 },
        ]}
        onPress={handleAddToCartClick}
      >
        {addToCardLoading && <ActivityIndicator size="small" color="#fff" />}
        <Text
          style={[
            styles.buyText,
            addToCardLoading && {
              color: "#fff",
              marginLeft: 6,
              fontSize: addToCardLoading ? 12 : 14,
            },
          ]}
        >
          {addToCardLoading ? "SEPETE EKLENİYOR" : "SEPETE EKLE"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 24,
    marginHorizontal: 8,
  },
  image: {
    backgroundColor: "#fff",
    resizeMode: "cover",
    marginVertical: 8,
    width: "100%",
    height: 240,
    borderRadius: 9,
  },
  detailsContainer: {
    justifyContent: "center",
  },
  title: {
    marginVertical: 7,
    fontSize: 17,
    color: "#000000",
    fontFamily: "Urbanist-Bold",
  },
  price: {
    marginRight: 10,
    marginVertical: 7,
    fontSize: 18,
    color: "#48644A",
    fontFamily: "Urbanist-Bold",
  },
  category: {
    fontSize: 15,
    color: "#7A8499",
    fontFamily: "Urbanist-Medium",
  },
  inBuy: {
    backgroundColor: "#41644A",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4.5,
  },
  buyText: {
    fontSize: 16,
    fontFamily: "Urbanist-Bold",
    color: "#fff",
    marginVertical: 12.5,
  },
});

export default Card;
