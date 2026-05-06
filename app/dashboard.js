// app/dashboard.js

import React, { useState, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    TextInput,
    Pressable,
    Animated,
} from "react-native";

import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { LineChart } from "react-native-chart-kit";

const { width } = Dimensions.get("window");
const isMobile = width < 768;

const sidebarStocks = [
    "SBIN",
    "TCS",
    "INFY",
    "RELIANCE",
    "ITC",
    "HDFCBANK",
    "AXISBANK",
];

const tradedStocks = [
    "NIFTY 50",
    "BANK NIFTY",
    "SBIN",
    "TCS",
    "INFY",
    "RELIANCE",
    "ITC",
    "AXISBANK",
];

export default function Dashboard() {
    const router = useRouter();

    const [darkMode, setDarkMode] =
        useState(true);

    const [showSidebar, setShowSidebar] =
        useState(false);

    const [showProfileMenu, setShowProfileMenu] =
        useState(false);

    const [watchlistName, setWatchlistName] =
        useState("Default");

    const [editingWatchlist, setEditingWatchlist] =
        useState(false);

    const [tempName, setTempName] =
        useState("Default");

    const scaleAnim = useRef(
        new Animated.Value(1)
    ).current;

    return (
        <LinearGradient
            colors={
                darkMode
                    ? [
                        "#070B14",
                        "#0B1220",
                        "#111827",
                    ]
                    : [
                        "#f8fafc",
                        "#e2e8f0",
                        "#cbd5e1",
                    ]
            }
            style={styles.container}
        >
            {/* MOBILE OVERLAY */}
            {showSidebar && isMobile && (
                <Pressable
                    style={styles.overlay}
                    onPress={() =>
                        setShowSidebar(false)
                    }
                />
            )}

            {/* SIDEBAR */}
            {(!isMobile || showSidebar) && (
                <BlurView
                    intensity={40}
                    tint={
                        darkMode ? "dark" : "light"
                    }
                    style={[
                        styles.sidebar,
                        isMobile && styles.mobileSidebar,
                    ]}
                >
                    {/* TOP */}
                    <View style={styles.sidebarTop}>
                        {!editingWatchlist ? (
                            <Text
                                style={[
                                    styles.sidebarTitle,
                                    {
                                        color: darkMode
                                            ? "#fff"
                                            : "#111",
                                    },
                                ]}
                            >
                                {watchlistName}
                            </Text>
                        ) : (
                            <TextInput
                                value={tempName}
                                onChangeText={setTempName}
                                placeholder="Enter Name"
                                placeholderTextColor="#777"
                                style={[
                                    styles.editInput,
                                    {
                                        color: darkMode
                                            ? "#fff"
                                            : "#111",
                                    },
                                ]}
                            />
                        )}

                        <View style={styles.sidebarIcons}>
                            <Pressable
                                onPress={() => {
                                    if (editingWatchlist) {
                                        setWatchlistName(
                                            tempName
                                        );
                                    }

                                    setEditingWatchlist(
                                        !editingWatchlist
                                    );
                                }}
                            >
                                <MaterialIcons
                                    name={
                                        editingWatchlist
                                            ? "check"
                                            : "edit"
                                    }
                                    size={20}
                                    color={
                                        darkMode
                                            ? "#fff"
                                            : "#111"
                                    }
                                />
                            </Pressable>

                            <MaterialIcons
                                name="playlist-add"
                                size={20}
                                color={
                                    darkMode
                                        ? "#fff"
                                        : "#111"
                                }
                            />

                            {isMobile && (
                                <Pressable
                                    onPress={() =>
                                        setShowSidebar(false)
                                    }
                                >
                                    <MaterialIcons
                                        name="close"
                                        size={20}
                                        color={
                                            darkMode
                                                ? "#fff"
                                                : "#111"
                                        }
                                    />
                                </Pressable>
                            )}
                        </View>
                    </View>

                    {/* SEARCH */}
                    <BlurView
                        intensity={25}
                        tint={
                            darkMode ? "dark" : "light"
                        }
                        style={styles.searchBox}
                    >
                        <MaterialIcons
                            name="search"
                            size={18}
                            color="#888"
                        />

                        <TextInput
                            placeholder="Search stocks..."
                            placeholderTextColor="#777"
                            style={[
                                styles.searchInput,
                                {
                                    color: darkMode
                                        ? "#fff"
                                        : "#111",
                                },
                            ]}
                        />
                    </BlurView>

                    {/* STOCKS */}
                    <ScrollView
                        showsVerticalScrollIndicator={
                            false
                        }
                    >
                        {sidebarStocks.map((item) => (
                            <View
                                key={item}
                                style={styles.stockItem}
                            >
                                <View>
                                    <Text
                                        style={[
                                            styles.stockName,
                                            {
                                                color: darkMode
                                                    ? "#fff"
                                                    : "#111",
                                            },
                                        ]}
                                    >
                                        {item}
                                    </Text>

                                    <Text
                                        style={styles.stockSub}
                                    >
                                        NSE
                                    </Text>
                                </View>

                                <View>
                                    <Text
                                        style={[
                                            styles.stockPrice,
                                            {
                                                color: darkMode
                                                    ? "#fff"
                                                    : "#111",
                                            },
                                        ]}
                                    >
                                        1044.20
                                    </Text>

                                    <Text
                                        style={[
                                            styles.stockSub,
                                            {
                                                color: "#00C853",
                                            },
                                        ]}
                                    >
                                        +0.43%
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </BlurView>
            )}

            {/* MAIN */}
            <ScrollView
                style={styles.main}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                showsVerticalScrollIndicator={
                    false
                }
            >
                {/* TOPBAR */}
                <BlurView
                    intensity={30}
                    tint={
                        darkMode ? "dark" : "light"
                    }
                    style={styles.topbar}
                >
                    {/* MOBILE MENU */}
                    {isMobile && (
                        <Pressable
                            onPress={() =>
                                setShowSidebar(
                                    !showSidebar
                                )
                            }
                        >
                            <MaterialIcons
                                name="menu"
                                size={28}
                                color={
                                    darkMode
                                        ? "#fff"
                                        : "#111"
                                }
                            />
                        </Pressable>
                    )}

                    {/* MARKET */}
                    <View style={styles.marketRow}>
                        <View
                            style={styles.marketBadge}
                        >
                            <Text
                                style={[
                                    styles.marketBadgeTitle,
                                    {
                                        color: darkMode
                                            ? "#aaa"
                                            : "#555",
                                    },
                                ]}
                            >
                                NIFTY 50
                            </Text>

                            <Text
                                style={[
                                    styles.marketBadgeValue,
                                    {
                                        color: darkMode
                                            ? "#fff"
                                            : "#111",
                                    },
                                ]}
                            >
                                24,114.95
                            </Text>
                        </View>

                        <View
                            style={styles.marketBadge}
                        >
                            <Text
                                style={[
                                    styles.marketBadgeTitle,
                                    {
                                        color: darkMode
                                            ? "#aaa"
                                            : "#555",
                                    },
                                ]}
                            >
                                BANK NIFTY
                            </Text>

                            <Text
                                style={[
                                    styles.marketBadgeValue,
                                    {
                                        color: darkMode
                                            ? "#fff"
                                            : "#111",
                                    },
                                ]}
                            >
                                54,547.05
                            </Text>
                        </View>
                    </View>

                    {/* NAV */}
                    <View style={styles.navSection}>
                        <Text style={styles.activeNav}>
                            HOME
                        </Text>

                        {!isMobile && (
                            <>
                                <Text
                                    style={[
                                        styles.nav,
                                        {
                                            color: darkMode
                                                ? "#aaa"
                                                : "#444",
                                        },
                                    ]}
                                >
                                    ORDERS
                                </Text>

                                <Text
                                    style={[
                                        styles.nav,
                                        {
                                            color: darkMode
                                                ? "#aaa"
                                                : "#444",
                                        },
                                    ]}
                                >
                                    FUNDS
                                </Text>
                            </>
                        )}
                    </View>

                    {/* RIGHT */}
                    <View style={styles.rightTop}>
                        {!isMobile && (
                            <LinearGradient
                                colors={[
                                    "#FFD166",
                                    "#FF9F1C",
                                ]}
                                style={
                                    styles.subscribeBtn
                                }
                            >
                                <Text
                                    style={
                                        styles.subscribeText
                                    }
                                >
                                    SUBSCRIBE
                                </Text>
                            </LinearGradient>
                        )}

                        {/* DARK LIGHT */}
                        <Pressable
                            onPress={() =>
                                setDarkMode(!darkMode)
                            }
                        >
                            <BlurView
                                intensity={30}
                                tint={
                                    darkMode
                                        ? "dark"
                                        : "light"
                                }
                                style={styles.iconCircle}
                            >
                                <MaterialIcons
                                    name={
                                        darkMode
                                            ? "light-mode"
                                            : "dark-mode"
                                    }
                                    size={18}
                                    color={
                                        darkMode
                                            ? "#fff"
                                            : "#111"
                                    }
                                />
                            </BlurView>
                        </Pressable>

                        {/* NOTIFICATION */}
                        <MaterialIcons
                            name="notifications"
                            size={22}
                            color={
                                darkMode
                                    ? "#fff"
                                    : "#111"
                            }
                        />

                        {/* PROFILE */}
                        <View
                            style={{
                                position: "relative",
                                zIndex: 99999,
                            }}
                        >
                            <Pressable
                                style={styles.profile}
                                onPress={() =>
                                    setShowProfileMenu(
                                        !showProfileMenu
                                    )
                                }
                            >
                                <MaterialIcons
                                    name="account-circle"
                                    size={42}
                                    color={
                                        darkMode
                                            ? "#fff"
                                            : "#111"
                                    }
                                />

                                {!isMobile && (
                                    <Text
                                        style={[
                                            styles.profileText,
                                            {
                                                color: darkMode
                                                    ? "#fff"
                                                    : "#111",
                                            },
                                        ]}
                                    >
                                        User
                                    </Text>
                                )}
                            </Pressable>

                            {/* DROPDOWN */}
                            {showProfileMenu && (
                                <View
                                    style={[
                                        styles.profileMenu,
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
                                            styles.menuName,
                                            {
                                                color: darkMode
                                                    ? "#fff"
                                                    : "#111",
                                            },
                                        ]}
                                    >
                                        User
                                    </Text>

                                    <Text
                                        style={[
                                            styles.menuEmail,
                                            {
                                                color: darkMode
                                                    ? "#aaa"
                                                    : "#555",
                                            },
                                        ]}
                                    >
                                        user123@gmail.com
                                    </Text>

                                    {[
                                        "My Account",
                                        "My Journals",
                                        "Billing",
                                        "Wallet",
                                        "Support",
                                    ].map((item) => (
                                        <Pressable
                                            key={item}
                                            style={
                                                styles.menuItem
                                            }
                                        >
                                            <Text
                                                style={[
                                                    styles.menuText,
                                                    {
                                                        color: darkMode
                                                            ? "#fff"
                                                            : "#111",
                                                    },
                                                ]}
                                            >
                                                {item}
                                            </Text>

                                            <MaterialIcons
                                                name="chevron-right"
                                                size={18}
                                                color={
                                                    darkMode
                                                        ? "#fff"
                                                        : "#111"
                                                }
                                            />
                                        </Pressable>
                                    ))}

                                    {/* LOGOUT */}
                                    <Pressable
                                        style={
                                            styles.logoutBtn
                                        }
                                        onPress={() => {
                                            router.replace("/");
                                        }}
                                    >
                                        <Text
                                            style={
                                                styles.logoutText
                                            }
                                        >
                                            Logout
                                        </Text>
                                    </Pressable>
                                </View>
                            )}
                        </View>
                    </View>
                </BlurView>

                {/* WELCOME */}
                <Text
                    style={[
                        styles.heading,
                        {
                            color: darkMode
                                ? "#fff"
                                : "#111",
                        },
                    ]}
                >
                    Welcome Back, User👋
                </Text>

                {/* FUNDS */}
                <View style={styles.cardsRow}>
                    {[
                        "Available Funds",
                        "Blocked Funds",
                        "Used Funds",
                        "Today's P/L",
                    ].map((item) => (
                        <BlurView
                            key={item}
                            intensity={25}
                            tint={
                                darkMode
                                    ? "dark"
                                    : "light"
                            }
                            style={styles.fundCard}
                        >
                            <Text
                                style={[
                                    styles.cardLabel,
                                    {
                                        color: darkMode
                                            ? "#aaa"
                                            : "#555",
                                    },
                                ]}
                            >
                                {item}
                            </Text>

                            <Text
                                style={[
                                    styles.cardValue,
                                    {
                                        color: darkMode
                                            ? "#fff"
                                            : "#111",
                                    },
                                ]}
                            >
                                ₹100000
                            </Text>
                        </BlurView>
                    ))}
                </View>

                {/* CHART */}
                <BlurView
                    intensity={30}
                    tint={
                        darkMode ? "dark" : "light"
                    }
                    style={styles.chartContainer}
                >
                    <Text
                        style={[
                            styles.chartHead,
                            {
                                color: darkMode
                                    ? "#fff"
                                    : "#111",
                            },
                        ]}
                    >
                        NIFTY 50
                    </Text>

                    <Text
                        style={[
                            styles.chartPrice,
                            {
                                color: darkMode
                                    ? "#fff"
                                    : "#111",
                            },
                        ]}
                    >
                        24,114.95
                    </Text>

                    <Text style={styles.chartLoss}>
                        -55.65 (-0.23%)
                    </Text>

                    <LineChart
                        data={{
                            labels: [
                                "9AM",
                                "11AM",
                                "1PM",
                                "3PM",
                            ],
                            datasets: [
                                {
                                    data: [
                                        24090,
                                        24150,
                                        24110,
                                        24114,
                                    ],
                                },
                            ],
                        }}
                        width={
                            isMobile
                                ? width - 50
                                : width - 450
                        }
                        height={240}
                        bezier
                        withDots={false}
                        chartConfig={{
                            backgroundGradientFrom:
                                darkMode
                                    ? "#131A27"
                                    : "#fff",
                            backgroundGradientTo:
                                darkMode
                                    ? "#131A27"
                                    : "#fff",
                            decimalPlaces: 0,
                            color: () => "#FF6B6B",
                            labelColor: () =>
                                darkMode
                                    ? "#888"
                                    : "#555",
                        }}
                        style={styles.chart}
                    />
                </BlurView>

                {/* TRADE ANALYTICS */}

                <Text
                    style={[
                        styles.sectionTitle,
                        {
                            color: darkMode
                                ? "#fff"
                                : "#111",
                        },
                    ]}
                >
                    Trade Analytics
                </Text>

                <View style={styles.analyticsContainer}>

                    {/* PROFIT */}
                    <LinearGradient
                        colors={[
                            "rgba(34,197,94,0.25)",
                            "rgba(34,197,94,0.08)",
                        ]}
                        style={styles.analyticsCard}
                    >
                        <View style={styles.analyticsTop}>
                            <View
                                style={[
                                    styles.analyticsIcon,
                                    {
                                        backgroundColor:
                                            "rgba(34,197,94,0.2)",
                                    },
                                ]}
                            >
                                <MaterialIcons
                                    name="trending-up"
                                    size={22}
                                    color="#22c55e"
                                />
                            </View>

                            <Text style={styles.analyticsPercent}>
                                78%
                            </Text>
                        </View>

                        <Text style={styles.analyticsTitle}>
                            Profit Trades
                        </Text>

                        <Text style={styles.analyticsSub}>
                            24 profitable trades
                        </Text>

                        {/* BAR */}
                        <View style={styles.progressBg}>
                            <LinearGradient
                                colors={[
                                    "#22c55e",
                                    "#16a34a",
                                ]}
                                style={[
                                    styles.progressFill,
                                    { width: "78%" },
                                ]}
                            />
                        </View>
                    </LinearGradient>

                    {/* LOSS */}
                    <LinearGradient
                        colors={[
                            "rgba(239,68,68,0.25)",
                            "rgba(239,68,68,0.08)",
                        ]}
                        style={styles.analyticsCard}
                    >
                        <View style={styles.analyticsTop}>
                            <View
                                style={[
                                    styles.analyticsIcon,
                                    {
                                        backgroundColor:
                                            "rgba(239,68,68,0.2)",
                                    },
                                ]}
                            >
                                <MaterialIcons
                                    name="trending-down"
                                    size={22}
                                    color="#ef4444"
                                />
                            </View>

                            <Text style={styles.analyticsPercent}>
                                22%
                            </Text>
                        </View>

                        <Text style={styles.analyticsTitle}>
                            Loss Trades
                        </Text>

                        <Text style={styles.analyticsSub}>
                            8 losing trades
                        </Text>

                        {/* BAR */}
                        <View style={styles.progressBg}>
                            <LinearGradient
                                colors={[
                                    "#ef4444",
                                    "#dc2626",
                                ]}
                                style={[
                                    styles.progressFill,
                                    { width: "22%" },
                                ]}
                            />
                        </View>
                    </LinearGradient>

                    {/* BREAKEVEN */}
                    <LinearGradient
                        colors={[
                            "rgba(250,204,21,0.25)",
                            "rgba(250,204,21,0.08)",
                        ]}
                        style={styles.analyticsCard}
                    >
                        <View style={styles.analyticsTop}>
                            <View
                                style={[
                                    styles.analyticsIcon,
                                    {
                                        backgroundColor:
                                            "rgba(250,204,21,0.2)",
                                    },
                                ]}
                            >
                                <MaterialIcons
                                    name="remove"
                                    size={22}
                                    color="#facc15"
                                />
                            </View>

                            <Text style={styles.analyticsPercent}>
                                10%
                            </Text>
                        </View>

                        <Text style={styles.analyticsTitle}>
                            Breakeven
                        </Text>

                        <Text style={styles.analyticsSub}>
                            3 neutral trades
                        </Text>

                        {/* BAR */}
                        <View style={styles.progressBg}>
                            <LinearGradient
                                colors={[
                                    "#facc15",
                                    "#eab308",
                                ]}
                                style={[
                                    styles.progressFill,
                                    { width: "10%" },
                                ]}
                            />
                        </View>
                    </LinearGradient>
                </View>

                {/* TOP MOVERS */}
                <View style={styles.topMoverContainer}>

                    {/* HEADER */}
                    <View style={styles.topMoverHeader}>
                        <Text style={styles.topMoverTitle}>
                            Top Movers
                        </Text>

                        <View style={styles.topRightRow}>
                            <View style={styles.updateBadge}>
                                <Text style={styles.updateText}>
                                    Last Updated - 06 May 2026 12:09
                                </Text>
                            </View>

                            <View style={styles.dropdown}>
                                <Text style={styles.dropdownText}>
                                    NSE ▼
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* LABELS */}
                    <View style={styles.gainerLoserRow}>
                        <Text style={styles.gainerText}>
                            Top Gainers
                        </Text>

                        <Text style={styles.loserText}>
                            Top Losers
                        </Text>
                    </View>

                    {/* TABLE */}
                    <View style={styles.tableContainer}>

                        {/* HEADER */}
                        <View style={styles.tableHeader}>
                            <Text style={styles.headCell}>
                                STOCK
                            </Text>
                            <Text style={styles.headCell}>
                                LTP
                            </Text>
                            <Text style={styles.headCell}>
                                CHANGE
                            </Text>
                            <Text style={styles.headCell}>
                                OPEN
                            </Text>
                            <Text style={styles.headCell}>
                                HIGH
                            </Text>

                            <Text style={styles.headCell}>
                                STOCK
                            </Text>
                            <Text style={styles.headCell}>
                                LTP
                            </Text>
                            <Text style={styles.headCell}>
                                CHANGE
                            </Text>
                            <Text style={styles.headCell}>
                                OPEN
                            </Text>
                            <Text style={styles.headCell}>
                                HIGH
                            </Text>
                        </View>

                        {[
                            [
                                "INDIGO",
                                "4374.9",
                                "+3.22%",
                                "4320",
                                "4393",

                                "LT",
                                "3923",
                                "-3.24%",
                                "3974",
                                "3974",
                            ],

                            [
                                "TRENT",
                                "4249.4",
                                "+2.76%",
                                "4157.9",
                                "4270",

                                "ONGC",
                                "285.25",
                                "-1.62%",
                                "289.95",
                                "290.25",
                            ],

                            [
                                "CIPLA",
                                "1362.6",
                                "+2.17%",
                                "1340",
                                "1367.3",

                                "RELIANCE",
                                "1446.1",
                                "-1.2%",
                                "1463",
                                "1473.3",
                            ],

                            [
                                "DRREDDY",
                                "1297.6",
                                "+2.08%",
                                "1282",
                                "1303",

                                "HINDUNILVR",
                                "2302.2",
                                "-1.08%",
                                "2330",
                                "2339.4",
                            ],

                            [
                                "ASIANPAINT",
                                "2480.1",
                                "+2.06%",
                                "2460",
                                "2482.8",

                                "TITAN",
                                "4336.4",
                                "-0.85%",
                                "4397.5",
                                "4441.1",
                            ],
                        ].map((row, index) => (
                            <View
                                key={index}
                                style={styles.tableDataRow}
                            >

                                {row.map((cell, i) => (
                                    <Text
                                        key={i}
                                        style={[
                                            styles.dataCell,

                                            i === 2 && {
                                                color: "#22c55e",
                                                fontWeight: "700",
                                            },

                                            i === 7 && {
                                                color: "#ef4444",
                                                fontWeight: "700",
                                            },
                                        ]}
                                    >
                                        {cell}
                                    </Text>
                                ))}
                            </View>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },

    overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor:
            "rgba(0,0,0,0.5)",
        zIndex: 998,
    },

    sidebar: {
        width: 320,
        padding: 20,
    },

    mobileSidebar: {
        position: "absolute",
        zIndex: 999,
        height: "100%",
    },

    sidebarTop: {
        flexDirection: "row",
        justifyContent:
            "space-between",
        alignItems: "center",
        marginBottom: 20,
    },

    sidebarTitle: {
        fontSize: 22,
        fontWeight: "700",
    },

    sidebarIcons: {
        flexDirection: "row",
        gap: 14,
    },

    editInput: {
        borderBottomWidth: 1,
        borderBottomColor:
            "rgba(255,255,255,0.2)",
        minWidth: 120,
    },

    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 18,
        paddingHorizontal: 14,
        marginBottom: 20,
    },

    searchInput: {
        flex: 1,
        padding: 14,
    },

    stockItem: {
        flexDirection: "row",
        justifyContent:
            "space-between",
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor:
            "rgba(255,255,255,0.05)",
    },

    stockName: {
        fontWeight: "700",
    },

    stockSub: {
        color: "#888",
        marginTop: 4,
        fontSize: 12,
    },

    stockPrice: {},

    main: {
        flex: 1,
        padding: 20,
        overflow: "visible",
    },

    topbar: {
        flexDirection: isMobile
            ? "column"
            : "row",
        justifyContent:
            "space-between",
        alignItems: "center",
        padding: 18,
        borderRadius: 24,
        marginBottom: 30,
        zIndex: 9999,
    },

    marketRow: {
        flexDirection: "row",
        gap: 12,
    },

    marketBadge: {
        backgroundColor:
            "rgba(255,255,255,0.05)",
        padding: 12,
        borderRadius: 16,
    },

    marketBadgeTitle: {
        fontSize: 12,
    },

    marketBadgeValue: {
        marginTop: 4,
        fontWeight: "700",
    },

    navSection: {
        flexDirection: "row",
        gap: 30,
    },

    activeNav: {
        color: "#FFD166",
        fontWeight: "700",
        borderBottomWidth: 2,
        borderBottomColor: "#FFD166",
        paddingBottom: 4,
    },

    nav: {
        fontWeight: "600",
    },

    rightTop: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },

    subscribeBtn: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 14,
    },

    subscribeText: {
        fontWeight: "700",
        color: "#111",
    },

    iconCircle: {
        padding: 10,
        borderRadius: 12,
        overflow: "hidden",
    },

    profile: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    profileText: {
        fontWeight: "700",
    },

    profileMenu: {
        position: "absolute",
        top: 65,
        right: 0,
        width: 280,
        borderRadius: 22,
        padding: 20,
        zIndex: 999999,
        elevation: 999999,
        borderWidth: 1,
        borderColor:
            "rgba(255,255,255,0.08)",
    },

    menuName: {
        fontSize: 20,
        fontWeight: "700",
    },

    menuEmail: {
        marginBottom: 20,
        marginTop: 4,
    },

    menuItem: {
        flexDirection: "row",
        justifyContent:
            "space-between",
        alignItems: "center",
        paddingVertical: 14,
    },

    menuText: {
        fontWeight: "500",
    },

    logoutBtn: {
        marginTop: 16,
        backgroundColor: "#FF3B30",
        padding: 14,
        borderRadius: 14,
        alignItems: "center",
    },

    logoutText: {
        color: "#fff",
        fontWeight: "700",
    },

    heading: {
        fontSize: 38,
        fontWeight: "700",
        marginBottom: 24,
    },

    cardsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
    },

    fundCard: {
        width: isMobile
            ? "100%"
            : 220,
        borderRadius: 24,
        padding: 20,
        overflow: "hidden",
    },

    cardLabel: {
        marginBottom: 10,
    },

    cardValue: {
        fontSize: 26,
        fontWeight: "700",
    },

    chartContainer: {
        marginTop: 30,
        borderRadius: 28,
        padding: 24,
    },

    chartHead: {
        fontSize: 36,
        fontWeight: "700",
    },

    chartPrice: {
        fontSize: 28,
        marginTop: 10,
    },

    chartLoss: {
        color: "#FF6B6B",
        marginTop: 4,
    },

    chart: {
        marginTop: 20,
        borderRadius: 24,
    },

    sectionTitle: {
        fontSize: 28,
        fontWeight: "700",
        marginTop: 30,
        marginBottom: 18,
    },

    analyticsRow: {
        flexDirection: isMobile
            ? "column"
            : "row",
        gap: 16,
    },

    analyticsCard: {
        flex: 1,
        borderRadius: 24,
        padding: 22,
        overflow: "hidden",
    },

    analyticsTitle: {
        fontSize: 18,
        fontWeight: "700",
    },

    analyticsSub: {
        marginTop: 10,
    },

    topMovers: {
        borderRadius: 24,
        padding: 20,
        overflow: "hidden",
        marginBottom: 60,
    },

    tableHead: {
        flexDirection: "row",
        justifyContent:
            "space-between",
        marginBottom: 12,
    },

    tableHeadText: {
        width: "25%",
        fontWeight: "700",
    },

    tableRow: {
        flexDirection: "row",
        justifyContent:
            "space-between",
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor:
            "rgba(255,255,255,0.05)",
    },

    tableCell: {
        width: "25%",
    },

    topMoverContainer: {
        marginTop: 30,
        backgroundColor: "#111827",
        borderRadius: 24,
        padding: 18,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
    },

    topMoverHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },

    topMoverTitle: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "700",
    },

    topRightRow: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },

    updateBadge: {
        backgroundColor: "#1f2937",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 10,
    },

    updateText: {
        color: "#d1d5db",
        fontSize: 12,
    },

    dropdown: {
        backgroundColor: "#111827",
        borderWidth: 1,
        borderColor: "#374151",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
    },

    dropdownText: {
        color: "#fff",
    },

    gainerLoserRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    gainerText: {
        color: "#22c55e",
        fontWeight: "700",
        fontSize: 18,
    },

    loserText: {
        color: "#ef4444",
        fontWeight: "700",
        fontSize: 18,
    },

    tableContainer: {
        backgroundColor: "#0f172a",
        borderRadius: 16,
        overflow: "hidden",
    },

    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#2b2b2b",
        paddingVertical: 14,
    },

    headCell: {
        flex: 1,
        color: "#d1d5db",
        textAlign: "center",
        fontWeight: "700",
        fontSize: 12,
    },

    tableDataRow: {
        flexDirection: "row",
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor:
            "rgba(255,255,255,0.05)",
    },

    dataCell: {
        flex: 1,
        color: "#fff",
        textAlign: "center",
        fontSize: 12,
    },
    analyticsContainer: {
  flexDirection: isMobile
    ? "column"
    : "row",
  gap: 18,
  marginTop: 10,
},

analyticsCard: {
  flex: 1,
  borderRadius: 28,
  padding: 22,
  borderWidth: 1,
  borderColor:
    "rgba(255,255,255,0.08)",

  shadowColor: "#000",
  shadowOpacity: 0.25,
  shadowRadius: 20,
  shadowOffset: {
    width: 0,
    height: 10,
  },

  elevation: 10,
},

analyticsTop: {
  flexDirection: "row",
  justifyContent:
    "space-between",
  alignItems: "center",
},

analyticsIcon: {
  width: 48,
  height: 48,
  borderRadius: 16,
  justifyContent: "center",
  alignItems: "center",
},

analyticsPercent: {
  color: "#fff",
  fontSize: 28,
  fontWeight: "800",
},

analyticsTitle: {
  color: "#fff",
  fontSize: 20,
  fontWeight: "700",
  marginTop: 20,
},

analyticsSub: {
  color: "#9ca3af",
  marginTop: 6,
  marginBottom: 20,
},

progressBg: {
  width: "100%",
  height: 10,
  backgroundColor:
    "rgba(255,255,255,0.08)",
  borderRadius: 20,
  overflow: "hidden",
},

progressFill: {
  height: "100%",
  borderRadius: 20,
},
});