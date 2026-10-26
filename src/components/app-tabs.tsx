import { useSegments, VectorIcon } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";


import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { HeaderDiscover, HeaderLogo } from "@/screens/Headers";
import { useToggleThemeStore } from "../../store/toggleThemeStore";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function AppTabs() {
  // let colorTheme = "dark";
  const colorTheme = useToggleThemeStore((state) => state.colorTheme);
  const segments = useSegments();
  const currentTab = segments[segments.length - 1];

  return (
    <>
      {currentTab === "discover" ? <HeaderDiscover /> : <HeaderLogo />}
      <NativeTabs
        backgroundColor={colorTheme === "dark" ? "#181818" : "#F2F2F2"}
        indicatorColor={colorTheme === "dark" ? "#203C4D" : "#E1F5FE"}
        labelStyle={{
          default: {
            color: colorTheme === "dark" ? "#8A8A8A" : "#777777",
            fontSize: 11,
          },
          selected: {
            color: colorTheme === "dark" ? "#FFFFFF" : "#164E5A",
            fontSize: 15,
          },
          }}
        minimizeBehavior="onScrollDown"
      >
        <NativeTabs.Trigger name="songs">
          <NativeTabs.Trigger.Label>Songs</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            src={<VectorIcon family={Ionicons} name="headset" />}
          />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="player">
          <NativeTabs.Trigger.Label>Player</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            src={<VectorIcon family={FontAwesome} name="music" />}
          />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="sync">
          <NativeTabs.Trigger.Label>Sync</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            src={<VectorIcon family={MaterialCommunityIcons} name="account-group" />}
          />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="discover">
          <NativeTabs.Trigger.Label>Discover</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            src={<VectorIcon family={FontAwesome6} name="compass" />}
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            src={<VectorIcon family={MaterialIcons} name="account-circle" />}
          />
        </NativeTabs.Trigger>
      </NativeTabs>
    </>
  );
}
