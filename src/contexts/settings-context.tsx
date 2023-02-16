import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
} from "react";
const difficulties = {
  "1": "Beginner",
  "3": "Intermediate",
  "4": "Hard",
  "-1": "Impossible",
};
type SettingsProps = {
  difficulty: keyof typeof difficulties;
  sounds: boolean;
  haptics: boolean;
};
const defaultSettings: SettingsProps = {
  difficulty: "1",
  sounds: false,
  haptics: true,
};
type SettingsContextType = {
  settings: SettingsProps | null;
  loadSettings: () => void;
  saveSettings: <T extends keyof SettingsProps>(
    setting: T,
    value: SettingsProps[T]
  ) => void;
};
const settingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

function useSettings(): SettingsContextType {
  const context = useContext(settingsContext);
  if (!context) {
    throw new Error("useContext must beused within servicecontext provider");
  }
  return context;
}

function SettingsProvider(props: { children: ReactNode }): ReactElement {
  return <></>;
}
export { useSettings, SettingsProvider };
