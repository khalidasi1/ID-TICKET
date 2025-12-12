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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import Banner from "@/components/banner";
import Ticket from "@/components/ticket";
import Match from "@/components/match";

import { useState } from "react";
// ... existing imports

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const categories = ["الكل", "دوري روشن", "كأس الملك", "دوري أبطال آسيا", "كأس السوبر"];

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
  ];

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
          <Link href={"/explore"}> اظهار الكل </Link>
          <Text style={styles.ticketsContainerTitle}> تذاكر المستخدمين </Text>

        </View>
        <View style={styles.ticketsScrollParent}>
          <FlatList
            data={tickets}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ticketsScrollContainer}
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
              />
            )}
          />
        </View>

        {/* match */}
        <View style={styles.matchInfo}>
          <Link href={"/"}> اظهار الكل </Link>
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
  ticketsContainerTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFFFF", // White text
  },
  ticketsScrollParent: {
    marginBottom: 25,
  },
  ticketsScrollContainer: {
    paddingRight: 5,
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
