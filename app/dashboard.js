

import { useEffect, useState } from "react";
import {
    Dimensions,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-chart-kit";

import {
    Feather,
    FontAwesome5,
    Ionicons,
} from "@expo/vector-icons";

import { useRouter } from "expo-router";


const STATUS_BAR_OFFSET = 50;

export default function Dashboard() {
    const router = useRouter();

    //  Reactive dimensions
    const [windowDims, setWindowDims] = useState(Dimensions.get("window"));

    useEffect(() => {
        const sub = Dimensions.addEventListener("change", ({ window }) => {
            setWindowDims(window);
        });
        return () => sub.remove();
    }, []);

    const { width, height } = windowDims;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    //  Chart width measured via onLayout 
    const [chartWidth, setChartWidth] = useState(width - (isMobile ? 70 : 500));

    // UI state 
    const [darkMode, setDarkMode] = useState(true);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [profileVisible, setProfileVisible] = useState(false);
    const [watchlistName, setWatchlistName] = useState("Default");
    const [editingWatchlist, setEditingWatchlist] = useState(false);
    const [watchlistModal, setWatchlistModal] = useState(false);
    const [activeScreen, setActiveScreen] = useState("dashboard");

    // Theme tokens 
    const bg      = darkMode ? "#050816" : "#f4f6f9";
    const card    = darkMode ? "#171717" : "#ffffff";
    const text    = darkMode ? "#ffffff" : "#111827";
    const border  = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
    const subText = darkMode ? "#9ca3af" : "#6b7280";
    const inputBg = darkMode ? "#111827" : "#f3f4f6";
    const tagBg   = darkMode ? "#1f2937" : "#e5e7eb";

    //  Data 
    const stocks = ["SBIN", "TCS", "TATAPOWER", "ITC", "INFY", "HDFCBANK", "RELIANCE"];

    const gainers = [
        { stock: "INDIGO",    ltp: "4374", change: "+3.2%" },
        { stock: "TRENT",     ltp: "4249", change: "+2.7%" },
        { stock: "CIPLA",     ltp: "1362", change: "+2.1%" },
        { stock: "ASIANPAINT",ltp: "2480", change: "+2%"   },
    ];

    const losers = [
        { stock: "LT",       ltp: "3923", change: "-3.2%" },
        { stock: "ONGC",     ltp: "285",  change: "-1.6%" },
        { stock: "RELIANCE", ltp: "1446", change: "-1.2%" },
        { stock: "TITAN",    ltp: "4336", change: "-0.8%" },
    ];

    const mostTraded = [
        "SBIN", "NIFTY 50", "TCS", "TATAPOWER", "KOTAKBANK",
        "MPHASIS", "INFY", "HCLTECH", "AXISBANK", "NIFTY BANK",
    ];

    const fundLabels = ["Available Funds", "Blocked Funds", "Used Funds", "Today's P/L"];

    const analytics = [
        { title: "Profit Trades", value: "78%", color: "#22c55e" },
        { title: "Loss Trades",   value: "22%", color: "#ef4444" },
        { title: "Breakeven",     value: "10%", color: "#facc15" },
    ];

    const timeFilters = ["1 Day", "5 Days", "1 Month", "Ytd"];
    const tableHeaders = ["STOCK", "LTP", "CHANGE", "OPEN", "HIGH", "STOCK", "LTP", "CHANGE", "OPEN", "HIGH"];
    const profileMenuItems = [
        "My Account", "Trading Journal", "My Referrals",
        "Billing History", "Wallet Transactions", "Customer Support",
    ];

    //  Computed sizes 
    const SIDEBAR_W      = 230;
    const CONTENT_PX     = isMobile ? 10 : 24;
    const CARD_RADIUS    = 24;
    const STOCK_CARD_W   = isMobile ? "47%" : isTablet ? "30%" : 135;

    //  Sidebar stock list
    const SidebarStockList = () => (
        <>
            <TextInput
                placeholder="Search TCS, INFY..."
                placeholderTextColor="#888"
                style={[
                    styles.searchInput,
                    { backgroundColor: inputBg, color: text },
                ]}
            />
            {stocks.map((item, i) => (
                <View key={i} style={styles.stockRow}>
                    <View>
                        <Text style={[styles.stockName, { color: text }]}>{item}</Text>
                        <Text style={[styles.stockType, { color: subText }]}>NSE</Text>
                    </View>
                    <Text style={[styles.stockPrice, { color: text }]}>1059.90</Text>
                </View>
            ))}
        </>
    );

    return (
        <View style={[styles.container, { backgroundColor: bg }]}>

            {/*  MOBILE SIDEBAR MODAL  */}
            <Modal visible={sidebarVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <SafeAreaView style={[styles.mobileSidebar, { backgroundColor: card }]}>
                        <View style={styles.sidebarHeader}>
                            <Text style={[styles.sidebarTitle, { color: text }]}>
                                {watchlistName}
                            </Text>
                            <TouchableOpacity onPress={() => setSidebarVisible(false)}>
                                <Ionicons name="close" size={28} color={text} />
                            </TouchableOpacity>
                        </View>
                        <SidebarStockList />
                    </SafeAreaView>
                    <TouchableOpacity
                        style={styles.remainingOverlay}
                        onPress={() => setSidebarVisible(false)}
                    />
                </View>
            </Modal>

            {/* PROFILE MODAL  */}
            <Modal visible={profileVisible} transparent animationType="fade">
                <TouchableOpacity
                    style={styles.profileOverlay}
                    onPress={() => setProfileVisible(false)}
                />
                <View
                    style={[
                        styles.profileModal,
                        {
                            backgroundColor: card,
                            right: isMobile ? 10 : 20,
                            top: STATUS_BAR_OFFSET + (isMobile ? 30 : 20),
                            width: isMobile ? Math.min(width - 20, 280) : 340,
                        },
                    ]}
                >
                    <Text style={[styles.profileName, { color: text }]}>User</Text>
                    <Text style={[styles.profileMail, { color: subText }]}>
                        user123@gmail.com
                    </Text>
                    {profileMenuItems.map((item, i) => {
                        const isWallet = item === "Wallet Transactions";
                        return (
                            <TouchableOpacity
                                key={i}
                                style={[
                                    styles.profileItem,
                                    isWallet && {
                                        backgroundColor: "rgba(255,107,43,0.1)",
                                        borderRadius: 10,
                                        paddingHorizontal: 8,
                                        marginHorizontal: -8,
                                    },
                                ]}
                                onPress={() => {
                                    setProfileVisible(false);
                                    if (item === "Wallet Transactions") {
                                        router.push("/wallet-transaction");
                                    }
                                }}
                            >
                                <Text
                                    style={[
                                        styles.profileText,
                                        {
                                            color: isWallet ? "#e9e4e2" : text,
                                            fontWeight: isWallet ? "800" : "400",
                                        },
                                    ]}
                                    numberOfLines={1}
                                >
                                    {item}
                                </Text>
                                {isWallet && (
                                    <Feather name="chevron-right" size={14} color="#ff6b2b" />
                                )}
                            </TouchableOpacity>
                        );
                    })}
                    <TouchableOpacity
                        style={styles.logoutBtn}
                        onPress={() => {
                            setProfileVisible(false);
                            router.replace("/");
                        }}
                    >
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/*  MAIN LAYOUT*/}
            <View style={[styles.layout, { flexDirection: isMobile ? "column" : "row" }]}>

                {/*  WATCHLIST MODAL  */}
                <Modal visible={watchlistModal} transparent animationType="fade">
                    <TouchableOpacity
                        style={styles.profileOverlay}
                        onPress={() => setWatchlistModal(false)}
                    />
                    <View
                        style={[
                            styles.watchlistModal,
                            {
                                backgroundColor: card,
                                top: STATUS_BAR_OFFSET + (isMobile ? 60 : 120),
                                left: isMobile ? 10 : 20,
                                width: isMobile ? width - 20 : 460,
                            },
                        ]}
                    >
                        <Text style={{ color: text, fontSize: isMobile ? 22 : 30, fontWeight: "700" }}>
                            Manage Watchlists
                        </Text>
                        <Text style={{ color: subText, marginTop: 10 }}>
                            Add or delete your watchlists
                        </Text>
                        <View style={{ marginTop: 30 }}>
                            <Text style={{ color: text, fontSize: 18 }}>{watchlistName}</Text>
                        </View>
                        <TouchableOpacity style={{ marginTop: 30 }}>
                            <Text style={{ color: "#3b82f6", fontSize: 18, fontWeight: "600" }}>
                                + New List
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                {/*DESKTOP SIDEBAR*/}
                {!isMobile && (
                    <View style={[styles.sidebar, { backgroundColor: card }]}>
                        <View style={styles.sidebarHeader}>
                            {editingWatchlist ? (
                                <TextInput
                                    value={watchlistName}
                                    onChangeText={setWatchlistName}
                                    onBlur={() => setEditingWatchlist(false)}
                                    autoFocus
                                    style={{
                                        color: text,
                                        fontSize: 24,
                                        fontWeight: "700",
                                        padding: 0,
                                        flex: 1,
                                        marginRight: 10,
                                    }}
                                />
                            ) : (
                                <Text
                                    style={[styles.sidebarTitle, { color: text, flex: 1 }]}
                                    numberOfLines={1}
                                >
                                    {watchlistName}
                                </Text>
                            )}
                            <View style={{ flexDirection: "row", gap: 10, flexShrink: 0 }}>
                                <TouchableOpacity
                                    onPress={() => setEditingWatchlist(true)}
                                    style={[styles.iconSquare, { backgroundColor: inputBg }]}
                                >
                                    <Feather name="edit" size={16} color={text} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setWatchlistModal(true)}
                                    style={[styles.iconSquare, { backgroundColor: inputBg }]}
                                >
                                    <Ionicons name="add-outline" size={20} color={text} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <SidebarStockList />
                    </View>
                )}

                {/*  MAIN CONTENT */}
                <ScrollView
                    style={[styles.content, { paddingHorizontal: CONTENT_PX }]}
                    showsVerticalScrollIndicator={false}
                >
                    {/*  TOPBAR */}
                    {isMobile ? (
                        /* ── MOBILE TOPBAR: 2 clean rows ── */
                        <View style={{ width: "100%", gap: 14 }}>
                            {/* Row 1: hamburger + market cards + icons */}
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                            }}>
                                {/* Hamburger */}
                                <TouchableOpacity onPress={() => setSidebarVisible(true)}>
                                    <Feather name="menu" size={28} color={text} />
                                </TouchableOpacity>

                                {/* Market pills — centre */}
                                <View style={{ flexDirection: "row", gap: 8, flex: 1, justifyContent: "center", marginHorizontal: 8 }}>
                                    {["NIFTY 50", "BANK NIFTY"].map((label, i) => (
                                        <View key={i} style={[styles.marketCard, { backgroundColor: inputBg, minWidth: 0, flex: 1 }]}>
                                            <Text style={[styles.marketTitle, { color: subText }]}>{label}</Text>
                                            <Text style={[styles.marketValue, { color: text, fontSize: 14 }]}>
                                                {i === 0 ? "24,114.95" : "54,547.05"}
                                            </Text>
                                        </View>
                                    ))}
                                </View>

                                {/* Icons — right */}
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                                    <TouchableOpacity
                                        style={[styles.iconBtn, { backgroundColor: inputBg, padding: 8 }]}
                                        onPress={() => setDarkMode(!darkMode)}
                                    >
                                        <Ionicons name={darkMode ? "sunny" : "moon"} size={18} color={text} />
                                    </TouchableOpacity>
                                    <Ionicons name="notifications" size={22} color={text} />
                                    <TouchableOpacity onPress={() => setProfileVisible(true)}>
                                        <FontAwesome5 name="user-circle" size={30} color={text} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Row 2: nav links */}
                            <View style={{ flexDirection: "row", gap: 20 }}>
                                {["HOME", "ORDERS", "FUNDS"].map((item, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={() => {
                                            if (item === "ORDERS") router.push("/dashboard/orders");
                                            else if (item === "FUNDS") router.push("/dashboard/funds");
                                        }}
                                    >
                                        <Text
                                            style={[styles.navText, { color: i === 0 ? "#fbbf24" : subText }]}
                                        >
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ) : (
                        /* ── DESKTOP TOPBAR */
                        <View style={[styles.topbar, { flexDirection: "row", alignItems: "center" }]}>
                            {/* Market pills */}
                            <View style={[styles.marketRow, { flex: 1 }]}>
                                {["NIFTY 50", "BANK NIFTY"].map((label, i) => (
                                    <View key={i} style={[styles.marketCard, { backgroundColor: inputBg }]}>
                                        <Text style={[styles.marketTitle, { color: subText }]}>{label}</Text>
                                        <Text style={[styles.marketValue, { color: text }]}>
                                            {i === 0 ? "24,114.95" : "54,547.05"}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            {/* Nav — centred */}
                            <View style={[styles.navRow, { flex: 1, justifyContent: "center" }]}>
                                {["HOME", "ORDERS", "FUNDS"].map((item, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={() => {
                                            if (item === "ORDERS") router.push("/dashboard/orders");
                                            else if (item === "FUNDS") router.push("/dashboard/funds");
                                        }}
                                    >
                                        <Text
                                            style={[styles.navText, { color: i === 0 ? "#fbbf24" : subText }]}
                                        >
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Icons — right */}
                            <View style={[styles.iconRow, { flex: 1, justifyContent: "flex-end" }]}>
                                <TouchableOpacity
                                    style={[styles.iconBtn, { backgroundColor: inputBg }]}
                                    onPress={() => setDarkMode(!darkMode)}
                                >
                                    <Ionicons name={darkMode ? "sunny" : "moon"} size={20} color={text} />
                                </TouchableOpacity>
                                <Ionicons name="notifications" size={24} color={text} />
                                <TouchableOpacity onPress={() => setProfileVisible(true)}>
                                    <FontAwesome5 name="user-circle" size={38} color={text} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {/*  WELCOME */}
                    <Text style={[styles.welcome, { color: text, fontSize: isMobile ? 28 : 42 }]}>
                        Welcome Back 👋
                    </Text>

                    {/*  FUND CARDS */}
                    <View
                        style={[
                            styles.fundWrapper,
                            { flexDirection: isMobile ? "column" : "row" },
                        ]}
                    >
                        {fundLabels.map((item, i) => (
                            <LinearGradient
                                key={i}
                                colors={
                                    darkMode
                                        ? ["#07122e", "#08142f"]
                                        : ["#ffffff", "#f9fafb"]
                                }
                                style={[
                                    styles.fundCard,
                                    {
                                        width: isMobile ? "100%" : undefined,
                                        flex: isMobile ? undefined : 1,
                                        minWidth: isMobile ? undefined : 0, // prevent overflow
                                    },
                                ]}
                            >
                                <Text style={[styles.fundTitle, { color: subText }]}>{item}</Text>
                                <Text style={[styles.fundValue, { color: text, fontSize: isMobile ? 18 : 22 }]}>
                                    ₹1,00,000
                                </Text>
                            </LinearGradient>
                        ))}
                    </View>

                    {/*  TRADE ANALYTICS */}
                    <Text style={[styles.sectionTitle, { color: text, fontSize: isMobile ? 20 : 28 }]}>
                        Trade Analytics
                    </Text>
                    <View
                        style={[
                            styles.analyticsWrapper,
                            { flexDirection: isMobile ? "column" : "row" },
                        ]}
                    >
                        {analytics.map((item, i) => (
                            <LinearGradient
                                key={i}
                                colors={[`${item.color}35`, `${item.color}10`]}
                                style={[
                                    styles.analyticsCard,
                                    {
                                        width: isMobile ? "100%" : undefined,
                                        flex: isMobile ? undefined : 1,
                                        minWidth: isMobile ? undefined : 0,
                                    },
                                ]}
                            >
                                <Text style={[styles.analyticsPercent, { color: text }]}>
                                    {item.value}
                                </Text>
                                <Text style={[styles.analyticsTitle, { color: text }]}>
                                    {item.title}
                                </Text>
                                <View style={styles.progressBg}>
                                    <View
                                        style={[
                                            styles.progressFill,
                                            { width: item.value, backgroundColor: item.color },
                                        ]}
                                    />
                                </View>
                            </LinearGradient>
                        ))}
                    </View>

                    {/* ── MARKET INDEX CHART ─────────────────────────────────── */}
                    <View style={[styles.sectionCard, { backgroundColor: card }]}>
                        {/* Header */}
                        <View
                            style={{
                                flexDirection: isMobile ? "column" : "row",
                                justifyContent: "space-between",
                                alignItems: isMobile ? "flex-start" : "center",
                                marginBottom: 20,
                                gap: 14,
                            }}
                        >
                            <View>
                                <Text style={{ color: subText, fontSize: 12, letterSpacing: 1 }}>
                                    MARKET INDEX
                                </Text>
                                <Text
                                    style={{
                                        color: text,
                                        fontSize: isMobile ? 24 : 46,
                                        fontWeight: "800",
                                        marginTop: 4,
                                    }}
                                >
                                    NIFTY 50
                                </Text>
                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, flexWrap: "wrap" }}>
                                    <Text
                                        style={{
                                            color: text,
                                            fontSize: isMobile ? 22 : 34,
                                            fontWeight: "700",
                                        }}
                                    >
                                        24,336.15
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#22c55e",
                                            fontSize: isMobile ? 16 : 26,
                                            fontWeight: "700",
                                            marginLeft: 10,
                                        }}
                                    >
                                        +2.05 (+0.01%)
                                    </Text>
                                </View>
                            </View>

                            {/* Time filters */}
                            <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
                                {timeFilters.map((item, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: i === 2
                                                ? (darkMode ? "#ffffff" : "#111827")
                                                : "rgba(128,128,128,0.3)",
                                            paddingHorizontal: 16,
                                            paddingVertical: 10,
                                            borderRadius: 999,
                                            backgroundColor: i === 2
                                                ? (darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)")
                                                : "transparent",
                                        }}
                                    >
                                        <Text style={{ color: text, fontWeight: "600" }}>{item}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Chart — width measured from its container */}
                        <View
                            style={[
                                styles.chartWrapper,
                                { backgroundColor: darkMode ? "#111111" : "#f8fafc" },
                            ]}
                            onLayout={(e) => {
                                const w = e.nativeEvent.layout.width;
                                if (w > 0) setChartWidth(w - (isMobile ? 24 : 40));
                            }}
                        >
                            <LineChart
                                data={{
                                    labels: ["5/7", "5/7", "5/7", "5/7"],
                                    datasets: [{ data: [24330, 24290, 24360, 24336] }],
                                }}
                                width={chartWidth}
                                height={isMobile ? 220 : 300}
                                bezier
                                withDots
                                withInnerLines
                                withOuterLines={false}
                                chartConfig={{
                                    backgroundGradientFrom: darkMode ? "#111111" : "#f8fafc",
                                    backgroundGradientTo:   darkMode ? "#111111" : "#f8fafc",
                                    decimalPlaces: 0,
                                    color: () => "#4ade80",
                                    labelColor: () => (darkMode ? "#9ca3af" : "#6b7280"),
                                    propsForDots: { r: "5", strokeWidth: "2", stroke: "#4ade80" },
                                }}
                                style={{ borderRadius: 20 }}
                            />
                        </View>
                    </View>

                    {/* ── MOST TRADED STOCKS ─────────────────────────────────── */}
                    <View style={{ marginTop: 24 }}>
                        <Text
                            style={{
                                color: text,
                                fontSize: isMobile ? 20 : 28,
                                fontWeight: "800",
                                marginBottom: 18,
                            }}
                        >
                            Most Traded Stocks on Methoda
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                flexWrap: "wrap",
                                rowGap: 16,
                                columnGap: 16,
                                alignItems: "center",
                            }}
                        >
                            {mostTraded.map((item, i) => (
                                <View
                                    key={i}
                                    style={{
                                        width: STOCK_CARD_W,
                                        minWidth: 110,
                                        backgroundColor: card,
                                        borderRadius: 20,
                                        paddingVertical: 16,
                                        paddingHorizontal: 12,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderWidth: 1,
                                        borderColor: border,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Text
                                        numberOfLines={1}
                                        adjustsFontSizeToFit
                                        style={{
                                            color: text,
                                            fontSize: isMobile ? 18 : 15,
                                            fontWeight: "700",
                                            textAlign: "center",
                                            lineHeight: isMobile ? 22 : 18,
                                        }}
                                    >
                                        {item}
                                    </Text>
                                    <Text
                                        style={{
                                            color: subText,
                                            fontSize: isMobile ? 12 : 13,
                                            marginTop: 5,
                                            textAlign: "center",
                                        }}
                                    >
                                        ₹2,430.95 0.00%
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            gap: 10,
                                            alignItems: "center",
                                            marginTop: 10,
                                        }}
                                    >
                                        <TouchableOpacity style={styles.buyBtn}>
                                            <Text style={{ color: "#22c55e", fontWeight: "700" }}>B</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.sellBtn}>
                                            <Text style={{ color: "#ef4444", fontWeight: "700" }}>S</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* ── TOP MOVERS ─────────────────────────────────────────── */}
                    <View style={[styles.sectionCard, { backgroundColor: card, marginTop: 30 }]}>
                        {/* Header row */}
                        <View
                            style={{
                                flexDirection: isMobile ? "column" : "row",
                                justifyContent: "space-between",
                                alignItems: isMobile ? "flex-start" : "center",
                                marginBottom: 20,
                                gap: 12,
                            }}
                        >
                            <Text style={{ color: text, fontSize: isMobile ? 18 : 20, fontWeight: "800" }}>
                                Top Movers
                            </Text>
                            <View style={{ flexDirection: "row", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                                <View style={[styles.tagPill, { backgroundColor: tagBg }]}>
                                    <Text style={{ color: text, fontWeight: "600", fontSize: isMobile ? 12 : 14 }}>
                                        Last Updated - 07 May 2026
                                    </Text>
                                </View>
                                <View style={[styles.tagPill, { borderWidth: 1, borderColor: border }]}>
                                    <Text style={{ color: text, fontWeight: "600", fontSize: isMobile ? 12 : 14 }}>
                                        NSE ▼
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Gainer / Loser labels */}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 14 }}>
                            <View style={styles.gainerLabel}>
                                <Text style={{ color: "#22c55e", fontWeight: "700", fontSize: isMobile ? 14 : 16 }}>
                                    Top Gainers
                                </Text>
                            </View>
                            <View style={styles.loserLabel}>
                                <Text style={{ color: "#ef4444", fontWeight: "700", fontSize: isMobile ? 14 : 16 }}>
                                    Top Losers
                                </Text>
                            </View>
                        </View>

                        {/* Horizontally scrollable table */}
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ flexGrow: 1 }}
                        >
                            <View style={{ minWidth: 900, width: "100%" }}>
                                {/* Table header */}
                                <View
                                    style={[
                                        styles.tableHeader,
                                        { backgroundColor: tagBg },
                                    ]}
                                >
                                    {tableHeaders.map((h, i) => (
                                        <Text key={i} style={[styles.tableHead, { fontSize: isMobile ? 11 : 13 }]}>
                                            {h}
                                        </Text>
                                    ))}
                                </View>

                                {/* Rows */}
                                {gainers.map((g, i) => (
                                    <View key={i} style={[styles.tableRow, { borderBottomColor: border }]}>
                                        {/* Gainers */}
                                        <Text style={[styles.tableCell, { color: text,      fontSize: isMobile ? 11 : 13 }]}>{g.stock}</Text>
                                        <Text style={[styles.tableCell, { color: text,      fontSize: isMobile ? 11 : 13 }]}>₹{g.ltp}</Text>
                                        <Text style={[styles.tableCell, { color: "#22c55e", fontSize: isMobile ? 11 : 13 }]}>{g.change}</Text>
                                        <Text style={[styles.tableCell, { color: text,      fontSize: isMobile ? 11 : 13 }]}>4320</Text>
                                        <Text style={[styles.tableCell, { color: text,      fontSize: isMobile ? 11 : 13 }]}>4393</Text>
                                        {/* Losers */}
                                        <Text style={[styles.tableCell, { color: text,      fontSize: isMobile ? 11 : 13 }]}>{losers[i].stock}</Text>
                                        <Text style={[styles.tableCell, { color: text,      fontSize: isMobile ? 11 : 13 }]}>₹{losers[i].ltp}</Text>
                                        <Text style={[styles.tableCell, { color: "#ef4444", fontSize: isMobile ? 11 : 13 }]}>{losers[i].change}</Text>
                                        <Text style={[styles.tableCell, { color: text,      fontSize: isMobile ? 11 : 13 }]}>3974</Text>
                                        <Text style={[styles.tableCell, { color: text,      fontSize: isMobile ? 11 : 13 }]}>3974</Text>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                    <View style={{ height: 60 }} />
                </ScrollView>
            </View>
        </View>
    );
}

// ─── Base styles (no isMobile — all responsive values live in JSX) ──────────────
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    layout: {
        flex: 1,
    },

    // Sidebar
    sidebar: {
        width: 230,
        padding: 20,
        overflow: "hidden",
    },
    mobileSidebar: {
        width: "80%",
        height: "100%",
        padding: 16,
    },
    modalOverlay: {
        flex: 1,
        flexDirection: "row",
    },
    remainingOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
    },
    sidebarHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    sidebarTitle: {
        fontSize: 24,
        fontWeight: "800",
    },
    iconSquare: {
        width: 34,
        height: 34,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    searchInput: {
        padding: 14,
        borderRadius: 16,
        marginBottom: 24,
        fontSize: 15,
    },
    stockRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 22,
    },
    stockName: {
        fontWeight: "700",
        fontSize: 16,
    },
    stockType: {
        marginTop: 4,
        fontSize: 12,
    },
    stockPrice: {
        fontSize: 16,
    },

    // Main content
    content: {
        flex: 1,
        paddingTop: 16,
    },

    // Topbar
    topbar: {
        gap: 16,
        width: "100%",
    },
    marketRow: {
        flexDirection: "row",
        gap: 12,
        flexWrap: "wrap",
    },
    marketCard: {
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 18,
        minWidth: 130,
    },
    marketTitle: {
        fontSize: 11,
        letterSpacing: 0.5,
    },
    marketValue: {
        fontSize: 18,
        fontWeight: "700",
        marginTop: 4,
    },
    navRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 24,
        flexWrap: "wrap",
    },
    navText: {
        fontWeight: "700",
        fontSize: 14,
        letterSpacing: 0.5,
    },
    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    iconBtn: {
        padding: 10,
        borderRadius: 14,
    },

    // Welcome
    welcome: {
        fontWeight: "800",
        marginTop: 36,
        lineHeight: 52,
    },

    // Fund cards
    fundWrapper: {
        gap: 16,
        marginTop: 24,
    },
    fundCard: {
        minHeight: 130,
        padding: 22,
        borderRadius: 24,
    },
    fundTitle: {
        fontSize: 18,
    },
    fundValue: {
        fontWeight: "800",
        marginTop: 8,
    },

    // Analytics
    sectionTitle: {
        fontWeight: "700",
        marginTop: 36,
        marginBottom: 18,
    },
    analyticsWrapper: {
        gap: 16,
    },
    analyticsCard: {
        padding: 22,
        minHeight: 160,
        borderRadius: 24,
    },
    analyticsPercent: {
        fontSize: 40,
        fontWeight: "800",
    },
    analyticsTitle: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: "700",
    },
    progressBg: {
        height: 10,
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: 20,
        marginTop: 18,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        borderRadius: 20,
    },

    // Shared section card
    sectionCard: {
        width: "100%",
        borderRadius: 24,
        padding: 20,
        overflow: "hidden",
        marginTop: 30,
    },

    // Chart
    chartWrapper: {
        marginTop: 20,
        borderRadius: 20,
        overflow: "hidden",
        padding: 16,
        width: "100%",
    },

    // Most traded
    buyBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "rgba(34,197,94,0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
    sellBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "rgba(239,68,68,0.2)",
        alignItems: "center",
        justifyContent: "center",
    },

    // Top movers
    tagPill: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 12,
    },
    gainerLabel: {
        backgroundColor: "rgba(34,197,94,0.12)",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
    },
    loserLabel: {
        backgroundColor: "rgba(239,68,68,0.12)",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
    },
    tableHeader: {
        flexDirection: "row",
        paddingVertical: 12,
        borderRadius: 12,
    },
    tableHead: {
        flex: 1,
        width: 90,
        color: "#9ca3af",
        textAlign: "center",
        fontWeight: "700",
    },
    tableRow: {
        flexDirection: "row",
        paddingVertical: 16,
        borderBottomWidth: 1,
        alignItems: "center",
    },
    tableCell: {
        flex: 1,
        width: 90,
        textAlign: "center",
        fontWeight: "600",
    },

    // Profile
    profileOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    profileModal: {
        position: "absolute",
        borderRadius: 24,
        padding: 22,
        zIndex: 999,
        elevation: 20,
    },
    profileName: {
        fontSize: 22,
        fontWeight: "700",
    },
    profileMail: {
        marginTop: 6,
        marginBottom: 20,
        fontSize: 14,
    },
    profileItem: {
        paddingVertical: 12,
    },
    profileText: {
        fontSize: 15,
    },
    logoutBtn: {
        marginTop: 20,
        backgroundColor: "#ef4444",
        padding: 16,
        borderRadius: 16,
        alignItems: "center",
    },
    logoutText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 15,
    },

    // Watchlist modal
    watchlistModal: {
        position: "absolute",
        borderRadius: 24,
        padding: 24,
        zIndex: 999,
        elevation: 20,
    },
});