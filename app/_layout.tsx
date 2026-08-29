import { DarkTheme, DefaultTheme as LightTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  let colorTheme = 'light';

  return (
    <ThemeProvider value={colorTheme === 'dark' ? DarkTheme : LightTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={colorTheme === 'light' ? 'dark' : 'light'}  />
    </ThemeProvider>
  );
}
