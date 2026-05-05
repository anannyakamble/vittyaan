import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>

      {/* TOP HEADER */}
      <View style={styles.header}>
        <View style={styles.indexRow}>
          <Badge name="NIFTY 50" value="24119.3" />
          <Badge name="NIFTY BANK" value="54878.5" />
        </View>

        <View style={styles.headerRight}>
          <Icon name="light-mode" size={22} color="#fff" />
          <Icon name="notifications" size={22} color="#fff" />
          <Text style={styles.wallet}>₹500</Text>
          <View style={styles.avatar}>
            <Text style={{ color: "#fff" }}>AK</Text>
          </View>
        </View>
      </View>

      {/* NAV */}
      <View style={styles.nav}>
        <Text style={styles.active}>HOME</Text>
        <Text style={styles.tab}>ORDERS</Text>
        <Text style={styles.tab}>FUNDS</Text>
      </View>

      {/* WELCOME */}
      <Text style={styles.title}>Welcome Back, Anannya</Text>

      {/* FUNDS */}
      <View style={styles.funds}>
        {["Available", "Blocked", "Used", "P/L"].map((i) => (
          <View key={i}>
            <Text style={styles.label}>{i}</Text>
            <Text style={styles.value}>₹0.00</Text>
          </View>
        ))}
      </View>

      {/* ANALYTICS */}
      <View style={styles.analyticsRow}>
        <View style={{ flex: 1 }}>
          <Pill text="Profit Trades" color="#2ecc71" />
          <Pill text="Loss Trades" color="#e74c3c" />
          <Pill text="Breakeven" color="#f1c40f" />
        </View>

        <View style={styles.profitCard}>
          <Text style={{ color: "#aaa" }}>Profitability</Text>
          <Text style={styles.big}>0%</Text>
          <Text style={{ color: "#666" }}>0/0 profitable</Text>
        </View>
      </View>

      {/* CHART */}
      <LineChart
        data={{
          labels: ["9", "10", "11", "12", "1", "2"],
          datasets: [{ data: [20, 45, 28, 80, 99, 43] }],
        }}
        width={screenWidth - 20}
        height={220}
        chartConfig={{
          backgroundColor: "#151A20",
          backgroundGradientFrom: "#151A20",
          backgroundGradientTo: "#151A20",
          color: () => "#00ff99",
        }}
        bezier
        style={styles.chart}
      />

      {/* LIVE */}
      <Text style={styles.live}>● Live Feed: Connecting</Text>

      {/* MOST TRADED */}
      <Text style={styles.section}>Most Traded Stocks</Text>

      <View style={styles.grid}>
        {["SBIN", "TCS", "INFY", "AXIS", "ITC"].map((s) => (
          <LinearGradient
            key={s}
            colors={["#1A2027", "#11161C"]}
            style={styles.card}
          >
            <Text style={{ color: "#fff" }}>{s}</Text>
            <Text style={{ color: "#aaa" }}>₹1000</Text>

            <View style={styles.bs}>
              <Text style={{ color: "green" }}>B</Text>
              <Text style={{ color: "red" }}>S</Text>
            </View>
          </LinearGradient>
        ))}
      </View>

      {/* TOP MOVERS */}
      <Text style={styles.section}>Top Movers</Text>

      {["HDFC", "ICICI", "RELIANCE"].map((i) => (
        <View key={i} style={styles.row}>
          <Text style={{ color: "#fff" }}>{i}</Text>
          <Text style={{ color: "#fff" }}>1000</Text>
          <Text style={{ color: "#2ecc71" }}>+0.8%</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const Badge = ({ name, value }) => (
  <View style={styles.badge}>
    <Text style={styles.badgeText}>{name}</Text>
    <Text style={styles.badgeValue}>{value}</Text>
  </View>
);

const Pill = ({ text, color }) => (
  <View style={[styles.pill, { backgroundColor: color + "22" }]}>
    <Text style={{ color }}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
container:{flex:1,backgroundColor:"#0B0F14",padding:10},

header:{flexDirection:"row",justifyContent:"space-between"},

indexRow:{flexDirection:"row",gap:10},

badge:{backgroundColor:"#1A2027",padding:10,borderRadius:12},

badgeText:{color:"#aaa",fontSize:12},
badgeValue:{color:"#fff"},

headerRight:{flexDirection:"row",alignItems:"center",gap:10},

wallet:{color:"#fff"},

avatar:{width:35,height:35,borderRadius:20,backgroundColor:"#333",alignItems:"center",justifyContent:"center"},

nav:{flexDirection:"row",gap:20,marginVertical:10},

active:{color:"#fff",fontWeight:"bold"},
tab:{color:"#888"},

title:{color:"#fff",fontSize:20},

funds:{flexDirection:"row",justifyContent:"space-between",marginVertical:10},

label:{color:"#888"},
value:{color:"#fff"},

analyticsRow:{flexDirection:"row",gap:10,marginVertical:10},

pill:{height:40,borderRadius:20,justifyContent:"center",paddingHorizontal:10,marginBottom:8},

profitCard:{width:120,backgroundColor:"#1A2027",borderRadius:12,padding:10,alignItems:"center"},

big:{color:"#fff",fontSize:22},

chart:{borderRadius:12,marginVertical:10},

live:{color:"#f1c40f"},

section:{color:"#fff",marginTop:15,fontSize:16},

grid:{flexDirection:"row",flexWrap:"wrap",gap:10},

card:{width:"30%",padding:10,borderRadius:12},

bs:{flexDirection:"row",justifyContent:"space-between"},

row:{flexDirection:"row",justifyContent:"space-between",paddingVertical:10,borderBottomWidth:0.5,borderColor:"#333"},
});