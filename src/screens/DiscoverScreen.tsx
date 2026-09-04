import OnlinePlayers from "@/components/OnlinePlayers";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const DiscoverScreen = () => {
  let colorTheme = "light";

  const [onlinePlayerLink, setOnlinePlayerLink] = useState<string | null>(null);

  const openPlayer = (link: string) => {
    setOnlinePlayerLink(link);
  };

  useEffect(() => {
    setOnlinePlayerLink(null);
  }, []);

  if (onlinePlayerLink) {
    return (
      <>
        <View style={styles.webviewContainer}>
          <WebView
            style={styles.webviewContainer}
            source={{ uri: onlinePlayerLink }}
          />
        </View>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ padding: 12 }}>
          <View style={styles.optionContainer}>
            <View style={[styles.option3, { marginTop: 0 }]}>
              <Image
                style={styles.playingSongImg}
                source={require("@/assets/images/default_PlayerImg.png")}
              />
              <View style={{}}>
                <Text style={styles.playingSongName}>
                  Duniyaa - Akhil & Dhvani Bhanushali
                </Text>
                <View style={styles.playingButtonsContainer}>
                  <Text style={styles.playingSong}>Now Playing</Text>
                  <View style={styles.playerButtons}>
                    <Entypo
                      name="controller-fast-backward"
                      size={30}
                      color="black"
                    />
                    <FontAwesome name="play" size={32} color="black" />
                    <Entypo
                      name="controller-fast-forward"
                      size={30}
                      color="black"
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.break} />
            <View style={styles.break} />
            <View style={styles.break} />

            <View style={styles.break2} />
            <View style={styles.break2} />
            <View style={styles.break2} />
          </View>
        </View>

        <View style={styles.playerOptionContainer}>
          <OnlinePlayers
            onPress={openPlayer}
            playerName="Spotify"
            playerImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZpMnbuWBgwOenNOrddKMY04bXIEcXllZYjgwPSLA_RQ&s=10"
            playerLink="https://open.spotify.com/"
          />
          <OnlinePlayers
            onPress={openPlayer}
            playerName="Jio Saavn"
            playerImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_-CP899SXfbM38Bx4GGx0I5VzOYtF5J6FIWV0nPVB5A&s=10"
            playerLink="https://www.jiosaavn.com/"
          />
          <OnlinePlayers
            onPress={openPlayer}
            playerName="Gaana"
            playerImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA2bB7aSeU1MFr8EiCR0BfGNyoRKz123w86AXCXML7gw&s"
            playerLink="https://gaana.com/"
          />
          <OnlinePlayers
            onPress={openPlayer}
            playerName="Apple Music"
            playerImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_ngwWRrTk6vAji-wXQl6CFS2nImZ0s6FVtQeeiqZLZQ&s"
            playerLink="https://music.apple.com/us/new"
          />
          <OnlinePlayers
            onPress={openPlayer}
            playerName="Wynk"
            playerImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCam62u3Ulif3AUGsWbrTjOlIJJVi42y3rnt2QVAvfxA&s=10"
            playerLink="https://wynk.in/music"
          />
          <OnlinePlayers
            onPress={openPlayer}
            playerName="Qoboz"
            playerImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn496pyR9iuKGdpfmZovU0CavRKtLNqpU6Imngm-GaHQ&s=10"
            playerLink="https://www.qobuz.com/us-en/discover"
          />
          <OnlinePlayers
            onPress={openPlayer}
            playerName="Youtube Music"
            playerImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWmH8x5qMYGVPP-mXgFefVukTdO2cnYtPHug43A8ogzA&s=10"
            playerLink="https://music.youtube.com/"
          />
          <OnlinePlayers
            onPress={openPlayer}
            playerName="Amazon Music"
            playerImg="https://m.media-amazon.com/images/I/715E2xCPg7L.png"
            playerLink="https://music.amazon.in/"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  webviewContainer: {
    flex: 1,
    backgroundColor: "#212121",
  },
  playingSongImg: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  playingSong: {
    fontSize: 22,
    fontWeight: "600",
    // color: "white",        // Dark theme
  },
  playingSongName: {
    fontSize: 18,
    // fontWeight: "600",
    marginTop: 3,
    color: "gray",
  },
  playingButtonsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  playerButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  backButton: {},
  headerRt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginRight: 25,
  },
  container: {
    // flex: 1,
    backgroundColor: "#F8F8F8",
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
    backgroundColor: "white",
    // backgroundColor: "#313131",       // Dark theme
    padding: 10,
    borderRadius: 10,
  },
  playerOptionContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    rowGap: 20,
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
