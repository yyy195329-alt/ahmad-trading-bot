// Smart Urdu + Universal Fallback Voice Engine
function speakUrdu(text, fallbackText) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // پچھلی آواز کلیئر کریں
        
        const utterance = new SpeechSynthesisUtterance();
        const voices = window.speechSynthesis.getVoices();
        
        // اردو آواز تلاش کریں
        const urduVoice = voices.find(v => v.lang.includes('ur') || v.lang.includes('UR'));
        
        if (urduVoice) {
            utterance.voice = urduVoice;
            utterance.lang = 'ur-PK';
            utterance.text = text;
        } else {
            // اگر اردو آواز سسٹم میں نہ ہو تو صاف AI انگلش بولے گا
            utterance.lang = 'en-US';
            utterance.text = fallbackText;
        }

        utterance.rate = 0.9;
        utterance.pitch = 1.0;

        const voiceWave = document.getElementById('voiceWave');
        utterance.onstart = () => voiceWave.classList.add('speaking');
        utterance.onend = () => voiceWave.classList.remove('speaking');
        utterance.onerror = () => voiceWave.classList.remove('speaking');

        window.speechSynthesis.speak(utterance);
    }
}

// executeAIScan فنکشن کے اندر یہ کالز تبدیل کریں:
// بائے کے لیے:
speakUrdu("اگلی کینڈل اوپر جائے گی، بائے لونگ کی ٹریڈ لیں۔", "Next candle is Bullish. Trade Buy Long now.");

// سیل کے لیے:
speakUrdu("اگلی کینڈل نیچے جائے گی، سیل شارٹ کی ٹریڈ لیں۔", "Next candle is Bearish. Trade Sell Short now.");

// انتظار کے لیے:
speakUrdu("مارکیٹ کا رجحان واضح نہیں ہے، انتظار کریں۔", "Market momentum is neutral. Wait for next signal.");