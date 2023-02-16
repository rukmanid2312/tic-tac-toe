import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactElement,
  ReactNode,
} from "react";
import { AsyncStorage } from "react-native";
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

function useSettings() {
  const context = useContext(settingsContext);
  if (!context) {
    throw new Error("useContext must beused within servicecontext provider");
  }
  return context;
}

function SettingsProvider(props: { children: ReactNode }): ReactElement {
  const [settings, setSettings] = useState<SettingsProps | null>(null);
  const saveSettings = async <T extends keyof SettingsProps>(
    setting: T,
    value: SettingsProps[T]
  ) => {
    console.log("save");
    try {
      const oldSettings = settings ? settings : defaultSettings;
      const newSettings = { ...oldSettings, [setting]: value };
      const jsonSettings = JSON.stringify(newSettings);
      console.log(jsonSettings);
      await AsyncStorage.setItem("@settings", jsonSettings);
      setSettings(newSettings);
    } catch (err) {
      alert("Error!");
    }
  };
  const loadSettings = async () => {
    try {
      const settingsop = await AsyncStorage.getItem("@settings");
      settingsop !== null
        ? setSettings(JSON.parse(settingsop))
        : setSettings(defaultSettings);
    } catch (err) {
      setSettings(defaultSettings);
    }
  };
  useEffect(() => {
    loadSettings();
  }, []);
  return (
    <settingsContext.Provider
      {...props}
      value={{ settings, loadSettings, saveSettings }}
    />
  );
}
export { useSettings, SettingsProvider, difficulties };
