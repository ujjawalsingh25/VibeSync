import React, { useMemo, useState } from "react";
import {Alert, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";

import { useToggleThemeStore } from "../../store/toggleThemeStore";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Sync = () => {
  const colorTheme = useToggleThemeStore((state) => state.colorTheme);
  const isDark = colorTheme === "dark";

  const [roomCode, setRoomCode] = useState("");

  const colors = useMemo(() => ({
      background: isDark ? "#0D0D12" : "#F8F8F8",
      card: isDark ? "#17171E" : "#FFFFFF",
      secondaryCard: isDark ? "#1C1C25" : "#EEEEF4",
      text: isDark ? "#FFFFFF" : "#171717",
      secondaryText: isDark ? "#92929D" : "#777783",
      accent: isDark ? "#5CC3F6" : "#8B5CF6",
      accentSoft: isDark ? "#163342" : "#EDE5FF",
      border: isDark ? "#292934" : "#E6E2ED",
      input: isDark ? "#111118" : "#F8F7FC",
    }), [isDark]);

  const handleCreateRoom = () => {
    Alert.alert(
      "Create a Room",
      "Room creation will be available when your multiplayer backend is connected.",
      [{ text: "Got it" }],
    );
  };

  const handleJoinRoom = () => {
    Keyboard.dismiss();

    const code = roomCode.trim().toUpperCase();
    if (!code) {
      Alert.alert(
        "Room Code Required",
        "Enter your friend's room code to continue.",
      );
      return;
    }

    if (!/^[A-Z0-9]{6}$/.test(code)) {
      Alert.alert(
        "Invalid Room Code",
        "Please enter a valid 6-character room code.",
      );
      return;
    }

    Alert.alert(
      "Join Room",
      `Room code: ${code}\n\nConnect your multiplayer backend to join this room.`,
    );
  };

  const features = [
    {
      icon: "people" as const,
      title: "One room",
      description: "Bring your friends together.",
      color: "#5CC3F6",
    },
    {
      icon: "heart" as const,
      title: "Vote together",
      description: "Let the group pick the next track.",
      color: "#F472B6",
    },
    {
      icon: "musical-notes" as const,
      title: "Sync playback",
      description: "Enjoy the same music together.",
      color: "#A78BFA",
    },
  ];

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
        <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
        >
            <View style={styles.header}>
                <View>
                    <Text style={[styles.eyebrow, { color: colors.accent }]}>
                        YOUR PEOPLE. YOUR MUSIC.
                    </Text>

                    <Text style={[styles.headerTitle, { color: colors.text }]}>
                        Listen together.
                    </Text>
                </View>

                <View style={[styles.headerIcon, {backgroundColor: colors.accentSoft, borderColor: colors.border}]}>
                    <Ionicons name="people" size={23} color={colors.accent} />
                </View>
            </View>
            
            <View style={[styles.heroCard, {backgroundColor: colors.card, borderColor: colors.border}]}>
                <View style={[styles.heroOrb,{backgroundColor: colors.accentSoft }]}/>

                <View style={styles.heroContent}>
                    <View style={[styles.liveBadge, {backgroundColor: colors.accentSoft }]}>
                        <View style={[styles.liveDot,{backgroundColor: colors.accent }]}/>
                        <Text style={[styles.liveBadgeText, {color: colors.accent   }]}>
                            THE VIBE IS BETTER SHARED
                        </Text>
                    </View>

                    <Text style={[styles.heroTitle, { color: colors.text }]}>
                        Your music.{"\n"}Everyone's vibe.
                    </Text>

                    <Text
                    style={[styles.heroDescription,{color: colors.secondaryText }]}>
                        Create a room, invite your friends, vote for your favourite
                        songs, and listen in sync.
                    </Text>

                    <View style={styles.musicVisual}>
                    <View style={[styles.musicIconCircle,{backgroundColor: colors.accent }]}>
                        <Ionicons name="musical-notes" size={30} color="#FFFFFF" />
                    </View>

                    <View style={styles.waveform}>
                        {[16, 28, 42, 23, 35, 48, 25, 39, 18, 31, 44, 20].map(
                        (barHeight, index) => (
                            <View
                            key={index}
                            style={[styles.waveBar,
                                {
                                    height: barHeight,
                                    backgroundColor: index % 3 === 0
                                        ? colors.accent
                                        : colors.secondaryText,
                                    opacity: index % 3 === 0 ? 1 : 0.55,
                                },
                            ]}/>
                        ),
                        )}
                    </View>

                    <View style={[ styles.musicIconCircleSmall,
                        {
                            backgroundColor: colors.secondaryCard,
                            borderColor: colors.border,
                        }
                    ]}>
                        <Ionicons name="headset" size={21} color={colors.accent}/>
                    </View>
                    </View>
                </View>
            </View>

            {/* Create Room */}
            <TouchableOpacity
                activeOpacity={0.82}
                onPress={handleCreateRoom}
                style={[styles.createButton,
                    {
                        backgroundColor: colors.accent,
                        shadowColor: colors.accent,
                    }
                ]}
                accessibilityRole="button"
                accessibilityLabel="Create a listening room"
            >
                <View style={styles.createButtonIcon}>
                    <Ionicons name="add-circle-outline"size={26} color="#FFFFFF"/>
                </View>

                <View style={styles.createButtonTextContainer}>
                    <Text style={styles.createButtonTitle}>Create a room</Text>
                    <Text style={styles.createButtonSubtitle}>
                        Start a shared listening session
                    </Text>
                </View>

                <Ionicons name="arrow-forward" size={22} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Join Room */}
            <View style={[styles.joinCard, 
                {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                }
            ]}>
                <View style={styles.sectionHeading}>
                    <View style={[styles.sectionIcon, {backgroundColor: colors.secondaryCard }]}>
                        <Ionicons name="enter-outline" size={21} color={colors.accent} />
                    </View>

                    <View style={styles.sectionHeadingText}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>
                            Join your vibe
                        </Text>

                        <Text style={[styles.sectionSubtitle,{color: colors.secondaryText }]}>
                            Got an invite? Enter the room code.
                        </Text>
                    </View>
                </View>

                <TextInput
                    value={roomCode}
                    onChangeText={(value) => setRoomCode(
                        value
                        .replace(/[^a-zA-Z0-9]/g, "")
                        .slice(0, 6)
                        .toUpperCase(),
                    )}
                    placeholder="ENTER CODE"
                    placeholderTextColor={colors.secondaryText}
                    autoCapitalize="characters"
                    autoCorrect={false}
                    maxLength={6}
                    returnKeyType="join"
                    onSubmitEditing={handleJoinRoom}
                    accessibilityLabel="Six-character room code"
                    style={[styles.roomCodeInput, {
                        color: colors.text,
                        backgroundColor: colors.input,
                        borderColor: colors.border,
                    }]}
                />

            <View style={styles.joinFooter}>
                <View style={styles.codeHint}>
                    <Ionicons name="shield-checkmark-outline" size={16} color={colors.secondaryText}/>
                    <Text style={[styles.codeHintText,{ color: colors.secondaryText }]}>
                        Ask your friend for their code.
                    </Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleJoinRoom}
                    style={[styles.joinButton,{backgroundColor: colors.accentSoft }]}
                    accessibilityRole="button"
                    accessibilityLabel="Join listening room"
                >
                    <Text style={[styles.joinButtonText,{ color: colors.accent }]}>Join</Text>
                    <Ionicons name="arrow-forward"size={17} color={colors.accent}/>
                </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
    </View>
  );
};

