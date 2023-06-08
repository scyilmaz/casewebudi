import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const BasketIconCount = ({ iconName, count }) => {
  return (
    <View style={styles.container}>
      <Icon name={iconName} style={styles.icon} />
      {count > 0 && (
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 30,
    color: "#41644A",
  },
  countContainer: {
    backgroundColor: "#FF0000",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    position: "absolute",
    top: -8,
    right: -8,
  },
  countText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default BasketIconCount;
