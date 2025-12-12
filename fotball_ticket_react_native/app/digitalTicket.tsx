import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  TextInput,
  Platform,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter, useLocalSearchParams } from "expo-router";
import Match from "@/components/match";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

export default function DigitalTicket() {
  const navigate = useRouter();
  const params = useLocalSearchParams();
  const { sellTicket, purchasedTickets } = useCart();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [newSeatNumber, setNewSeatNumber] = useState("");

  // Get ticket details from params or use default
  const ticketId = params.ticketId as string;
  const ticket = purchasedTickets.find(t => t.id === ticketId) || purchasedTickets[0];

  if (!ticket) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#003087' }}>
        <Text style={{ color: '#fff', fontSize: 18 }}>التذكرة غير موجودة</Text>
        <TouchableOpacity
          style={{ marginTop: 20, padding: 15, backgroundColor: '#0057FF', borderRadius: 10 }}
          onPress={() => navigate.push("/(tabs)/profile")}
        >
          <Text style={{ color: '#fff' }}>العودة للملف الشخصي</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleSellPress = () => {
    setShowSellModal(true);
  };

  const confirmSell = () => {
    const salePrice = ticket.price * 0.9;
    sellTicket(ticket.id);
    setShowSellModal(false);

    // Show success modal or alert
    // Using Alert here is fine as it's a transient system message, but for consistency we could use a custom one.
    // However, standard Alert is usually acceptable for final success messages.
    if (Platform.OS === 'web') {
      window.alert(`تم البيع بنجاح! ✅\n\nتم بيع التذكرة بنجاح\nالمبلغ المضاف: ${salePrice.toFixed(2)} ريال`);
      navigate.replace("/(tabs)/profile");
    } else {
      Alert.alert(
        "تم البيع بنجاح! ✅",
        `تم بيع التذكرة بنجاح\nالمبلغ المضاف: ${salePrice.toFixed(2)} ريال`,
        [
          {
            text: "حسناً",
            onPress: () => navigate.replace("/(tabs)/profile")
          }
        ]
      );
    }
  };

  const handleEditTicket = () => {
    setNewSeatNumber(ticket.seatNumber);
    setShowEditModal(true);
  };

  const confirmEdit = () => {
    if (newSeatNumber.trim() === "") {
      if (Platform.OS === 'web') {
        window.alert("الرجاء إدخال رقم المقعد");
      } else {
        Alert.alert("خطأ", "الرجاء إدخال رقم المقعد");
      }
      return;
    }

    setShowEditModal(false);

    if (Platform.OS === 'web') {
      window.alert(`تم التعديل بنجاح! ✅\n\nتم تعديل الحجز\nالمقعد الجديد: ${newSeatNumber}`);
      navigate.replace("/(tabs)/profile");
    } else {
      Alert.alert(
        "تم التعديل بنجاح! ✅",
        `تم تعديل الحجز\nالمقعد الجديد: ${newSeatNumber}`,
        [
          {
            text: "حسناً",
            onPress: () => navigate.replace("/(tabs)/profile")
          }
        ]
      );
    }
  };

  const salePrice = ticket.price * 0.9;

  return (
    <ImageBackground
      style={styles.background}
      source={require("@/assets/images/digitalTicketBackground.jpg")}
    >
      <SafeAreaView style={styles.container}>
        <View>
          <TouchableOpacity onPress={() => navigate.back()}>
            <AntDesign
              style={styles.arrow}
              name="arrowright"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={styles.title}> التذكرة الذكية </Text>
          <View style={styles.matchContainer}>
            <Match
              team1Name={ticket.matchSnapshot.homeTeam}
              team2Name={ticket.matchSnapshot.awayTeam}
              date={ticket.matchSnapshot.date}
              time={ticket.matchSnapshot.time}
              venue={ticket.matchSnapshot.venue}
            />
          </View>
          <View style={styles.ticketContainer}>
            <View style={styles.gatesContainer}>
              <View style={styles.setContainer}>
                <Text style={styles.span}> المقعد </Text>
                <Text style={[styles.bold, { color: "#3864FF" }]}> {ticket.seatNumber} </Text>
              </View>
              <View style={styles.setContainer}>
                <Text style={styles.span}> المدخل </Text>
                <Text style={styles.bold}> RAMP5 </Text>
              </View>
            </View>
            <View style={styles.info}>
              <View style={styles.setContainer}>
                <Text style={styles.span}>Ter</Text>
                <Text style={styles.bold}>{ticket.ter}</Text>
              </View>
              <View style={styles.setContainer}>
                <Text style={styles.span}>Gate</Text>
                <Text style={styles.bold}>{ticket.gate}</Text>
              </View>
              <View style={styles.setContainer}>
                <Text style={styles.span}>Number</Text>
                <Text style={styles.bold}>{ticket.ticketNumber}</Text>
              </View>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>السعر:</Text>
              <Text style={styles.priceValue}>{ticket.price} ريال</Text>
            </View>
            <Image
              style={styles.barcode}
              source={require("@/assets/images/barcode.png")}
            />
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.sellTicket} onPress={handleSellPress}>
            <Text style={styles.sellTicketText}> بيع التذكرة </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editTicket} onPress={handleEditTicket}>
            <Text style={styles.editTicketText}> تعديل الحجز </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Edit Modal Overlay */}
      {showEditModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>تعديل الحجز</Text>
            <Text style={styles.modalSubtitle}>يمكنك تعديل رقم المقعد</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>رقم المقعد الجديد</Text>
              <TextInput
                style={styles.input}
                value={newSeatNumber}
                onChangeText={setNewSeatNumber}
                placeholder="مثال: D15"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.cancelButtonText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmEdit}
              >
                <Text style={styles.confirmButtonText}>تأكيد التعديل</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Sell Confirmation Modal Overlay */}
      {showSellModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalTitle, { color: 'red' }]}>بيع التذكرة</Text>
            <Text style={styles.modalSubtitle}>هل أنت متأكد من رغبتك في بيع هذه التذكرة؟</Text>

            <View style={styles.priceDetailsContainer}>
              <View style={styles.priceRowModal}>
                <Text style={styles.priceLabelModal}>السعر الأصلي:</Text>
                <Text style={styles.priceValueModal}>{ticket.price} ريال</Text>
              </View>
              <View style={styles.priceRowModal}>
                <Text style={styles.priceLabelModal}>خصم البيع (10%):</Text>
                <Text style={[styles.priceValueModal, { color: 'red' }]}>-{(ticket.price * 0.1).toFixed(2)} ريال</Text>
              </View>
              <View style={[styles.priceRowModal, { borderTopWidth: 1, borderColor: '#eee', paddingTop: 10, marginTop: 5 }]}>
                <Text style={[styles.priceLabelModal, { fontWeight: 'bold' }]}>المبلغ المسترد:</Text>
                <Text style={[styles.priceValueModal, { color: '#03BF62', fontWeight: 'bold', fontSize: 18 }]}>{salePrice.toFixed(2)} ريال</Text>
              </View>
            </View>
            <Text style={styles.noteText}>سيتم إضافة المبلغ إلى محفظتك فوراً</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowSellModal(false)}
              >
                <Text style={styles.cancelButtonText}>إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.confirmButton, { backgroundColor: 'red' }]}
                onPress={confirmSell}
              >
                <Text style={styles.confirmButtonText}>تأكيد البيع</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 15,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  title: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 40,
    fontWeight: "bold",
    paddingTop: 10,
  },
  arrow: {
    alignSelf: "flex-end",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  matchContainer: {
    paddingTop: 50,
  },
  ticketContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginVertical: 60,
    borderRadius: 10,
  },
  gatesContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  setContainer: {
    gap: 5,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#F5F5F5",
    padding: 10,
  },
  priceRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#F0F8FF",
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  priceLabel: {
    fontSize: 16,
    color: "#666",
  },
  priceValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#03BF62",
  },
  barcode: {
    width: 307,
    height: 58,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  span: {
    color: "#A6A6A6",
  },
  bold: {
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  sellTicket: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'red',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  sellTicketText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red'
  },
  editTicket: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#0057FF',
    backgroundColor: "#0057FF",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  editTicketText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
  // Modal styles
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 10,
    color: '#333',
  },
  modalSubtitle: {
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 20,
    color: '#666',
  },
  inputContainer: {
    marginBottom: 25,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    textAlign: 'right',
    backgroundColor: '#F9F9F9',
  },
  modalButtons: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 15,
    marginLeft: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#666',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#0057FF',
    borderRadius: 10,
    padding: 15,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  priceDetailsContainer: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  priceRowModal: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabelModal: {
    fontSize: 14,
    color: '#666',
  },
  priceValueModal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  noteText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
});
