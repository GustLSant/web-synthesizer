import * as Tone from "tone";
import type { SynthParams } from "./types";

function createSynth(params: SynthParams): Tone.FMSynth {
  return new Tone.FMSynth(params).toDestination();
}

export async function playSound(_params: SynthParams, _tone: string, _volume: number, _duration: number): Promise<void> {
  await Tone.start();
  const params = { ..._params, volume: _volume };
  const synth = createSynth(params);
  synth.triggerAttackRelease(_tone, _duration);
  
  const totalTime = _duration + Number(synth.envelope.release);
  setTimeout(() => {
    synth.dispose();
  }, totalTime * 1000);
}