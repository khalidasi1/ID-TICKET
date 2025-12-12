import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ticket from "@/components/ticket";
import { useCart } from "@/contexts/CartContext";

type ticketType = {
  image: ImageSourcePropType | undefined;
  title: string;
  sellerName: string;
  sellerImage: ImageSourcePropType | undefined;
  price: number;
};

export default function Profile() {
  const { purchasedTickets, salesHistory } = useCart();

  return (
    <SafeAreaView style={styles.container}>
      {/* background image */}
      <View style={styles.background}>
        <Image
          style={styles.backgroundImage}
          source={require("@/assets/images/profile/background.png")}
        />
        <View style={styles.backgroundEdit}>
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#fff" />
          <MaterialCommunityIcons
            name="pencil-outline"
            size={24}
            color="#fff"
          />
        </View>
      </View>
      {/* profile details */}
      <View style={styles.profileContainer}>
        {/* profile image */}
        <Image
          style={styles.profileImage}
          source={require("@/assets/images/khalid.jpg")}
        />
        <View style={styles.detailsContainer}>
          <View style={styles.profileName}>
            <Text style={styles.name}> خالد </Text>
            <Text style={styles.username}> @khalid </Text>
          </View>
          <View style={styles.numbersContainer}>
            <View style={styles.numberContainer}>
              <Text style={styles.number}>120</Text>
              <Text style={styles.numberDesc}> نقاطي </Text>
            </View>
            <View style={styles.numberContainer}>
              <Text style={styles.number}>{purchasedTickets.length}</Text>
              <Text style={styles.numberDesc}> تذاكري </Text>
            </View>
            <View style={styles.numberContainer}>
              <Text style={styles.number}>{salesHistory.length}</Text>
              <Text style={styles.numberDesc}> مبيعاتي </Text>
            </View>
          </View>
          <View style={styles.myTickets}>
            <Text style={styles.myTicketsTitle}> تذاكري </Text>
            <FlatList
              data={purchasedTickets}
              style={styles.ticketWrapper}
              renderItem={({ item }) => (
                <Ticket
                  image={item.matchSnapshot.image}
                  title={`${item.matchSnapshot.homeTeam} و ${item.matchSnapshot.awayTeam}`}
                  sellerImage={item.matchSnapshot.sellerImage}
                  sellerName={item.matchSnapshot.sellerName}
                  price={item.price}
                  itemWidth={170}
                  link={'../digitalTicket'}
                  ticketId={item.id}
                />
              )}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              numColumns={2}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  background: {
    height: 194,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  backgroundEdit: {
    position: "absolute",
    top: 16,
    right: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileContainer: {
    height: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  profileImage: {
    position: "absolute",
    top: -60,
    left: 300,
    width: 87,
    height: 87,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#fff",
  },
  detailsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    paddingVertical: 13,
  },
  profileName: {
    paddingTop: 5,
    alignItems: "flex-end",
    gap: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  username: {
    color: "#9095A6",
  },
  numbersContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  numberContainer: {
    alignItems: "center",
    gap: 6,
  },
  number: {
    fontSize: 17,
    fontWeight: "bold",
  },
  numberDesc: {
    color: "#9095A6",
  },
  myTickets: {
    paddingTop: 50,
  },
  myTicketsTitle: {
    alignSelf: "flex-end",
    fontSize: 21,
    fontWeight: "bold",
    color: "#0057FF",
    borderBottomWidth: 2,
    borderColor: "#0057FF",
    width: 120,
    textAlign: "right",
    paddingBottom: 5,
  },
  ticketWrapper: {
    paddingVertical: 10,
    height: 300
  },
});
