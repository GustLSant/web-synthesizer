import * as Tone from "tone";
import type { SynthParams } from "./types";

function createSynth(params: SynthParams): Tone.FMSynth {
  return new Tone.FMSynth(params).toDestination();
}

export async function playSound(_params: SynthParams, _tone: string, _volume: number, _duration: number): Promise<void> {
  await Tone.start();
  _params.volume = _volume;
  const wind = createSynth(_params);
  wind.triggerAttackRelease(_tone, _duration);
}