// Text-to-Speech utility for accessibility

class TextToSpeech {
  private synthesis: SpeechSynthesis;
  private isEnabled: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.synthesis = window.speechSynthesis;
      // Load preferences from localStorage
      const savedPrefs = localStorage.getItem('accessibilityPreferences');
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        this.isEnabled = prefs.textToSpeech || false;
      }
    }
  }

  // Enable or disable text-to-speech
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    localStorage.setItem('textToSpeechEnabled', enabled.toString());
    
    if (!enabled) {
      this.stop();
    }
  }

  // Check if text-to-speech is enabled
  isCurrentlyEnabled(): boolean {
    return this.isEnabled;
  }

  // Speak text in Thai
  speak(text: string, options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
  }) {
    if (!this.isEnabled || !this.synthesis) {
      console.log('Text-to-speech not enabled or not available');
      return;
    }

    try {
      // Stop any current speech
      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'th-TH'; // Thai language
      utterance.rate = options?.rate || 0.9;
      utterance.pitch = options?.pitch || 1.0;
      utterance.volume = options?.volume || 1.0;

      utterance.onend = () => {
        this.currentUtterance = null;
        console.log('Speech ended:', text);
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        this.currentUtterance = null;
      };

      utterance.onstart = () => {
        console.log('Speech started:', text);
      };

      this.currentUtterance = utterance;
      this.synthesis.speak(utterance);
      console.log('Speaking:', text);
    } catch (error) {
      console.error('Error in speak():', error);
    }
  }

  // Stop current speech
  stop() {
    if (this.synthesis && this.synthesis.speaking) {
      this.synthesis.cancel();
      this.currentUtterance = null;
    }
  }

  // Pause current speech
  pause() {
    if (this.synthesis && this.synthesis.speaking) {
      this.synthesis.pause();
    }
  }

  // Resume paused speech
  resume() {
    if (this.synthesis && this.synthesis.paused) {
      this.synthesis.resume();
    }
  }

  // Speak page title and heading
  announcePageContent(title: string, description?: string) {
    if (!this.isEnabled) return;

    let announcement = title;
    if (description) {
      announcement += `. ${description}`;
    }

    this.speak(announcement);
  }

  // Speak button text when focused
  announceButton(text: string) {
    if (!this.isEnabled) return;

    // Check if the button is actionable (not just decorative)
    if (text && text.length < 50) {
      this.speak(`ปุ่ม ${text}`);
    }
  }

  // Speak form field label and status
  announceField(fieldLabel: string, value?: string, isError?: boolean) {
    if (!this.isEnabled) return;

    let announcement = fieldLabel;
    
    if (value) {
      announcement += `. ค่า ${value}`;
    }
    
    if (isError) {
      announcement += '. เกิดข้อผิดพลาด';
    }

    this.speak(announcement);
  }

  // Speak notification
  announceNotification(title: string, message?: string) {
    if (!this.isEnabled) return;

    let announcement = `การแจ้งเตือน: ${title}`;
    if (message) {
      announcement += `. ${message}`;
    }

    this.speak(announcement);
  }
}

// Create singleton instance
const textToSpeech = new TextToSpeech();

export default textToSpeech;

