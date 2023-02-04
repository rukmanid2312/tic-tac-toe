import React, { ReactElement, ReactNode } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

type GradientBackgroundProps = {
  children: ReactNode;
};

export default function GradientBackground({
  children,
}: GradientBackgroundProps): ReactElement {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar style="light" />
      <LinearGradient
        colors={["#d6800f", "#d6800f"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      {children}
    </View>
  );
}
