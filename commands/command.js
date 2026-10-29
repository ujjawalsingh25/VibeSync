// _____________________________________________________________
// npx create-expo-app VibeSync    -->> Create Expo Project     |
// npx expo start                   --> Start Expo              |
// _____________________________________________________________|


//     Commands
// ___________________  Connect with Phone __________________________________
// in Device Manager -->> Universal Serial Bus Devices -->> ADB Interface    |     -->> To verify phone connection
// ___________   Command Prompt   ____________                               |
// adb devices                                                               |   -->> list all connected devices
// _________  In Phone ________________                                      |
// Tap on the BUILD to enable Developer Option                               |  
// In Developer Option --->> Enable USB Debugging                            |
// __________________________________________________________________________|

// ______________  Connect to Virtual Device / Simulator  ____________

// npx react-native init folder-Name                                  |
// cd folder-Name                                                     |
// npm install                                                        |
// _____________ In the COMMAND PROMPT  ____________                  |
// cd C:\Users\Ujjawal Singh\AppData\Local\Android\Sdk\emulator       |
// emulator -list-avds                                                |    -->> get the list of devices
// emulator -avd Pixel_7a                                             |    -->> run the device as simulator
// _______  RUN CODE  __________________                              |
// npx react-native run-android                                       |
// `        (App.tsx) will be the main file                           |
// ___________________________________________________________________|


// ______________  Run VibeSync  ___________________________
// npx expo install expo-dev-client                         |
// npx expo prebuild                                        |
// npx expo run:android                                     |
// npx expo start                                           |
// _________________________________________________________|



// ______________  Libraries  ______________
// npx expo install react-native-webview
// npx expo install zustand
// npx expo install expo-media-library


// npm install recyclerlistview
// npx expo install expo-audio