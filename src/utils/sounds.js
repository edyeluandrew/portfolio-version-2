// Sound effects manager using Web Audio API
class SoundManager {
  constructor() {
    this.enabled = true;
    this.volume = 0.5;
    this.audioContext = null;
    this.sounds = {};
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this.audioContext;
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  // Generate a simple beep/tone
  playTone(frequency = 440, duration = 0.1, type = 'sine') {
    if (!this.enabled) return;
    
    try {
      const ctx = this.init();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Sound playback failed:', e);
    }
  }

  // Windows-style startup sound
  playStartup() {
    if (!this.enabled) return;
    
    const notes = [
      { freq: 523.25, delay: 0 },      // C5
      { freq: 659.25, delay: 0.15 },   // E5
      { freq: 783.99, delay: 0.3 },    // G5
      { freq: 1046.50, delay: 0.45 },  // C6
    ];
    
    notes.forEach(note => {
      setTimeout(() => this.playTone(note.freq, 0.3, 'sine'), note.delay * 1000);
    });
  }

  // Click sound
  playClick() {
    this.playTone(800, 0.05, 'square');
  }

  // Window open sound
  playWindowOpen() {
    this.playTone(600, 0.08, 'sine');
    setTimeout(() => this.playTone(800, 0.08, 'sine'), 50);
  }

  // Window close sound
  playWindowClose() {
    this.playTone(800, 0.08, 'sine');
    setTimeout(() => this.playTone(600, 0.08, 'sine'), 50);
  }

  // Error sound
  playError() {
    this.playTone(200, 0.15, 'square');
    setTimeout(() => this.playTone(150, 0.2, 'square'), 100);
  }

  // Notification sound
  playNotification() {
    this.playTone(880, 0.1, 'sine');
    setTimeout(() => this.playTone(1100, 0.1, 'sine'), 100);
    setTimeout(() => this.playTone(880, 0.15, 'sine'), 200);
  }

  // Minimize sound
  playMinimize() {
    this.playTone(600, 0.05, 'sine');
    setTimeout(() => this.playTone(400, 0.05, 'sine'), 40);
  }

  // Maximize sound
  playMaximize() {
    this.playTone(400, 0.05, 'sine');
    setTimeout(() => this.playTone(600, 0.05, 'sine'), 40);
  }
}

// Create singleton instance
const soundManager = new SoundManager();

export default soundManager;
