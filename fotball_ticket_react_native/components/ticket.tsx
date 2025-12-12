import { Link, RelativePathString, useRouter } from "expo-router";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  image: ImageSourcePropType | undefined;
  title: string;
  sellerName: string;
  sellerImage: ImageSourcePropType | undefined;
  price: number;
  itemWidth?: number;
  link: RelativePathString;
  ticketId?: string;
  matchId?: string;
  date?: string;
};

export default function Ticket({
  image,
  title,
  sellerName,
  sellerImage,
  price,
  itemWidth,
  link,
  ticketId,
  matchId,
  date
}: Props) {
  const navigate = useRouter();

  const handlePress = () => {
    if (ticketId) {
      navigate.push({
        pathname: link,
        params: { ticketId }
      });
    } else if (matchId) {
      navigate.push({
        pathname: link,
        params: { matchId }
      });
    } else {
      navigate.push(link);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.ticket, { width: itemWidth ? itemWidth : 200 }]}
    >
      <View>
        <Image style={styles.ticketImage} source={image} />
        {date && (
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>{date}</Text>
          </View>
        )}
      </View>
      <View style={styles.ticketInfo}>
        <Text style={styles.ticketTitle} numberOfLines={1}> {title} </Text>
        <View style={styles.ticketSeller}>
          <Text style={styles.sellerName}> {sellerName} </Text>
          <Image style={styles.sellerImage} source={sellerImage} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ticket: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: "#1C1C1E", // Dark card background
    borderRadius: 20,
    padding: 10,
    marginLeft: 15,
    marginVertical: 10,
    // Shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  ticketImage: {
    width: "100%",
    height: 130,
    borderRadius: 14,
    resizeMode: "cover",
  },
  ticketInfo: {
    alignItems: "flex-end",
  },
  ticketTitle: {
    paddingTop: 12,
    fontWeight: "700",
    fontSize: 16,
    textAlign: 'right',
    color: '#FFFFFF', // White text
  },
  ticketSeller: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  sellerImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  sellerName: {
    color: "#9095A6",
    fontSize: 12,
    marginRight: 6,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 15,
  },
  price: {
    fontSize: 18,
    color: "#30D158", // Brighter green for dark mode
  },
  dateBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  dateText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '700',
  },
});
