    import type { SynthParams } from "./types";
    
    export const windParams: SynthParams = {
        harmonicity: 1,
        modulationIndex: 2,
        oscillator: { type: "sine" },
        modulation: { type: "sine" },
        envelope: {
            attack: 0.15,
            decay: 0.001,
            sustain: 0.8,
            release: 1.0
        },
        modulationEnvelope: {
            attack: 0.5,
            decay: 0.3,
            sustain: 1,
            release: 1.0
        }
    };

    export const stringParams: SynthParams = {
        harmonicity: 1.5,
        modulationIndex: 8,
        oscillator: { type: "triangle" },
        modulation: { type: "square" },
        envelope: {
            attack: 0.01,
            decay: 1.2,
            sustain: 0.0,
            release: 0.8
        },
        modulationEnvelope: {
            attack: 0.01,
            decay: 1.0,
            sustain: 0.0,
            release: 0.8
        }
    };

    export const kickParams: SynthParams = {
        harmonicity: 0.5,
        modulationIndex: 30,
        oscillator: { type: "sine" },
        modulation: { type: "sine" },
        envelope: {
            attack: 0.001,
            decay: 0.8,
            sustain: 0.0,
            release: 0.2
        },
        modulationEnvelope: {
            attack: 0.001,
            decay: 0.05,
            sustain: 0.0,
            release: 0.01
        },
    }