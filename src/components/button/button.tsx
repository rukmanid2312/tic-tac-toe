import styles from "./button.styles";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React, { ReactElement } from "react";
import Text from "../text/text";

type ButtonProps = {
  title: string;
} & TouchableOpacityProps;
export default function Button({
  title,
  style,
  ...props
}: ButtonProps): ReactElement {
  let x;
  return (
    <TouchableOpacity {...props} style={[styles.button, style]}>
      <Text style={styles.button_txt}>{title}</Text>
    </TouchableOpacity>
  );
}
