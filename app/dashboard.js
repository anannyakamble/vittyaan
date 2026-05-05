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

const stocks = ["SBIN","TCS","TATAPOWER","ITC","INFY","HDFCBANK","RELIANCE"];

export default function DashboardScreen() {
  return (
    <View style={styles.container}>

      {/* SIDEBAR */}
      <View style={styles.sidebar}>
        <Text style={styles.section}>Default</Text>

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

      {/* MAIN */}
      <ScrollView style={styles.main}>

        {/* TOP HEADER */}
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>NIFTY 50</Text>
              <Text style={styles.badgeValue}>24119.3</Text>
            </View>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>NIFTY BANK</Text>
              <Text style={styles.badgeValue}>54878.5</Text>
            </View>
          </View>

          <View style={styles.rightHeader}>
            <TouchableOpacity style={styles.subscribe}>
              <Text style={{ color: "#000", fontWeight: "bold" }}>SUBSCRIBE</Text>
            </TouchableOpacity>

            <Text style={styles.wallet}>₹500.00</Text>

            <View style={styles.profile}>
              <Text style={{ color: "#fff" }}>AK</Text>
            </View>
          </View>
        </View>

        {/* NAV */}
        <View style={styles.nav}>
          <Text style={styles.activeTab}>HOME</Text>
          <Text style={styles.tab}>ORDERS</Text>
          <Text style={styles.tab}>FUNDS</Text>
        </View>

        {/* WELCOME */}
        <Text style={styles.title}>Welcome Back, Anannya</Text>

        {/* FUNDS */}
        <View style={styles.fundsRow}>
          {["Available","Blocked","Used","P/L"].map((item)=>(
            <View key={item}>
              <Text style={styles.label}>{item}</Text>
              <Text style={styles.value}>₹0.00</Text>
            </View>
          ))}
        </View>

        {/* ANALYTICS + PROFIT CARD */}
        <View style={styles.analyticsRow}>

          <View style={{flex:1}}>
            <AnalyticsBar text="Profit Trades" color="#2ecc71"/>
            <AnalyticsBar text="Loss Trades" color="#e74c3c"/>
            <AnalyticsBar text="Breakeven" color="#f1c40f"/>
          </View>

          <View style={styles.profitCard}>
            <Text style={{color:"#ccc"}}>Profitability</Text>
            <Text style={{color:"#fff", fontSize:24}}>0%</Text>
            <Text style={{color:"#888"}}>0/0 profitable</Text>
          </View>

        </View>

        {/* CHART */}
        <View style={styles.chart}>
          <Text style={{color:"#777"}}>Chart Area</Text>
        </View>

        {/* LIVE FEED */}
        <View style={styles.live}>
          <Text style={{color:"#f1c40f"}}>● Live Feed: Connecting</Text>
        </View>

        {/* MOST TRADED */}
        <Text style={styles.section}>Most Traded Stocks</Text>

        <View style={styles.grid}>
          {stocks.map((item)=>(
            <View key={item} style={styles.card}>
              <Text style={{color:"#fff"}}>{item}</Text>
              <Text style={{color:"#aaa"}}>₹1000</Text>
              <View style={styles.bs}>
                <Text style={{color:"green"}}>B</Text>
                <Text style={{color:"red"}}>S</Text>
              </View>
            </View>
          ))}
        </View>

        {/* TOP MOVERS */}
        <Text style={styles.section}>Top Movers</Text>

        {stocks.map((item,i)=>(
          <View key={i} style={styles.tableRow}>
            <Text style={{color:"#fff"}}>{item}</Text>
            <Text style={{color:"#fff"}}>1000</Text>
            <Text style={{color:"#2ecc71"}}>+0.5%</Text>
          </View>
        ))}

      </ScrollView>
    </View>
  );
}

const AnalyticsBar = ({text,color}) => (
  <View style={[styles.bar,{backgroundColor:color+"22"}]}>
    <Text style={{color}}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
container:{flex:1,flexDirection:"row",backgroundColor:"#0B0F14"},

sidebar:{width:240,backgroundColor:"#11161C",padding:10},

main:{flex:1,padding:10},

header:{flexDirection:"row",justifyContent:"space-between",marginBottom:10},

leftHeader:{flexDirection:"row",gap:10},

badge:{backgroundColor:"#1A2027",padding:10,borderRadius:10},

badgeText:{color:"#aaa",fontSize:12},
badgeValue:{color:"#fff"},

rightHeader:{flexDirection:"row",alignItems:"center",gap:10},

subscribe:{backgroundColor:"#FFC107",padding:8,borderRadius:10},

wallet:{color:"#fff"},

profile:{width:40,height:40,borderRadius:20,backgroundColor:"#333",alignItems:"center",justifyContent:"center"},

nav:{flexDirection:"row",gap:20,marginBottom:10},

activeTab:{color:"#fff",fontWeight:"bold"},
tab:{color:"#888"},

title:{color:"#fff",fontSize:20,marginVertical:10},

fundsRow:{flexDirection:"row",justifyContent:"space-between"},

label:{color:"#888"},
value:{color:"#fff"},

analyticsRow:{flexDirection:"row",gap:10,marginVertical:15},

bar:{height:40,borderRadius:20,justifyContent:"center",paddingHorizontal:10,marginBottom:8},

profitCard:{width:150,backgroundColor:"#1A2027",borderRadius:12,padding:10,justifyContent:"center"},

chart:{height:200,backgroundColor:"#151A20",borderRadius:12,justifyContent:"center",alignItems:"center"},

live:{marginVertical:10},

section:{color:"#fff",fontSize:16,marginVertical:10},

grid:{flexDirection:"row",flexWrap:"wrap",gap:10},

card:{width:"18%",backgroundColor:"#1A2027",padding:10,borderRadius:12},

bs:{flexDirection:"row",justifyContent:"space-between"},

tableRow:{flexDirection:"row",justifyContent:"space-between",paddingVertical:10,borderBottomWidth:0.5,borderColor:"#333"},

search:{backgroundColor:"#1A2027",padding:8,borderRadius:10,color:"#fff",marginBottom:10},

stockItem:{flexDirection:"row",justifyContent:"space-between",paddingVertical:10},

stockName:{color:"#fff"},
stockSub:{color:"#888",fontSize:12},
stockPrice:{color:"#fff"},
});