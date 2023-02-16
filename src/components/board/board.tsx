import styles from "./board.styles";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { cloneElement, ReactElement } from "react";
import Text from "../text/text";
import { BoardState } from "@utils";
import React from "react";
import BoardLine from "./boardLine";
import { BoardResult } from "../../utils";

type BoardProps = {
  state: BoardState;
  size: number;
  onCellPressed: (index: number) => void;
  disabled?: boolean;
  gameResult?: BoardResult | false;
} & TouchableOpacityProps;
export default function Board({
  state,
  size,
  onCellPressed,
  disabled,
  gameResult,
}: BoardProps): ReactElement {
  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: "#66fc03",
        flexDirection: "row",
        flexWrap: "wrap",
        borderColor: "#fff",
        borderRadius: 11,
        borderWidth: 4,
      }}
    >
      {state.map((cell, index) => {
        return (
          <TouchableOpacity
            disabled={cell !== null || disabled}
            onPress={() => onCellPressed && onCellPressed(index)}
            key={index}
            style={{
              width: "33.33%",
              height: "33.33%",
              padding: 5,
              borderColor: "#fff",
              borderWidth: 4,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: size / 8 }}>{cell}</Text>
          </TouchableOpacity>
        );
      })}
      {gameResult && <BoardLine gameResult={gameResult} size={size} />}
    </View>
  );
}
