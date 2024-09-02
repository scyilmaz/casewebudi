import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showMessage } from "react-native-flash-message";
import Icon from "react-native-vector-icons/Ionicons";
import { API_ROUTES } from "../../api/apiroutes";
import axios from "axios";
import { setSuccess } from "../../redux/authSlice";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [submitLoading, setSubmitLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    setSubmitLoading(true);

    if (formData.email === "" || formData.password === "") {
      setSubmitLoading(false);
      showMessage({
        message: "Hata",
        description: "Alanlar boş bırakılamaz.",
        type: "warning",
        icon: "auto",
        floating: true,
        duration: 1300,
      });
      return;
    }

    try {
      const response = await axios.post(`${API_ROUTES.login}`, formData);
      const { status, message, token } = response.data;

      if (status) {
        dispatch(setSuccess({ token: token, user: response.data.user }));
        navigation.navigate("Home");
      } else {
        showMessage({
          message: "Hata",
          description: message,
          type: "warning",
          icon: "auto",
          floating: true,
          duration: 1300,
        });
      }
    } catch (error) {
      if (error.response.status === 422) {
        const errorData = error.response.data;
        Object.keys(errorData.errors).forEach((key) => {
          const errorMessage = errorData.errors[key][0];
          const errorText = `${key}: ${errorMessage}`;
          const messageToShow = errorText.split(": ")[1];
          showMessage({
            message: "Hata",
            description: messageToShow,
            type: "warning",
            icon: "auto",
            floating: true,
            duration: 1300,
          });
        });
      } else if (error.response.status === 401) {
        showMessage({
          message: "Hata",
          description: "Yetkilendirme Hatası",
          type: "danger",
          icon: "auto",
          floating: true,
          duration: 1300,
        });
      } else if (error.response.status === 404) {
        showMessage({
          message: "Bulunamadı",
          description: "İstek atılan sayfaya ulaşılamadı",
          type: "danger",
          icon: "auto",
          floating: true,
          duration: 1300,
        });
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const goRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAwareScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.headerText}>Hesabınıza Giriş Yapın</Text>

          <Text style={styles.inputHeader}>E-Posta</Text>
          <View style={styles.inputView}>
            <Icon name="mail-outline" style={styles.icons} />
            <TextInput
              style={styles.TextInput}
              placeholder="xample@yourdomain.com"
              keyboardType="email-address"
              maxLength={25}
              autoCapitalize="none"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.nativeEvent.text,
                })
              }
            />
          </View>

          <Text style={styles.inputHeader}>Parola</Text>
          <View style={styles.inputView}>
            <Icon name="lock-closed-outline" style={styles.icons} />
            <TextInput
              style={styles.TextInput}
              placeholder="Parolanızı giriniz"
              autoCapitalize="none"
              secureTextEntry={true}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.nativeEvent.text,
                })
              }
            />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("CheckMail")}>
            <Text style={styles.forgotText}>Şifremi Unuttum</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={submitLoading}
            style={[
              styles.buttonStyle,
              { backgroundColor: submitLoading ? "#233929" : "#41644A" },
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Giriş</Text>
            {submitLoading && (
              <ActivityIndicator
                style={{ marginLeft: 20 }}
                size={"small"}
                color={"white"}
              />
            )}
          </TouchableOpacity>

          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>Henüz bir hesabınız yok mu?</Text>
            <TouchableOpacity onPress={goRegister}>
              <Text style={styles.registertText}>Üye Ol</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    marginVertical: 32,
    width: 180,
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
  inputView: {
    marginBottom: 24,
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#F7F7F7",
  },
  TextInput: {
    flex: 1,
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
  forgotText: {
    marginBottom: 24,
    fontSize: 12,
    fontFamily: "Urbanist-Bold",
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
  registertText: {
    fontSize: 16,
    color: "#41644A",
    fontFamily: "Urbanist-Medium",
  },
});

export default LoginScreen;
