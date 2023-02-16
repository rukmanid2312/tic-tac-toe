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
import { useSettings, difficulties } from "@contexts/settings-context";

export default function Settings(): ReactElement | null {
  const { settings, loadSettings, saveSettings } = useSettings();
  console.log();

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
                  onPress={() =>
                    saveSettings("difficulty", key as keyof typeof difficulties)
                  }
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
            onValueChange={() => saveSettings("sounds", !settings.sounds)}
          />
        </View>
        <View style={[styles.field, styles.switchField]}>
          <Text style={styles.label}>Haptics/Vibrations</Text>
          <Switch
            trackColor={{ false: "#11d0d6", true: "#95f5ed" }}
            ios_backgroundColor="#11d0d6"
            thumbColor="#a1e1e3"
            value={settings.haptics}
            onValueChange={() => saveSettings("haptics", !settings.haptics)}
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
