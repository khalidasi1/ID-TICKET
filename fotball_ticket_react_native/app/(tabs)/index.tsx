import {
  Image,
  StyleSheet,
  Platform,
  FlatList,
  ScrollView,
  View,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import Banner from "@/components/banner";
import Ticket from "@/components/ticket";
import Match from "@/components/match";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const { matches } = useCart();
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 40) / 2 - 10;

  const categories = ["الكل", "دوري روشن", "كأس الملك", "دوري أبطال آسيا", "كأس السوبر"];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* menu */}
        <View style={styles.menu}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color="white"
          />
          <Feather name="menu" size={24} color="white" />
        </View>
        {/* search */}
        <View style={styles.searchContainer}>
          <KeyboardAvoidingView>
            <TextInput placeholder="استكشف التذاكر" placeholderTextColor="#8E8E93" style={styles.search} />
          </KeyboardAvoidingView>
        </View>

        {/* Categories Navigation Bar */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
            {categories.map((category, index) => (
              <Text
                key={index}
                style={[
                  styles.categoryItem,
                  selectedCategory === category && styles.categoryItemActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                {category}
              </Text>
            ))}
          </ScrollView>
        </View>

        {/* banner */}
        <Banner />
        {/* tickets */}
        <View style={styles.titleContainer}>
          <Link href={"/explore"} asChild>
            <TouchableOpacity style={styles.showAllButton}>
              <Text style={styles.showAllText}>اظهار الكل</Text>
            </TouchableOpacity>
          </Link>
          <Text style={styles.ticketsContainerTitle}> تذاكر المستخدمين </Text>

        </View>
        <View style={styles.ticketsScrollParent}>
          <FlatList
            data={matches.slice(0, 2)}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.ticketsGridContainer}
            columnWrapperStyle={styles.columnWrapper}
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
                matchId={item.id}
                itemWidth={itemWidth}
              />
            )}
          />
        </View>

        {/* match */}
        <View style={styles.matchInfo}>
          <Link href={"/"} asChild>
            <TouchableOpacity style={styles.showAllButton}>
              <Text style={styles.showAllText}>اظهار الكل</Text>
            </TouchableOpacity>
          </Link>
          <Text style={styles.matchTitle}> مباريات قادمة </Text>
        </View>
        <Match />
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 60,
    backgroundColor: '#000000', // Dark background
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  searchContainer: {
    marginBottom: 25,
  },
  search: {
    borderWidth: 0,
    backgroundColor: "#1C1C1E", // Dark gray for input
    borderRadius: 15,
    padding: 15,
    fontSize: 14,
    color: '#FFFFFF', // White text
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3, // Stronger shadow for dark mode
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  showAllButton: {
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3A3A3C',
  },
  showAllText: {
    color: '#0057FF',
    fontSize: 12,
    fontWeight: '600',
  },
  ticketsContainerTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFFFF", // White text
  },
  ticketsScrollParent: {
    marginBottom: 25,
  },
  ticketsGridContainer: {
    paddingHorizontal: 0,
    gap: 15,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  matchInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  matchTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFFFF", // White text
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesScroll: {
    paddingRight: 5,
    alignItems: 'center',
  },
  categoryItem: {
    color: '#8E8E93',
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    overflow: 'hidden',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryItemActive: {
    color: '#FFFFFF',
    backgroundColor: '#0057FF', // Active blue color
  },
});
