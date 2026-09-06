import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useToggleThemeStore } from "../../store/toggleThemeStore";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


const ProfileScreen = () => {
  // let colorTheme = "dark";
  const colorTheme = useToggleThemeStore((state) => state.colorTheme);
  const toggleTheme = useToggleThemeStore((state) => state.toggleTheme);

  const themedStyles = {
    optionContainer: {
      backgroundColor: colorTheme === "dark" ? "#212121" : "white",
    },
    optionTxt: {
      color: colorTheme === "dark" ? "#E0E0E0" : "black",
    },
    optionsSubTxt: {
      color: colorTheme === "dark" ? "#BDBDBD" : "#666666",
    },
  };

  return (
    <View style={[
      styles.container, 
      {backgroundColor: colorTheme === "dark" ? "#0D0D12" : "#F8F8F8"},
    ]}>
      <ScrollView>
        <View style={{ padding: 12 }}>
          <View style={[
            styles.optionContainer, themedStyles.optionContainer
          ]}>
            <View style={[styles.option3, { marginTop: 0 }]}>
              <Image
                style={styles.accountImg}
                source={{
                  uri: "https://lh3.googleusercontent.com/a/ACg8ocLh9LS3EwL9pJVZDDubf_54ppl9FlnlR0D2WucW9taj-bhEI_VB=s200-c",
                }}
              />
              <View style={{}}>
                <Text style={[
                  styles.accountName, 
                  {color: colorTheme === "dark" ? "white" : "black"}
                ]}>Ujjawal Singh</Text>
                <Text style={styles.accountStatus}>
                  Status that the user added..!!
                </Text>
              </View>
            </View>
            <View style={styles.break} />

            <View style={styles.option}>
              <View style={styles.icon}>
                <FontAwesome name="credit-card" size={28} color="green" />
              </View>
              <View style={{}}>
                <Text style={[
                  styles.optionTxt, themedStyles.optionTxt
                ]}>Subscription</Text>
                <Text style={styles.optionsSubTxt}>
                  View Transactions & Receipts
                </Text>
              </View>
            </View>
            <View style={styles.break2} />


            {/* Change of Theme */}
            <Pressable   onPress={toggleTheme} >
              <View style={styles.option}>
                <View style={styles.icon}>
                  {colorTheme === 'dark' 
                    ? <Entypo name="light-up" size={28} color="green" />  
                    : <MaterialIcons name="dark-mode" size={28} color="green" />  
                  }
                </View>
                <View style={{}}>
                  <Text style={[
                    styles.optionTxt, themedStyles.optionTxt
                  ]}>{colorTheme === "dark" ? "Light Theme" : "Dark Theme"}</Text>
                  <Text style={styles.optionsSubTxt}>
                    {colorTheme === 'dark' ? "Switch the theme to light mode" : "Switch the theme to dark mode"}
                  </Text>
                </View>
              </View>
            </Pressable>
            <View style={styles.break2} />
            <View style={styles.break2} />


            <View style={styles.option}>
              <View style={styles.icon}>
                <FontAwesome name="group" size={28} color="green" />
              </View>
              <View style={{}}>
                <Text style={[
                  styles.optionTxt, themedStyles.optionTxt
                ]}>Rooms</Text>
                <Text style={styles.optionsSubTxt}>View & Manage Players</Text>
              </View>
            </View>
            <View style={styles.break2} />

            <View style={styles.option}>
              <View style={styles.icon}>
                <FontAwesome name="wechat" size={28} color="green" />
              </View>
              <View style={{}}>
                <Text style={[
                  styles.optionTxt, themedStyles.optionTxt
                ]}>Chats & Blogs</Text>
                <Text style={styles.optionsSubTxt}>
                  Connect with players & Share photos
                </Text>
              </View>
            </View>
            <View style={styles.break2} />

            <View style={styles.optionLast}>
              <View style={styles.icon}>
                <MaterialIcons
                  name="energy-savings-leaf"
                  size={28}
                  color={"green"}
                />
              </View>
              <View style={{}}>
                <Text style={[
                  styles.optionTxt, themedStyles.optionTxt
                ]}>Preference and Privacy</Text>
                <Text style={styles.optionsSubTxt}>
                  Who can access your account?
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ padding: 12 }}>
          <View style={[
            styles.optionContainer, themedStyles.optionContainer
          ]}>
            <View style={[styles.option3, { marginTop: 0 }]}>
              <View style={styles.icon}>
                <MaterialCommunityIcons name="offer" size={30} color="green" />
              </View>
              <View style={{}}>
                <Text style={[
                  styles.optionTxt, themedStyles.optionTxt
                ]}>Offers</Text>
                <Text style={styles.optionsSubTxt}>
                  Get coupons and new offers
                </Text>
              </View>
            </View>
            <View style={styles.break} />

            <View style={styles.option3}>
              <View style={styles.icon}>
                <MaterialIcons name="account-balance" size={30} color="green" />
              </View>
              <View style={{}}>
                <Text style={[
                  styles.optionTxt, themedStyles.optionTxt
                ]}>Paasbook</Text>
                <Text style={styles.optionsSubTxt}>
                  Manage TurfCredits and Account balance
                </Text>
              </View>
            </View>
            <View style={styles.break} />

            <View style={styles.option3}>
              <View style={styles.icon}>
                <AntDesign name="user-add" size={30} color="green" />
              </View>
              <View style={{}}>
                <Text style={[
                  styles.optionTxt, themedStyles.optionTxt
                ]}>Invite & Earn</Text>
                <Text style={styles.optionsSubTxt}>
                  Send referrals and get benifits
                </Text>
              </View>
            </View>
            <View style={styles.break} />

            <View style={styles.option2}>
              <View style={styles.icon}>
                <MaterialIcons name="support-agent" size={30} color="green" />
              </View>
              <View style={{}}>
                <Text  style={[
                  styles.optionTxt, themedStyles.optionTxt
                ]}>Help & Support</Text>
                <Text style={styles.optionsSubTxt}>
                  We are here to assits you
                </Text>
              </View>
            </View>
            <View style={styles.break2} />

            <View style={styles.option2}>
              <View style={styles.icon}>
                <MaterialCommunityIcons name="logout" size={30} color="green" />
              </View>
              <Pressable>
                <Text style={[
                  styles.optionTxt, themedStyles.optionTxt
                ]}>Logout</Text>
                <Text style={styles.optionsSubTxt}>
                  Login to another account
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  accountImg: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  accountName: {
    fontSize: 22,
    fontWeight: "600",
    // color: "white",     // Dark Theme
  },
  accountStatus: {
    fontSize: 16,
    // fontWeight: "600",
    marginTop: 3,
    color: "gray",
  },
  headerRt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginRight: 25,
  },
  container: {
    // flex: 1,
    // backgroundColor: "#F8F8F8",
    // backgroundColor: "#313131",       // Dark theme
  },
  break: {
    height: 1,
    borderColor: "#E0E0E0",
    borderWidth: 0.5,
    marginTop: 15,
  },
  break2: {
    height: 1,
    borderColor: "#E0E0E0",
    borderWidth: 0.5,
  },
  optionContainer: {
    // backgroundColor: "white",
    // backgroundColor: "#212121",      // Dark theme
    padding: 10,
    borderRadius: 15,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 15,
  },
  option2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 15,
    marginBottom: 10,
  },
  option3: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  optionLast: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 15,
    marginBottom: 10,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  optionTxt: {
    fontSize: 16,
    fontWeight: "500",
    // color: '#E0E0E0'    // Dark theme
  },
  optionsSubTxt: {
    marginTop: 7,
    color: "gray",
  },
});
