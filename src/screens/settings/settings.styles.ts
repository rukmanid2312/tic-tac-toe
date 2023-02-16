import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  field: {
    marginBottom: 30,
  },
  label: {
    color: "white",
    fontSize: 18,
  },
  choices: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginHorizontal: -5,
  },
  choice: {
    backgroundColor: "#95f5ed",
    padding: 10,
    margin: 5,
  },
  choiceTxt: {
    color: "#11d0d6",
  },
  switchField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default styles;
