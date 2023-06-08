import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/Ionicons";

const CheckMail = ({ navigation }) => {
  const [submitLoading, setSubmitLoading] = useState(false);

  const goSubmit = () => {
    navigation.navigate("Register");
  };

  const goLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.headerText}>Parolanızı mı unuttunuz</Text>
          <Text style={styles.helpfulText}>
            Merak etme! Olur. Lütfen hesabınızla ilişkili e-postayı girin
          </Text>

          <Text style={styles.inputHeader}>E-Posta</Text>
          <View style={styles.inputView}>
            <Icon name="mail-outline" style={styles.icons} />
            <TextInput
              style={styles.TextInput}
              placeholder="xample@yourdomain.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            disabled={submitLoading}
            style={[
              styles.buttonStyle,
              { backgroundColor: submitLoading ? "#233929" : "#41644A" },
            ]}
            onPress={goSubmit}
          >
            <Text style={styles.buttonText}>Gönder</Text>
            {submitLoading && (
              <ActivityIndicator
                style={{ marginLeft: 20 }}
                size={"small"}
                color={"white"}
              />
            )}
          </TouchableOpacity>

          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>Zaten hesabınız var mı?</Text>
            <TouchableOpacity onPress={goLogin}>
              <Text style={styles.signinText}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 32,
    marginVertical: 32,
    width: 190,
    fontFamily: "Urbanist-Bold",
  },
  inputContainer: {
    marginHorizontal: 24,
  },
  inputHeader: {
    marginBottom: 8,
    fontSize: 16,
    fontFamily: "Urbanist-Medium",
  },
  helpfulText: {
    fontSize: 17,
    fontFamily: "Urbanist-Regular",
    color: "#000",
    marginBottom: 98,
  },
  inputView: {
    marginBottom: 24,
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#F7F7F7",
  },
  TextInput: {
    fontFamily: "Urbanist-Medium",
    fontSize: 14,
    color: "black",
  },
  icons: {
    marginHorizontal: 12,
    marginVertical: 16,
    fontSize: 19,
    color: "grey",
  },
  buttonStyle: {
    flexDirection: "row",
    backgroundColor: "#41644A",
    borderRadius: 16,
    paddingVertical: 18.5,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Urbanist-Bold",
    color: "#fff",
  },
  bottomContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomText: {
    marginRight: 4,
    fontSize: 16,
    fontFamily: "Urbanist-Medium",
  },
  signinText: {
    fontSize: 16,
    color: "#41644A",
    fontFamily: "Urbanist-Medium",
  },
});

export default CheckMail;
