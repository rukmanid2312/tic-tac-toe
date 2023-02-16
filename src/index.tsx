import { StyleSheet, View, Image } from "react-native";
import React from "react";
import Text from "./components/text/text";
import AppBootstrap from "./components/app-bootstrap/app-bootstrap";
import Navigator from "./config/navigator";
import { SettingsProvider } from "@contexts/settings-context";

export default function App() {
  return (
    <AppBootstrap>
      <SettingsProvider>
        <Navigator />
      </SettingsProvider>
    </AppBootstrap>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
