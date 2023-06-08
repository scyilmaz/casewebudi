import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import Icon from "react-native-vector-icons/Ionicons";
import { API_ROUTES } from "../../api/apiroutes";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    retrieveUserData();
  }, []);

  const retrieveUserData = async () => {
    try {
    } catch (error) {
      showMessage({
        message: "Hata",
        description: error,
        type: "warning",
        icon: "auto",
        floating: true,
        duration: 1300,
      });
    }
  };

  useEffect(() => {
    retrieveUserData();
  }, []);

  const handleUpdateProfile = async () => {
    setSubmitLoading(true);

    if (password !== "" && password !== confirmPassword) {
      showMessage({
        message: "Hata",
        description: "Parolalar eşleşmiyor",
        type: "warning",
        icon: "auto",
        floating: true,
        duration: 1300,
      });
      setSubmitLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        API_ROUTES.updateProfile,
        {
          email,
          name,
          password,
          password_confirmation: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      );
      const { status, message } = response.data;
      if (status) {
        dispatch(setUser({ user: response.data.user }));
        showMessage({
          message: "Başarılı",
          description: message,
          type: "success",
          icon: "auto",
          floating: true,
          duration: 1000,
        });
        await new Promise((resolve) => setTimeout(resolve, 1200));
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userIcon}>
        <Icon name="person-circle-outline" style={styles.iconUser} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputHeader}>E-posta</Text>
        <View style={styles.inputView}>
          <Icon name="mail-outline" style={styles.icons} />
          <TextInput
            style={styles.TextInput}
            placeholder="E-posta adresi"
            value={email}
            onChangeText={(text) => setEmail(text)}
            editable={false}
          />
        </View>

        <Text style={styles.inputHeader}>Kullanıcı Adı</Text>
        <View style={styles.inputView}>
          <Icon name="person-outline" style={styles.icons} />
          <TextInput
            style={styles.TextInput}
            placeholder="Kullanıcı adı"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Text
            style={{
              marginRight: 5,
              marginTop: -25,
              color: "red",
            }}
          >
            * Zorunlu alan
          </Text>
        </View>
        <Text style={styles.inputHeader}>Parola</Text>
        <View style={styles.inputView}>
          <Icon name="lock-closed-outline" style={styles.icons} />
          <TextInput
            style={styles.TextInput}
            placeholder="Değiştirmek istiyorsanız yeni parolanızı giriniz"
            autoCapitalize="none"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <Text style={styles.inputHeader}>Parolayı Onayla</Text>
        <View style={styles.inputView}>
          <Icon name="lock-closed-outline" style={styles.icons} />
          <TextInput
            style={styles.TextInput}
            placeholder="Değiştirmek istiyorsanız yeni parolanızı giriniz"
            autoCapitalize="none"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        <TouchableOpacity
          disabled={submitLoading}
          style={[
            styles.buttonStyle,
            { backgroundColor: submitLoading ? "#233929" : "#41644A" },
          ]}
          onPress={handleUpdateProfile}
        >
          <Text style={styles.buttonText}>Güncelle</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 22,
  },
  iconUser: {
    fontSize: 130,
  },
  inputContainer: {
    marginHorizontal: 24,
  },
  inputHeader: {
    marginBottom: 8,
    fontSize: 16,
  },
  inputView: {
    marginBottom: 24,
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#F7F7F7",
  },
  TextInput: {
    flex: 1,
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
    color: "#fff",
    fontFamily: "Urbanist-Bold",
  },
});

export default ProfileScreen;
