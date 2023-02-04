import { StyleSheet, View, Image } from "react-native";
import React from "react";
import Text from "./components/text/text";
import AppBootstrap from "./components/app-bootstrap/app-bootstrap";
import Navigator from "./config/navigator";

export default function App() {
  return (
    <AppBootstrap>
      <Navigator />
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
