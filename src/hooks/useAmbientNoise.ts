import { useRef, useCallback } from 'react';

/**
 * useAmbientNoise — generates subtle procedural office/room ambience
 * using the Web Audio API. Layers brown noise + a low hum to simulate
 * a real phone call or office environment beneath TTS playback.
 *
 * Usage:
 *   const { startAmbience, stopAmbience } = useAmbientNoise();
 *   startAmbience();   // call when TTS starts playing
 *   stopAmbience();    // call when TTS finishes or is paused
 */
export function useAmbientNoise(volume = 0.08) {
  const ctxRef = useRef<AudioContext | null>(null);
  const noiseRef = useRef<AudioBufferSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const activeRef = useRef(false);

  const startAmbience = useCallback(() => {
    if (activeRef.current) return;
    activeRef.current = true;

    try {
      const ctx = new AudioContext();
      ctxRef.current = ctx;

      // ── Generate 4 seconds of brown noise, looped ──
      const sampleRate = ctx.sampleRate;
      const duration = 4;
      const length = sampleRate * duration;
      const buffer = ctx.createBuffer(1, length, sampleRate);
      const data = buffer.getChannelData(0);

      let lastOut = 0;
      for (let i = 0; i < length; i++) {
        const white = Math.random() * 2 - 1;
        // Brown noise: integrate white noise with a leak factor
        lastOut = (lastOut + 0.02 * white) / 1.02;
        data[i] = lastOut * 3.5; // scale up slightly
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      // ── Gentle low-pass filter to make it sound like room tone ──
      const lpf = ctx.createBiquadFilter();
      lpf.type = 'lowpass';
      lpf.frequency.value = 600; // cut off higher frequencies — keeps it warm
      lpf.Q.value = 0.7;

      // ── Volume control ──
      const gain = ctx.createGain();
      gain.gain.value = 0; // start silent
      // Fade in over 0.8s so it's not jarring
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.8);

      source.connect(lpf);
      lpf.connect(gain);
      gain.connect(ctx.destination);
      source.start();

      noiseRef.current = source;
      gainRef.current = gain;
    } catch (err) {
      console.warn('Ambient noise failed to start:', err);
      activeRef.current = false;
    }
  }, [volume]);

  const stopAmbience = useCallback(() => {
    if (!activeRef.current) return;
    activeRef.current = false;

    try {
      const gain = gainRef.current;
      const ctx = ctxRef.current;
      const source = noiseRef.current;

      if (gain && ctx) {
        // Fade out over 0.5s
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      }

      // Clean up after fade
      setTimeout(() => {
        try {
          source?.stop();
        } catch { /* already stopped */ }
        try {
          ctx?.close();
        } catch { /* already closed */ }
        noiseRef.current = null;
        gainRef.current = null;
        ctxRef.current = null;
      }, 600);
    } catch (err) {
      console.warn('Ambient noise cleanup error:', err);
    }
  }, []);

  return { startAmbience, stopAmbience };
}
