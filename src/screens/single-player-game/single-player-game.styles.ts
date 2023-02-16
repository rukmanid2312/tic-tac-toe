import { StyleSheet, YellowBox } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 80,
  },
  difficulty: {
    fontSize: 22,
    color: "purpule",
    textAlign: "center",
    marginBottom: 20,
  },
  results: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 80,
  },
  resultBox: {
    backgroundColor: "yellow",
    borderColor: "orange",
    padding: 11,
    marginHorizontal: 5,
    alignItems: "center",
  },
  resultText: {
    fontSize: 14,
    color: "pink",
  },
  resultCount: {
    fontSize: 20,
    color: "darkPink",
  },
  modal: {
    position: "absolute",
    backgroundColor: "red",
    borderWidth: 6,
    borderColor: "white",
    bottom: 4,
    left: 30,
    padding: 30,
  },
  modalTxt: {
    color: "green",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 30,
  },
});
export default styles;
