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

import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-chart-kit";

const { width } = Dimensions.get("window");
const isMobile = width < 768;

const sidebarStocks = [
  "SBIN",
  "TCS",
  "TATAPOWER",
  "ITC",
  "INFY",
  "HDFCBANK",
  "RELIANCE",
];

const tradedStocks = [
  "NIFTY 50",
  "NIFTY BANK",
  "SBIN",
  "TCS",
  "KOTAKBANK",
  "MPHASIS",
  "INFY",
  "HCLTECH",
  "AXISBANK",
  "TATAPOWER",
];

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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
    <View
      style={[
        styles.container,
        {
          backgroundColor: darkMode
            ? "#111"
            : "#f5f5f5",
        },
      ]}
    >
      {/* MOBILE SIDEBAR OVERLAY */}
      {showSidebar && isMobile && (
        <Pressable
          style={styles.overlay}
          onPress={() =>
            setShowSidebar(false)
          }
        />
      )}

      {/* PROFILE OVERLAY */}
      {/* {showProfileMenu && (
        <Pressable
          style={styles.profileOverlay}
          onPress={() =>
            setShowProfileMenu(false)
          }
        />
      )} */}

      {/* SIDEBAR */}
      {(!isMobile || showSidebar) && (
        <View
          style={[
            styles.sidebar,
            isMobile && {
              position: "absolute",
              zIndex: 999,
              height: "100%",
              left: 0,
              top: 0,
            },
          ]}
        >
          {/* SIDEBAR TOP */}
          <View style={styles.sidebarTop}>
            {!editingWatchlist ? (
              <Text style={styles.sidebarTitle}>
                {watchlistName}
              </Text>
            ) : (
              <TextInput
                value={tempName}
                onChangeText={setTempName}
                autoFocus
                style={styles.editInput}
                placeholder="Enter Name"
                placeholderTextColor="#777"
              />
            )}

            <View style={styles.sidebarIcons}>
              {/* EDIT */}
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
                  color="#fff"
                />
              </Pressable>

              {/* ADD */}
              <Pressable>
                <MaterialIcons
                  name="playlist-add"
                  size={20}
                  color="#fff"
                />
              </Pressable>

              {/* CLOSE MOBILE */}
              {isMobile && (
                <Pressable
                  onPress={() =>
                    setShowSidebar(false)
                  }
                >
                  <MaterialIcons
                    name="close"
                    size={20}
                    color="#fff"
                  />
                </Pressable>
              )}
            </View>
          </View>

          {/* SEARCH */}
          <View style={styles.searchBox}>
            <MaterialIcons
              name="search"
              size={18}
              color="#777"
            />

            <TextInput
              placeholder="Search TCS, INFY, SBI"
              placeholderTextColor="#777"
              style={styles.searchInput}
            />
          </View>

          {/* STOCK LIST */}
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
                    style={styles.stockName}
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
                    style={styles.stockPrice}
                  >
                    1059.90
                  </Text>

                  <Text
                    style={styles.stockSub}
                  >
                    --
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* MAIN */}
      <ScrollView
        style={styles.main}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          paddingBottom: 200,
        }}
        showsVerticalScrollIndicator={
          false
        }
      >
        {/* TOPBAR */}
        <View style={styles.topbar}>
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
                name={
                  showSidebar
                    ? "close"
                    : "menu"
                }
                size={28}
                color="#fff"
              />
            </Pressable>
          )}

          {/* MARKET */}
          <View style={styles.marketRow}>
            <MarketBadge
              title="NIFTY 50"
              value="24032.8"
            />

            <MarketBadge
              title="NIFTY BANK"
              value="54547.05"
            />
          </View>

          {/* NAV */}
          <View style={styles.navbar}>
            <Text style={styles.activeNav}>
              HOME
            </Text>

            {!isMobile && (
              <>
                <Text style={styles.nav}>
                  ORDERS
                </Text>

                <Text style={styles.nav}>
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
                  "#f6d365",
                  "#fda085",
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

            {/* DARK MODE */}
            <Pressable
              style={styles.iconCircle}
              onPress={() =>
                setDarkMode(!darkMode)
              }
            >
              <MaterialIcons
                name={
                  darkMode
                    ? "light-mode"
                    : "dark-mode"
                }
                size={18}
                color="#fff"
              />
            </Pressable>

            {/* WALLET */}
            {!isMobile && (
              <View style={styles.wallet}>
                <MaterialIcons
                  name="account-balance-wallet"
                  size={16}
                  color="#fff"
                />

                <Text
                  style={
                    styles.walletText
                  }
                >
                  500.00
                </Text>
              </View>
            )}

            {/* NOTIFICATION */}
            <MaterialIcons
              name="notifications"
              size={22}
              color="#fff"
            />

            {/* PROFILE */}
            <View
  style={{
    position: "relative",
    zIndex: 99999,
    elevation: 99999,
  }}
>
              <Pressable
                onPress={() =>
                  setShowProfileMenu(
                    !showProfileMenu
                  )
                }
                style={styles.profile}
              >
                <MaterialIcons
                  name="account-circle"
                  size={42}
                  color="#fff"
                />

                {!isMobile && (
                  <Text
                    style={
                      styles.profileText
                    }
                  >
                    Anannya Kamble
                  </Text>
                )}
              </Pressable>

              {/* PROFILE MENU */}
              {showProfileMenu && (
                <View
                  style={
                    styles.profileMenu
                  }
                >
                  <View
                    style={
                      styles.profileHeader
                    }
                  >
                    <Text
                      style={
                        styles.menuName
                      }
                    >
                      Anannya Kamble
                    </Text>

                    <Text
                      style={
                        styles.menuEmail
                      }
                    >
                      anannyak007@gmail.com
                    </Text>
                  </View>

                  {[
                    "My Account",
                    "My Trading Journals",
                    "My Referrals",
                    "Subscription Plans",
                    "Billing History",
                    "My Wallet Transactions",
                    "Customer Support",
                    "Disable Notifications",
                  ].map((item) => (
                    <Pressable
                      key={item}
                      style={
                        styles.menuItem
                      }
                    >
                      <MaterialIcons
                        name="chevron-right"
                        size={18}
                        color="#fff"
                      />

                      <Text
                        style={
                          styles.menuText
                        }
                      >
                        {item}
                      </Text>
                    </Pressable>
                  ))}

                  <Pressable
                    style={
                      styles.logoutBtn
                    }
                  >
                    <MaterialIcons
                      name="logout"
                      size={18}
                      color="#fff"
                    />

                    <Text
                      style={
                        styles.logoutText
                      }
                    >
                      Log Out
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* WELCOME */}
        <View style={styles.welcomeSection}>
          <View style={{ flex: 1 }}>
            <Text style={styles.welcome}>
              Welcome Back, Anannya
            </Text>

            {/* FUNDS */}
            <View style={styles.fundsRow}>
              <FundCard
                title="Available Funds"
                value="Rs. 100000.00"
              />

              <FundCard
                title="Blocked Funds"
                value="Rs. 0.00"
              />

              <FundCard
                title="Used Funds"
                value="Rs. 0.00"
              />

              <FundCard
                title="Today's P/L"
                value="Rs. 0.00"
              />
            </View>

            {/* ANALYTICS */}
            <Text
              style={
                styles.analyticsTitle
              }
            >
              Trade Analytics
            </Text>

            <AnalyticsPill
              color="#1DB954"
              text="Profit Trades No profitable trades yet"
            />

            <AnalyticsPill
              color="#ff3b30"
              text="Loss Trades No losing trades yet"
            />

            <AnalyticsPill
              color="#d4d925"
              text="Breakeven No flat trades yet"
            />
          </View>

          {/* PROFIT */}
          <View style={styles.profitCard}>
            <Text
              style={styles.profitTitle}
            >
              Profitability
            </Text>

            <Text
              style={styles.profitValue}
            >
              0%
            </Text>

            <Text
              style={styles.profitSub}
            >
              0/0 profitable
            </Text>
          </View>
        </View>

        {/* CHART */}
        <View
          style={styles.chartContainer}
        >
          <Text style={styles.marketText}>
            MARKET INDEX
          </Text>

          <Text
            style={styles.marketTitle}
          >
            NIFTY 50
          </Text>

          <Text
            style={styles.marketPrice}
          >
            24,114.95{" "}
            <Text
              style={
                styles.marketLoss
              }
            >
              -55.65 (-0.23%)
            </Text>
          </Text>

          <View
            style={styles.chartTabs}
          >
            {[
              "1 Day",
              "5 Days",
              "1 Month",
              "Ytd",
            ].map((i) => (
              <View
                key={i}
                style={styles.chartTab}
              >
                <Text
                  style={
                    styles.chartTabText
                  }
                >
                  {i}
                </Text>
              </View>
            ))}
          </View>

          <LineChart
            data={{
              labels: [
                "5/6",
                "",
                "",
                "5/6",
              ],
              datasets: [
                {
                  data: [
                    24120,
                    24110,
                    24100,
                    24102,
                  ],
                },
              ],
            }}
            width={
              isMobile
                ? width - 40
                : width - 420
            }
            height={220}
            withDots
            withInnerLines
            withOuterLines={false}
            withShadow
            bezier
            chartConfig={{
              backgroundGradientFrom:
                "#12161f",
              backgroundGradientTo:
                "#12161f",
              decimalPlaces: 0,
              color: () => "#ff7b72",
              labelColor: () =>
                "#777",
            }}
            style={styles.chart}
          />
        </View>

        {/* LIVE */}
        <View style={styles.liveBox}>
          <Text style={styles.liveText}>
            ● Live Feed: Connecting
          </Text>
        </View>

        {/* MOST TRADED */}
        <Text
          style={styles.sectionTitle}
        >
          Most Traded Stocks on
          Methoda
        </Text>

        <View style={styles.grid}>
          {tradedStocks.map((item) => (
            <Pressable
              key={item}
              onPressIn={() => {
                Animated.spring(
                  scaleAnim,
                  {
                    toValue: 0.96,
                    useNativeDriver: true,
                  }
                ).start();
              }}
              onPressOut={() => {
                Animated.spring(
                  scaleAnim,
                  {
                    toValue: 1,
                    useNativeDriver: true,
                  }
                ).start();
              }}
            >
              <Animated.View
                style={{
                  transform: [
                    {
                      scale:
                        scaleAnim,
                    },
                  ],
                }}
              >
                <LinearGradient
                  colors={[
                    "#2d2d2d",
                    "#222",
                  ]}
                  style={
                    styles.stockCard
                  }
                >
                  <Text
                    style={
                      styles.gridTitle
                    }
                  >
                    {item}
                  </Text>

                  <Text
                    style={
                      styles.gridPrice
                    }
                  >
                    Rs. 24032.8
                    0.00%
                  </Text>

                  <View
                    style={styles.bsRow}
                  >
                    <View
                      style={
                        styles.buyCircle
                      }
                    >
                      <Text
                        style={
                          styles.bsText
                        }
                      >
                        B
                      </Text>
                    </View>

                    <View
                      style={
                        styles.sellCircle
                      }
                    >
                      <Text
                        style={
                          styles.bsText
                        }
                      >
                        S
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </Animated.View>
            </Pressable>
          ))}
        </View>

        {/* TOP MOVERS */}
        <View
          style={
            styles.topMoversContainer
          }
        >
          <View
            style={
              styles.topMoversHeader
            }
          >
            <Text
              style={
                styles.topMoversTitle
              }
            >
              Top Movers
            </Text>

            <View
              style={
                styles.topRightFilters
              }
            >
              <View
                style={styles.updateBox}
              >
                <Text
                  style={
                    styles.updateText
                  }
                >
                  Last Updated - 06
                  May 2026 11:31
                </Text>
              </View>

              <View
                style={
                  styles.exchangeBox
                }
              >
                <Text
                  style={
                    styles.exchangeText
                  }
                >
                  NSE
                </Text>

                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={18}
                  color="#fff"
                />
              </View>
            </View>
          </View>

          {/* HEAD */}
          <View
            style={styles.tableTopHead}
          >
            <Text
              style={styles.gainerText}
            >
              Top Gainers
            </Text>

            <Text
              style={styles.loserText}
            >
              Top Losers
            </Text>
          </View>

          {/* HEADER */}
          <View
            style={
              styles.tableHeaderRow
            }
          >
            {[
              "STOCK",
              "LTP",
              "CHANGE",
              "OPEN",
              "HIGH",
              "STOCK",
              "LTP",
              "CHANGE",
              "OPEN",
              "HIGH",
            ].map((item) => (
              <Text
                key={item}
                style={
                  styles.tableHeaderText
                }
              >
                {item}
              </Text>
            ))}
          </View>

          {/* ROWS */}
          {[
            {
              gain: "INDIGO",
              gainP: "+3.22%",
              lose: "LT",
              loseP: "-3.24%",
            },
            {
              gain: "TRENT",
              gainP: "+2.76%",
              lose: "ONGC",
              loseP: "-1.62%",
            },
            {
              gain: "CIPLA",
              gainP: "+2.17%",
              lose: "RELIANCE",
              loseP: "-1.2%",
            },
            {
              gain: "DRREDDY",
              gainP: "+2.08%",
              lose: "HINDUNILVR",
              loseP: "-1.08%",
            },
          ].map((row, index) => (
            <View
              key={index}
              style={
                styles.tableDataRow
              }
            >
              <Text
                style={styles.tableCell}
              >
                {row.gain}
              </Text>

              <Text
                style={styles.tableCell}
              >
                4374.9
              </Text>

              <Text
                style={[
                  styles.tableCell,
                  {
                    color:
                      "#32d74b",
                  },
                ]}
              >
                {row.gainP}
              </Text>

              <Text
                style={styles.tableCell}
              >
                4320
              </Text>

              <Text
                style={styles.tableCell}
              >
                4393
              </Text>

              <Text
                style={styles.tableCell}
              >
                {row.lose}
              </Text>

              <Text
                style={styles.tableCell}
              >
                3923
              </Text>

              <Text
                style={[
                  styles.tableCell,
                  {
                    color:
                      "#ff453a",
                  },
                ]}
              >
                {row.loseP}
              </Text>

              <Text
                style={styles.tableCell}
              >
                3974
              </Text>

              <Text
                style={styles.tableCell}
              >
                3974
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

/* COMPONENTS */

const MarketBadge = ({
  title,
  value,
}) => (
  <View style={styles.marketBadge}>
    <Text
      style={styles.marketBadgeTitle}
    >
      {title}
    </Text>

    <Text
      style={styles.marketBadgeValue}
    >
      {value}
    </Text>
  </View>
);

const FundCard = ({
  title,
  value,
}) => (
  <View style={{ marginRight: 20 }}>
    <Text style={styles.fundTitle}>
      {title}
    </Text>

    <Text style={styles.fundValue}>
      {value}
    </Text>
  </View>
);

const AnalyticsPill = ({
  color,
  text,
}) => (
  <View
    style={[
      styles.analyticsPill,
      { backgroundColor: color },
    ]}
  >
    <Text
      style={styles.analyticsText}
    >
      {text}
    </Text>
  </View>
);

/* STYLES */

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
      "rgba(0,0,0,0.4)",
    zIndex: 998,
  },

  profileOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 997,
  },

  sidebar: {
    width: 320,
    backgroundColor: "#111",
    padding: 18,
    borderRightWidth: 1,
    borderRightColor: "#222",
  },

  sidebarTop: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  sidebarTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  sidebarIcons: {
    flexDirection: "row",
    gap: 12,
  },

  editInput: {
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    minWidth: 120,
    paddingVertical: 4,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    color: "#fff",
    padding: 12,
  },

  stockItem: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#1f1f1f",
  },

  stockName: {
    color: "#fff",
    fontWeight: "700",
  },

  stockSub: {
    color: "#777",
    marginTop: 4,
    fontSize: 12,
  },

  stockPrice: {
    color: "#fff",
  },

 main: {
  flex: 1,
  padding: 20,
  overflow: "visible",
},
 topbar: {
  flexDirection: isMobile
    ? "column"
    : "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 20,
  zIndex: 9999,
  elevation: 9999,
  overflow: "visible",
},

  marketRow: {
    flexDirection: "row",
    gap: 12,
  },

  marketBadge: {
    backgroundColor: "#1c1c1c",
    padding: 14,
    borderRadius: 14,
  },

  marketBadgeTitle: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  marketBadgeValue: {
    color: "#ccc",
    marginTop: 5,
  },

  navbar: {
    flexDirection: "row",
    gap: 28,
  },

  activeNav: {
    color: "#fff",
    fontWeight: "700",
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    paddingBottom: 4,
  },

  nav: {
    color: "#aaa",
    fontWeight: "600",
  },

  rightTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  subscribeBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },

  subscribeText: {
    fontWeight: "700",
    color: "#000",
  },

  iconCircle: {
    backgroundColor: "#1c1c1c",
    padding: 12,
    borderRadius: 12,
  },

  wallet: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#1c1c1c",
    padding: 12,
    borderRadius: 12,
  },

  walletText: {
    color: "#fff",
  },

  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  profileText: {
    color: "#fff",
    fontWeight: "700",
  },

 profileMenu: {
  position: "absolute",
  top: 70,
  right: 0,
  width: 320,
  backgroundColor: "#1a1a1a",
  borderRadius: 22,
  padding: 20,
  zIndex: 999999,
  elevation: 999999,
  borderWidth: 1,
  borderColor: "#333",
  shadowColor: "#000",
  shadowOpacity: 0.4,
  shadowRadius: 20,
  shadowOffset: {
    width: 0,
    height: 10,
  },
},

  profileHeader: {
    marginBottom: 20,
  },

  menuName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  menuEmail: {
    color: "#aaa",
    marginTop: 4,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 14,
  },

  menuText: {
    color: "#fff",
    fontSize: 16,
  },

  logoutBtn: {
    marginTop: 20,
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  logoutText: {
    color: "#fff",
    fontWeight: "700",
  },

  welcomeSection: {
    flexDirection: isMobile
      ? "column"
      : "row",
    marginTop: 40,
    gap: 20,
  },

  welcome: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 24,
  },

  fundsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },

  fundTitle: {
    color: "#aaa",
    fontSize: 12,
  },

  fundValue: {
    color: "#fff",
    fontWeight: "700",
    marginTop: 4,
  },

  analyticsTitle: {
    color: "#fff",
    fontWeight: "700",
    marginBottom: 12,
  },

  analyticsPill: {
    padding: 16,
    borderRadius: 30,
    marginBottom: 12,
  },

  analyticsText: {
    color: "#fff",
    fontWeight: "700",
  },

  profitCard: {
    width: isMobile
      ? "100%"
      : 280,
    backgroundColor: "#1a1a1a",
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
  },

  profitTitle: {
    color: "#aaa",
  },

  profitValue: {
    color: "#fff",
    fontSize: 44,
    fontWeight: "700",
  },

  profitSub: {
    color: "#777",
  },

  chartContainer: {
    marginTop: 30,
    backgroundColor: "#151515",
    borderRadius: 20,
    padding: 20,
  },

  marketText: {
    color: "#aaa",
    fontSize: 12,
  },

  marketTitle: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "700",
    marginTop: 5,
  },

  marketPrice: {
    color: "#fff",
    fontSize: 24,
    marginTop: 5,
  },

  marketLoss: {
    color: "#ff4d4d",
  },

  chartTabs: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 16,
  },

  chartTab: {
    backgroundColor: "#222",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },

  chartTabText: {
    color: "#fff",
  },

  chart: {
    borderRadius: 20,
  },

  liveBox: {
    marginTop: 20,
  },

  liveText: {
    color: "#f5d76e",
    fontWeight: "700",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 30,
    marginBottom: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },

  stockCard: {
    width: isMobile
      ? width - 40
      : 220,
    borderRadius: 18,
    padding: 20,
  },

  gridTitle: {
    color: "#fff",
    fontWeight: "700",
    marginBottom: 10,
  },

  gridPrice: {
    color: "#ccc",
  },

  bsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },

  buyCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#00c853",
    justifyContent: "center",
    alignItems: "center",
  },

  sellCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#ff3b30",
    justifyContent: "center",
    alignItems: "center",
  },

  bsText: {
    color: "#fff",
    fontWeight: "700",
  },

  topMoversContainer: {
    marginTop: 30,
    backgroundColor: "#151515",
    borderRadius: 20,
    padding: 15,
    marginBottom: 50,
  },

  topMoversHeader: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 15,
    flexWrap: "wrap",
  },

  topMoversTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },

  topRightFilters: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  updateBox: {
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },

  updateText: {
    color: "#ccc",
    fontSize: 12,
  },

  exchangeBox: {
    backgroundColor: "#1f1f1f",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  exchangeText: {
    color: "#fff",
  },

  tableTopHead: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    marginBottom: 10,
  },

  gainerText: {
    color: "#32d74b",
    fontWeight: "700",
    fontSize: 18,
  },

  loserText: {
    color: "#ff453a",
    fontWeight: "700",
    fontSize: 18,
  },

  tableHeaderRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    backgroundColor: "#2b2b2b",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  tableHeaderText: {
    color: "#ccc",
    width: "10%",
    fontSize: 12,
    fontWeight: "700",
  },

  tableDataRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },

  tableCell: {
    color: "#fff",
    width: "10%",
    fontSize: 12,
  },
});