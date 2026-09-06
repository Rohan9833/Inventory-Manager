import { useRef, useState } from "react";
import "../../css/HomeHeader.css";

function HomeHeader() {
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [voiceError, setVoiceError] = useState("");

  const recognitionRef = useRef(null);
  const finalTextRef = useRef("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    console.log("AI Command:", input);

    // sendToAI(input);
  };

  /* =====================================================
     HAMBURGER
  ===================================================== */

  const openSidebar = () => {
    window.dispatchEvent(new Event("open-sidebar"));
  };

  /* =====================================================
     VOICE
  ===================================================== */

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError("Voice input is not supported in this browser.");
      setVoiceOpen(true);
      return;
    }

    // Agar already listening hai to kuch mat karo
    if (listening) return;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = true;

    finalTextRef.current = voiceText;
    setVoiceError("");
    setVoiceOpen(true);

    recognition.onstart = () => {
      setListening(true);
      setVoiceError("");
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

      setVoiceText(
        (finalTranscript + interimTranscript).trim()
      );
    };

    recognition.onerror = (event) => {
      setListening(false);

      if (event.error === "not-allowed") {
        setVoiceError("Microphone permission was denied.");
      } else if (event.error === "no-speech") {
        setVoiceError("No speech detected. Tap the mic and try again.");
      } else {
        setVoiceError("Something went wrong. Please try again.");
      }
    };

    recognition.onend = () => {
      // IMPORTANT:
      // Popup close nahi karna
      setListening(false);
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (error) {
      setListening(false);
    }
  };

  const closeVoice = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setListening(false);
    setVoiceOpen(false);
    setVoiceError("");
  };

  const useVoiceText = () => {
    const text = voiceText.trim();

    if (!text) return;

    setInput(text);
    closeVoice();
  };

  return (
    <>
      {/* =================================================
          HEADER
      ================================================= */}

      <header className="home-topbar">

        {/* Hamburger - mobile/tablet */}
        <button
          className="home-header-menu"
          onClick={openSidebar}
          type="button"
          aria-label="Open menu"
        >
          <span />
          <span />
          <span />
        </button>

        {/* AI Search */}
        <form
          className="home-ai-search"
          onSubmit={handleSearch}
        >
          <span className="home-ai-search-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path
                d="m20 20-4-4"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI anything about your inventory..."
          />

          <span className="home-ai-shortcut">
            ⌘ K
          </span>
        </form>

        {/* Right Side */}
        <div className="home-topbar-right">

          {/* Mic */}
          <button
            className={`home-mic-btn ${
              listening ? "home-mic-active" : ""
            }`}
            onClick={() => {
              setVoiceOpen(true);
              startVoice();
            }}
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

            <button
              className="voice-close"
              onClick={closeVoice}
              type="button"
            >
              ×
            </button>

            <div className="voice-title">
              {listening
                ? "Listening..."
                : "Voice input"}
            </div>

            <p className="voice-subtitle">
              {listening
                ? "Speak naturally"
                : voiceError
                  ? voiceError
                  : "Tap the mic to speak"}
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
                  listening
                    ? "voice-main-mic-active"
                    : ""
                }`}
                onClick={startVoice}
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


            {/* Buttons */}
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