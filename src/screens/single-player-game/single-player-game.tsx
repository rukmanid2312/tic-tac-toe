import { StatusBar } from "expo-status-bar";
import styles from "./single-player-game.styles";
import { StyleSheet, View, SafeAreaView, Dimensions } from "react-native";
import { GradientBackground, Text, Button } from "@components";
import React, { ReactElement, useEffect, useState, useRef } from "react";
import { Board, AudioApp } from "@components";
import { useSounds } from "@utils";

import { BoardState, isEmpty, isTerminal, getBestMove, Cell } from "@utils";

export default function SinglePlayerGame(): ReactElement {
  const [turn, setTurn] = useState<"HUMAN" | "BOT">(
    Math.random() > 0.5 ? "HUMAN" : "BOT"
  );
  const [isHumanMaximizing, setIsHumanMaximising] = useState<boolean>(true);
  const SCREEN_WIDTH = Dimensions.get("screen").width;
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
  const [gameCount, setGameCount] = useState({ wins: 0, loss: 0, draws: 0 });
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
  const newGame = () => {
    setState([null, null, null, null, null, null, null, null, null]);
    setTurn(Math.random() > 0.5 ? "HUMAN" : "BOT");
  };
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
        setGameCount({ ...gameCount, wins: gameCount.wins + 1 });
      }
      if (winner === "BOT") {
        playSounds("loss");
        setGameCount({ ...gameCount, loss: gameCount.loss + 1 });
      }
      if (winner === "DRAW") {
        playSounds("draw");
        setGameCount({ ...gameCount, draws: gameCount.draws + 1 });
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
        <View>
          <Text style={styles.difficulty}>Difficulty : Hard</Text>
          <View style={styles.results}>
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>Wins</Text>
              <Text style={styles.resultCount}>{gameCount.wins}</Text>
            </View>
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>Loss</Text>
              <Text style={styles.resultCount}>{gameCount.loss}</Text>
            </View>
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>Draw</Text>
              <Text style={styles.resultCount}>{gameCount.draws}</Text>
            </View>
          </View>
        </View>
        <Board
          disabled={Boolean(isTerminal(state)) || turn === "BOT"}
          onCellPressed={(index) => handleOnCellPressed(index)}
          state={state}
          size={SCREEN_WIDTH - 60}
          gameResult={gameResult}
        />
        {gameResult && (
          <View style={styles.modal}>
            <Text style={styles.modalTxt}>
              {getWinner(gameResult.winner) === "HUMAN" && "YOU WON"}
              {getWinner(gameResult.winner) === "BOT" && "YOU LOST"}
              {getWinner(gameResult.winner) === "DRAW" && "IT'S A DRAW"}
            </Text>
            <Button title="Play Again" onPress={() => newGame()}></Button>
          </View>
        )}
      </SafeAreaView>
    </GradientBackground>
  );
}
