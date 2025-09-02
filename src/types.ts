export type OscillatorType = "sine" | "square" | "triangle" | "sawtooth";

export type Envelope = {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

export type SynthParams  = {
  harmonicity: number;
  modulationIndex: number;
  oscillator: { type: OscillatorType };
  modulation: { type: OscillatorType };
  envelope: Envelope;
  modulationEnvelope: Envelope;
  volume?: number;
}