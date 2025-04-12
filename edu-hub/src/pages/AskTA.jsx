import { useState, useEffect, useRef } from "react";
import "../styles.css";

const mockCourses = ["Data Structures", "Operating Systems", "AI Basics"];
const mockTAs = [
  { id: 1, name: "Priya Sharma", tags: ["Visual", "Conceptual"], mode: "online" },
  { id: 2, name: "James Lee", tags: ["Slow-paced", "Examples-heavy"], mode: "inperson" },
];

const AskTA = () => {
  const [step, setStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [studentQuestion, setStudentQuestion] = useState("");
  const [selectedTA, setSelectedTA] = useState(null);
  const [method, setMethod] = useState("");
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    const msg = {
      from: "student",
      text: question,
      time: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, msg]);
    setQuestion("");

    setTimeout(() => {
      const reply = {
        from: "ta",
        text: "Thanks for your question! I'll respond soon.",
        time: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="dashboard">
      <h2 className="text-center">🧑‍🏫 Ask a TA</h2>

      {/* Step 1: Select Course */}
      {step === 1 && (
        <div className="card">
          <h3>Select Course</h3>
          <select
            className="input-field"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">-- Choose Course --</option>
            {mockCourses.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
          <button
            className="auth-submit-btn mt-10"
            disabled={!selectedCourse}
            onClick={() => setStep(2)}
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2: Ask Doubt */}
      {step === 2 && (
        <div className="card">
          <h3>Enter Your Question</h3>
          <textarea
            className="input-field"
            value={studentQuestion}
            onChange={(e) => setStudentQuestion(e.target.value)}
            placeholder="What's your doubt?"
          />
          <button
            className="auth-submit-btn mt-10"
            disabled={!studentQuestion.trim()}
            onClick={() => setStep(3)}
          >
            Find Available TAs
          </button>
        </div>
      )}

      {/* Step 3: Show TAs */}
      {step === 3 && (
        <div className="card">
          <h3>Available TAs</h3>
          {mockTAs.map((ta) => (
            <div key={ta.id} className="ta-request-row">
              <div>
                <p><strong>{ta.name}</strong></p>
                <div className="ta-tags">
                  {ta.tags.map((tag, i) => (
                    <span className="ta-tag" key={i}>{tag}</span>
                  ))}
                </div>
              </div>
              <button
                className="tool-btn mt-10"
                onClick={() => {
                  setSelectedTA(ta);
                  setStep(4);
                }}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Step 4: Select Method */}
      {step === 4 && selectedTA && (
        <div className="card">
          <h3>Choose Help Type with {selectedTA.name}</h3>
          <button className="tool-btn green" onClick={() => { setMethod("online"); setStep(5); }}>
            💬 Online Chat / Video
          </button>
          <button className="tool-btn dark-green mt-10" onClick={() => { setMethod("inperson"); setStep(5); }}>
            🧑‍🏫 In-Person Booking
          </button>
        </div>
      )}

      {/* Step 5: Final Interaction */}
      {step === 5 && method === "online" && (
        <div className="card relative">
          <div className="flex justify-between items-center mb-4">
            <h3>💬 Chat with {selectedTA.name}</h3>
            <a
              href="https://meet.jit.si/EDUHUB-DemoRoom"
              target="_blank"
              rel="noreferrer"
              className="video-call-icon"
              title="Start Video Call"
            >
              🎥
            </a>
          </div>
          <div className="chat-box">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-message ${msg.from === "student" ? "student" : "ta"}`}
              >
                <div className="chat-text">{msg.text}</div>
                <div className="chat-time">{msg.time}</div>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
          <form className="chat-form" onSubmit={handleSend}>
            <input
              className="chat-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type a message..."
            />
            <button type="submit" className="chat-send-btn">Send</button>
          </form>
        </div>
      )}

      {step === 5 && method === "inperson" && (
        <div className="card">
          <h3>🧑‍🏫 Book In-Person Session</h3>
          <p>{selectedTA.name} is available tomorrow at 4PM in Room 203.</p>
          <button className="auth-submit-btn mt-10">Confirm Booking</button>
        </div>
      )}
    </div>
  );
};

export default AskTA;
