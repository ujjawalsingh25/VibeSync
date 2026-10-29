import * as MediaLibrary from "expo-media-library/legacy";
import { Alert } from "react-native";
import { create } from "zustand";

import {createAudioPlayer, setAudioModeAsync, type AudioPlayer, type AudioStatus,} from "expo-audio";
// {  //  Props Details 
//   // interface AudioFile {    // ==> AudioFile[];
//   //   id: string;
//   //   filename: string;
//   //   uri: string;
//   //   mediaType: "audio";
//   //   duration: number;
//   //   albumId: string;
//   //   creationTime: number;
//   //   modificationTime: number;
//   //   width: number;
//   //   height: number;
//   // }
//   // playbackObj -->  player  -->  Manages audio playback using expo-audio.
//   // soundObj  -->  playbackStatus  -->  Stores playback information, such as whether audio is playing, its position, and duration.
//   // currentAudio  -->  currentAudio  -->  Stores the currently selected or playing song.
//   // audioFiles  -->  audioFiles  -->  Stores the list of songs fetched from the device’s media library.

//   // playAudio(song)  -->  Plays the selected song or resumes it if already selected
//   // toggleAudio(song)  -->  Pauses the current song or plays/resumes the selected song
//   // pauseAudio()  -->  Pauses playback
//   // resumeAudio()  -->  Resumes playback
//   // playNext()  -->  Plays the next song in the library
//   // playPrevious()  -->  Plays the previous song in the library
// }

interface AudioStore {
  // audioFiles: AudioFile[];
  audioFiles: AudioFile[];
  permissionError: boolean;
  loading: boolean;

  player: AudioPlayer;
  currentAudio: AudioFile | null;
  isPlaying: boolean;
  playbackStatus: AudioStatus | null;
  playbackError: string | null;


  getPermission: () => Promise<void>;
  getAudioFiles: () => Promise<void>;
  playAudio: (audio: AudioFile) => Promise<void>;
  toggleAudio: (audio: AudioFile) => Promise<void>;
  pauseAudio: () => void;
  resumeAudio: () => void;
  playNext: () => Promise<void>;
  playPrevious: () => Promise<void>;
}

export type AudioFile = MediaLibrary.Asset;

export const useAudioStore = create<AudioStore>((set, get) => {

  // Create one player for the app's shared playback state.
  const player = createAudioPlayer(null, {
    updateInterval: 500,
  });

  // Listen for playback status changes.
  player.addListener("playbackStatusUpdate", (status) => {
    set({
      isPlaying: status.playing,
      playbackStatus: status,
      playbackError: status.error ?? null,
    });
  });

  // Reusable function to play a track.
  const startTrack = async (audio: AudioFile) => {
    try {
      await setAudioModeAsync({
        playsInSilentMode: true,
        interruptionMode: "doNotMix",
      });
      const { currentAudio } = get();
      // Change the source only when selecting another song.
      if (currentAudio?.id !== audio.id) {
        player.replace(audio.uri);
        set({
          currentAudio: audio,
          isPlaying: false,
          playbackError: null,
        });
      }
      player.play();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to play this audio file.";
      console.error("Audio playback error:", message);
      set({
        isPlaying: false,
        playbackError: message,
      });
    }
  };

  return {
    // ________  Initial State  __________
    audioFiles: [],
    permissionError: false,
    loading: false,
    player,
    currentAudio: null,
    isPlaying: false,
    playbackStatus: null,
    playbackError: null,


    // ________________  Get Media Files  _____________________
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
    //___________________________________________________________________________  



    // ---------  Get Media Permission  _____________________
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
    //___________________________________________________________________________  



    // _________  Audio Actions (Play, Pause, Resume, Play Next/Prev)  ________________
    playAudio: async (audio) => {
      await startTrack(audio);
    },
    
    toggleAudio: async (audio) => {
      const { currentAudio, isPlaying, player } = get();
      // If this song is already playing, pause it.
      if (currentAudio?.id === audio.id && isPlaying) {
        player.pause();
        set({ isPlaying: false });
        return;
      }
      // If this song is paused, resume it.
      // If another song is selected, switch to it.
      await startTrack(audio);
    },

    pauseAudio: () => {
      player.pause();
      set({ isPlaying: false });
    },
    
    resumeAudio: () => {
      player.play();
    },

    playNext: async () => {
      const { audioFiles, currentAudio } = get();
      if (audioFiles.length === 0)  return;
      const currentIndex = audioFiles.findIndex(
        (audio) => audio.id === currentAudio?.id
      );
      const nextIndex =
        currentIndex === -1
          ? 0
          : (currentIndex + 1) % audioFiles.length;
      await startTrack(audioFiles[nextIndex]);
    },


    playPrevious: async () => {
      const { audioFiles, currentAudio } = get();
      if (audioFiles.length === 0)  return;
      const currentIndex = audioFiles.findIndex(
        (audio) => audio.id === currentAudio?.id
      );
      const previousIndex =
        currentIndex === -1
          ? 0
          : (currentIndex - 1 + audioFiles.length) %
            audioFiles.length;
      await startTrack(audioFiles[previousIndex]);
    },
    //___________________________________________________________________________  

  }
});
