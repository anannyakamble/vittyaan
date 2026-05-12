

import { useEffect, useState } from "react";
import {
    Clipboard,
    Dimensions,
    Modal,
    SafeAreaView,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const STATUS_BAR_OFFSET = 50;

// ─── Sample ledger data 
const LEDGER_DATA = [
    { id: 1, amount: "100.00", date: "5/8/2026, 4:05:04 PM",  status: "SUCCESS", type: "CREDIT", reason: "SIGN_UP",    txId: "7F1D1234" },
    { id: 2, amount: "50.00",  date: "5/9/2026, 10:22:11 AM", status: "SUCCESS", type: "CREDIT", reason: "REFERRAL",   txId: "A2B3C4D5" },
    { id: 3, amount: "20.00",  date: "5/10/2026, 2:14:33 PM", status: "PENDING", type: "DEBIT",  reason: "WITHDRAWAL", txId: "E6F7G8H9" },
    { id: 4, amount: "30.00",  date: "5/11/2026, 9:00:00 AM", status: "SUCCESS", type: "CREDIT", reason: "BONUS",      txId: "I1J2K3L4" },
];

const REFERRAL_CODE = "1015";

export default function WalletTransaction() {
    const router = useRouter();

    //  Reactive dimensions 
    const [windowDims, setWindowDims] = useState(Dimensions.get("window"));
    useEffect(() => {
        const sub = Dimensions.addEventListener("change", ({ window }) => setWindowDims(window));
        return () => sub.remove();
    }, []);
    const { width } = windowDims;
    const isMobile = width < 768;

    // UI state 
    const [darkMode, setDarkMode]               = useState(true);
    const [sidebarVisible, setSidebarVisible]   = useState(false);
    const [profileVisible, setProfileVisible]   = useState(false);
    const [watchlistName, setWatchlistName]     = useState("Default");
    const [editingWatchlist, setEditingWatchlist] = useState(false);
    const [watchlistModal, setWatchlistModal]   = useState(false);

    //  Wallet state
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate]     = useState("");
    const [copied, setCopied]     = useState(false);
    const [ledger, setLedger]     = useState(LEDGER_DATA);

    //  Theme tokens 
    const bg      = darkMode ? "#050816" : "#f4f6f9";
    const card    = darkMode ? "#171717" : "#ffffff";
    const text    = darkMode ? "#ffffff" : "#111827";
    const border  = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
    const subText = darkMode ? "#9ca3af" : "#6b7280";
    const inputBg = darkMode ? "#111827" : "#f3f4f6";
    const tagBg   = darkMode ? "#1f2937" : "#e5e7eb";

    const CONTENT_PX = isMobile ? 10 : 24;

    //  Derived stats 
    const totalTx   = ledger.length;
    const credits   = ledger.filter(t => t.type === "CREDIT").reduce((s, t) => s + parseFloat(t.amount), 0).toFixed(2);
    const debits    = ledger.filter(t => t.type === "DEBIT").reduce((s, t) => s + parseFloat(t.amount), 0).toFixed(2);
    const referrals = ledger.filter(t => t.reason === "REFERRAL").length;

    const SHARE_MSG = `Register now and earn 100 coins!\nUse my referral code: ${REFERRAL_CODE}\nRegister here: https://app.methoda.in/register`;

    const handleCopy = () => {
        Clipboard.setString(SHARE_MSG);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const handleShare  = async () => { try { await Share.share({ message: SHARE_MSG }); } catch (e) {} };
    const handleSearch = () => {
        if (!fromDate && !toDate) { setLedger(LEDGER_DATA); return; }
        setLedger(LEDGER_DATA.filter(t => {
            const d = new Date(t.date);
            const from = fromDate ? new Date(fromDate) : null;
            const to   = toDate   ? new Date(toDate)   : null;
            return (!from || d >= from) && (!to || d <= to);
        }));
    };
    const handleClear = () => { setFromDate(""); setToDate(""); setLedger(LEDGER_DATA); };

    //Sidebar data 
    const stocks       = ["SBIN", "TCS", "TATAPOWER", "ITC", "INFY", "HDFCBANK", "RELIANCE"];
    const profileMenuItems = [
        "My Account", "Trading Journal", "My Referrals",
        "Billing History", "Wallet Transactions", "Customer Support",
    ];

    //  Sidebar stock list
    const SidebarStockList = () => (
        <>
            <TextInput
                placeholder="Search TCS, INFY..."
                placeholderTextColor="#888"
                style={[styles.searchInput, { backgroundColor: inputBg, color: text }]}
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

    // Status badge 
    const StatusBadge = ({ status }) => {
        const isSuccess = status === "SUCCESS";
        const isPending = status === "PENDING";
        const color = isSuccess ? "#22c55e" : isPending ? "#facc15" : "#ef4444";
        const bg2   = isSuccess ? "rgba(34,197,94,0.15)" : isPending ? "rgba(250,204,21,0.15)" : "rgba(239,68,68,0.15)";
        return (
            <View style={[styles.statusBadge, { backgroundColor: bg2, borderColor: color + "50" }]}>
                <Text style={{ color, fontSize: 11, fontWeight: "700" }}>{status}</Text>
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: bg }]}>

            {/* MOBILE SIDEBAR MODAL */}
            <Modal visible={sidebarVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <SafeAreaView style={[styles.mobileSidebar, { backgroundColor: card }]}>
                        <View style={styles.sidebarHeader}>
                            <Text style={[styles.sidebarTitle, { color: text }]}>{watchlistName}</Text>
                            <TouchableOpacity onPress={() => setSidebarVisible(false)}>
                                <Ionicons name="close" size={28} color={text} />
                            </TouchableOpacity>
                        </View>
                        <SidebarStockList />
                    </SafeAreaView>
                    <TouchableOpacity style={styles.remainingOverlay} onPress={() => setSidebarVisible(false)} />
                </View>
            </Modal>

            {/* PROFILE MODAL  */}
            <Modal visible={profileVisible} transparent animationType="fade">
                <TouchableOpacity
                    style={styles.profileOverlay}
                    onPress={() => setProfileVisible(false)}
                />
                <View style={[
                    styles.profileModal,
                    {
                        backgroundColor: card,
                        right: isMobile ? 10 : 20,
                        top: STATUS_BAR_OFFSET + (isMobile ? 30 : 20),
                        width: isMobile ? Math.min(width - 20, 280) : 340,
                    },
                ]}>
                    <Text style={[styles.profileName, { color: text }]}>User</Text>
                    <Text style={[styles.profileMail, { color: subText }]}>user123@gmail.com</Text>

                    {profileMenuItems.map((item, i) => (
                        <TouchableOpacity
                            key={i}
                            style={[
                                styles.profileItem,
                                item === "Wallet Transactions" && {
                                    backgroundColor: inputBg,
                                    borderRadius: 10,
                                    paddingHorizontal: 8,
                                    marginHorizontal: -8,
                                },
                            ]}
                            onPress={() => {
                                setProfileVisible(false);
                                if (item === "Wallet Transactions") router.push("/wallet-transaction");
                            }}
                        >
                            <Text style={[
                                styles.profileText,
                                {
                                    color: item === "Wallet Transactions" ? "#fbbf24" : text,
                                    fontWeight: item === "Wallet Transactions" ? "700" : "400",
                                },
                            ]} numberOfLines={1}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        style={styles.logoutBtn}
                        onPress={() => { setProfileVisible(false); router.replace("/"); }}
                    >
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* MAIN LAYOUT */}
            <View style={[styles.layout, { flexDirection: isMobile ? "column" : "row" }]}>

                {/* WATCHLIST MODAL  */}
                <Modal visible={watchlistModal} transparent animationType="fade">
                    <TouchableOpacity style={styles.profileOverlay} onPress={() => setWatchlistModal(false)} />
                    <View style={[
                        styles.watchlistModal,
                        {
                            backgroundColor: card,
                            top: STATUS_BAR_OFFSET + (isMobile ? 60 : 120),
                            left: isMobile ? 10 : 20,
                            width: isMobile ? width - 20 : 460,
                        },
                    ]}>
                        <Text style={{ color: text, fontSize: isMobile ? 22 : 30, fontWeight: "700" }}>
                            Manage Watchlists
                        </Text>
                        <Text style={{ color: subText, marginTop: 10 }}>Add or delete your watchlists</Text>
                        <View style={{ marginTop: 30 }}>
                            <Text style={{ color: text, fontSize: 18 }}>{watchlistName}</Text>
                        </View>
                        <TouchableOpacity style={{ marginTop: 30 }}>
                            <Text style={{ color: "#3b82f6", fontSize: 18, fontWeight: "600" }}>+ New List</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                {/*  DESKTOP SIDEBAR  */}
                {!isMobile && (
                    <View style={[styles.sidebar, { backgroundColor: card }]}>
                        <View style={styles.sidebarHeader}>
                            {editingWatchlist ? (
                                <TextInput
                                    value={watchlistName}
                                    onChangeText={setWatchlistName}
                                    onBlur={() => setEditingWatchlist(false)}
                                    autoFocus
                                    style={{ color: text, fontSize: 24, fontWeight: "700", padding: 0, flex: 1, marginRight: 10 }}
                                />
                            ) : (
                                <Text style={[styles.sidebarTitle, { color: text, flex: 1 }]} numberOfLines={1}>
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

                {/* MAIN CONTENT */}
                <ScrollView
                    style={[styles.content, { paddingHorizontal: CONTENT_PX }]}
                    showsVerticalScrollIndicator={false}
                >
                    {/* TOPBAR */}
                    {isMobile ? (
                        <View style={{ width: "100%", gap: 14 }}>
                            {/* Row 1 */}
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                                <TouchableOpacity onPress={() => setSidebarVisible(true)}>
                                    <Feather name="menu" size={28} color={text} />
                                </TouchableOpacity>

                                <View style={{ flexDirection: "row", gap: 8, flex: 1, justifyContent: "center", marginHorizontal: 8 }}>
                                    {["NIFTY 50", "BANK NIFTY"].map((label, i) => (
                                        <View key={i} style={[styles.marketCard, { backgroundColor: inputBg, minWidth: 0, flex: 1 }]}>
                                            <Text style={[styles.marketTitle, { color: subText }]}>{label}</Text>
                                            <Text style={[styles.marketValue, { color: text, fontSize: 14 }]}>
                                                {i === 0 ? "23,938.40" : "54,818.85"}
                                            </Text>
                                        </View>
                                    ))}
                                </View>

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

                            {/* Row 2: nav */}
                            <View style={{ flexDirection: "row", gap: 20 }}>
                                {["HOME", "ORDERS", "FUNDS"].map((item, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        onPress={() => {
                                            if (item === "HOME")   router.replace("/dashboard");
                                            if (item === "ORDERS") router.push("/dashboard/orders");
                                            if (item === "FUNDS")  router.push("/dashboard/funds");
                                        }}
                                    >
                                        <Text style={[styles.navText, { color: i === 0 ? "#fbbf24" : subText }]}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ) : (
                        <View style={[styles.topbar, { flexDirection: "row", alignItems: "center" }]}>
                            {/* Market pills */}
                            <View style={[styles.marketRow, { flex: 1 }]}>
                                {["NIFTY 50", "BANK NIFTY"].map((label, i) => (
                                    <View key={i} style={[styles.marketCard, { backgroundColor: inputBg }]}>
                                        <Text style={[styles.marketTitle, { color: subText }]}>{label}</Text>
                                        <Text style={[styles.marketValue, { color: text }]}>
                                            {i === 0 ? "23,938.40" : "54,818.85"}
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
                                            if (item === "HOME")   router.replace("/dashboard");
                                            if (item === "ORDERS") router.push("/dashboard/orders");
                                            if (item === "FUNDS")  router.push("/dashboard/funds");
                                        }}
                                    >
                                        <Text style={[styles.navText, { color: i === 0 ? "#fbbf24" : subText }]}>
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

                    {/*  PAGE TITLE + DATE FILTER */}
                    <View style={[
                        styles.pageHeaderRow,
                        {
                            flexDirection: isMobile ? "column" : "row",
                            alignItems: isMobile ? "flex-start" : "center",
                        },
                    ]}>
                        <Text style={[styles.pageTitle, { color: text, fontSize: isMobile ? 20 : 26 }]}>
                            Wallet Transaction History
                        </Text>

                        <View style={[
                            styles.filterRow,
                            {
                                flexDirection: isMobile ? "column" : "row",
                                width: isMobile ? "100%" : undefined,
                                marginTop: isMobile ? 12 : 0,
                            },
                        ]}>
                            <TextInput
                                placeholder="From Date"
                                placeholderTextColor={subText}
                                value={fromDate}
                                onChangeText={setFromDate}
                                style={[styles.dateInput, { backgroundColor: inputBg, color: text, borderColor: border }]}
                            />
                            <TextInput
                                placeholder="To Date"
                                placeholderTextColor={subText}
                                value={toDate}
                                onChangeText={setToDate}
                                style={[styles.dateInput, { backgroundColor: inputBg, color: text, borderColor: border }]}
                            />
                            <View style={{ flexDirection: "row", gap: 8 }}>
                                <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
                                    <Text style={styles.searchBtnTxt}>Search</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.clearBtn, { borderColor: border }]} onPress={handleClear}>
                                    <Text style={[styles.clearBtnTxt, { color: subText }]}>Clear</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* STAT CARDS  */}
                    <View style={[styles.statRow, { flexDirection: isMobile ? "column" : "row" }]}>
                        {[
                            { label: "Total Transactions", value: totalTx,   color: text    },
                            { label: "Credits",            value: credits,   color: "#22c55e" },
                            { label: "Debits",             value: debits,    color: "#ef4444" },
                            { label: "Referral Rewards",   value: referrals, color: text    },
                        ].map((s, i) => (
                            <View key={i} style={[styles.statCard, { backgroundColor: card, borderColor: border, flex: 1, minWidth: 0 }]}>
                                <Text style={[styles.statLabel, { color: subText }]}>{s.label}</Text>
                                <Text style={[styles.statValue, { color: s.color, fontSize: isMobile ? 24 : 32 }]}>
                                    {s.value}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/*  REFER & EARN */}
                    <View style={[styles.referCard, { backgroundColor: card, borderColor: border }]}>
                        {/* Header */}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                            <View style={{ flex: 1, marginRight: 12 }}>
                                <Text style={[styles.referTitle, { color: text }]}>Refer & Earn</Text>
                                <Text style={{ color: subText, fontSize: 13, marginTop: 4 }}>
                                    Invite friends and track your wallet rewards in one place.
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.coinsBtn} onPress={handleShare}>
                                <Ionicons name="gift-outline" size={14} color="#fff" style={{ marginRight: 6 }} />
                                <Text style={styles.coinsBtnTxt}>100 Coins</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Referral code + reward flow */}
                        <View style={[styles.referBoxRow, { flexDirection: isMobile ? "column" : "row" }]}>
                            <View style={[styles.referBox, { backgroundColor: inputBg, borderColor: border, flex: 1 }]}>
                                <Text style={[styles.referBoxLabel, { color: subText }]}>REFERRAL CODE</Text>
                                <Text style={[styles.referCode, { color: text }]}>{REFERRAL_CODE}</Text>
                            </View>
                            <View style={[styles.referBox, { backgroundColor: inputBg, borderColor: border, flex: 1 }]}>
                                <Text style={[styles.referBoxLabel, { color: subText }]}>REWARD FLOW</Text>
                                <Text style={{ color: subText, fontSize: 13, marginTop: 6, lineHeight: 20 }}>
                                    Share code, onboard friend, earn wallet benefits.
                                </Text>
                            </View>
                        </View>

                        {/* Share message */}
                        <View style={{ marginTop: 16 }}>
                            <Text style={[styles.referBoxLabel, { color: subText, marginBottom: 8 }]}>SHARE MESSAGE</Text>
                            <View style={[styles.shareBox, { backgroundColor: inputBg, borderColor: border }]}>
                                <Text style={{ color: subText, fontSize: 13, lineHeight: 22 }}>
                                    Register now and earn 100 coins!{"\n"}
                                    Use my referral code:{" "}
                                    <Text style={{ color: text, fontWeight: "700" }}>{REFERRAL_CODE}</Text>
                                    {"\n"}
                                    Register here: https://app.methoda.in/register
                                </Text>
                            </View>
                        </View>

                        {/* Buttons */}
                        <View style={[styles.referBtnRow, { flexDirection: isMobile ? "column" : "row" }]}>
                            <TouchableOpacity style={[styles.referBtn, { flex: 1 }]} onPress={handleShare} activeOpacity={0.85}>
                                <Ionicons name="logo-whatsapp" size={18} color="#fff" style={{ marginRight: 8 }} />
                                <Text style={styles.referBtnTxt}>Refer & Earn</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.copyBtn, { flex: 1, backgroundColor: inputBg, borderColor: border }]}
                                onPress={handleCopy}
                                activeOpacity={0.85}
                            >
                                <Feather name={copied ? "check" : "copy"} size={16} color={copied ? "#22c55e" : text} style={{ marginRight: 8 }} />
                                <Text style={[styles.copyBtnTxt, { color: copied ? "#22c55e" : text }]}>
                                    {copied ? "Copied!" : "Copy Details"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* ── WALLET LEDGER  */}
                    <View style={{ marginTop: 20, marginBottom: 40 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                            <Text style={[styles.ledgerTitle, { color: text }]}>Wallet Ledger</Text>
                            <Text style={{ color: subText, fontSize: 13 }}>{ledger.length} records</Text>
                        </View>

                        <View style={[styles.tableWrap, { backgroundColor: card, borderColor: border }]}>
                            {/* Header */}
                            <View style={[styles.tblHead, { backgroundColor: tagBg }]}>
                                {["Amount", "Date & Time", "Status", "Transaction Type", "Transaction Reason"].map((h, i) => (
                                    <Text key={i} style={[
                                        styles.tblHeadCell,
                                        { color: subText, fontSize: isMobile ? 10 : 13, flex: i === 1 ? 1.8 : 1 },
                                    ]}>
                                        {h}
                                    </Text>
                                ))}
                            </View>

                            {/* Empty state */}
                            {ledger.length === 0 && (
                                <View style={{ alignItems: "center", paddingVertical: 36 }}>
                                    <Ionicons name="wallet-outline" size={36} color={subText} />
                                    <Text style={{ color: subText, marginTop: 8, fontSize: 13 }}>No transactions found</Text>
                                </View>
                            )}

                            {/* Rows */}
                            {ledger.map((row, i) => (
                                <View key={row.id} style={[
                                    styles.tblRow,
                                    {
                                        borderBottomColor: border,
                                        backgroundColor: i % 2 === 0 ? "transparent" : inputBg + "60",
                                    },
                                ]}>
                                    <Text style={[styles.tblCell, {
                                        flex: 1,
                                        color: row.type === "CREDIT" ? "#22c55e" : "#ef4444",
                                        fontWeight: "700",
                                        fontSize: isMobile ? 12 : 14,
                                    }]}>
                                        {row.amount}
                                    </Text>

                                    <Text style={[styles.tblCell, {
                                        flex: 1.8,
                                        color: text,
                                        fontSize: isMobile ? 11 : 13,
                                    }]}>
                                        {row.date}
                                    </Text>

                                    <View style={[styles.tblCell, { flex: 1, alignItems: "flex-start" }]}>
                                        <StatusBadge status={row.status} />
                                    </View>

                                    <Text style={[styles.tblCell, { flex: 1, color: text, fontSize: isMobile ? 11 : 13 }]}>
                                        {row.type}
                                    </Text>

                                    <Text style={[styles.tblCell, { flex: 1, color: text, fontSize: isMobile ? 11 : 13 }]}>
                                        {row.reason}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                </ScrollView>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1 },
    layout:    { flex: 1 },

    // Sidebar 
    sidebar: { width: 230, padding: 20, overflow: "hidden" },
    mobileSidebar: { width: "80%", height: "100%", padding: 16 },
    modalOverlay: { flex: 1, flexDirection: "row" },
    remainingOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)" },
    sidebarHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
    sidebarTitle:  { fontSize: 24, fontWeight: "800" },
    iconSquare:    { width: 34, height: 34, borderRadius: 10, justifyContent: "center", alignItems: "center" },
    searchInput:   { padding: 14, borderRadius: 16, marginBottom: 24, fontSize: 15 },
    stockRow:      { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 22 },
    stockName:     { fontWeight: "700", fontSize: 16 },
    stockType:     { marginTop: 4, fontSize: 12 },
    stockPrice:    { fontSize: 16 },

    // Content 
    content: { flex: 1, paddingTop: 16 },

    // Topbar 
    topbar:      { gap: 16, width: "100%" },
    marketRow:   { flexDirection: "row", gap: 12, flexWrap: "wrap" },
    marketCard:  { paddingVertical: 14, paddingHorizontal: 18, borderRadius: 18, minWidth: 130 },
    marketTitle: { fontSize: 11, letterSpacing: 0.5 },
    marketValue: { fontSize: 18, fontWeight: "700", marginTop: 4 },
    navRow:      { flexDirection: "row", alignItems: "center", gap: 24, flexWrap: "wrap" },
    navText:     { fontWeight: "700", fontSize: 14, letterSpacing: 0.5 },
    iconRow:     { flexDirection: "row", alignItems: "center", gap: 16 },
    iconBtn:     { padding: 10, borderRadius: 14 },

    // Profile 
    profileOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
    profileModal: { position: "absolute", borderRadius: 24, padding: 22, zIndex: 999, elevation: 20 },
    profileName:  { fontSize: 22, fontWeight: "700" },
    profileMail:  { marginTop: 6, marginBottom: 20, fontSize: 14 },
    profileItem:  { paddingVertical: 12 },
    profileText:  { fontSize: 15 },
    logoutBtn:    { marginTop: 20, backgroundColor: "#ef4444", padding: 16, borderRadius: 16, alignItems: "center" },
    logoutText:   { color: "#fff", fontWeight: "700", fontSize: 15 },

    // Watchlist modal 
    watchlistModal: { position: "absolute", borderRadius: 24, padding: 24, zIndex: 999, elevation: 20 },

    // Page header
    pageHeaderRow: { marginTop: 20, marginBottom: 16, justifyContent: "space-between", gap: 12 },
    pageTitle:     { fontWeight: "700" },
    filterRow:     { gap: 8, alignItems: "center" },
    dateInput:     { borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9, fontSize: 13, minWidth: 130 },
    searchBtn:     { backgroundColor: "#22c55e", paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10 },
    searchBtnTxt:  { color: "#fff", fontWeight: "700", fontSize: 13 },
    clearBtn:      { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, borderWidth: 1, justifyContent: "center" },
    clearBtnTxt:   { fontWeight: "600", fontSize: 13 },

    // Stat cards
    statRow:   { gap: 10, marginBottom: 16 },
    statCard:  { borderRadius: 12, padding: 18, borderWidth: 1 },
    statLabel: { fontSize: 12, fontWeight: "500", marginBottom: 6 },
    statValue: { fontWeight: "700" },

    // Refer card
    referCard:    { borderRadius: 12, padding: 18, borderWidth: 1, marginBottom: 20 },
    referTitle:   { fontSize: 18, fontWeight: "700" },
    coinsBtn:     { flexDirection: "row", alignItems: "center", backgroundColor: "#22c55e", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
    coinsBtnTxt:  { color: "#fff", fontWeight: "700", fontSize: 12 },
    referBoxRow:  { gap: 10 },
    referBox:     { borderRadius: 10, borderWidth: 1, padding: 14 },
    referBoxLabel:{ fontSize: 10, fontWeight: "700", letterSpacing: 0.8 },
    referCode:    { fontSize: 24, fontWeight: "700", letterSpacing: 3, marginTop: 6 },
    shareBox:     { borderRadius: 10, borderWidth: 1, padding: 14 },
    referBtnRow:  { gap: 10, marginTop: 14 },
    referBtn:     { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#22c55e", paddingVertical: 13, borderRadius: 10 },
    referBtnTxt:  { color: "#fff", fontWeight: "700", fontSize: 14 },
    copyBtn:      { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 13, borderRadius: 10, borderWidth: 1 },
    copyBtnTxt:   { fontWeight: "700", fontSize: 14 },

    // Ledger table 
    ledgerTitle:  { fontSize: 18, fontWeight: "700" },
    tableWrap:    { borderRadius: 12, borderWidth: 1, overflow: "hidden" },
    tblHead:      { flexDirection: "row", paddingVertical: 12, paddingHorizontal: 14 },
    tblHeadCell:  { fontWeight: "700", paddingRight: 8 },
    tblRow:       { flexDirection: "row", paddingVertical: 14, paddingHorizontal: 14, borderBottomWidth: 1, alignItems: "center" },
    tblCell:      { paddingRight: 8 },

    // Status badge
    statusBadge:  { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 7, borderWidth: 1, alignSelf: "flex-start" },
});