import { Link, RelativePathString, useRouter } from "expo-router";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

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
  horizontal?: boolean;
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
  date,
  horizontal
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
      activeOpacity={0.8}
      onPress={handlePress}
      style={[
        styles.ticket,
        horizontal && styles.ticketHorizontal,
        { width: horizontal ? '100%' : (itemWidth || 220) }
      ]}
    >
      <View style={[styles.imageContainer, horizontal && styles.imageContainerHorizontal]}>
        <Image style={styles.ticketImage} source={image} />
        {date && (
          <View style={styles.dateBadge}>
            <Ionicons name="calendar-outline" size={12} color="#fff" style={styles.dateIcon} />
            <Text style={styles.dateText}>{date}</Text>
          </View>
        )}
      </View>

      <View style={[styles.ticketInfo, horizontal && styles.ticketInfoHorizontal]}>
        <Text style={styles.ticketTitle} numberOfLines={2}>{title}</Text>

        <View style={styles.bottomSection}>
          <View style={styles.sellerContainer}>
            <Image style={styles.sellerImage} source={sellerImage} />
            <Text style={styles.sellerName} numberOfLines={1}>{sellerName}</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{price} <Text style={styles.currency}>ر.س</Text></Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ticket: {
    backgroundColor: "#1C1C1E",
    borderRadius: 20,
    marginVertical: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#2C2C2E",
  },
  ticketHorizontal: {
    flexDirection: 'row-reverse',
    marginLeft: 0,
    width: '100%',
    height: 120,
  },
  imageContainer: {
    width: "100%",
    height: 120,
    position: "relative",
    backgroundColor: "#2C2C2E",
  },
  imageContainerHorizontal: {
    width: 120,
    height: "100%",
  },
  ticketImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  dateBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    left: 'auto',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  dateIcon: {
    marginRight: 4,
  },
  dateText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
  },
  ticketInfo: {
    padding: 15,
    paddingTop: 12,
  },
  ticketInfoHorizontal: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  ticketTitle: {
    fontWeight: "700",
    fontSize: 15,
    textAlign: 'right',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bottomSection: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#3A3A3C",
    paddingTop: 12,
  },
  sellerContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    flex: 1,
  },
  sellerImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#3A3A3C",
  },
  sellerName: {
    color: "#9095A6",
    fontSize: 12,
    fontWeight: "500",
    flexShrink: 1,
  },
  priceContainer: {
    backgroundColor: "rgba(48, 209, 88, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  priceText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#30D158",
  },
  currency: {
    fontSize: 10,
    fontWeight: "600",
  },
});
