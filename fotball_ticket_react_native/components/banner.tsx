import { Link } from "expo-router";
import { Image, StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");

export default function Banner() {
  return (
    <View style={styles.container}>
      <Link href={"/(tabs)/sell"} asChild>
        <TouchableOpacity activeOpacity={0.9} style={styles.bannerWrapper}>
          <Image
            style={styles.image}
            source={require("@/assets/images/header/premium_banner.png")}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    alignItems: "center",
  },
  bannerWrapper: {
    width: width - 40,
    height: 180,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#1c1c1e",
    shadowColor: "#0057FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
