/**
 * mixAmbientAudio — Bakes background audio into a TTS audio blob
 * using OfflineAudioContext so the *recipient* hears the background.
 *
 * Supports fetching actual MP3s from /ambient/ with graceful fallbacks
 * to procedurally generated DSP noise.
 */

// ── Preset definitions ──────────────────────────────────────────────────────

export interface AmbientPreset {
  id: string;
  label: string;
  description: string;
  fileUrl?: string; // If provided, it will try to fetch and loop this audio file
}

export const AMBIENT_PRESETS: AmbientPreset[] = [
  // Talking / Human Sounds
  { id: 'talking-cafe', label: 'Talking: Cafe', description: 'Busy coffee shop chatter', fileUrl: '/ambient/talking-cafe.mp3' },
  { id: 'talking-boardroom', label: 'Talking: Boardroom', description: 'Subdued meeting room voices', fileUrl: '/ambient/talking-boardroom.mp3' },
  { id: 'talking-restaurant', label: 'Talking: Restaurant', description: 'Clinking glasses and distant talking', fileUrl: '/ambient/talking-restaurant.mp3' },
  { id: 'talking-street', label: 'Talking: Street', description: 'Outdoor city chatter and walking', fileUrl: '/ambient/talking-street.mp3' },
  { id: 'talking-party', label: 'Talking: Party', description: 'Upbeat crowd murmur and laughter', fileUrl: '/ambient/talking-party.mp3' },
  { id: 'talking-lobby', label: 'Talking: Lobby', description: 'Echoey hall with passing conversations', fileUrl: '/ambient/talking-lobby.mp3' },
  { id: 'talking-office', label: 'Talking: Busy Office', description: 'Coworkers talking with background typing', fileUrl: '/ambient/talking-office.mp3' },

  // TV / News Sounds
  { id: 'tv-news', label: 'TV: News Broadcast', description: 'Distant news anchor reporting', fileUrl: '/ambient/tv-news.mp3' },
  { id: 'tv-sports', label: 'TV: Sports Game', description: 'Cheering crowd and announcer in background', fileUrl: '/ambient/tv-sports.mp3' },
  { id: 'tv-commercials', label: 'TV: Commercials', description: 'Upbeat distant television ads', fileUrl: '/ambient/tv-commercials.mp3' },
  { id: 'tv-talkshow', label: 'TV: Morning Talk Show', description: 'Light conversation and studio laughs', fileUrl: '/ambient/tv-talkshow.mp3' },

  // Procedural Basics
  { id: 'office-hum', label: 'Quiet Room Tone', description: 'Silent room with low HVAC hum' },
  { id: 'phone-line', label: 'Phone Line Hiss', description: 'Telephone static' },
  { id: 'rain', label: 'Rain', description: 'Light rain outside' },
];

export const CUSTOM_PRESET_ID = 'custom-upload';
AMBIENT_PRESETS.push({
  id: CUSTOM_PRESET_ID,
  label: '📂 Upload Custom Audio...',
  description: 'Select an MP3 or WAV file',
});

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
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
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

// ── File fetching & looping ─────────────────────────────────────────────────

async function fetchAndDecodeAudio(url: string, ctx: BaseAudioContext): Promise<AudioBuffer | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const arrayBuffer = await response.arrayBuffer();
    return await ctx.decodeAudioData(arrayBuffer);
  } catch (err) {
    console.warn(`Failed to load ambient audio file ${url}, falling back to synth.`, err);
    return null;
  }
}

function buildFileLooper(ctx: OfflineAudioContext, buffer: AudioBuffer, length: number, volume: number, loop = true) {
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop = loop;

  const gain = ctx.createGain();
  gain.gain.value = volume;

  src.connect(gain).connect(ctx.destination);
  src.start(0);
}

// ── Procedural fallbacks & generators ───────────────────────────────────────

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

function generateWhiteNoise(length: number): Float32Array {
  const data = new Float32Array(length);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  return data;
}

function generatePinkNoise(length: number): Float32Array {
  const data = new Float32Array(length);
  let b0=0, b1=0, b2=0, b3=0, b4=0, b5=0, b6=0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    data[i] *= 0.11; // normalise
    b6 = white * 0.115926;
  }
  return data;
}

type GraphBuilder = (ctx: OfflineAudioContext, length: number, sampleRate: number, volume: number) => void;

// Fallback: Crowd Murmur (People talking)
const buildCrowd: GraphBuilder = (ctx, length, sampleRate, volume) => {
  const bands = [
    { low: 150, high: 500, modFreq: 1.2, vol: 1.0 },
    { low: 500, high: 1000, modFreq: 2.1, vol: 0.7 },
    { low: 1000, high: 2200, modFreq: 0.8, vol: 0.5 },
  ];

  for (const band of bands) {
    const buf = ctx.createBuffer(1, length, sampleRate);
    buf.getChannelData(0).set(generatePinkNoise(length));

    const src = ctx.createBufferSource();
    src.buffer = buf;

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = (band.low + band.high) / 2;
    bp.Q.value = 1.0;

    const modGain = ctx.createGain();
    modGain.gain.value = volume * band.vol * 0.6;

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = band.modFreq;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = volume * band.vol * 0.4;
    lfo.connect(lfoGain).connect(modGain.gain);
    lfo.start(0);

    src.connect(bp).connect(modGain).connect(ctx.destination);
    src.start(0);
  }
};

