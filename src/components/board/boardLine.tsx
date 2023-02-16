import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  TouchableOpacityProps,
  RootTagContext,
} from "react-native";

import React, { ReactElement, useEffect, useRef } from "react";
import { BoardResult, BoardState } from "@utils";
import { Text } from "@components";

const styles = StyleSheet.create({
  line: {
    backgroundColor: "#117d17",
    position: "absolute",
  },
  vLine: {
    width: 4,
    // height: "100%",
    top: 0,
  },
  hLine: {
    // width: "100%",
    height: 2,
    left: 0,
  },
  dLine: {
    width: 2,
    // height: "100%",
    top: 0,
    left: "50%",
  },
});

type BoardLineProps = {
  size: number;
  gameResult: BoardResult;
};
export default function BoardLine({
  size,
  gameResult,
}: BoardLineProps): ReactElement {
  const diagonalHt = Math.sqrt(Math.pow(size, 2) + Math.pow(size, 2));
  const animationref = useRef<Animated.Value>(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(animationref.current, {
      toValue: 1,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, []);
  return (
    <>
      {gameResult && gameResult.column && gameResult.direction === "V" && (
        <Animated.View
          style={[
            styles.line,
            styles.vLine,
            {
              left: gameResult.column * (size / 3) - size / 3 / 2,
              height: animationref.current.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        ></Animated.View>
      )}
      {gameResult && gameResult.row && gameResult.direction === "H" && (
        <Animated.View
          style={[
            styles.line,
            styles.hLine,
            {
              top: gameResult.row * (size / 3) - size / 3 / 2,
              width: animationref.current.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        ></Animated.View>
      )}
      {gameResult && gameResult.diagonal && gameResult.direction === "D" && (
        <Animated.View
          style={[
            styles.line,
            styles.dLine,
            {
              transform: [
                {
                  translateY: animationref.current.interpolate({
                    inputRange: [0, 1],
                    outputRange: [size / 2, -(diagonalHt - size) / 2],
                  }),
                },
                {
                  rotateZ: gameResult.diagonal === "MAIN" ? "-45deg" : "45deg",
                },
              ],
              height: animationref.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, diagonalHt],
              }),
            },
          ]}
        ></Animated.View>
      )}
    </>
  );
}
