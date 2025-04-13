// TAChatPanel.jsx (Mock Live Chat with Document Upload/Pin)
import React, { useState } from "react";

const TAChatPanel = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "student",
      name: "Alice",
      text: "Hi! Can you help with recursion?",
      timestamp: "10:01 AM"
    },
    {
      id: 2,
      sender: "ta",
      name: "You",
      text: "Sure! Let's dive into it.",
      timestamp: "10:02 AM"
    }
  ]);

  const [input, setInput] = useState("");
  const [pinnedDoc, setPinnedDoc] = useState(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "ta",
      name: "You",
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPinnedDoc(file.name);
    }
  };

  return (
    <div className="dashboard p-6">
      <h2 className="text-xl font-bold text-center mb-4">💬 TA Live Chat Panel</h2>

      <div className="flex justify-between items-center mb-4">
        <label className="text-sm font-medium">
          📎 Upload & Pin Document: 
          <input type="file" className="ml-2" onChange={handleFileUpload} />
        </label>
        {pinnedDoc && <span className="text-green-600 text-sm">📌 Pinned: {pinnedDoc}</span>}
      </div>

      <div className="chat-box bg-white p-4 rounded shadow max-h-[500px] overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.sender === "ta" ? "student" : "ta"} mb-3`}
          >
            <div className="chat-text">
              <strong>{msg.name}:</strong> {msg.text}
            </div>
            <span className="chat-time text-xs text-gray-500">
              {msg.timestamp}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="chat-form mt-4 flex gap-2">
        <input
          type="text"
          className="chat-input flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" className="chat-send-btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default TAChatPanel;