// Fallback: TV Sound (Rapidly modulated bandpass noise)
const buildTv: GraphBuilder = (ctx, length, sampleRate, volume) => {
  const buf = ctx.createBuffer(1, length, sampleRate);
  buf.getChannelData(0).set(generateWhiteNoise(length));

  const src = ctx.createBufferSource();
  src.buffer = buf;

  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 1200;
  bp.Q.value = 0.5;

  const modGain = ctx.createGain();
  modGain.gain.value = volume * 0.5;

  // LFO simulating rapid anchor speech syllables
  const lfo = ctx.createOscillator();
  lfo.type = 'square';
  lfo.frequency.value = 4.5;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = volume * 0.4;
  lfo.connect(lfoGain).connect(modGain.gain);
  lfo.start(0);

  // Distant lowpass
  const lpf = ctx.createBiquadFilter();
  lpf.type = 'lowpass';
  lpf.frequency.value = 2500;

  src.connect(bp).connect(modGain).connect(lpf).connect(ctx.destination);
  src.start(0);
};

// Original Basics
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

const buildPhoneLine: GraphBuilder = (ctx, length, sampleRate, volume) => {
  const buf = ctx.createBuffer(1, length, sampleRate);
  buf.getChannelData(0).set(generateWhiteNoise(length));
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const hpf = ctx.createBiquadFilter();
  hpf.type = 'highpass'; hpf.frequency.value = 300;
  const lpf = ctx.createBiquadFilter();
  lpf.type = 'lowpass'; lpf.frequency.value = 3400;
  const gain = ctx.createGain();
  gain.gain.value = volume * 0.4;
  src.connect(hpf).connect(lpf).connect(gain).connect(ctx.destination);
  src.start(0);
};

const buildRain: GraphBuilder = (ctx, length, sampleRate, volume) => {
  const wBuf = ctx.createBuffer(1, length, sampleRate);
  wBuf.getChannelData(0).set(generateWhiteNoise(length));
  const wSrc = ctx.createBufferSource(); wSrc.buffer = wBuf;
  const lpf = ctx.createBiquadFilter(); lpf.type = 'lowpass'; lpf.frequency.value = 3000;
  const wGain = ctx.createGain(); wGain.gain.value = volume * 0.6;
  wSrc.connect(lpf).connect(wGain).connect(ctx.destination);
  wSrc.start(0);
};

// ── Main mixer ──────────────────────────────────────────────────────────────

export async function mixAmbientIntoAudio(
  audioBlob: Blob,
  presetId = 'office-hum',
  ambientVolume = 0.08,
  customAudioBlob?: Blob | null
): Promise<Blob> {
  // 1. Decode TTS
  const arrayBuf = await audioBlob.arrayBuffer();
  // Using offline context for fast decoding instead of web audio ctx to ensure consistency
  const tempCtx = new offlineAudioContextConstructor(2, 44100, 44100); 
  // Wait, offline audio ctx constructor doesn't work like this universally across browsers. 
  // It's safer to use AudioContext for decodeAudioData
  const actx = new AudioContext();
  const ttsBuffer = await actx.decodeAudioData(arrayBuf);
  await actx.close();

  const sampleRate = ttsBuffer.sampleRate;
  const length = ttsBuffer.length;
  const numChannels = ttsBuffer.numberOfChannels;

  // 2. Decode Background Audio First (to determine true length)
  let bgBuffer: AudioBuffer | null = null;
  let fileLoaded = false;
  
  if (customAudioBlob) {
    const fallbackCtx = new AudioContext();
    const arrayBuf = await customAudioBlob.arrayBuffer();
    bgBuffer = await fallbackCtx.decodeAudioData(arrayBuf);
    await fallbackCtx.close();
    if (bgBuffer) {
      fileLoaded = true;
    }
  } else {
    const preset = AMBIENT_PRESETS.find(p => p.id === presetId);
    if (preset && preset.fileUrl) {
      const fallbackCtx = new AudioContext();
      bgBuffer = await fetchAndDecodeAudio(preset.fileUrl, fallbackCtx);
      await fallbackCtx.close();
      if (bgBuffer) {
        fileLoaded = true;
      }
    }
  }

  // 3. Determine Final Length (longest of the two)
  // If the user uploads a 1-minute audio and a 10-second TTS, the final file will be 1 minute long.
  // We apply Math.max to ensure the offline context is large enough.
  const ttsLength = ttsBuffer.length;
  const bgLength = bgBuffer ? bgBuffer.length : 0;
  
  // Only override length if it's a CUSTOM upload (presets should trim to TTS size so it doesn't drag on forever)
  const isCustom = !!customAudioBlob;
  const renderLength = isCustom ? Math.max(ttsLength, bgLength) : ttsLength;

  // 4. Offline context setup
  const offline = new OfflineAudioContext(numChannels, renderLength, sampleRate);

  // 5. TTS Source
  const ttsSource = offline.createBufferSource();
  ttsSource.buffer = ttsBuffer;
  ttsSource.connect(offline.destination);
  ttsSource.start(0);

  // 6. Background Audio Source
  if (fileLoaded && bgBuffer) {
    // If custom, don't loop it
    buildFileLooper(offline, bgBuffer, renderLength, ambientVolume, !isCustom);
  } else if (!fileLoaded) {
    // Fallback procedural
    if (presetId.startsWith('talking-')) buildCrowd(offline, renderLength, sampleRate, ambientVolume);
    else if (presetId.startsWith('tv-')) buildTv(offline, renderLength, sampleRate, ambientVolume);
    else if (presetId === 'phone-line') buildPhoneLine(offline, renderLength, sampleRate, ambientVolume);
    else if (presetId === 'rain') buildRain(offline, renderLength, sampleRate, ambientVolume);
    else buildOffice(offline, renderLength, sampleRate, ambientVolume);
  }

  // 7. Render
  const renderedBuffer = await offline.startRendering();

  // 8. Encode
  return encodeWav(renderedBuffer);
}

const offlineAudioContextConstructor = window.OfflineAudioContext || (window as any).webkitOfflineAudioContext;
