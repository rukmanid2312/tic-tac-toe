import styles from "./settings.styles";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  AsyncStorage,
} from "react-native";
import { Button } from "@components";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "../../config/navigator";
import { ReactElement, useEffect, useState } from "react";
import { GradientBackground } from "@components";
import { Text } from "../../components/index";
import React from "react";
import { useSettings } from "@contexts/settings-context";

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
export default function Settings(): ReactElement | null {
  const [settings, setSettings] = useState<SettingsProps | null>(null);
  const context = useSettings();
  console.log();
  const saveSettings = async <T extends keyof SettingsProps>(
    setting: T,
    value: string
  ) => {
    console.log("save");
    try {
      const oldSettings = settings ? settings : defaultSettings;
      const newSettings = { ...oldSettings, [setting]: value };
      const jsonSettings = JSON.stringify(newSettings);
      console.log(jsonSettings);
      await AsyncStorage.setItem("@settings", jsonSettings);
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
  if (!settings) return null;

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.field}>
          <Text style={styles.label}>Bot Difficulty</Text>
          <View style={styles.choices}>
            {Object.keys(difficulties).map((key, index) => {
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => saveSettings("difficulty", key)}
                  style={[
                    styles.choice,
                    {
                      backgroundColor:
                        settings.difficulty === key ? "#11d0d6" : "#95f5ed",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.choiceTxt,
                      {
                        color: settings.difficulty === key ? "#fff" : "#11d0d6",
                      },
                    ]}
                  >
                    {difficulties[key as keyof typeof difficulties]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={[styles.field, styles.switchField]}>
          <Text style={styles.label}>Sounds</Text>
          <Switch
            trackColor={{ false: "#11d0d6", true: "#95f5ed" }}
            ios_backgroundColor="#11d0d6"
            thumbColor="#a1e1e3"
            value={settings.sounds}
            onValueChange={() => saveSettings("sounds", "!settings.sounds")}
          />
        </View>
        <View style={[styles.field, styles.switchField]}>
          <Text style={styles.label}>Haptics/Vibrations</Text>
          <Switch
            trackColor={{ false: "#11d0d6", true: "#95f5ed" }}
            ios_backgroundColor="#11d0d6"
            thumbColor="#a1e1e3"
            value={settings.haptics}
            onValueChange={() => saveSettings("haptics", " !settings.haptics")}
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
