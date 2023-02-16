import { ReactElement, useEffect, useState, useRef } from "react";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { useSettings } from "@contexts/settings-context";

type SoundType = "win" | "loss" | "pop1" | "pop2" | "draw";
export default function useSounds() {
  const { settings } = useSettings();
  const popSoundRef = useRef<Audio.Sound | null>(null);
  const pop2SoundRef = useRef<Audio.Sound | null>(null);
  const winSoundRef = useRef<Audio.Sound | null>(null);
  const lossSoundRef = useRef<Audio.Sound | null>(null);
  const drawSoundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    //load sounds
    const enableAudio = async () => {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: 1,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        interruptionModeAndroid: 1,
        shouldDuckAndroid: false,
      });
    };
    enableAudio();
    const popSoundObject = new Audio.Sound();
    const pop2SoundObject = new Audio.Sound();
    const winSoundObject = new Audio.Sound();
    const lossSoundObject = new Audio.Sound();
    const drawSoundObject = new Audio.Sound();
    const loadSounds = async () => {
      /* eslint-disable @typescript-eslint/no-var-requires */
      await popSoundObject.loadAsync(require("@assets/pop_1.wav"), {
        shouldPlay: true,
      });
      await popSoundObject.setPositionAsync(0);
      popSoundRef.current = popSoundObject;

      await pop2SoundObject.loadAsync(require("@assets/pop_2.wav"), {
        shouldPlay: true,
      });
      await pop2SoundObject.setPositionAsync(0);
      pop2SoundRef.current = pop2SoundObject;

      await winSoundObject.loadAsync(require("@assets/win.mp3"), {
        shouldPlay: true,
      });
      await winSoundObject.setPositionAsync(0);
      winSoundRef.current = winSoundObject;

      await lossSoundObject.loadAsync(require("@assets/loss.mp3"), {
        shouldPlay: true,
      });
      await lossSoundObject.setPositionAsync(0);
      lossSoundRef.current = lossSoundObject;

      await drawSoundObject.loadAsync(require("@assets/draw.mp3"), {
        shouldPlay: true,
      });
      await drawSoundObject.setPositionAsync(0);
      drawSoundRef.current = drawSoundObject;
    };
    loadSounds();

    return () => {
      //unlaod sounds
      popSoundObject && popSoundObject.unloadAsync();
      pop2SoundObject && pop2SoundObject.unloadAsync();
    };
  }, []);

  const playSounds = async (sound: SoundType): Promise<void> => {
    const soundsMap = {
      win: winSoundRef,
      loss: lossSoundRef,
      pop1: popSoundRef,
      pop2: pop2SoundRef,
      draw: drawSoundRef,
    };
    try {
      const status = await soundsMap[sound].current?.getStatusAsync();
      status &&
        status.isLoaded &&
        settings?.sounds &&
        soundsMap[sound].current?.replayAsync();
      if (settings?.haptics) {
        switch (sound) {
          case "pop1":
          case "pop2":
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            break;
          case "win":
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            break;
          case "loss":
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            break;
          case "draw":
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            break;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return playSounds;
}
