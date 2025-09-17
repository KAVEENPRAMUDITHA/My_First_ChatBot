
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
 
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", sender: "bot" }
  ]);

  
  const [input, setInput] = useState('');

  
  const [isLoading, setIsLoading] = useState(false);
  

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);


  const handleSend = async (e) => {
    e.preventDefault(); 
    if (!input.trim()) return; 

    const userMessage = { text: input, sender: 'user' };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages); 
    setInput(''); 
    setIsLoading(true); 

    try {
      
      const response = await axios.post('http://localhost:5000/chat', {
        message: input,
        history: messages 
      });

      const botMessage = { text: response.data.reply, sender: 'bot' };
      setMessages([...newMessages, botMessage]);

    } catch (error) {
      console.error("Error fetching bot response:", error);
      const errorMessage = { text: "Sorry, I'm having trouble connecting.", sender: 'bot' };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false); 
    }
  };

  // --- User HTML template (JSX) ---
  return (
    <div className="app-container">
      <div className="chat-header">
        <h1>MychatBot</h1>
      </div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message-container ${msg.sender}`}>
            <p className="message-bubble">{msg.text}</p>
          </div>
        ))}

        {isLoading && (
          <div className="message-container bot">
            <p className="message-bubble typing-indicator">
              <span></span><span></span><span></span>
            </p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input-form" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          autoFocus
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;