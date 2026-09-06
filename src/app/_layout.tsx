import { StatusBar } from 'expo-status-bar';
import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import AppTabs from "@/components/app-tabs";
import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { useToggleThemeStore } from "../../store/toggleThemeStore";


SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  // let colorTheme = "dark";
  const colorTheme = useToggleThemeStore((state) => state.colorTheme);
  return (
    <ThemeProvider value={colorTheme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <StatusBar style={colorTheme === 'light' ? 'dark' : 'light'}  />
      <AppTabs />
    </ThemeProvider>
  );
}
