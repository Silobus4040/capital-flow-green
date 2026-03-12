/**
 * mixAmbientAudio — Bakes procedural brown-noise room-tone into a TTS audio
 * blob using an OfflineAudioContext so the *recipient* hears the ambient
 * background, not just the admin previewing locally.
 *
 * Returns a WAV Blob ready for upload / playback.
 */

// ── WAV encoder (no external deps) ──────────────────────────────────────────

function encodeWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitsPerSample = 16;

  // Interleave channels
  const length = buffer.length * numChannels;
  const samples = new Int16Array(length);

  for (let ch = 0; ch < numChannels; ch++) {
    const channelData = buffer.getChannelData(ch);
    for (let i = 0; i < buffer.length; i++) {
      // Clamp to [-1, 1] then scale to 16-bit
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
  view.setUint32(16, 16, true);                          // chunk size
  view.setUint16(20, format, true);                       // PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * (bitsPerSample / 8), true);
  view.setUint16(32, numChannels * (bitsPerSample / 8), true);
  view.setUint16(34, bitsPerSample, true);
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);

  // Write PCM samples
  const byteOffset = headerSize;
  for (let i = 0; i < samples.length; i++) {
    view.setInt16(byteOffset + i * 2, samples[i], true);
  }

  return new Blob([arrayBuffer], { type: 'audio/wav' });
}

// ── Brown noise generator (matches useAmbientNoise algorithm) ───────────────

function generateBrownNoise(length: number, sampleRate: number): Float32Array {
  const data = new Float32Array(length);
  let lastOut = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    lastOut = (lastOut + 0.02 * white) / 1.02;
    data[i] = lastOut * 3.5;
  }
  return data;
}

// ── Main mixer ──────────────────────────────────────────────────────────────

/**
 * Mix procedural ambient noise into an audio blob offline.
 *
 * @param audioBlob  The TTS audio (MP3 or WAV)
 * @param ambientVolume  How loud the ambient layer is (0–1, default 0.08)
 * @returns  A new WAV Blob with ambient noise baked in
 */
export async function mixAmbientIntoAudio(
  audioBlob: Blob,
  ambientVolume = 0.08,
): Promise<Blob> {
  // 1. Decode the TTS audio
  const arrayBuf = await audioBlob.arrayBuffer();
  const tempCtx = new AudioContext();
  const ttsBuffer = await tempCtx.decodeAudioData(arrayBuf);
  await tempCtx.close();

  const sampleRate = ttsBuffer.sampleRate;
  const duration = ttsBuffer.duration;
  const length = ttsBuffer.length;
  const numChannels = ttsBuffer.numberOfChannels;

  // 2. Create offline context
  const offline = new OfflineAudioContext(numChannels, length, sampleRate);

  // 3. TTS source (full volume)
  const ttsSource = offline.createBufferSource();
  ttsSource.buffer = ttsBuffer;
  ttsSource.connect(offline.destination);
  ttsSource.start(0);

  // 4. Brown noise source
  const noiseBuffer = offline.createBuffer(1, length, sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  const brownNoise = generateBrownNoise(length, sampleRate);
  noiseData.set(brownNoise);

  const noiseSource = offline.createBufferSource();
  noiseSource.buffer = noiseBuffer;

  // Low-pass filter to warm up the noise (matches useAmbientNoise)
  const lpf = offline.createBiquadFilter();
  lpf.type = 'lowpass';
  lpf.frequency.value = 600;
  lpf.Q.value = 0.7;

  // Volume control
  const gain = offline.createGain();
  gain.gain.value = ambientVolume;

  noiseSource.connect(lpf);
  lpf.connect(gain);
  gain.connect(offline.destination);
  noiseSource.start(0);

  // 5. Render offline
  const renderedBuffer = await offline.startRendering();

  // 6. Encode to WAV
  return encodeWav(renderedBuffer);
}
