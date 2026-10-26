import {useCallback, useEffect, useMemo, useState } from "react";
import {DataProvider, LayoutProvider, RecyclerListView} from "recyclerlistview";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from "react-native";


import { useAudioStore } from "../../store/audioStore";
import { useToggleThemeStore } from "../../store/toggleThemeStore";
import OptionModal, {type AudioItem,} from "@/components/OptionModal";

import { Ionicons } from "@expo/vector-icons";

const SONG_ITEM_HEIGHT = 78;
const formatDuration = (duration?: number) => {
  if (duration == null || !Number.isFinite(duration))  return "0:00";

  const totalSeconds = Math.floor(duration);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const Songs = () => {
  const colorTheme = useToggleThemeStore((state) => state.colorTheme);

  const audioFiles = useAudioStore((state) => state.audioFiles);
  const permissionError = useAudioStore((state) => state.permissionError);
  const loading = useAudioStore((state) => state.loading);
  const getPermission = useAudioStore((state) => state.getPermission);

  const { width } = useWindowDimensions();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSong, setSelectedSong] = useState<AudioItem | null>(null);
  const [optionModalVisible, setOptionModalVisible] = useState(false);

  const isDark = colorTheme === "dark";
  const colors = {
    background: isDark ? "#0D0D12" : "#F8F8F8",
    card: isDark ? "#17171E" : "#EAEAEA",
    search: isDark ? "#191920" : "#E8E8E8",
    text: isDark ? "#FFFFFF" : "#171717",
    secondaryText: isDark ? "#888888" : "#666666",
    iconBackground: isDark ? "#1C1C25" : "#E8E8E8",
    albumBackground: isDark ? "#292535" : "#D6D6D6",
    emptyBackground: isDark ? "#19151F" : "#EEEEEE",
    accent: isDark ? "#5cc3f6" : "#8B5CF6",
  };

  useEffect(() => {
    getPermission();
  }, [getPermission]);



  // ________ Search songs by filename ____________
  const filteredSongs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return audioFiles;

    return audioFiles.filter((item) =>
      item.filename.toLowerCase().includes(query)
    );
  }, [audioFiles, searchQuery]);

  

  // ___________  Option Modal Actions ________________
  const openOptions = useCallback((item: AudioItem) => {
    setSelectedSong(item);
    setOptionModalVisible(true);
  }, []);
  
  const closeOptions = useCallback(() => {
    setOptionModalVisible(false);
  }, []);
  
  const handlePlayPress = useCallback(() => {
    if (!selectedSong) return;
    console.log("Playing Song:", selectedSong.filename);
    // Connect your audio-player action here.

    closeOptions();
  }, [selectedSong, closeOptions]);
  
  const handlePlaylistPress = useCallback(() => {
    if (!selectedSong) return;
    console.log("Added to Playlist:", selectedSong.filename);
    // Connect your playlist action here.

    closeOptions();
  }, [selectedSong, closeOptions]);
  // _______________________________________________




  // ___________  RecyclerListView data, layout and row provider ________________
  const dataProvider = useMemo(
    () => new DataProvider((r1, r2) => r1.id !== r2.id).cloneWithRows(filteredSongs),
    [filteredSongs]
  );

  // Layout of each row's dimensions.
  const layoutProvider = useMemo(
    () =>
      new LayoutProvider(
        () => "SONG",
        (_type, dimension) => {
          dimension.width = width - 36;
          dimension.height = SONG_ITEM_HEIGHT;
        }
      ),
    [width]
  );

  // Render one song row.
  const rowRenderer = useCallback(
    (
      _type: string | number,
      item: AudioItem,
      index: number
    ) => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={[styles.songCard,{backgroundColor: colors.card }]}
        onPress={() => {
          console.log("Selected Song:", item.filename);

        }}
      >
        <View style={[styles.albumArt,{backgroundColor: colors.albumBackground}]}>
          <Image
            style={styles.albumImage}
            source={require("@/assets/images/default_PlayerImg.png")}
          />
        </View>


        <View style={styles.songInfo}>
          <Text numberOfLines={1} style={[styles.songTitle,{color: colors.text}]}>
            {item.filename}
          </Text>

          <Text numberOfLines={1} style={[styles.songSubtitle,{color: colors.secondaryText}]}>
            VibeSync • Track {index + 1}
          </Text>
        </View>
        
        <Text style={[styles.duration,{color: colors.secondaryText }]}>
          {formatDuration(item.duration)}
        </Text>


        <TouchableOpacity
          style={styles.moreButton}
          onPress={(event) => {
            event.stopPropagation();
            openOptions(item);
          }}
          activeOpacity={0.6}
          accessibilityRole="button"
          accessibilityLabel={`Options for ${item.filename}`}
          hitSlop={8}
        >
          <Ionicons name="ellipsis-vertical" size={20} color={colors.secondaryText}/>
        </TouchableOpacity>

      </TouchableOpacity>
    ),
    [colors, openOptions]
  );
  // _____________________________________________________________________


  if (permissionError) {
    return (
      <View style={[styles.centerContainer,{backgroundColor: colors.background }]}>
        <View style={[styles.permissionIcon,{backgroundColor: colors.accent}]}>
          <Ionicons name="musical-notes" size={40} color="#FFFFFF" />
        </View>

        <Text style={[styles.permissionTitle,{color: colors.text}]}>
          Music Permission Required
        </Text>

        <Text style={[styles.permissionText,{color: colors.secondaryText },]}>
          Please allow VibeSync to access your music library.
        </Text>

        <TouchableOpacity
          style={[styles.permissionButton,{backgroundColor: colors.accent }]}
          onPress={getPermission}
        >
          <Text style={styles.permissionButtonText}>
            Allow Permission
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  if (loading) {
    return (
      <View style={[styles.centerContainer,{backgroundColor: colors.background }]}>
        <Ionicons name="musical-notes"size={45} color={colors.accent}/>
        <Text style={[styles.loadingText,{color: colors.secondaryText}]}>
          Loading songs...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container,{backgroundColor: colors.background}]}>

      <View style={styles.header}>
        <Text style={[styles.title,{color: colors.text}]}>
          Songs
        </Text>

        <TouchableOpacity 
          style={[styles.headerButton, {backgroundColor: colors.iconBackground}]}
          onPress={() => {console.log("Shuffle songs")}}
        >
          <Ionicons name="shuffle" size={23} color={colors.text} />
        </TouchableOpacity>
      </View>


      <View style={[styles.searchContainer, {backgroundColor: colors.search},]}>
        <Ionicons name="search" size={21} color={colors.secondaryText}/>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search songs..."
          placeholderTextColor={colors.secondaryText}
          style={[styles.searchInput,{color: colors.text}]}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        <Ionicons name="options-outline" size={21} color={colors.secondaryText}/>
      </View>


      <View style={styles.songCountContainer}>
        <Text style={[styles.songCount, {color: colors.text}]}>
          {searchQuery.trim()
            ? `${filteredSongs.length} ${
                filteredSongs.length === 1 ? "Result" : "Results"
              }`
            : `${audioFiles.length} ${
                audioFiles.length === 1 ? "Song" : "Songs"
              }`}
        </Text>

        <TouchableOpacity>
          <Text style={[styles.sortText, {color: colors.accent}]}>
            Recently Added
          </Text>
        </TouchableOpacity>
      </View>



      {/* Searched Song List */}
      {filteredSongs.length === 0 ? 
      (
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIcon,{ backgroundColor: colors.emptyBackground}]}>
            <Ionicons name="musical-notes-outline" size={45} color={colors.accent}/>
          </View>

          <Text style={[styles.emptyTitle, {color: colors.text}]}>
            {audioFiles.length === 0 ? "No Songs Found" : "No Matching Songs"}
          </Text>

          <Text style={[styles.emptyText, { color: colors.secondaryText },]}>
            {audioFiles.length === 0
              ? "Add some music to your device"
              : "Try different song name."}
          </Text>
        </View>
      ) : (
        // https://medium.com/@naqvitalha/recyclerlistview-high-performance-listview-for-react-native-and-web-e368d6f0d7ef
        <RecyclerListView
          key={`${colorTheme}-${width}`}
          style={styles.recyclerList}
          dataProvider={dataProvider}
          layoutProvider={layoutProvider}
          rowRenderer={rowRenderer}
          renderAheadOffset={500}
          showsVerticalScrollIndicator={false}
          canChangeSize
        />
      )}

      <OptionModal
        visible={optionModalVisible}
        currentItem={selectedSong}
        onClose={closeOptions}
        onPlayPress={handlePlayPress}
        onPlayListPress={handlePlaylistPress}
      />
    </View>
  );
};

