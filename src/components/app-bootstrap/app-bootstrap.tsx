import React, { ReactNode } from "react";
import AppLoading from "expo-app-loading";

import {
  useFonts,
  DeliusUnicase_400Regular,
  DeliusUnicase_700Bold,
} from "@expo-google-fonts/delius-unicase";
import { SafeAreaView } from "react-native-safe-area-context";

type AppBootstrapProps = {
  children: ReactNode;
};

export default function AppBootstrap({ children }: AppBootstrapProps) {
  const [fontsLoaded] = useFonts({
    DeliusUnicase_400Regular,
    DeliusUnicase_700Bold,
  });

  return !fontsLoaded ? <AppLoading /> : <>{children}</>;
}
