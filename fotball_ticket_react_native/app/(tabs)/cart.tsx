import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "expo-router";

export default function Cart() {
    const { cartItems, completePurchase } = useCart();
    const router = useRouter();

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    const handleCompletePurchase = () => {
        completePurchase();
        router.push("/(tabs)/profile");
    };

    if (cartItems.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>السلة فارغة</Text>
                    <Text style={styles.emptySubText}>لم تقم بإضافة أي تذاكر بعد</Text>
                    <TouchableOpacity
                        style={styles.browseButton}
                        onPress={() => router.push("/(tabs)")}
                    >
                        <Text style={styles.browseButtonText}>تصفح التذاكر</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>سلة التذاكر</Text>

                <FlatList
                    data={cartItems}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={({ item }) => (
                        <View style={styles.cartItem}>
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemTitle}>{item.matchSnapshot.homeTeam} و {item.matchSnapshot.awayTeam}</Text>
                                <Text style={styles.itemSeat}>{item.seatNumber}</Text>
                            </View>
                            <Text style={styles.itemPrice}>{item.price} ريال</Text>
                        </View>
                    )}
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                />

                <View style={styles.footer}>
                    <View style={styles.divider}></View>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>الإجمالي</Text>
                        <Text style={styles.totalPrice}>{totalPrice} ريال</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.purchaseButton}
                        onPress={handleCompletePurchase}
                    >
                        <Text style={styles.purchaseButtonText}>إتمام الشراء</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 20,
        color: '#0057FF',
    },
    list: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 20,
    },
    cartItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemDetails: {
        alignItems: 'flex-end',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemSeat: {
        fontSize: 14,
        color: '#666',
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0057FF',
    },
    footer: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    divider: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 15,
    },
    totalContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalPrice: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0057FF',
    },
    purchaseButton: {
        backgroundColor: '#0057FF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    purchaseButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    emptySubText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    browseButton: {
        backgroundColor: '#0057FF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    browseButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});