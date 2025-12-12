import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import { useCart } from "@/contexts/CartContext";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Wallet() {
    const { walletBalance, purchasedTickets, salesHistory } = useCart();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>محفظتك</Text>

                {/* Balance Card */}
                <View style={styles.balanceCard}>
                    <Ionicons name="wallet-outline" size={40} color="#0057FF" />
                    <Text style={styles.balanceLabel}>الرصيد الحالي</Text>
                    <Text style={styles.balanceAmount}>{walletBalance.toFixed(2)} ريال</Text>
                    <Text style={styles.balanceSubtext}>متاح للسحب</Text>
                </View>

                {/* Quick Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{purchasedTickets.length}</Text>
                        <Text style={styles.statLabel}>التذاكر المملوكة</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{salesHistory.length}</Text>
                        <Text style={styles.statLabel}>التذاكر المباعة</Text>
                    </View>
                </View>

                {/* Transactions History */}
                <View style={styles.transactionsSection}>
                    <Text style={styles.sectionTitle}>سجل العمليات</Text>

                    {salesHistory.length === 0 ? (
                        <View style={styles.emptyState}>
                            <Ionicons name="document-text-outline" size={60} color="#CCC" />
                            <Text style={styles.emptyText}>لا توجد عمليات حتى الآن</Text>
                            <Text style={styles.emptySubtext}>ستظهر هنا عمليات البيع الخاصة بك</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={salesHistory}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.transactionItem}>
                                    <View style={styles.transactionIcon}>
                                        <Ionicons name="arrow-up-circle" size={24} color="#4CAF50" />
                                    </View>
                                    <View style={styles.transactionDetails}>
                                        <Text style={styles.transactionType}>بيع تذكرة</Text>
                                        <Text style={styles.transactionDesc}>
                                            {item.ticketSnapshot.matchSnapshot.homeTeam} و {item.ticketSnapshot.matchSnapshot.awayTeam} - {item.ticketSnapshot.seatNumber}
                                        </Text>
                                        <Text style={styles.transactionDate}>
                                            {new Date(item.saleDate).toLocaleDateString('en-GB')}
                                        </Text>
                                    </View>
                                    <Text style={styles.transactionAmount}>+{item.salePrice.toFixed(2)} ريال</Text>
                                </View>
                            )}
                        />
                    )}
                </View>

                {/* Withdraw Button */}
                {walletBalance > 0 && (
                    <TouchableOpacity style={styles.withdrawButton}>
                        <Text style={styles.withdrawButtonText}>سحب الرصيد</Text>
                    </TouchableOpacity>
                )}
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
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 20,
        color: '#333',
    },
    balanceCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    balanceLabel: {
        fontSize: 16,
        color: '#666',
        marginTop: 15,
        marginBottom: 10,
    },
    balanceAmount: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#0057FF',
        marginBottom: 5,
    },
    balanceSubtext: {
        fontSize: 14,
        color: '#999',
    },
    statsContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    statValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
    },
    transactionsSection: {
        flex: 1,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 15,
        color: '#333',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        marginTop: 15,
        marginBottom: 5,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
    },
    transactionItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    transactionIcon: {
        marginLeft: 15,
    },
    transactionDetails: {
        flex: 1,
        alignItems: 'flex-end',
    },
    transactionType: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 3,
    },
    transactionDesc: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    transactionDate: {
        fontSize: 12,
        color: '#999',
    },
    transactionAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginRight: 15,
    },
    withdrawButton: {
        backgroundColor: '#0057FF',
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        marginTop: 10,
    },
    withdrawButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});