// Zero-latency Web Audio API Sound Engine

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMusicPlaying: boolean = false;
  private musicInterval: any = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public vibrate(pattern: number | number[] = 25) {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Ignore if unsupported
      }
    }
  }

  // Rolling Dice Rattle Sound
  public playDiceRoll() {
    this.initCtx();
    if (!this.ctx) return;
    this.vibrate([15, 30, 20]);

    const now = this.ctx.currentTime;
    for (let i = 0; i < 6; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + i * 0.04 + Math.random() * 0.02;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120 + Math.random() * 180, startTime);
      osc.frequency.exponentialRampToValueAtTime(40, startTime + 0.035);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.04);
    }
  }

  // Cash Cha-Ching Sound
  public playCashSound() {
    this.initCtx();
    if (!this.ctx) return;
    this.vibrate(35);

    const now = this.ctx.currentTime;
    // Tone 1
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(987.77, now); // B5
    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.25);

    // Tone 2 higher
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1318.51, now + 0.1); // E6
    gain2.gain.setValueAtTime(0.3, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.45);
  }

  // Buy Property Fanfare
  public playBuySound() {
    this.initCtx();
    if (!this.ctx) return;
    this.vibrate([20, 50, 40]);

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const time = now + idx * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.22, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 0.26);
    });
  }

  // Jail Lock & Siren Sound
  public playJailSound() {
    this.initCtx();
    if (!this.ctx) return;
    this.vibrate([100, 50, 100]);

    const now = this.ctx.currentTime;
    // Heavy slam
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.4);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  }

  // Tax / Penalty Sound
  public playTaxSound() {
    this.initCtx();
    if (!this.ctx) return;
    this.vibrate([20, 30]);

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.2);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  // Spring Seyran / Picnic Kurdish Festive Scale (Bayati / Rast)
  public playSeyranSound() {
    this.initCtx();
    if (!this.ctx) return;
    this.vibrate([30, 40, 30, 40, 50]);

    // Kurdish folk motif notes
    const notes = [440, 493.88, 554.37, 587.33, 659.25, 739.99, 880];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const time = now + idx * 0.07;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.25, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 0.22);
    });
  }

  // Card Draw / Mystery Sound
  public playCardSound() {
    this.initCtx();
    if (!this.ctx) return;
    this.vibrate(20);

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.15);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Construction / Build House
  public playBuildSound() {
    this.initCtx();
    if (!this.ctx) return;
    this.vibrate([25, 25, 25]);

    const now = this.ctx.currentTime;
    [0, 0.1, 0.2].forEach((offset, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const time = now + offset;

      osc.type = 'square';
      osc.frequency.setValueAtTime(280 + idx * 70, time);
      gain.gain.setValueAtTime(0.15, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + 0.07);
    });
  }

  // Pass GO Sound
  public playPassGoSound() {
    this.initCtx();
    if (!this.ctx) return;
    this.vibrate([30, 40]);

    const now = this.ctx.currentTime;
    const notes = [587.33, 739.99, 880];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const time = now + idx * 0.09;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + 0.22);
    });
  }

  // Bankrupt Sound
  public playBankruptSound() {
    this.initCtx();
    if (!this.ctx) return;
    this.vibrate([80, 50, 80, 50, 150]);

    const now = this.ctx.currentTime;
    const notes = [400, 360, 320, 270, 220];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const time = now + idx * 0.12;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time);
      osc.stop(time + 0.19);
    });
  }

  // Soft Button Click
  public playClick() {
    this.initCtx();
    if (!this.ctx) return;
    this.vibrate(10);

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Toggle Kurdish Folk Ambient Instrumental Loop
  public toggleMusic(enable: boolean) {
    if (!enable) {
      this.stopMusic();
      return;
    }
    this.startMusic();
  }

  private startMusic() {
    if (this.isMusicPlaying) return;
    this.initCtx();
    if (!this.ctx) return;

    this.isMusicPlaying = true;
    const melodyNotes = [
      293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33,
      523.25, 493.88, 440.00, 392.00, 349.23, 392.00, 440.00, 293.66
    ];
    let noteIdx = 0;

    this.musicInterval = setInterval(() => {
      if (!this.ctx || !this.isMusicPlaying) return;
      const freq = melodyNotes[noteIdx % melodyNotes.length];
      noteIdx++;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.48);
    }, 450);
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const soundEngine = new SoundEngine();
