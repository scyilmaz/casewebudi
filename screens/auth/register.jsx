import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { showMessage } from "react-native-flash-message";
import Icon from "react-native-vector-icons/Ionicons";
import { API_ROUTES } from "../../api/apiroutes";
import axios from "axios";

const RegisterScreen = ({ navigation }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleRegister = async () => {
    setSubmitLoading(true);
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.password_confirmation === ""
    ) {
      setShowError(true);
      setSubmitLoading(false);
      return showMessage({
        message: "Hata",
        description: "Alanlar boş bırakılamaz.",
        type: "warning",
        icon: "auto",
        floating: true,
        duration: 1300,
      });
    }

    try {
      const response = await axios.post(`${API_ROUTES.register}`, formData);
      showMessage({
        message: "Başarılı",
        description: "Hesabınız başarıyla oluşturuldu",
        type: "success",
        icon: "auto",
        floating: true,
        duration: 1300,
      });

      navigation.navigate("Login");
    } catch (error) {
      if (error.response.status) {
        const errorData = error.response.data;
        console.log(errorData.message);
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

  const goLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.headerText}>Hesabını Oluştur</Text>

          <Text style={styles.inputHeader}>Kullanıcı Adı</Text>
          <View style={styles.inputView}>
            <Icon name="person-outline" style={styles.icons} />
            <TextInput
              style={styles.TextInput}
              placeholder="Kullanıcı adınızı giriniz"
              maxLength={10}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.nativeEvent.text,
                })
              }
            />
          </View>

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
              secureTextEntry={true}
              autoCapitalize="none"
              maxLength={15}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.nativeEvent.text,
                })
              }
            />
          </View>

          <Text style={styles.inputHeader}>Parola doğrulama</Text>
          <View style={styles.inputView}>
            <Icon name="lock-closed-outline" style={styles.icons} />
            <TextInput
              style={styles.TextInput}
              placeholder="Parolanızı tekrar giriniz"
              secureTextEntry={true}
              autoCapitalize="none"
              maxLength={15}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password_confirmation: e.nativeEvent.text,
                })
              }
            />
          </View>

          <TouchableOpacity
            disabled={submitLoading}
            style={[
              styles.buttonStyle,
              { backgroundColor: submitLoading ? "#233929" : "#41644A" },
            ]}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Kayıt Ol</Text>
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
    width: 130,
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

export default RegisterScreen;