export default Songs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 18,
    paddingBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
  },

  headerButton: {
    width: 45,
    height: 45,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },

  searchContainer: {
    height: 50,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
  },

  songCountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  songCount: {
    fontSize: 17,
    fontWeight: "600",
  },

  sortText: {
    fontSize: 13,
  },

  recyclerList: {
    flex: 1,
  },

  songCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 10,
    marginBottom: 8,
    height: 70,
  },

  albumArt: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  albumImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  songInfo: {
    flex: 1,
    marginLeft: 13,
    marginRight: 8,
  },

  songTitle: {
    fontSize: 15,
    fontWeight: "600",
  },

  songSubtitle: {
    fontSize: 12,
    marginTop: 5,
  },

  duration: {
    fontSize: 12,
    marginRight: 4,
  },

  moreButton: {
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 35,
  },

  permissionIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  permissionTitle: {
    fontSize: 21,
    fontWeight: "700",
    textAlign: "center",
  },

  permissionText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
    marginTop: 10,
    marginBottom: 25,
  },

  permissionButton: {
    paddingHorizontal: 25,
    paddingVertical: 13,
    borderRadius: 25,
  },

  permissionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  loadingText: {
    fontSize: 15,
    marginTop: 15,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  emptyIcon: {
    width: 85,
    height: 85,
    borderRadius: 43,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  emptyText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
    marginTop: 8,
    maxWidth: 280,
  },
});