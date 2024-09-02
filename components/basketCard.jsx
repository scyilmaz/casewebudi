import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import {
  addToCart,
  removeFromBasket,
  decreaseQuantity,
} from "../redux/basketSlice";

const BasketCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const quantity = product.quantity;
  const totalPrice = product.price * quantity;
  const cart = useSelector((state) => state.basket);
  const cartItem = cart.items
    ? cart.items.find((item) => item.id === product.id)
    : null;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleIncreaseQuantity = () => {
    Alert.alert("Sepetten Çıkar", "Ürün sepetinizden silinsin mi?", [
      { text: "Hayır", style: "cancel" },
      {
        text: "Evet",
        style: "destructive",
        onPress: () => dispatch(removeFromBasket(product.id)),
      },
    ]);
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) {
      dispatch(removeFromBasket(product.id));
    } else {
      dispatch(decreaseQuantity(product.id));
    }
  };

  const handleNavigateToProductDetail = () => {
    navigation.navigate("ProductDetail", { product: product });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigateToProductDetail}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <View style={styles.deleteCheck}>
          <Text style={styles.title}>{product?.title}</Text>
          <TouchableOpacity onPress={handleIncreaseQuantity}>
            <Icon name="trash-outline" style={styles.icons} />
          </TouchableOpacity>
        </View>

        <Text style={styles.price}>{product.price} TL</Text>
        <Text style={styles.category}>{product.category?.title}</Text>

        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.increaseOperation}
            onPress={handleDecreaseQuantity}
          >
            <Text style={styles.addEvent}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            style={styles.increaseOperation}
            onPress={handleAddToCart}
          >
            <Text style={styles.addEvent}>+</Text>
          </TouchableOpacity>
          <Text style={styles.price1}>{totalPrice} TL</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
    flexDirection: "row",
    marginVertical: 10,
  },
  image: {
    backgroundColor: "#fff",
    resizeMode: "cover",
    width: 122,
    height: 131,
    borderRadius: 9,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 8,
  },
  icons: {
    fontSize: 25,
    color: "#7A8499",
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: "#000000",
    fontFamily: "Urbanist-Bold",
  },
  deleteCheck: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    marginRight: 10,
    marginVertical: 12,
    fontSize: 16,
    color: "#000",
    fontFamily: "Urbanist-Bold",
  },
  category: {
    fontSize: 15,
    color: "#7A8499",
    fontFamily: "Urbanist-Medium",
  },
  addCard: {
    borderRadius: 5,
    marginVertical: 8,
    fontSize: 20,
    color: "#fff",
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  increaseOperation: {
    width: 25,
    height: 25,
    backgroundColor: "#A7A7A7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginVertical: 10,
  },
  quantity: {
    fontSize: 15,
    fontFamily: "Urbanist-Medium",
    marginHorizontal: 13,
  },
  price1: {
    fontSize: 20,
    fontFamily: "Urbanist-Bold",
    color: "#41644A",
    marginHorizontal: 20,
  },
  addEvent: {
    color: "#fff",
  },
});

export default BasketCard;
