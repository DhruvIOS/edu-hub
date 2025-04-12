// /pages/AskTA.jsx
import { useState } from "react";
import "../styles.css";

const AskTA = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newMessage = {
      from: "student",
      text: question,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setQuestion("");

    // Simulate TA reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "ta",
          text: "Thanks! I'll get back to you shortly.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="dashboard">
      <h2>Ask TA</h2>
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-msg ${
              msg.from === "student" ? "sent" : "received"
            }`}
          >
            <p>{msg.text}</p>
            <span className="time">{msg.time}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="chat-form">
        <input
          className="input-field"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default AskTA;
