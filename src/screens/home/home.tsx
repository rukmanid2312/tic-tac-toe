import styles from "./home.styles";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Button } from "@components";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParams } from "../../config/navigator";
import { ReactElement } from "react";
import { GradientBackground } from "@components";
import { Text } from "../../components/index";
import React from "react";

type HomeProps = {
  navigation: StackNavigationProp<StackNavigatorParams, "Home">;
};
export default function Home({ navigation }: HomeProps): ReactElement {
  let x;
  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.logo}>Tic-Tac-Toe</Text>
        <View style={styles.buttons}>
          <Button
            title="Single Player"
            style={styles.button}
            onPress={() => navigation.navigate("SinglePlayerGame")}
          ></Button>
          <Button title="Multi Player" style={styles.button}></Button>
          <Button title="Login" style={styles.button}></Button>
          <Button title="Settings" style={styles.button}></Button>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