export default Sync;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 36,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.8,
    marginBottom: 7,
  },
  headerTitle: {
    fontSize: 27,
    fontWeight: "800",
    letterSpacing: -0.8,
  },
  headerIcon: {
    width: 47,
    height: 47,
    borderRadius: 17,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // Hero
  heroCard: {
    borderRadius: 27,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 17,
    position: "relative",
  },
  heroOrb: {
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: 105,
    top: -95,
    right: -70,
    opacity: 0.75,
  },
  heroContent: {
    padding: 22,
    paddingBottom: 17,
  },
  liveBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 7,
    marginBottom: 20,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  liveBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  heroTitle: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
    letterSpacing: -1.2,
  },
  heroDescription: {
    fontSize: 13,
    lineHeight: 21,
    marginTop: 12,
    maxWidth: 310,
  },
  musicVisual: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    gap: 13,
  },
  musicIconCircle: {
    width: 58,
    height: 58,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  waveform: {
    flex: 1,
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  waveBar: {
    width: 4,
    borderRadius: 5,
  },
  musicIconCircleSmall: {
    width: 43,
    height: 43,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // Create Room
  createButton: {
    minHeight: 84,
    borderRadius: 23,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    paddingVertical: 15,
    marginBottom: 24,
    gap: 12,
    elevation: 5,
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
  },
  createButtonIcon: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonTextContainer: {
    flex: 1,
  },
  createButtonTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  createButtonSubtitle: {
    color: "rgba(255,255,255,0.83)",
    fontSize: 11,
    marginTop: 5,
  },
  // Join Room
  joinCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    marginBottom: 29,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 19,
  },
  sectionIcon: {
    width: 43,
    height: 43,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeadingText: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 11,
    marginTop: 5,
    lineHeight: 16,
  },
  roomCodeInput: {
    height: 55,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 16,
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 5,
    textAlign: "center",
  },
  joinFooter: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  codeHint: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  codeHintText: {
    fontSize: 10,
    lineHeight: 15,
    flexShrink: 1,
  },
  joinButton: {
    minWidth: 91,
    height: 42,
    borderRadius: 14,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  joinButtonText: {
    fontSize: 13,
    fontWeight: "800",
  },
});