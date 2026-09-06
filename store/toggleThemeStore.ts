import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  colorTheme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useToggleThemeStore = create<ThemeState>((set) => ({
  colorTheme: "dark",

  toggleTheme: () =>
    set((state) => ({
      colorTheme: state.colorTheme === "dark" ? "light" : "dark",
    })),

  setTheme: (theme) =>
    set({
      colorTheme: theme,
    }),
}));