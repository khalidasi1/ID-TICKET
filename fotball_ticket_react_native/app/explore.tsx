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
import { useCart } from "@/contexts/CartContext";

export default function ExploreScreen() {
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 40) / 2 - 10; // Calculate width for 2 columns

  const { matches } = useCart();

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
          data={matches}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Ticket
              image={item.image}
              title={`${item.homeTeam} و ${item.awayTeam}`}
              sellerImage={item.sellerImage}
              sellerName={item.sellerName}
              price={item.price}
              link={"../book"}
              date={item.date.split(" ").slice(0, 2).join(" ")}
              itemWidth={itemWidth}
              matchId={item.id}
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
