import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ReactElement } from "react";
import { Home, SinglePlayerGame } from "@screens";
import React from "react";

export type StackNavigatorParams = {
  Home: undefined;
  SinglePlayerGame: undefined;
};
export default function Navigator(): ReactElement {
  const Stack = createStackNavigator<StackNavigatorParams>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SinglePlayerGame" component={SinglePlayerGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
