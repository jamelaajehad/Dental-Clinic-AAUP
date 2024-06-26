import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import "./Chat.css";
import { IoImageOutline } from "react-icons/io5"; // أيقونة للصور
import { BiMicrophone } from "react-icons/bi"; // أيقونة للصوت

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    const q = query(collection(firestore, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (messageText.trim() === "") return;

    try {
      const docRef = await addDoc(collection(firestore, "messages"), {
        text: messageText,
        timestamp: new Date(),
        sender: "user", // Replace with actual sender ID or name
      });
      console.log("Message sent with ID: ", docRef.id);
      setMessageText("");
    } catch (e) {
      console.error("Error adding message: ", e);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle file upload logic here (e.g., upload to Firebase Storage and retrieve URL)
    console.log("File selected: ", file);
  };

  const handleAudioRecord = () => {
    // Handle audio recording logic here
    console.log("Audio recording started...");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents default behavior of Enter key
      sendMessage(); // Calls sendMessage function when Enter is pressed
    }
  };

  return (
    <div className="chat-container">
      <div className="message-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender === "user" ? "message-sender" : "message-receiver"}`}>
            <p className="message-text">{message.text}</p>
            <p className="message-timestamp">{new Date(message.timestamp.seconds * 1000).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div className="media-container">
        <label htmlFor="file-upload">
          <IoImageOutline className="media-icon" /> {/* أيقونة للصور */}
        </label>
        <input id="file-upload" type="file" onChange={handleFileChange} style={{ display: "none" }} accept="image/*" />
        
        <BiMicrophone className="media-icon" onClick={handleAudioRecord} /> {/* أيقونة للصوت */}
        
        <textarea
          className="message-input"
          placeholder="Type your message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress} // Calls handleKeyPress function on Enter key press
        ></textarea>
        <button className="send-button" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
