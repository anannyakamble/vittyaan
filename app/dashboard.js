// app/dashboard.js

import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Modal,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import {
    Feather,
    Ionicons,
    MaterialIcons,
    FontAwesome5,
} from "@expo/vector-icons";

import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const isMobile = width < 768;

export default function Dashboard() {
    const router = useRouter();

    const [darkMode, setDarkMode] = useState(true);
    const [sidebarVisible, setSidebarVisible] =
        useState(false);

    const [profileVisible, setProfileVisible] =
        useState(false);

    const [watchlistName, setWatchlistName] =
        useState("Default");

    const [editingWatchlist, setEditingWatchlist] =
        useState(false);

    const [watchlistModal, setWatchlistModal] =
        useState(false);

    const bg = darkMode
        ? "#050816"
        : "#f4f6f9";
    const card = darkMode
        ? "#0f172a"
        : "#ffffff";
    const text = darkMode ? "#ffffff" : "#111827";
    const subText = darkMode
        ? "#9ca3af"
        : "#6b7280";

    const stocks = [
        "SBIN",
        "TCS",
        "TATAPOWER",
        "ITC",
        "INFY",
        "HDFCBANK",
        "RELIANCE",
    ];

    const gainers = [
        {
            stock: "INDIGO",
            ltp: "4374",
            change: "+3.2%",
        },

        {
            stock: "TRENT",
            ltp: "4249",
            change: "+2.7%",
        },

        {
            stock: "CIPLA",
            ltp: "1362",
            change: "+2.1%",
        },

        {
            stock: "ASIANPAINT",
            ltp: "2480",
            change: "+2%",
        },
    ];

    const losers = [
        {
            stock: "LT",
            ltp: "3923",
            change: "-3.2%",
        },

        {
            stock: "ONGC",
            ltp: "285",
            change: "-1.6%",
        },

        {
            stock: "RELIANCE",
            ltp: "1446",
            change: "-1.2%",
        },

        {
            stock: "TITAN",
            ltp: "4336",
            change: "-0.8%",
        },
    ];

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: bg },
            ]}
        >
            {/* MOBILE SIDEBAR */}
            <Modal
                visible={sidebarVisible}
                transparent
                animationType="slide"
            >
                <View style={styles.modalOverlay}>
                    <View
                        style={[
                            styles.mobileSidebar,
                            {
                                backgroundColor: card,
                            },
                        ]}
                    >
                        <View style={styles.sidebarHeader}>
                            <Text
                                style={[
                                    styles.sidebarTitle,
                                    { color: text },
                                ]}
                            >
                                Default
                            </Text>

                            <TouchableOpacity
                                onPress={() =>
                                    setSidebarVisible(false)
                                }
                            >
                                <Ionicons
                                    name="close"
                                    size={28}
                                    color={text}
                                />
                            </TouchableOpacity>
                        </View>

                        <TextInput
                            placeholder="Search TCS, INFY..."
                            placeholderTextColor="#888"
                            style={[
                                styles.searchInput,
                                {
                                    backgroundColor:
                                        darkMode
                                            ? "#111827"
                                            : "#f3f4f6",

                                    color: text,
                                },
                            ]}
                        />

                        {stocks.map((item, i) => (
                            <View
                                key={i}
                                style={styles.stockRow}
                            >
                                <View>
                                    <Text
                                        style={[
                                            styles.stockName,
                                            { color: text },
                                        ]}
                                    >
                                        {item}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.stockType,
                                            {
                                                color: subText,
                                            },
                                        ]}
                                    >
                                        NSE
                                    </Text>
                                </View>

                                <Text
                                    style={[
                                        styles.stockPrice,
                                        { color: text },
                                    ]}
                                >
                                    1059.90
                                </Text>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={styles.remainingOverlay}
                        onPress={() =>
                            setSidebarVisible(false)
                        }
                    />
                </View>
            </Modal>

            {/* PROFILE MODAL */}
            <Modal
                visible={profileVisible}
                transparent
                animationType="fade"
            >
                <TouchableOpacity
                    style={styles.profileOverlay}
                    onPress={() =>
                        setProfileVisible(false)
                    }
                />

                <View
                    style={[
                        styles.profileModal,
                        {
                            backgroundColor: card,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.profileName,
                            { color: text },
                        ]}
                    >
                        User
                    </Text>

                    <Text
                        style={[
                            styles.profileMail,
                            { color: subText },
                        ]}
                    >
                        user123@gmail.com
                    </Text>

                    {[
                        "My Account",
                        "Trading Journal",
                        "My Referrals",
                        "Billing History",
                        "Wallet Transactions",
                        "Customer Support",
                    ].map((item, i) => (
                        <TouchableOpacity
                            key={i}
                            style={styles.profileItem}
                        >
                            <Text
                                style={[
                                    styles.profileText,
                                    { color: text },
                                ]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        style={styles.logoutBtn}
                        onPress={() => {
                            setProfileVisible(false);
                            router.replace("/");
                        }}
                    >
                        <Text
                            style={[
                                styles.logoutText,
                                { color: "#fff" },
                            ]}
                        >
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <View
                style={[
                    styles.layout,
                    {
                        flexDirection: isMobile
                            ? "column"
                            : "row",
                    },
                ]}
            >

                {/* WATCHLIST MODAL */}
                <Modal
                    visible={watchlistModal}
                    transparent
                    animationType="fade"
                >
                    <TouchableOpacity
                        style={styles.profileOverlay}
                        onPress={() =>
                            setWatchlistModal(false)
                        }
                    />

                    <View
                        style={[
                            styles.watchlistModal,
                            {
                                backgroundColor: card,
                            },
                        ]}
                    >
                        <Text
                            style={{
                                color: text,
                                fontSize: 30,
                                fontWeight: "700",
                            }}
                        >
                            Manage Watchlists
                        </Text>

                        <Text
                            style={{
                                color: subText,
                                marginTop: 10,
                            }}
                        >
                            Add or delete your watchlists
                        </Text>

                        <View
                            style={{
                                marginTop: 30,
                            }}
                        >
                            <Text
                                style={{
                                    color: text,
                                    fontSize: 18,
                                }}
                            >
                                {watchlistName}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={{
                                marginTop: 30,
                            }}
                        >
                            <Text
                                style={{
                                    color: "#3b82f6",
                                    fontSize: 18,
                                    fontWeight: "600",
                                }}
                            >
                                + New List
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                {/* DESKTOP SIDEBAR */}
                {!isMobile && (
                    <View
                        style={[
                            styles.sidebar,
                            {
                                backgroundColor: card,
                            },
                        ]}
                    >
                        <View style={styles.sidebarHeader}>
                            {editingWatchlist ? (
                                <TextInput
                                    value={watchlistName}
                                    onChangeText={setWatchlistName}
                                    onBlur={() =>
                                        setEditingWatchlist(false)
                                    }
                                    autoFocus
                                    style={{
                                        color: text,
                                        fontSize: 24,
                                        fontWeight: "700",
                                        padding: 0,
                                    }}
                                />
                            ) : (
                                <Text
                                    style={[
                                        styles.sidebarTitle,
                                        { color: text },
                                    ]}
                                >
                                    {watchlistName}
                                </Text>
                            )}

                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 14,
                                }}
                            >
                                {/* EDIT */}
                                <TouchableOpacity
                                    onPress={() =>
                                        setEditingWatchlist(true)
                                    }
                                >
                                    <Feather
                                        name="edit"
                                        size={20}
                                        color={text}
                                    />
                                </TouchableOpacity>


                                {/* WATCHLIST */}
                                <TouchableOpacity
                                    onPress={() =>
                                        setWatchlistModal(true)
                                    }
                                >
                                    <Ionicons
                                        name="add-outline"
                                        size={24}
                                        color={text}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TextInput
                            placeholder="Search TCS, INFY..."
                            placeholderTextColor="#888"
                            style={[
                                styles.searchInput,
                                {
                                    backgroundColor:
                                        darkMode
                                            ? "#111827"
                                            : "#f3f4f6",

                                    color: text,
                                },
                            ]}
                        />

                        {stocks.map((item, i) => (
                            <View
                                key={i}
                                style={styles.stockRow}
                            >
                                <View>
                                    <Text
                                        style={[
                                            styles.stockName,
                                            { color: text },
                                        ]}
                                    >
                                        {item}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.stockType,
                                            {
                                                color: subText,
                                            },
                                        ]}
                                    >
                                        NSE
                                    </Text>
                                </View>

                                <Text
                                    style={[
                                        styles.stockPrice,
                                        { color: text },
                                    ]}
                                >
                                    1059.90
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* MAIN CONTENT */}
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={
                        false
                    }
                >
                    {/* TOPBAR */}
                    <View
                        style={[
                            styles.topbar,
                            {
                                flexDirection: isMobile
                                    ? "column"
                                    : "row",
                            },
                        ]}
                    >
                        {/* MOBILE MENU */}
                        {isMobile && (
                            <TouchableOpacity
                                onPress={() =>
                                    setSidebarVisible(true)
                                }
                            >
                                <Feather
                                    name="menu"
                                    size={32}
                                    color={text}
                                />
                            </TouchableOpacity>
                        )}

                        {/* MARKET */}
                        <View style={styles.marketRow}>
                            <View
                                style={[
                                    styles.marketCard,
                                    {
                                        backgroundColor:
                                            darkMode
                                                ? "#111827"
                                                : "#fff",
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.marketTitle,
                                        {
                                            color: subText,
                                        },
                                    ]}
                                >
                                    NIFTY 50
                                </Text>

                                <Text
                                    style={[
                                        styles.marketValue,
                                        { color: text },
                                    ]}
                                >
                                    24,114.95
                                </Text>
                            </View>

                            <View
                                style={[
                                    styles.marketCard,
                                    {
                                        backgroundColor:
                                            darkMode
                                                ? "#111827"
                                                : "#fff",
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.marketTitle,
                                        {
                                            color: subText,
                                        },
                                    ]}
                                >
                                    BANK NIFTY
                                </Text>

                                <Text
                                    style={[
                                        styles.marketValue,
                                        { color: text },
                                    ]}
                                >
                                    54,547.05
                                </Text>
                            </View>
                        </View>

                        {/* NAV */}
                        <View style={styles.navRow}>
                            {[
                                "HOME",
                                "ORDERS",
                                "FUNDS",
                            ].map((item, i) => (
                                <Text
                                    key={i}
                                    style={[
                                        styles.navText,
                                        {
                                            color:
                                                i === 0
                                                    ? "#fbbf24"
                                                    : subText,
                                        },
                                    ]}
                                >
                                    {item}
                                </Text>
                            ))}
                        </View>

                        {/* ICONS */}
                        <View style={styles.iconRow}>
                            <TouchableOpacity
                                style={[
                                    styles.iconBtn,
                                    {
                                        backgroundColor:
                                            darkMode
                                                ? "#111827"
                                                : "#fff",
                                    },
                                ]}
                                onPress={() =>
                                    setDarkMode(!darkMode)
                                }
                            >
                                <Ionicons
                                    name={
                                        darkMode
                                            ? "sunny"
                                            : "moon"
                                    }
                                    size={20}
                                    color={text}
                                />
                            </TouchableOpacity>

                            <Ionicons
                                name="notifications"
                                size={24}
                                color={text}
                            />

                            <TouchableOpacity
                                onPress={() =>
                                    setProfileVisible(true)
                                }
                            >
                                <FontAwesome5
                                    name="user-circle"
                                    size={38}
                                    color={text}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* WELCOME */}
                    <Text
                        style={[
                            styles.welcome,
                            { color: text },
                        ]}
                    >
                        Welcome Back 👋
                    </Text>

                    {/* FUND CARDS */}
                    <View
                        style={[
                            styles.fundWrapper,
                            {
                                flexDirection: isMobile
                                    ? "column"
                                    : "row",
                            },
                        ]}
                    >
                        {[
                            "Available Funds",
                            "Blocked Funds",
                            "Used Funds",
                            "Today's P/L",
                        ].map((item, i) => (
                            <LinearGradient
                                key={i}
                                colors={
                                    darkMode
                                        ? [
                                            "#07122e",
                                            "#08142f",
                                        ]
                                        : [
                                            "#ffffff",
                                            "#f9fafb",
                                        ]
                                }
                                style={styles.fundCard}
                            >
                                <Text
                                    style={[
                                        styles.fundTitle,
                                        {
                                            color: subText,
                                        },
                                    ]}
                                >
                                    {item}
                                </Text>

                                <Text
                                    style={[
                                        styles.fundValue,
                                        { color: text },
                                    ]}
                                >
                                    ₹100000
                                </Text>
                            </LinearGradient>
                        ))}
                    </View>

                    {/* ANALYTICS */}
                    <Text
                        style={[
                            styles.sectionTitle,
                            { color: text },
                        ]}
                    >
                        Trade Analytics
                    </Text>

                    <View
                        style={[
                            styles.analyticsWrapper,
                            {
                                flexDirection: isMobile
                                    ? "column"
                                    : "row",
                            },
                        ]}
                    >
                        {[
                            {
                                title: "Profit Trades",
                                value: "78%",
                                color: "#22c55e",
                            },

                            {
                                title: "Loss Trades",
                                value: "22%",
                                color: "#ef4444",
                            },

                            {
                                title: "Breakeven",
                                value: "10%",
                                color: "#facc15",
                            },
                        ].map((item, i) => (
                            <LinearGradient
                                key={i}
                                colors={[
                                    `${item.color}35`,
                                    `${item.color}10`,
                                ]}
                                style={styles.analyticsCard}
                            >
                                <Text
                                    style={[
                                        styles.analyticsPercent,
                                        { color: text },
                                    ]}
                                >
                                    {item.value}
                                </Text>

                                <Text
                                    style={styles.analyticsTitle}
                                >
                                    {item.title}
                                </Text>

                                <View style={styles.progressBg}>
                                    <View
                                        style={[
                                            styles.progressFill,
                                            {
                                                width: item.value,
                                                backgroundColor:
                                                    item.color,
                                            },
                                        ]}
                                    />
                                </View>
                            </LinearGradient>
                        ))}
                    </View>

                    {/* TOP MOVERS */}
                    <View
                        style={[
                            styles.topMoverCard,
                            {
                                backgroundColor: card,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.sectionTitle,
                                {
                                    color: text,
                                    marginTop: 0,
                                },
                            ]}
                        >
                            Top Movers
                        </Text>

                        {/* MOBILE */}
                        {isMobile ? (
                            <>
                                <Text
                                    style={styles.gainerTitle}
                                >
                                    Top Gainers
                                </Text>

                                {gainers.map((item, i) => (
                                   <View
  key={i}
  style={[
    styles.mobileMoverRow,
    {
      backgroundColor: darkMode
        ? "#111827"
        : "#f9fafb",
    },
  ]}
>
                                        <View>
                                            <Text
                                                style={[
                                                    styles.mobileStock,
                                                    { color: text },
                                                ]}
                                            >
                                                {item.stock}
                                            </Text>

                                            <Text
                                                style={{
                                                    color: subText,
                                                }}
                                            >
                                                ₹{item.ltp}
                                            </Text>
                                        </View>

                                        <Text
                                            style={{
                                                color: "#22c55e",
                                                fontWeight: "700",
                                            }}
                                        >
                                            {item.change}
                                        </Text>
                                    </View>
                                ))}

                                <Text
                                    style={[
                                        styles.gainerTitle,
                                        {
                                            color: "#ef4444",
                                        },
                                    ]}
                                >
                                    Top Losers
                                </Text>

                                {losers.map((item, i) => (
                                    <View
                                        key={i}
                                        style={
                                            styles.mobileMoverRow
                                        }
                                    >
                                        <View>
                                            <Text
                                                style={[
                                                    styles.mobileStock,
                                                    { color: text },
                                                ]}
                                            >
                                                {item.stock}
                                            </Text>

                                            <Text
                                                style={{
                                                    color: subText,
                                                }}
                                            >
                                                ₹{item.ltp}
                                            </Text>
                                        </View>

                                        <Text
                                            style={{
                                                color: "#ef4444",
                                                fontWeight: "700",
                                            }}
                                        >
                                            {item.change}
                                        </Text>
                                    </View>
                                ))}
                            </>
                        ) : (
                            <>
                                <View
  style={[
    styles.tableHeader,
    {
      backgroundColor: darkMode
        ? "#1f2937"
        : "#e5e7eb",
    },
  ]}
>
                                    {[
                                        "STOCK",
                                        "LTP",
                                        "CHANGE",
                                        "STOCK",
                                        "LTP",
                                        "CHANGE",
                                    ].map((item, i) => (
                                        <Text
                                            key={i}
                                            style={styles.tableHead}
                                        >
                                            {item}
                                        </Text>
                                    ))}
                                </View>

                                {gainers.map((item, i) => (
                                    <View
                                        key={i}
                                        style={styles.tableRow}
                                    >
                                        <Text
                                            style={[
                                                styles.tableCell,
                                                { color: text },
                                            ]}
                                        >
                                            {item.stock}
                                        </Text>

                                        <Text
                                            style={[
                                                styles.tableCell,
                                                { color: text },
                                            ]}
                                        >
                                            ₹{item.ltp}
                                        </Text>

                                        <Text
                                            style={[
                                                styles.tableCell,
                                                {
                                                    color: "#22c55e",
                                                },
                                            ]}
                                        >
                                            {item.change}
                                        </Text>

                                        <Text
                                            style={[
                                                styles.tableCell,
                                                { color: text },
                                            ]}
                                        >
                                            {losers[i].stock}
                                        </Text>

                                        <Text
                                            style={[
                                                styles.tableCell,
                                                { color: text },
                                            ]}
                                        >
                                            ₹{losers[i].ltp}
                                        </Text>

                                        <Text
                                            style={[
                                                styles.tableCell,
                                                {
                                                    color: "#ef4444",
                                                },
                                            ]}
                                        >
                                            {losers[i].change}
                                        </Text>
                                    </View>
                                ))}
                            </>
                        )}
                    </View>

                    <View style={{ height: 60 }} />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    layout: {
        flex: 1,
    },

    sidebar: {
        width: 320,
        padding: 20,
    },

    mobileSidebar: {
        width: 280,
        height: "100%",
        padding: 20,
    },

    modalOverlay: {
        flex: 1,
        flexDirection: "row",
    },

    remainingOverlay: {
        flex: 1,
        backgroundColor:
            "rgba(0,0,0,0.4)",
    },

    sidebarHeader: {
        flexDirection: "row",
        justifyContent:
            "space-between",

        alignItems: "center",
        marginBottom: 20,
    },

    sidebarTitle: {
        fontSize: 28,
        fontWeight: "700",
    },

    searchInput: {
        padding: 14,
        borderRadius: 16,
        marginBottom: 24,
    },

    stockRow: {
        flexDirection: "row",
        justifyContent:
            "space-between",

        marginBottom: 24,
    },

    stockName: {
        fontWeight: "700",
        fontSize: 18,
    },

    stockType: {
        marginTop: 4,
    },

    stockPrice: {
        fontSize: 18,
    },

    content: {
        flex: 1,
        padding: 20,
    },

    topbar: {
        justifyContent:
            "space-between",

        alignItems: "center",
        gap: 20,
    },

    marketRow: {
        flexDirection: "row",
        gap: 16,
    },

    marketCard: {
        padding: 16,
        borderRadius: 18,
    },

    marketTitle: {
        fontSize: 12,
    },

    marketValue: {
        fontSize: 20,
        fontWeight: "700",
        marginTop: 4,
    },

    navRow: {
        flexDirection: "row",
        gap: 24,
        flexWrap: "wrap",
  justifyContent: "center",
    },

    navText: {
        fontWeight: "700",
        fontSize: 15,
    },

    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },

    iconBtn: {
        padding: 12,
        borderRadius: 14,
    },

    welcome: {
        fontSize: isMobile ? 34 : 60,
        fontWeight: "800",
        marginTop: 40,
    },

    fundWrapper: {
        gap: 20,
        marginTop: 30,
    },

    fundCard: {
        flex: 1,
        padding: 24,
        borderRadius: 24,
        width: isMobile ? "100%" : undefined,
    },

    fundTitle: {
        fontSize: 16,
    },

    fundValue: {
        fontSize: 34,
        fontWeight: "800",
        marginTop: 14,
    },

    sectionTitle: {
        fontSize: 28,
        fontWeight: "700",
        marginTop: 40,
        marginBottom: 20,
    },

    analyticsWrapper: {
        gap: 18,
    },

    analyticsCard: {
        flex: 1,
        padding: 24,
        borderRadius: 24,
    },

    analyticsPercent: {
        color: "#fff",

        fontSize: 42,
        fontWeight: "800",
    },

    analyticsTitle: {
        color: "#fff",
        fontSize: 18,
        marginTop: 10,
        fontWeight: "700",
    },

    progressBg: {
        height: 10,
        backgroundColor:
            "rgba(255,255,255,0.1)",

        borderRadius: 20,
        marginTop: 18,
    },

    progressFill: {
        height: "100%",
        borderRadius: 20,
    },

    topMoverCard: {
        marginTop: 40,
        padding: 20,
        borderRadius: 24,
    },

    gainerTitle: {
        color: "#22c55e",
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 14,
        marginTop: 10,
    },

    mobileMoverRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  padding: 16,
  borderRadius: 18,
  marginBottom: 12,
},
    mobileStock: {
        fontSize: 18,
        fontWeight: "700",
    },

    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#1f2937",
        paddingVertical: 14,
        borderRadius: 12,
    },

    tableHead: {
        flex: 1,
        color: "#9ca3af",
        textAlign: "center",
        fontWeight: "700",
    },

    tableRow: {
        flexDirection: "row",
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor:
            "rgba(255,255,255,0.05)",
    },

    tableCell: {
        flex: 1,
        color: "#fff",

        textAlign: "center",
    },

    profileOverlay: {
        flex: 1,
        backgroundColor:
            "rgba(0,0,0,0.4)",
    },

    profileModal: {
        position: "absolute",
        right: 20,
        top: isMobile ? 90 : 70,
        width: isMobile ? 280 : 340,
        borderRadius: 24,
        padding: 24,

        zIndex: 999,
        elevation: 20,
    },

    profileName: {
        fontSize: 24,
        fontWeight: "700",
    },

    profileMail: {
        marginTop: 6,
        marginBottom: 20,
    },

    profileItem: {
        paddingVertical: 14,
    },

    profileText: {
        fontSize: 16,
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
    },
    watchlistModal: {
        position: "absolute",
       top: isMobile ? 120 : 170,
  left: isMobile ? 10 : 20,
  width: isMobile ? "92%" : 460,
        borderRadius: 24,
        zIndex: 999,
        elevation: 20,
    },

});