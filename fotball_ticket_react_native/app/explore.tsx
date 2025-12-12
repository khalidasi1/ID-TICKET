import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Ticket from "@/components/ticket";

export default function ExploreScreen() {
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 40) / 2 - 10; // Calculate width for 2 columns

  // Mock data
  const tickets = [
    {
      image: require("@/assets/images/tickets/ticket1.png"),
      title: "الهلال و النصر",
      sellerName: "خالد",
      sellerImage: require("@/assets/images/khalid.jpg"),
      price: 75,
      date: "26 Mar"
    },
    {
      image: require("@/assets/images/tickets/ticket2.png"),
      title: "الاتحاد و الأهلي ",
      sellerName: "خالد",
      sellerImage: require("@/assets/images/khalid.jpg"),
      price: 100,
      date: "27 Mar"
    },
    {
      image: require("@/assets/images/tickets/ticket3.png"),
      title: "الرائيد و الاتحاد ",
      sellerName: "خالد",
      sellerImage: require("@/assets/images/khalid.jpg"),
      price: 68,
      date: "28 Mar"
    },
    {
      image: require("@/assets/images/tickets/ticket1.png"),
      title: "الأهلي و النصر",
      sellerName: "خالد",
      sellerImage: require("@/assets/images/khalid.jpg"),
      price: 85,
      date: "01 Jun"
    },
    {
      image: require("@/assets/images/tickets/ticket2.png"),
      title: "الاتحاد و الهلال",
      sellerName: "خالد",
      sellerImage: require("@/assets/images/khalid.jpg"),
      price: 95,
      date: "10 Jun"
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>جميع التذاكر</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Grid List */}
        <FlatList
          data={tickets}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => (
            <Ticket
              image={item.image}
              title={item.title}
              sellerImage={item.sellerImage}
              sellerName={item.sellerName}
              price={item.price}
              link={"../book"}
              date={item.date}
              itemWidth={itemWidth}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    padding: 5,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
