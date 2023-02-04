import { StatusBar } from "expo-status-bar";
import styles from "./single-player-game.styles";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { GradientBackground } from "@components";
import React, { ReactElement, useEffect, useState, useRef } from "react";
import { Board, AudioApp } from "@components";
import { useSounds } from "@utils";

import { BoardState, isEmpty, isTerminal, getBestMove, Cell } from "@utils";

export default function SinglePlayerGame(): ReactElement {
  const [turn, setTurn] = useState<"HUMAN" | "BOT">(
    Math.random() > 0.5 ? "HUMAN" : "BOT"
  );
  const [isHumanMaximizing, setIsHumanMaximising] = useState<boolean>(true);

  const [state, setState] = useState<BoardState>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const gameResult = isTerminal(state);
  const playSounds = useSounds();
  const insertCell = async (
    index: number,
    symbol: "x" | "o"
  ): Promise<void> => {
    const stateCopy: BoardState = [...state];
    if (state[index] || isTerminal(state)) return;

    stateCopy[index] = symbol;
    setState([...stateCopy]);
    // playSound();
    symbol === "x" ? playSounds("pop1") : playSounds("pop2");
    /* try {
      await popSoundRef.current?.setPositionAsync(0);
      await pop2SoundRef.current?.setPositionAsync(0);
      //await popSoundRef.current?.playAsync();
      symbol === "x"
        ? await popSoundRef.current?.replayAsync()
        : await pop2SoundRef.current?.replayAsync();

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (err) {
      console.log(err);
    }*/
  };
  const handleOnCellPressed = (cell: number): void => {
    if (turn !== "HUMAN") return;
    const value: Cell = isHumanMaximizing ? "x" : "o";
    insertCell(cell, value);
    setTurn("BOT");
  };
  /* async function playSound() {
    console.log("playign sound");
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(require("@assets/pop_1.wav"), { shouldPlay: true });
      await sound.setPositionAsync(0);
      console.log(sound);
      await sound.playAsync();
    } catch (error) {
      console.error(error);
    }
  }*/

  const getWinner = (winnerSymbol: Cell): "HUMAN" | "BOT" | "DRAW" => {
    if (winnerSymbol === "x") {
      return isHumanMaximizing ? "HUMAN" : "BOT";
    }

    if (winnerSymbol === "o") {
      return isHumanMaximizing ? "BOT" : "HUMAN";
    }
    return "DRAW";
  };
  useEffect(() => {
    if (gameResult) {
      const winner = getWinner(gameResult.winner);
      console.log("winner" + winner);
      if (winner === "HUMAN") {
        playSounds("win");
        alert("You won");
      }
      if (winner === "BOT") {
        playSounds("loss");
        alert("You Lost");
      }
      if (winner === "DRAW") {
        playSounds("draw");
        alert("it's draw");
      }
    } else {
      if (turn === "BOT") {
        if (isEmpty(state)) {
          const CornerAndCenter = [0, 2, 6, 8, 4];
          const move = Math.floor(Math.random() * CornerAndCenter.length);
          setIsHumanMaximising(false);
          insertCell(move, "x");
          setTurn("HUMAN");
        } else {
          const move: number = getBestMove(state, !isHumanMaximizing, 0, -1);
          insertCell(move, isHumanMaximizing ? "o" : "x");
          setTurn("HUMAN");
        }
      }
    }
  }, [state, turn]);

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <Board
          disabled={Boolean(isTerminal(state)) || turn === "BOT"}
          onCellPressed={(index) => handleOnCellPressed(index)}
          state={state}
          size={300}
        />
      </SafeAreaView>
    </GradientBackground>
  );
}
