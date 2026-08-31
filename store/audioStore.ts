import * as MediaLibrary from "expo-media-library/legacy";
import { Alert } from "react-native";
import { create } from "zustand";

interface AudioFile {
  id: string;
  filename: string;
  uri: string;
  duration?: number;
  mediaType?: string;
}

interface AudioStore {
  audioFiles: AudioFile[];
  permissionError: boolean;
  loading: boolean;

  getPermission: () => Promise<void>;
  getAudioFiles: () => Promise<void>;
}

export const useAudioStore = create<AudioStore>((set) => ({
  audioFiles: [],
  permissionError: false,
  loading: false,

  getAudioFiles: async () => {
    try {
      set({ loading: true });

      const media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
        first: 300,
      });

      console.log("Audio files:", media.assets);

      set({
        audioFiles: media.assets,
        loading: false,
        permissionError: false,
      });
    } catch (error) {
      console.log("Error getting audio files:", error);

      set({
        loading: false,
        permissionError: true,
      });
    }
  },

  getPermission: async () => {
    try {
      set({
        loading: true,
        permissionError: false,
      });

      // Check specifically for AUDIO permission
      const permission = await MediaLibrary.getPermissionsAsync(false, [
        "audio",
      ]);

      console.log("Permission status:", permission);

      // Already granted
      if (permission.granted) {
        await useAudioStore.getState().getAudioFiles();
        return;
      }

      // Cannot ask again
      if (!permission.canAskAgain) {
        set({
          permissionError: true,
          loading: false,
        });

        Alert.alert(
          "Permission Required",
          "Please enable audio permission from Settings.",
        );

        return;
      }

      // Request audio permission
      const requestedPermission = await MediaLibrary.requestPermissionsAsync(
        false,
        ["audio"],
      );

      console.log("Permission after request:", requestedPermission);

      if (requestedPermission.granted) {
        await useAudioStore.getState().getAudioFiles();
        return;
      }

      set({
        permissionError: true,
        loading: false,
      });

      if (requestedPermission.canAskAgain) {
        Alert.alert(
          "Permission Required",
          "VibeSync needs permission to access your audio files.",
          [
            {
              text: "Try Again",
              onPress: () => {
                useAudioStore.getState().getPermission();
              },
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          ],
        );
      } else {
        Alert.alert(
          "Permission Required",
          "Audio permission was denied. Please enable it from Settings.",
        );
      }
    } catch (error) {
      console.log("Permission error:", error);

      set({
        permissionError: true,
        loading: false,
      });
    }
  },
}));
