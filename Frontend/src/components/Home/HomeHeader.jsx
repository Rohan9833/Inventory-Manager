import { useEffect, useRef, useState } from "react";
import { sendAIChat } from "../../api/ai.api";
import "../../css/HomeHeader.css";

function HomeHeader() {
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [voiceError, setVoiceError] = useState("");

  const [aiResponse, setAiResponse] = useState("");
  const [aiResponseOpen, setAiResponseOpen] = useState(false);

  const recognitionRef = useRef(null);
  const finalTextRef = useRef("");
  const shouldListenRef = useRef(false);

  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);
  // =====================================================
  // ai call function
  // =====================================================

  const callAIChatAPI = async (text) => {
    try {
      console.log("Sending AI message:", text);

      const response = await sendAIChat(text);

      console.log("AI response:", response);

      if (response?.success) {
        setAiResponse(response.data);
        setAiResponseOpen(true);
      }

      return response;
    } catch (error) {
      console.error("AI chat API error:", error);
      throw error;
    }
  };

  const speakAIResponse = () => {
    if (!aiResponse?.trim()) return;

    // Remove emojis before speaking
    const speechText = aiResponse
      .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
      .replace(/\s+/g, " ")
      .trim();

    if (!speechText) return;

    // Stop previous speech
    window.speechSynthesis.cancel();

    const voices = window.speechSynthesis.getVoices();

    // Prefer Hindi voice
    // const hindiVoice =
    //   voices.find((voice) => voice.lang === "hi-IN") ||
    //   voices.find((voice) => voice.lang.startsWith("hi"));

    // // Fallback to Indian English
    // const englishIndiaVoice =
    //   voices.find((voice) => voice.lang === "en-IN") ||
    //   voices.find((voice) => voice.lang.startsWith("en"));

    // const selectedVoice = hindiVoice || englishIndiaVoice || voices[0];

    // const speech = new SpeechSynthesisUtterance(speechText);

    // speech.voice = selectedVoice;

    // // Use Hindi if Hindi voice exists
    // speech.lang = hindiVoice
    //   ? hindiVoice.lang
    //   : englishIndiaVoice
    //     ? englishIndiaVoice.lang
    //     : "en-IN";
    const englishIndiaVoice =
      voices.find((voice) => voice.lang === "en-IN") ||
      voices.find((voice) => voice.lang.startsWith("en-IN")) ||
      voices.find((voice) => voice.lang.startsWith("en"));

    const selectedVoice = englishIndiaVoice || voices[0];

    const speech = new SpeechSynthesisUtterance(speechText);

    speech.voice = selectedVoice;
    speech.lang = selectedVoice?.lang || "en-IN"; 

    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    window.speechSynthesis.speak(speech);
  };
  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = async (e) => {
    e.preventDefault();

    const text = input.trim();

    if (!text) return;

    try {
      await callAIChatAPI(text);
    } catch (error) {
      console.error("Failed to process AI request:", error);
    }
  };

  // =====================================================
  // HAMBURGER
  // =====================================================

  const openSidebar = () => {
    window.dispatchEvent(new Event("open-sidebar"));
  };

  // =====================================================
  // START VOICE
  // =====================================================
  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError("Voice input is not supported in this browser.");
      setVoiceOpen(true);
      return;
    }

    if (listening) return;

    // ==========================================
    // FRESH SESSION
    // ==========================================

    shouldListenRef.current = true;
    finalTextRef.current = "";

    setVoiceText("");
    setVoiceError("");
    setVoiceOpen(true);

    const recognition = new SpeechRecognition();

    recognitionRef.current = recognition;

    // ==========================================
    // IMPORTANT
    // ==========================================

    recognition.lang = "en-IN";

    // Do NOT continuously restart recognition
    recognition.continuous = false;

    // We still want interim text
    recognition.interimResults = true;

    // ==========================================
    // START
    // ==========================================

    recognition.onstart = () => {
      setListening(true);
      setVoiceError("");
    };

    // ==========================================
    // RESULT
    // ==========================================

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const text = `${finalTranscript} ${interimTranscript}`
        .trim()
        .replace(/\s+/g, " ");

      finalTextRef.current = finalTranscript.trim();

      setVoiceText(text);
    };

    // ==========================================
    // ERROR
    // ==========================================

    recognition.onerror = (event) => {
      console.log("Speech recognition error:", event.error);

      if (event.error === "not-allowed") {
        shouldListenRef.current = false;
        setListening(false);

        setVoiceError("Microphone permission was denied.");

        return;
      }

      if (event.error === "service-not-allowed") {
        shouldListenRef.current = false;
        setListening(false);

        setVoiceError("Microphone service is not available.");

        return;
      }

      if (event.error === "aborted") {
        return;
      }

      if (event.error === "no-speech") {
        setListening(false);
        setVoiceError("No speech detected. Try again.");

        return;
      }

      setVoiceError("Something went wrong. Please try again.");
    };

    // ==========================================
    // END
    // ==========================================

    recognition.onend = () => {
      setListening(false);

      /*
       * IMPORTANT:
       *
       * DO NOT call recognition.start() here.
       *
       * The previous code was restarting the same
       * recognition session and causing duplicate
       * transcripts in Brave.
       */

      recognitionRef.current = null;
      shouldListenRef.current = false;
    };

    // ==========================================
    // START RECOGNITION
    // ==========================================

    try {
      recognition.start();
    } catch (error) {
      console.log("Recognition start error:", error);

      setListening(false);
      recognitionRef.current = null;
    }
  };

  // =====================================================
  // STOP VOICE
  // =====================================================

  const stopVoice = () => {
    shouldListenRef.current = false;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (error) {
        console.log("Recognition stop:", error);
      }

      recognitionRef.current = null;
    }

    setListening(false);
  };

  // =====================================================
  // CLOSE VOICE
  // =====================================================

  const closeVoice = () => {
    shouldListenRef.current = false;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (error) {
        console.log("Recognition close:", error);
      }

      recognitionRef.current = null;
    }

    finalTextRef.current = "";

    setVoiceText("");
    setVoiceError("");
    setListening(false);
    setVoiceOpen(false);
  };

  // =====================================================
  // USE VOICE TEXT
  // =====================================================

  const useVoiceText = async () => {
    const text = voiceText.trim();

    if (!text) return;

    try {
      await callAIChatAPI(text);

      setInput(text);
      closeVoice();
    } catch (error) {
      console.error("Failed to process AI request:", error);
    }
  };

  // =====================================================
  // TOGGLE VOICE
  // =====================================================

  const toggleVoice = () => {
    if (listening) {
      stopVoice();
    } else {
      startVoice();
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      {/* =================================================
          HEADER
      ================================================= */}

      <header className="home-topbar">
        {/* Hamburger */}
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
        </form>

        {/* Right Side */}
        <div className="home-topbar-right">
          {/* Mic */}
          <button
            className={`home-mic-btn ${listening ? "home-mic-active" : ""}`}
            onClick={toggleVoice}
            type="button"
            aria-label={listening ? "Stop voice input" : "Start voice input"}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="9" y="3" width="6" height="11" rx="3" />

              <path
                d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="home-topbar-divider" />

          {/* Profile */}
          <div className="home-profile">
            <div className="home-profile-avatar">RP</div>

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
        <div className="voice-overlay" onClick={closeVoice}>
          <div className="voice-popup" onClick={(e) => e.stopPropagation()}>
            {/* Close */}
            <button
              className="voice-close"
              onClick={closeVoice}
              type="button"
              aria-label="Close voice input"
            >
              ×
            </button>

            {/* Title */}
            <div className="voice-title">
              {listening ? "Listening..." : "Voice input"}
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
                  listening ? "voice-main-mic-active" : ""
                }`}
                onClick={toggleVoice}
                type="button"
                aria-label={listening ? "Stop listening" : "Start listening"}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="3" width="6" height="11" rx="3" />

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

      {/* =================================================
    AI RESPONSE POPUP
================================================= */}

      {aiResponseOpen && (
        <div
          className="ai-response-overlay"
          onClick={() => {
            window.speechSynthesis.cancel();
            setAiResponseOpen(false);
          }}
        >
          <div
            className="ai-response-popup"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="ai-response-header">
              <div className="ai-response-title-wrapper">
                <div className="ai-response-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M12 3a6 6 0 0 0-6 6v3a6 6 0 0 0 12 0V9a6 6 0 0 0-6-6Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M4 11a8 8 0 0 0 16 0M12 19v2M9 21h6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div>
                  <h3>AI Assistant</h3>
                  <span>Inventory Assistant</span>
                </div>
              </div>

              <button
                className="ai-response-close"
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setAiResponseOpen(false);
                }}
                type="button"
                aria-label="Close AI response"
              >
                ×
              </button>
            </div>

            {/* Response */}
            <div className="ai-response-body">
              <div className="ai-response-message">
                <div className="ai-response-avatar">AI</div>

                <div className="ai-response-content">
                  <span className="ai-response-label">Assistant</span>

                  <p>{aiResponse}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="ai-response-footer">
              <button
                className="ai-response-speak"
                onClick={speakAIResponse}
                type="button"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M11 5 6 9H3v6h3l5 4V5Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M15.5 8.5a5 5 0 0 1 0 7" strokeLinecap="round" />
                  <path d="M18.5 5.5a9 9 0 0 1 0 13" strokeLinecap="round" />
                </svg>
                Speak
              </button>

              <button
                className="ai-response-done"
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setAiResponseOpen(false);
                }}
                type="button"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HomeHeader;
