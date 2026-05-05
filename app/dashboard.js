import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";

const stocks = [
  "SBIN",
  "TCS",
  "TATAPOWER",
  "ITC",
  "INFY",
  "HDFCBANK",
  "RELIANCE",
];

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      
      {/* LEFT SIDEBAR */}
      <View style={styles.sidebar}>
        <Text style={styles.title}>Default</Text>

        <TextInput
          placeholder="Search TCS, INFY, SBI"
          placeholderTextColor="#888"
          style={styles.search}
        />

        <FlatList
          data={stocks}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.stockItem}>
              <View>
                <Text style={styles.stockName}>{item}</Text>
                <Text style={styles.stockSub}>NSE</Text>
              </View>
              <Text style={styles.stockPrice}>1000.00</Text>
            </View>
          )}
        />
      </View>

      {/* MAIN CONTENT */}
      <ScrollView style={styles.main}>

        {/* TOP BAR */}
        <View style={styles.topBar}>
          <View style={styles.tabs}>
            <Text style={styles.activeTab}>HOME</Text>
            <Text style={styles.tab}>ORDERS</Text>
            <Text style={styles.tab}>FUNDS</Text>
          </View>

          <View style={styles.rightTop}>
            <TouchableOpacity style={styles.subscribe}>
              <Text style={{ color: "#000", fontWeight: "bold" }}>
                SUBSCRIBE
              </Text>
            </TouchableOpacity>
            <Text style={{ color: "#fff" }}>₹500.00</Text>
          </View>
        </View>

        {/* WELCOME */}
        <Text style={styles.welcome}>Welcome Back, Anannya</Text>

        {/* FUNDS */}
        <View style={styles.fundsRow}>
          {["Available", "Blocked", "Used", "P/L"].map((item) => (
            <View key={item}>
              <Text style={styles.label}>{item}</Text>
              <Text style={styles.value}>₹0.00</Text>
            </View>
          ))}
        </View>

        {/* ANALYTICS */}
        <View style={styles.analytics}>
          <Text style={styles.sectionTitle}>Trade Analytics</Text>

          <View style={[styles.bar, { backgroundColor: "#1f3d2b" }]}>
            <Text style={{ color: "lime" }}>Profit Trades</Text>
          </View>

          <View style={[styles.bar, { backgroundColor: "#3d1f1f" }]}>
            <Text style={{ color: "red" }}>Loss Trades</Text>
          </View>

          <View style={[styles.bar, { backgroundColor: "#3d3a1f" }]}>
            <Text style={{ color: "yellow" }}>Breakeven</Text>
          </View>
        </View>

        {/* CHART PLACEHOLDER */}
        <View style={styles.chart}>
          <Text style={{ color: "#777" }}>Chart Placeholder</Text>
        </View>

        {/* MOST TRADED */}
        <Text style={styles.sectionTitle}>Most Traded Stocks</Text>

        <View style={styles.grid}>
          {stocks.map((item) => (
            <View key={item} style={styles.card}>
              <Text style={{ color: "#fff" }}>{item}</Text>
              <Text style={{ color: "#aaa" }}>₹1000</Text>
              <View style={styles.bsRow}>
                <Text style={{ color: "green" }}>B</Text>
                <Text style={{ color: "red" }}>S</Text>
              </View>
            </View>
          ))}
        </View>

        {/* TOP MOVERS */}
        <Text style={styles.sectionTitle}>Top Movers</Text>

        {stocks.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={{ color: "#fff" }}>{item}</Text>
            <Text style={{ color: "#fff" }}>1000</Text>
            <Text style={{ color: "lime" }}>+0.5%</Text>
          </View>
        ))}

      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#0B0F14",
  },

  sidebar: {
    width: 220,
    backgroundColor: "#11161C",
    padding: 10,
  },

  main: {
    flex: 1,
    padding: 10,
  },

  title: {
    color: "#fff",
    marginBottom: 10,
  },

  search: {
    backgroundColor: "#1A2027",
    borderRadius: 10,
    padding: 8,
    color: "#fff",
    marginBottom: 10,
  },

  stockItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  stockName: { color: "#fff" },
  stockSub: { color: "#888", fontSize: 12 },
  stockPrice: { color: "#fff" },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  tabs: { flexDirection: "row", gap: 15 },

  activeTab: { color: "#fff", fontWeight: "bold" },
  tab: { color: "#888" },

  rightTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  subscribe: {
    backgroundColor: "#FFC107",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },

  welcome: {
    color: "#fff",
    fontSize: 20,
    marginVertical: 10,
  },

  fundsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  label: { color: "#888" },
  value: { color: "#fff" },

  analytics: { marginBottom: 15 },

  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 10,
  },

  bar: {
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginVertical: 5,
  },

  chart: {
    height: 200,
    backgroundColor: "#151A20",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  card: {
    width: "30%",
    backgroundColor: "#1A2027",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },

  bsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
});