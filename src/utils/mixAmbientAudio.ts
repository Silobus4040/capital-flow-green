/**
 * mixAmbientAudio — Bakes procedural ambient noise into a TTS audio blob
 * using OfflineAudioContext so the *recipient* hears the background.
 *
 * Supports 7 selectable presets, all synthesized (no audio files).
 */

// ── Preset definitions ──────────────────────────────────────────────────────

export interface AmbientPreset {
  id: string;
  label: string;
  description: string;
}

export const AMBIENT_PRESETS: AmbientPreset[] = [
  { id: 'office',           label: 'Office',            description: 'Warm brown noise + low hum — quiet office room tone' },
  { id: 'cafe',             label: 'Café',              description: 'Pink noise with mid-frequency warmth — busy coffee shop' },
  { id: 'phone-line',       label: 'Phone Line',        description: 'Narrow-band hiss — telephone line static' },
  { id: 'rain',             label: 'Rain',              description: 'Filtered white noise + low rumble — light rain' },
  { id: 'crowd-murmur',     label: 'Crowd Murmur',      description: 'Layered modulated noise — inaudible human voices' },
  { id: 'air-conditioning', label: 'Air Conditioning',   description: 'Deep low-frequency drone — HVAC hum' },
  { id: 'city-street',      label: 'City Street',       description: 'Broadband noise with random swells — outdoor urban' },
];

// ── WAV encoder ─────────────────────────────────────────────────────────────

function encodeWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const bitsPerSample = 16;

  const length = buffer.length * numChannels;
  const samples = new Int16Array(length);

  for (let ch = 0; ch < numChannels; ch++) {
    const channelData = buffer.getChannelData(ch);
    for (let i = 0; i < buffer.length; i++) {
      const s = Math.max(-1, Math.min(1, channelData[i]));
      samples[i * numChannels + ch] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
  }

  const dataSize = samples.length * (bitsPerSample / 8);
  const headerSize = 44;
  const arrayBuffer = new ArrayBuffer(headerSize + dataSize);
  const view = new DataView(arrayBuffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * (bitsPerSample / 8), true);
  view.setUint16(32, numChannels * (bitsPerSample / 8), true);
  view.setUint16(34, bitsPerSample, true);
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  const byteOffset = headerSize;
  for (let i = 0; i < samples.length; i++) {
    view.setInt16(byteOffset + i * 2, samples[i], true);
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

// ── Noise generators ────────────────────────────────────────────────────────

/** Brown noise — random-walk integration of white noise */
function generateBrownNoise(length: number): Float32Array {
  const data = new Float32Array(length);
  let last = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  return data;
}

/** White noise — flat spectrum */
function generateWhiteNoise(length: number): Float32Array {
  const data = new Float32Array(length);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return data;
}

/** Pink noise — 1/f spectrum via Voss-McCartney algorithm */
function generatePinkNoise(length: number): Float32Array {
  const data = new Float32Array(length);
  const numRows = 16;
  const rows = new Float32Array(numRows);
  let runningTotal = 0;
  const max = numRows;

  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    // Determine which rows to update based on trailing zeros
    let changed = i;
    for (let j = 0; j < numRows && changed > 0; j++) {
      if (changed & 1) {
        runningTotal -= rows[j];
        rows[j] = Math.random() * 2 - 1;
        runningTotal += rows[j];
      }
      changed >>= 1;
    }
    data[i] = (runningTotal + white) / (max + 1);
  }
  return data;
}

// ── Preset-specific graph builders ──────────────────────────────────────────

type GraphBuilder = (
  ctx: OfflineAudioContext,
  length: number,
  sampleRate: number,
  volume: number,
) => void;

/**
 * 1. Office — brown noise through a 600 Hz LPF
 */
const buildOffice: GraphBuilder = (ctx, length, sampleRate, volume) => {
  const buf = ctx.createBuffer(1, length, sampleRate);
  buf.getChannelData(0).set(generateBrownNoise(length));

  const src = ctx.createBufferSource();
  src.buffer = buf;

  const lpf = ctx.createBiquadFilter();
  lpf.type = 'lowpass';
  lpf.frequency.value = 600;
  lpf.Q.value = 0.7;

  const gain = ctx.createGain();
  gain.gain.value = volume;

  src.connect(lpf).connect(gain).connect(ctx.destination);
  src.start(0);
};

/**
 * 2. Café — pink noise with a bandpass peak around 800 Hz
 */
const buildCafe: GraphBuilder = (ctx, length, sampleRate, volume) => {
  const buf = ctx.createBuffer(1, length, sampleRate);
  buf.getChannelData(0).set(generatePinkNoise(length));

  const src = ctx.createBufferSource();
  src.buffer = buf;

  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 800;
  bp.Q.value = 0.5;

  const lpf = ctx.createBiquadFilter();
  lpf.type = 'lowpass';
  lpf.frequency.value = 2500;
  lpf.Q.value = 0.7;

  const gain = ctx.createGain();
  gain.gain.value = volume * 1.4;

  src.connect(bp).connect(lpf).connect(gain).connect(ctx.destination);
  src.start(0);
};

/**
 * 3. Phone Line — narrow-band white noise (300–3400 Hz) simulating POTS hiss
 */
const buildPhoneLine: GraphBuilder = (ctx, length, sampleRate, volume) => {
  const buf = ctx.createBuffer(1, length, sampleRate);
  buf.getChannelData(0).set(generateWhiteNoise(length));

  const src = ctx.createBufferSource();
  src.buffer = buf;

  const hpf = ctx.createBiquadFilter();
  hpf.type = 'highpass';
  hpf.frequency.value = 300;
  hpf.Q.value = 0.7;

  const lpf = ctx.createBiquadFilter();
  lpf.type = 'lowpass';
  lpf.frequency.value = 3400;
  lpf.Q.value = 0.7;

  const gain = ctx.createGain();
  gain.gain.value = volume * 0.5;

  src.connect(hpf).connect(lpf).connect(gain).connect(ctx.destination);
  src.start(0);
};

/**
 * 4. Rain — filtered white noise + deep low rumble layer
 */
const buildRain: GraphBuilder = (ctx, length, sampleRate, volume) => {
  // High layer: white noise through LPF for "shhh" of rain
  const whiteBuf = ctx.createBuffer(1, length, sampleRate);
  whiteBuf.getChannelData(0).set(generateWhiteNoise(length));

  const whiteSrc = ctx.createBufferSource();
  whiteSrc.buffer = whiteBuf;

  const lpf = ctx.createBiquadFilter();
  lpf.type = 'lowpass';
  lpf.frequency.value = 4000;
  lpf.Q.value = 0.4;

  const whiteGain = ctx.createGain();
  whiteGain.gain.value = volume * 0.7;

  whiteSrc.connect(lpf).connect(whiteGain).connect(ctx.destination);
  whiteSrc.start(0);

  // Low layer: brown noise for distant thunder/rumble
  const brownBuf = ctx.createBuffer(1, length, sampleRate);
  brownBuf.getChannelData(0).set(generateBrownNoise(length));

  const brownSrc = ctx.createBufferSource();
  brownSrc.buffer = brownBuf;

  const deepLpf = ctx.createBiquadFilter();
  deepLpf.type = 'lowpass';
  deepLpf.frequency.value = 200;
  deepLpf.Q.value = 0.5;

  const brownGain = ctx.createGain();
  brownGain.gain.value = volume * 1.2;

  brownSrc.connect(deepLpf).connect(brownGain).connect(ctx.destination);
  brownSrc.start(0);
};

/**
 * 5. Crowd Murmur — multiple filtered noise bands with slow amplitude
 *    modulation to simulate indistinct human voices
 */
const buildCrowdMurmur: GraphBuilder = (ctx, length, sampleRate, volume) => {
  // Voice-frequency bands: ~200-600 Hz, ~600-1200 Hz, ~1200-2400 Hz
  const bands = [
    { low: 200, high: 600,  modFreq: 0.8,  vol: 1.0 },
    { low: 600, high: 1200, modFreq: 1.3,  vol: 0.8 },
    { low: 1200, high: 2400, modFreq: 0.5, vol: 0.5 },
  ];

  for (const band of bands) {
    const buf = ctx.createBuffer(1, length, sampleRate);
    buf.getChannelData(0).set(generatePinkNoise(length));

    const src = ctx.createBufferSource();
    src.buffer = buf;

    const hpf = ctx.createBiquadFilter();
    hpf.type = 'highpass';
    hpf.frequency.value = band.low;
    hpf.Q.value = 0.5;

    const lpf = ctx.createBiquadFilter();
    lpf.type = 'lowpass';
    lpf.frequency.value = band.high;
    lpf.Q.value = 0.5;

    // Slow amplitude modulation to mimic speech rhythm
    const modGain = ctx.createGain();
    modGain.gain.value = volume * band.vol * 0.7;

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = band.modFreq;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = volume * band.vol * 0.35;

    lfo.connect(lfoGain);
    lfoGain.connect(modGain.gain);
    lfo.start(0);

    src.connect(hpf).connect(lpf).connect(modGain).connect(ctx.destination);
    src.start(0);
  }
};

/**
 * 6. Air Conditioning — very deep brown noise, heavily low-passed
 */
const buildAirConditioning: GraphBuilder = (ctx, length, sampleRate, volume) => {
  const buf = ctx.createBuffer(1, length, sampleRate);
  buf.getChannelData(0).set(generateBrownNoise(length));

  const src = ctx.createBufferSource();
  src.buffer = buf;

  const lpf = ctx.createBiquadFilter();
  lpf.type = 'lowpass';
  lpf.frequency.value = 250;
  lpf.Q.value = 0.5;

  // Second LPF for extra smoothness
  const lpf2 = ctx.createBiquadFilter();
  lpf2.type = 'lowpass';
  lpf2.frequency.value = 350;
  lpf2.Q.value = 0.4;

  const gain = ctx.createGain();
  gain.gain.value = volume * 2.0; // boost since heavy filtering reduces level

  src.connect(lpf).connect(lpf2).connect(gain).connect(ctx.destination);
  src.start(0);
};

/**
 * 7. City Street — broadband noise with random amplitude swells
 */
const buildCityStreet: GraphBuilder = (ctx, length, sampleRate, volume) => {
  // Broadband layer
  const whiteBuf = ctx.createBuffer(1, length, sampleRate);
  const whiteData = whiteBuf.getChannelData(0);
  const raw = generateWhiteNoise(length);

  // Apply slow random amplitude envelope for "traffic swells"
  const envelopeLen = Math.floor(sampleRate * 0.5); // 0.5s blocks
  let envVal = 0.5;
  for (let i = 0; i < length; i++) {
    if (i % envelopeLen === 0) {
      envVal = 0.3 + Math.random() * 0.7; // random between 0.3 and 1.0
    }
    whiteData[i] = raw[i] * envVal;
  }

  const src = ctx.createBufferSource();
  src.buffer = whiteBuf;

  const lpf = ctx.createBiquadFilter();
  lpf.type = 'lowpass';
  lpf.frequency.value = 3000;
  lpf.Q.value = 0.3;

  const hpf = ctx.createBiquadFilter();
  hpf.type = 'highpass';
  hpf.frequency.value = 80;
  hpf.Q.value = 0.3;

  const gain = ctx.createGain();
  gain.gain.value = volume * 0.9;

  src.connect(hpf).connect(lpf).connect(gain).connect(ctx.destination);
  src.start(0);

  // Low rumble sub-layer
  const brownBuf = ctx.createBuffer(1, length, sampleRate);
  brownBuf.getChannelData(0).set(generateBrownNoise(length));

  const brownSrc = ctx.createBufferSource();
  brownSrc.buffer = brownBuf;

  const deepLpf = ctx.createBiquadFilter();
  deepLpf.type = 'lowpass';
  deepLpf.frequency.value = 150;
  deepLpf.Q.value = 0.5;

  const brownGain = ctx.createGain();
  brownGain.gain.value = volume * 0.8;

  brownSrc.connect(deepLpf).connect(brownGain).connect(ctx.destination);
  brownSrc.start(0);
};

// ── Preset lookup ───────────────────────────────────────────────────────────

const BUILDERS: Record<string, GraphBuilder> = {
  'office':           buildOffice,
  'cafe':             buildCafe,
  'phone-line':       buildPhoneLine,
  'rain':             buildRain,
  'crowd-murmur':     buildCrowdMurmur,
  'air-conditioning': buildAirConditioning,
  'city-street':      buildCityStreet,
};

// ── Main mixer ──────────────────────────────────────────────────────────────

/**
 * Mix procedural ambient noise into an audio blob offline.
 *
 * @param audioBlob     The TTS audio (MP3 or WAV)
 * @param preset        Which ambient preset to use (default 'office')
 * @param ambientVolume How loud the ambient layer is (0–1, default 0.08)
 * @returns             A new WAV Blob with ambient noise baked in
 */
export async function mixAmbientIntoAudio(
  audioBlob: Blob,
  preset = 'office',
  ambientVolume = 0.08,
): Promise<Blob> {
  // 1. Decode the TTS audio
  const arrayBuf = await audioBlob.arrayBuffer();
  const tempCtx = new AudioContext();
  const ttsBuffer = await tempCtx.decodeAudioData(arrayBuf);
  await tempCtx.close();

  const sampleRate = ttsBuffer.sampleRate;
  const length = ttsBuffer.length;
  const numChannels = ttsBuffer.numberOfChannels;

  // 2. Create offline context
  const offline = new OfflineAudioContext(numChannels, length, sampleRate);

  // 3. TTS source (full volume)
  const ttsSource = offline.createBufferSource();
  ttsSource.buffer = ttsBuffer;
  ttsSource.connect(offline.destination);
  ttsSource.start(0);

  // 4. Build the selected ambient preset
  const builder = BUILDERS[preset] || buildOffice;
  builder(offline, length, sampleRate, ambientVolume);

  // 5. Render offline
  const renderedBuffer = await offline.startRendering();

  // 6. Encode to WAV
  return encodeWav(renderedBuffer);
}
