import React from "react";
import {Modal, Pressable, StyleSheet, Text, View,} from "react-native";

import { useToggleThemeStore } from "../../store/toggleThemeStore";

import { Ionicons } from "@expo/vector-icons";

export interface AudioItem {
  id: string;
  filename: string;
  uri: string;
  duration?: number;
  mediaType?: string;
}

interface OptionModalProps {
  onPlayListPress: () => void;
  onPlayPress: () => void;
  currentItem: AudioItem | null;
  onClose: () => void;
  visible: boolean;
}

const OptionModal = ({
  onPlayListPress,
  onPlayPress,
  currentItem,
  onClose,
  visible,
}: OptionModalProps) => {
  const colorTheme = useToggleThemeStore((state) => state.colorTheme);
  const isDark = colorTheme === "dark";

  const colors = {
    background: isDark ? "#191920" : "#FFFFFF",
    text: isDark ? "#FFFFFF" : "#171717",
    secondaryText: isDark ? "#A1A1AA" : "#666666",
    border: isDark ? "#30303A" : "#E8E8E8",
    accent: "#5cc3f6",
    backdrop: "rgba(0, 0, 0, 0.55)",
  };

  const handlePlay = () => {
    onClose();
    onPlayPress();
  };

  const handlePlaylist = () => {
    onClose();
    onPlayListPress();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* Full-screen backdrop: tapping outside closes the modal */}
      <Pressable
        style={[
          styles.backdrop,
          { backgroundColor: colors.backdrop },
        ]}
        onPress={onClose}
      >
        {/* Prevent taps inside the panel from reaching the backdrop */}
        <Pressable
          style={[
            styles.modalContainer,
            { backgroundColor: colors.background },
          ]}
          onPress={(event) => event.stopPropagation()}
        >
          {/* Modal Header */}
          <View style={styles.header}>
            <View
              style={[
                styles.headerIcon,
                { backgroundColor: `${colors.accent}20` },
              ]}
            >
              <Ionicons
                name="musical-notes"
                size={23}
                color={colors.accent}
              />
            </View>

            <View style={styles.titleContainer}>
              <Text
                style={[
                  styles.heading,
                  { color: colors.text },
                ]}
              >
                Song Options
              </Text>

              <Text
                style={[
                  styles.filename,
                  { color: colors.secondaryText },
                ]}
                numberOfLines={2}
              >
                {currentItem?.filename ?? "Unknown song"}
              </Text>
            </View>

            <Pressable
              onPress={onClose}
              hitSlop={10}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Close song options"
            >
              <Ionicons
                name="close"
                size={22}
                color={colors.secondaryText}
              />
            </Pressable>
          </View>

          <View
            style={[
              styles.divider,
              { backgroundColor: colors.border },
            ]}
          />

          {/* Play Option */}
          <Pressable
            style={({ pressed }) => [
              styles.option,
              pressed && styles.optionPressed,
            ]}
            onPress={handlePlay}
            accessibilityRole="button"
          >
            <View
              style={[
                styles.optionIcon,
                { backgroundColor: `${colors.accent}20` },
              ]}
            >
              <Ionicons
                name="play"
                size={20}
                color={colors.accent}
              />
            </View>

            <View style={styles.optionTextContainer}>
              <Text
                style={[
                  styles.optionTitle,
                  { color: colors.text },
                ]}
              >
                Play Now
              </Text>

              <Text
                style={[
                  styles.optionSubtitle,
                  { color: colors.secondaryText },
                ]}
              >
                Start playing this song
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={19}
              color={colors.secondaryText}
            />
          </Pressable>

          {/* Add to Playlist Option */}
          <Pressable
            style={({ pressed }) => [
              styles.option,
              pressed && styles.optionPressed,
            ]}
            onPress={handlePlaylist}
            accessibilityRole="button"
          >
            <View
              style={[
                styles.optionIcon,
                { backgroundColor: `${colors.accent}20` },
              ]}
            >
              <Ionicons
                name="add-circle-outline"
                size={22}
                color={colors.accent}
              />
            </View>

            <View style={styles.optionTextContainer}>
              <Text
                style={[
                  styles.optionTitle,
                  { color: colors.text },
                ]}
              >
                Add to Playlist
              </Text>

              <Text
                style={[
                  styles.optionSubtitle,
                  { color: colors.secondaryText },
                ]}
              >
                Save this song to a playlist
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={19}
              color={colors.secondaryText}
            />
          </Pressable>

          {/* Cancel Option */}
          <Pressable
            style={[
              styles.cancelButton,
              { borderColor: colors.border },
            ]}
            onPress={onClose}
            accessibilityRole="button"
          >
            <Text
              style={[
                styles.cancelText,
                { color: colors.text },
              ]}
            >
              Cancel
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  modalContainer: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 16,
    elevation: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  titleContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  heading: {
    fontSize: 18,
    fontWeight: "700",
  },

  filename: {
    fontSize: 12,
    marginTop: 5,
  },

  closeButton: {
    padding: 5,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    marginBottom: 8,
  },

  option: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 6,
    paddingVertical: 10,
  },

  optionPressed: {
    opacity: 0.65,
  },

  optionIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  optionTextContainer: {
    flex: 1,
    marginLeft: 13,
    marginRight: 8,
  },

  optionTitle: {
    fontSize: 15,
    fontWeight: "600",
  },

  optionSubtitle: {
    fontSize: 12,
    marginTop: 5,
  },

  cancelButton: {
    height: 46,
    borderWidth: 1,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  cancelText: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default OptionModal;