'use client';

import { useState, useEffect, useRef, CSSProperties } from 'react';

export default function HomePage() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim()) return; // prevent sending empty messages

    // Add the user's message to the chat history
    setChatHistory((prevChat) => [
      ...prevChat,
      { role: 'user', content: message },
    ]);
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageContent: message }),
      });

      const data = await res.json();
      const content = data.content || 'No response content';

      // Add the assistant's response to the chat history
      setChatHistory((prevChat) => [
        ...prevChat,
        { role: 'assistant', content },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setChatHistory((prevChat) => [
        ...prevChat,
        { role: 'assistant', content: 'Error sending message' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Automatically scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Chat with Integroall</h1>
      <div ref={chatContainerRef} style={styles.chatWindow}>
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            style={
              chat.role === 'user'
                ? { ...styles.messageBubble, ...styles.userMessage }
                : { ...styles.messageBubble, ...styles.assistantMessage }
            }
          >
            {chat.content}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={styles.input}
          onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={styles.sendButton}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

// Updated styles object with proper TypeScript types
const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  chatWindow: {
    width: '100%',
    maxWidth: '600px',
    height: '400px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '15px',
    overflowY: 'scroll',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '15px',
  },
  messageBubble: {
    padding: '10px 15px',
    borderRadius: '20px',
    margin: '10px 0',
    maxWidth: '80%',
    wordWrap: 'break-word',
  },
  userMessage: {
    backgroundColor: '#007aff',
    color: 'white',
    alignSelf: 'flex-end',
  },
  assistantMessage: {
    backgroundColor: '#f1f1f1',
    color: '#000',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '600px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    marginRight: '10px',
    outline: 'none',
    fontSize: '16px',
    color: 'black',
  },
  sendButton: {
    padding: '10px 20px',
    backgroundColor: '#007aff',
    color: 'white',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
