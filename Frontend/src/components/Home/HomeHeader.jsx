import { useRef, useState } from "react";
import "../../css/HomeHeader.css";

function HomeHeader() {
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [voiceText, setVoiceText] = useState("");

  const recognitionRef = useRef(null);
  const finalTextRef = useRef("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    console.log("AI Command:", input);

    // Yaha AI API call karna hai
    // sendToAI(input);
  };

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = true;

    finalTextRef.current = "";
    setVoiceText("");
    setVoiceOpen(true);

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      let finalTranscript = finalTextRef.current;
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      finalTextRef.current = finalTranscript;

      setVoiceText(finalTranscript + interimTranscript);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const closeVoice = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setListening(false);
    setVoiceOpen(false);
  };

  const useVoiceText = () => {
    const text = voiceText.trim();

    if (text) {
      setInput(text);
    }

    closeVoice();
  };

  return (
    <>
      {/* =================================================
          HEADER
      ================================================= */}

      <header className="home-topbar">

        {/* AI Search */}
        <form className="home-ai-search" onSubmit={handleSearch}>
          <span className="home-ai-search-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" strokeLinecap="round" />
            </svg>
          </span>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI anything about your inventory..."
          />

          <span className="home-ai-shortcut">⌘ K</span>
        </form>

        {/* Right Side */}
        <div className="home-topbar-right">

          {/* Mic */}
          <button
            className={`home-mic-btn ${
              listening ? "home-mic-active" : ""
            }`}
            onClick={startVoice}
            type="button"
            aria-label="Voice input"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect
                x="9"
                y="3"
                width="6"
                height="11"
                rx="3"
              />

              <path
                d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Divider */}
          <div className="home-topbar-divider" />

          {/* Profile */}
          <div className="home-profile">
            <div className="home-profile-avatar">
              RP
            </div>

            <div className="home-profile-info">
              <strong>Rohan Pal</strong>
              <span>Admin</span>
            </div>

            <span className="home-profile-arrow">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="m7 10 5 5 5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </header>


      {/* =================================================
          VOICE POPUP
      ================================================= */}

      {voiceOpen && (
        <div
          className="voice-overlay"
          onClick={closeVoice}
        >
          <div
            className="voice-popup"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close */}
            <button
              className="voice-close"
              onClick={closeVoice}
              type="button"
              aria-label="Close voice input"
            >
              ×
            </button>

            <div className="voice-title">
              {listening ? "Listening..." : "Voice input"}
            </div>

            <p className="voice-subtitle">
              {listening
                ? "Speak naturally"
                : "Tap the mic to speak again"}
            </p>


            {/* Animated Mic */}
            <div className="voice-mic-area">

              {listening && (
                <>
                  <span className="voice-pulse pulse-one" />
                  <span className="voice-pulse pulse-two" />
                </>
              )}

              <button
                className={`voice-main-mic ${
                  listening ? "voice-main-mic-active" : ""
                }`}
                onClick={listening ? undefined : startVoice}
                type="button"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="9"
                    y="3"
                    width="6"
                    height="11"
                    rx="3"
                  />

                  <path
                    d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

            </div>


            {/* Voice Text */}
            <div className="voice-result">
              {voiceText ? (
                <p>{voiceText}</p>
              ) : (
                <span>
                  {listening
                    ? "Start speaking..."
                    : "Your voice will appear here"}
                </span>
              )}
            </div>


            {/* Bottom */}
            <div className="voice-footer">

              <button
                className="voice-cancel-btn"
                onClick={closeVoice}
                type="button"
              >
                Cancel
              </button>

              <button
                className="voice-use-btn"
                onClick={useVoiceText}
                type="button"
                disabled={!voiceText.trim()}
              >
                Use text
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default HomeHeader;