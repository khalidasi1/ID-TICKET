import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, Animated, LayoutAnimation, Platform, UIManager, Alert } from "react-native";
import { useState, useMemo } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useCart } from "@/contexts/CartContext";
import Ionicons from "@expo/vector-icons/Ionicons";

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

type SeatCategory = {
    id: string;
    name: string;
    price: number;
    color: string;
    seats: number[];
};

export default function Book() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { addToCart, matches, purchasedTickets, cartItems } = useCart();

    const matchId = params.matchId as string;
    const match = matches.find(m => m.id === matchId) || matches[0];

    // Check for duplicate booking (in Purchases OR in Cart)
    const hasTicket = useMemo(() => {
        const inPurchased = purchasedTickets.some(ticket => ticket.matchId === matchId);
        const inCart = cartItems.some(ticket => ticket.matchId === matchId);
        return inPurchased || inCart;
    }, [purchasedTickets, cartItems, matchId]);

    // Define 3 categories with mock seats
    const categories: SeatCategory[] = useMemo(() => {
        const basePrice = match ? match.price : 60;
        return [
            { id: 'gold', name: 'Gold Class', price: basePrice + 50, color: '#FFD700', seats: [101, 102, 103, 104, 105] },
            { id: 'silver', name: 'Silver Class', price: basePrice + 20, color: '#C0C0C0', seats: [201, 202, 203, 204, 205, 206] },
            { id: 'bronze', name: 'Bronze Class', price: basePrice, color: '#CD7F32', seats: [301, 302, 303, 304, 305, 306, 307, 308] },
        ];
    }, [match]);

    const [expandedCategory, setExpandedCategory] = useState<string | null>('gold');
    const [selectedSeat, setSelectedSeat] = useState<{ categoryId: string, seatId: number, price: number } | null>(null);

    const toggleCategory = (categoryId: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    };

    const handleSelectSeat = (category: SeatCategory, seatId: number) => {
        if (selectedSeat?.seatId === seatId) {
            setSelectedSeat(null);
        } else {
            setSelectedSeat({ categoryId: category.id, seatId, price: category.price });
        }
    };

    const handlePurchase = () => {
        if (hasTicket) {
            Alert.alert("تنبيه", "لديك تذكرة بالفعل لهذه المباراة (أو موجودة في السلة)");
            return;
        }
        if (selectedSeat && match) {
            addToCart(match.id, `مقعد ${selectedSeat.seatId} (${categories.find(c => c.id === selectedSeat.categoryId)?.name})`, selectedSeat.price);
            router.push("/(tabs)/cart");
        }
    };

    if (!match) return <View><Text>Match not found</Text></View>;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
                {/* Header Image */}
                <View style={styles.setsImageContainer}>
                    <Image style={styles.setsImage} source={require("@/assets/images/book/sets.png")} resizeMode="contain" />
                </View>

                {/* Title */}
                <Text style={styles.pageTitle}> اختر فئتك ومقعدك </Text>
                <Text style={styles.matchTitle}> {match.homeTeam} vs {match.awayTeam} </Text>

                {/* Categories Accordion */}
                <View style={styles.categoriesContainer}>
                    {categories.map((category) => (
                        <View key={category.id} style={styles.categoryCard}>
                            <TouchableOpacity
                                style={[styles.categoryHeader, { borderLeftColor: category.color, borderLeftWidth: 5 }]}
                                onPress={() => toggleCategory(category.id)}
                                activeOpacity={0.8}
                            >
                                <View style={styles.categoryInfo}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                        <Ionicons
                                            name={expandedCategory === category.id ? "chevron-up" : "chevron-down"}
                                            size={20}
                                            color="#FFFFFF"
                                        />
                                        <Text style={styles.categoryPrice}>{category.price} ريال</Text>
                                    </View>
                                    <Text style={styles.categoryName}>{category.name}</Text>
                                </View>
                            </TouchableOpacity>

                            {expandedCategory === category.id && (
                                <View style={styles.seatsGrid}>
                                    {category.seats.map((seatId) => {
                                        const isSelected = selectedSeat?.seatId === seatId;
                                        return (
                                            <TouchableOpacity
                                                key={seatId}
                                                style={[
                                                    styles.seatButton,
                                                    isSelected && { backgroundColor: category.color, borderColor: category.color }
                                                ]}
                                                onPress={() => handleSelectSeat(category, seatId)}
                                            >
                                                <Text style={[styles.seatText, isSelected && { color: '#fff' }]}>{seatId}</Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Bottom Action Bar */}
            <View style={styles.submitContainer}>
                <View style={styles.footerInfo}>
                    <Text style={styles.totalPrice}>
                        {selectedSeat ? `${selectedSeat.price} ريال` : '0 ريال'}
                    </Text>
                    <Text style={styles.totalLabel}> الإجمالي </Text>
                </View>
                <TouchableOpacity
                    style={[styles.submit, (!selectedSeat || hasTicket) && styles.submitDisabled]}
                    onPress={handlePurchase}
                    disabled={!selectedSeat && !hasTicket} // Only disable if no seat selected (let them click to see alert if they want, or just disable)
                // Actually, if hasTicket is true, we should probably disable it visually but maybe let them click to see why? 
                // Or change text. Let's change text.
                >
                    <Text style={styles.submitText}> {hasTicket ? 'لديك تذكرة' : 'إضافة للسلة'} </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000', // Dark background
    },
    setsImageContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    setsImage: {
        width: '90%',
        height: 220,
    },
    pageTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF', // White text
        marginTop: 10,
    },
    matchTitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#8E8E93', // Gray text
        marginBottom: 20,
    },
    categoriesContainer: {
        paddingHorizontal: 20,
        gap: 15,
    },
    categoryCard: {
        backgroundColor: '#1C1C1E', // Dark card
        borderRadius: 12,
        overflow: 'hidden',
        // Shadows
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 2,
    },
    categoryHeader: {
        padding: 15,
        backgroundColor: '#1C1C1E', // Dark header
    },
    categoryInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF', // White text
    },
    categoryPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#30D158', // Green
    },
    seatsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end', // RTL alignment
        padding: 15,
        gap: 10,
        backgroundColor: '#000000', // Deep black for grid
        borderTopWidth: 1,
        borderTopColor: '#2C2C2E',
    },
    seatButton: {
        width: 50,
        height: 40,
        borderWidth: 1.5,
        borderColor: '#2C2C2E',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1C1C1E',
    },
    seatText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    submitContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1C1C1E', // Dark footer
        padding: 20,
        paddingBottom: 30,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        // Shadow for the footer
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footerInfo: {
        alignItems: 'flex-end',
    },
    totalLabel: {
        fontSize: 14,
        color: '#8E8E93',
    },
    totalPrice: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    submit: {
        backgroundColor: '#0057FF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 15,
        width: '50%',
        alignItems: 'center',
    },
    submitDisabled: {
        backgroundColor: '#3A3A3C', // Dark gray for disabled
    },
    submitText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});