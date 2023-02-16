import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { ReactElement } from "react";
import { Home, Settings, SinglePlayerGame } from "@screens";
import React from "react";

export type StackNavigatorParams = {
  Home: undefined;
  SinglePlayerGame: undefined;
  Settings: undefined;
};
const navigatorOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: "#e69f43",
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  headerTintColor: "#74f257",
  headerTitleStyle: {
    fontFamily: "DeliusUnicase_700Bold",
    fontSize: 20,
  },
  headerBackTitleStyle: {
    fontFamily: "DeliusUnicase_400Regular",
    fontSize: 14,
  },
};
export default function Navigator(): ReactElement {
  const Stack = createStackNavigator<StackNavigatorParams>();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={navigatorOptions}>
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={Home}
        />
        <Stack.Screen
          name="SinglePlayerGame"
          options={{
            headerShown: false,
          }}
          component={SinglePlayerGame}
        />
        <Stack.Screen name="Settings" component={Settings}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
