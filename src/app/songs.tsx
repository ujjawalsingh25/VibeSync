import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useAudioStore } from "../../store/audioStore";

const Songs = () => {
  const audioFiles = useAudioStore((state) => state.audioFiles);
  const permissionError = useAudioStore((state) => state.permissionError);
  const loading = useAudioStore((state) => state.loading);
  const getPermission = useAudioStore((state) => state.getPermission);

  useEffect(() => { 
    getPermission();
  }, []);

  if (permissionError) {
    return (
      <View style={styles.permissionREQ}>
        <Text style={styles.songListsText}>
          Please accept the permission to run Music Player
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.permissionREQ}>
        <Text>Loading songs...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {audioFiles.map((item) => (
        <Text key={item.id} style={styles.songLists}>
          {item.filename}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  permissionREQ: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  songListsText: {
    fontSize: 25,
    color: "red",
    textAlign: "center",
  },

  songLists: {
    padding: 18,
    borderRadius: 6,
    backgroundColor: "#999999",
    borderBottomColor: "#717171",
    borderBottomWidth: 3,
  },
});

export default Songs;
