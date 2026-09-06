import { create } from "zustand";
import { Alert } from "react-native";
import * as MediaLibrary from "expo-media-library/legacy";


interface AudioFile {
  id: string;
  filename: string;
  uri: string;
  mediaType: "audio";
  duration: number;
  albumId: string;
  creationTime: number;
  modificationTime: number;
  width: number;
  height: number;
}

interface AudioStore {
  // audioFiles: AudioFile[];
  audioFiles: MediaLibrary.Asset[];
  permissionError: boolean;
  loading: boolean;

  getPermission: () => Promise<void>;
  getAudioFiles: () => Promise<void>;
}

export const useAudioStore = create<AudioStore>((set) => ({
  audioFiles: [],
  permissionError: false,
  loading: false,

  // ---------  Get Media Files  ------------
  getAudioFiles: async () => {
    try {
      set({ loading: true });

      let media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
      });
      media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
        first: media.totalCount,
      });
      // console.log(media);
      // console.log(media.assets.length);
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
  // ----------------------------------------------------------  


  // ---------  Get Media Permission  ------------
  getPermission: async () => {
    try {
      set({
        loading: true,
        permissionError: false,
      });

      // { Objects in the permissions are :-
      //     "canAskAgain": true,
      //     "expires": "never",
      //     "granted": false,
      //     "status": "undetermined",
      // }

      // ---------  Permission for audio access  ------------
      const permission = await MediaLibrary.getPermissionsAsync(false, [
        "audio",      // Check specifically for AUDIO permission
      ]);
      // console.log("Permission status:", permission);

      // Already granted
      if (permission.granted) {
        // Get all Audio files
        await useAudioStore.getState().getAudioFiles();
        return;
      }
      // -------------------------------------------------------
      
      // -----------  Cannot ask again   --------------------------
      if (!permission.canAskAgain) {
        set({
          permissionError: true,
          loading: false,
        });
        Alert.alert(
          "Permission Required",      // title
          "Please enable audio permission from Settings.",   // message
        );
        return;
      }
      // -------------------------------------------------------

      // ----------  Request audio permission again ------------
      const requestedPermission = await MediaLibrary.requestPermissionsAsync(
        false,
        ["audio"],
      );
      // console.log("Permission after request:", requestedPermission);

      if (requestedPermission.granted) {
        // Get all Audio files 
        await useAudioStore.getState().getAudioFiles();
        return;
      }
      set({
        permissionError: true,
        loading: false,
      });

      if (requestedPermission.canAskAgain) {   // Also in general case --> for 1st time also
        Alert.alert(
          "Permission Required",                  // title
          "VibeSync needs permission to access your audio files.",  // message
          [                                         // Alert-Button & Options
            {
              text: "Try Again",                  // Alert-Button
              onPress: () => {                // Option to pass functions
                useAudioStore.getState().getPermission();
              },
            },
            {                            // if opted Never Ask Again
              text: "Cancel",           
              style: "cancel",
            },
          ],
        );
        
      } else {          // Permission denied AND cannot ask again
        Alert.alert(
          "Permission Required",     // title
          "Audio permission was denied. Please enable it from Settings.",  // message
        );
      }
    } 
    catch (error) {
      console.log("Permission error:", error);
      set({
        permissionError: true,
        loading: false,
      });
    }
  },
}));
