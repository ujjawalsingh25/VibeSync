import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ padding: 12 }}>
          <View style={styles.optionContainer}>
            <View style={[styles.option3, { marginTop: 0 }]}>
              <Image
                style={styles.accountImg}
                source={{
                  uri: "https://lh3.googleusercontent.com/a/ACg8ocLh9LS3EwL9pJVZDDubf_54ppl9FlnlR0D2WucW9taj-bhEI_VB=s200-c",
                }}
              />
              <View style={{}}>
                <Text style={styles.accountName}>Ujjawal Singh</Text>
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
                <Text style={styles.optionTxt}>Subscription</Text>
                <Text style={styles.optionsSubTxt}>
                  View Transactions & Receipts
                </Text>
              </View>
            </View>
            <View style={styles.break2} />

            <View style={styles.option}>
              <View style={styles.icon}>
                <MaterialIcons name="groups" size={28} color="green" />
              </View>
              <View style={{}}>
                <Text style={styles.optionTxt}>Rooms</Text>
                <Text style={styles.optionsSubTxt}>View & Manage Players</Text>
              </View>
            </View>
            <View style={styles.break2} />

            <View style={styles.option}>
              <View style={styles.icon}>
                <FontAwesome name="wechat" size={28} color="green" />
              </View>
              <View style={{}}>
                <Text style={styles.optionTxt}>Chats & Blogs</Text>
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
                <Text style={styles.optionTxt}>Preference and Privacy</Text>
                <Text style={styles.optionsSubTxt}>
                  Who can access your account?
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ padding: 12 }}>
          <View style={styles.optionContainer}>
            <View style={[styles.option3, { marginTop: 0 }]}>
              <View style={styles.icon}>
                <MaterialCommunityIcons name="offer" size={30} color="green" />
              </View>
              <View style={{}}>
                <Text style={styles.optionTxt}>Offers</Text>
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
                <Text style={styles.optionTxt}>Paasbook</Text>
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
                <Text style={styles.optionTxt}>Invite & Earn</Text>
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
                <Text style={styles.optionTxt}>Help & Support</Text>
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
                <Text style={styles.optionTxt}>Logout</Text>
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
    backgroundColor: "#F8F8F8",
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
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
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
  },
  optionsSubTxt: {
    marginTop: 7,
    color: "gray",
  },
});
