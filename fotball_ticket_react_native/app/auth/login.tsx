import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function NafathLogin() {
  const router = useRouter();
  const [nationalId, setNationalId] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogin = async () => {
    try {
      console.log("start login with:", nationalId);

      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ national_id: nationalId }),
      });

      const data = await response.json();
      console.log("response data:", data);

      if (data.status === "success") {
        setShowConfirmation(true);
      } else {
        console.log("login error:", data);
      }
    } catch (error) {
      console.log("fetch error:", error);
    }
  };

  const handleConfirm = () => {
    router.replace("/(tabs)");
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setNationalId("");
  };

  if (showConfirmation) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logoText}>نفاذ</Text>
            <Text style={styles.subtitle}>النفاذ الوطني الموحد</Text>
            <Text style={styles.welcomeText}>مرحبا بك عميل SmartTicket</Text>
          </View>

          {/* Confirmation Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>الدخول عبر تطبيق نفاذ</Text>
            </View>

            <View style={styles.confirmationContent}>
              <Text style={styles.confirmTitle}>تأكيد الانتقال</Text>

              <Text style={styles.confirmSubtitle}>
                أنت على وشك الانتقال إلى
              </Text>

              <View style={styles.transferBox}>
                <View style={styles.transferItem}>
                  <Text style={styles.transferText}>النفاذ الوطني</Text>
                  <Text style={styles.transferText}>الموحد</Text>
                </View>

                <Text style={styles.arrowText}>⇄</Text>

                <View style={styles.transferItem}>
                  <Text style={styles.transferText}>SmartTicket</Text>
                </View>
              </View>

              <Text style={styles.confirmMessage}>
                يرجى الضغط على (انتقال) لاستكمال العملية أو{"\n"}
                (إلغاء) لإلغائها
              </Text>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>انتقال</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>إلغاء</Text>
              </TouchableOpacity>

              <View style={styles.sdaiaContainer}>
                <View style={styles.sdaiaBox}>
                  <Text style={styles.sdaiaText}>SDAIA</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Footer Buttons */}
          <View style={styles.footerButtons}>
            <View style={styles.footerButton}>
              <Text style={styles.footerButtonText}>🌙 الوضع الداكن</Text>
            </View>
            <View style={styles.footerButton}>
              <Text style={styles.footerButtonText}>🌐 English</Text>
            </View>
            <View style={styles.footerButton}>
              <Text style={styles.footerButtonText}>A↓ تغيير حجم الخط</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>نفاذ</Text>
          <Text style={styles.subtitle}>النفاذ الوطني الموحد</Text>
          <Text style={styles.welcomeText}>مرحبا بك عميل SmartTicket</Text>
        </View>

        {/* Login Card */}
        <View style={styles.card}>
          <Text style={styles.loginTitle}>الدخول عبر تطبيق نفاذ</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              رقم الهوية <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="1"
              keyboardType="numeric"
              value={nationalId}
              onChangeText={(text) => setNationalId(text.replace(/\D/g, ""))}
              maxLength={10}
              textAlign="right"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.loginButton,
              nationalId.length !== 10 && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={nationalId.length !== 10}
          >
            <Text style={styles.loginButtonText}>←− تسجيل الدخول</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <Text style={styles.dividerText}>أو بإستخدام</Text>
          </View>

          <TouchableOpacity style={styles.alternativeButton}>
            <Text style={styles.alternativeButtonText}>
              اسم المستخدم وكلمة المرور
            </Text>
          </TouchableOpacity>
        </View>

        {/* Links */}
        <View style={styles.linksContainer}>
          <Text style={styles.linkText}>عن نفاذ</Text>
          <Text style={styles.linkText}>تواصل معنا</Text>
          <Text style={styles.linkText}>الشروط والأحكام</Text>
        </View>

        <View style={styles.linksContainer}>
          <Text style={styles.linkTextBlue}>سياسة الخصوصية</Text>
          <Text style={styles.linkTextBlue}>الدعم الفني</Text>
        </View>

        {/* Footer Buttons */}
        <View style={styles.footerButtons}>
          <View style={styles.footerButton}>
            <Text style={styles.footerButtonText}>🌙 الوضع الداكن</Text>
          </View>
          <View style={styles.footerButton}>
            <Text style={styles.footerButtonText}>🌐 English</Text>
          </View>
          <View style={styles.footerButton}>
            <Text style={styles.footerButtonText}>A↓ تغيير حجم الخط</Text>
          </View>
        </View>

        {/* Logos */}
        <View style={styles.logosContainer}>
          <View style={styles.logoBox}>
            <Text style={styles.logoBoxTextSmall}>Registered on</Text>
            <Text style={styles.logoBoxText}>هيئة الحكومة الرقمية</Text>
            <Text style={styles.logoBoxTextSmall}>
              Digital Government Authority
            </Text>
          </View>
          <View style={styles.logoBox}>
            <Text style={styles.logoBoxTextBold}>SDAIA</Text>
            <Text style={styles.logoBoxTextTiny}>
              السعودية للبيانات{"\n"}والذكاء الاصطناعي
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    minHeight: height,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#14B8A6",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#374151",
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 14,
    color: "#6B7280",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 30,
    width: width - 40,
    maxWidth: 450,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  cardHeader: {
    backgroundColor: "#F3F4F6",
    marginHorizontal: -30,
    marginTop: -30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  cardHeaderText: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1F2937",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 8,
    textAlign: "right",
  },
  required: {
    color: "#EF4444",
  },
  input: {
    borderWidth: 2,
    borderColor: "#14B8A6",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    textAlign: "right",
  },
  loginButton: {
    backgroundColor: "#14B8A6",
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 25,
  },
  loginButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  divider: {
    alignItems: "center",
    marginBottom: 20,
  },
  dividerText: {
    fontSize: 14,
    color: "#6B7280",
  },
  alternativeButton: {
    borderWidth: 2,
    borderColor: "#D1D5DB",
    paddingVertical: 14,
    borderRadius: 10,
  },
  alternativeButtonText: {
    color: "#374151",
    fontSize: 16,
    textAlign: "center",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 15,
    flexWrap: "wrap",
  },
  linkText: {
    fontSize: 14,
    color: "#6B7280",
    marginHorizontal: 10,
  },
  linkTextBlue: {
    fontSize: 14,
    color: "#14B8A6",
    marginHorizontal: 10,
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 25,
    flexWrap: "wrap",
  },
  footerButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  footerButtonText: {
    fontSize: 12,
    color: "#374151",
  },
  logosContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginTop: 25,
  },
  logoBox: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  logoBoxText: {
    fontSize: 10,
    color: "#14B8A6",
    fontWeight: "600",
    textAlign: "center",
  },
  logoBoxTextSmall: {
    fontSize: 8,
    color: "#6B7280",
    textAlign: "center",
  },
  logoBoxTextBold: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
  },
  logoBoxTextTiny: {
    fontSize: 8,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 2,
  },
  confirmationContent: {
    backgroundColor: "#14B8A6",
    marginHorizontal: -30,
    marginBottom: -30,
    padding: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  confirmTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 25,
  },
  confirmSubtitle: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 30,
  },
  transferBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 30,
  },
  transferItem: {
    alignItems: "center",
  },
  transferText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  arrowText: {
    fontSize: 30,
    color: "#FFFFFF",
    paddingHorizontal: 15,
  },
  confirmMessage: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
  },
  confirmButton: {
    backgroundColor: "#000000",
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 10,
    marginBottom: 30,
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  sdaiaContainer: {
    alignItems: "center",
    paddingTop: 25,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.3)",
  },
  sdaiaBox: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  sdaiaText: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "600",
  },
});
