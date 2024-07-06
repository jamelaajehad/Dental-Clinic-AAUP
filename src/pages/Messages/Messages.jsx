import React, { useState, useEffect } from "react";
import logo from "../../Asset/app-images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, firestore } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import "./Messages.css";
import { FaComment, FaPaperPlane } from "react-icons/fa";

const Messages = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { chatId: initialChatId, otherUser: initialOtherUser } =
    location.state || {};
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(initialChatId);
  const [selectedOtherUser, setSelectedOtherUser] = useState(initialOtherUser);

  const fetchUserData = async (userId) => {
    let otherUserData = null;

    // Check in Doctors collection
    try {
      const doctorDoc = await getDoc(doc(firestore, "Doctors", userId));
      if (doctorDoc.exists()) {
        otherUserData = doctorDoc.data();
      } else {
        // Check in Patients collection
        const patientDoc = await getDoc(doc(firestore, "Patients", userId));
        if (patientDoc.exists()) {
          otherUserData = patientDoc.data();
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }

    return (
      otherUserData || { fullname: "Unknown", image: "default-avatar-url" }
    );
  };

  const fetchChats = async () => {
    const user = auth.currentUser;
    if (user) {
      const chatRef = collection(firestore, "Chats");
      const chatQuery = query(
        chatRef,
        where("participants", "array-contains", user.uid)
      );

      const unsubscribeChats = onSnapshot(chatQuery, async (snapshot) => {
        const chatList = await Promise.all(
          snapshot.docs.map(async (chatDoc) => {
            const chatData = chatDoc.data();
            const otherUserId = chatData.participants.find(
              (uid) => uid !== user.uid
            );

            const otherUserData = await fetchUserData(otherUserId);
            console.log("Other User Data:", otherUserData); // Debug log for other user data

            const messagesSnapshot = await getDocs(
              query(
                collection(firestore, "Chats", chatDoc.id, "Messages"),
                orderBy("timestamp", "desc"),
                limit(1)
              )
            );
            const messagesData = messagesSnapshot.docs.map((msgDoc) =>
              msgDoc.data()
            );
            console.log("Messages Data:", messagesData); // Debug log for messages data

            return {
              id: chatDoc.id,
              ...chatData,
              otherUser: {
                id: otherUserId,
                ...otherUserData,
              },
              messages: messagesData,
            };
          })
        );

        const sortedChatList = chatList
          .filter((chat) => chat.messages.length > 0)
          .sort((a, b) => {
            const aTimestamp = a.messages[0]?.timestamp?.toMillis?.() || 0;
            const bTimestamp = b.messages[0]?.timestamp?.toMillis?.() || 0;
            return bTimestamp - aTimestamp;
          });

        console.log("Sorted Chat List:", sortedChatList); // Debug log for sorted chat list
        setChats(sortedChatList);
      });

      return () => unsubscribeChats();
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (initialChatId) {
      fetchMessages(initialChatId);
    }
  }, [initialChatId]);

  const fetchMessages = async (chatId) => {
    try {
      const messagesRef = query(
        collection(firestore, "Chats", chatId, "Messages"),
        orderBy("timestamp", "asc")
      );
      const messagesSnapshot = await getDocs(messagesRef);
      const messagesData = messagesSnapshot.docs.map((doc) => doc.data());
      console.log("Fetched Messages:", messagesData); // Debug log for fetched messages
      setMessages(messagesData);
    } catch (error) {
      console.error("Error fetching messages: ", error);
    }
  };

  const handleChatClick = (chat) => {
    console.log("Chat Clicked:", chat); // Debug log for clicked chat
    setSelectedChat(chat.id);
    setSelectedOtherUser(chat.otherUser);
    fetchMessages(chat.id);
    navigate("/Messages", {
      state: { chatId: chat.id, otherUser: chat.otherUser },
    });
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const user = auth.currentUser;
      const newMsg = {
        author: user.uid, // Set the author to the current user's ID
        message: newMessage,
        timestamp: new Date(),
        sent: true,
      };

      if (selectedChat) {
        try {
          await addDoc(
            collection(firestore, "Chats", selectedChat, "Messages"),
            newMsg
          );
          setMessages([...messages, newMsg]);
          setNewMessage("");
          // Ensure the UI updates with the new message
          fetchChats();
        } catch (error) {
          console.error("Error sending message: ", error);
        }
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    if (timestamp?.toDate) {
      return timestamp
        .toDate()
        .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else if (timestamp instanceof Date) {
      return timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return "Invalid Date";
  };

  return (
    <div className="chat-screen">
      <div className="sidebar">
        <div style={{ flexDirection: "row", display: "flex" }}>
          <FaComment className="message-icon" />
          <h4>All Messages</h4>
        </div>
        <div className="conversation-list">
          {chats.map((chat) => (
            <ConversationItem
              key={chat.id}
              name={chat.otherUser.fullname}
              avatar={chat.otherUser.image}
              message={chat.messages[0]?.message || "No messages yet"}
              onClick={() => handleChatClick(chat)}
            />
          ))}
        </div>
      </div>
      <div className="chat-area">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <div id="avatarrr">
                <img
                  src={
                    selectedOtherUser?.image
                      ? selectedOtherUser?.image
                      : "https://firebasestorage.googleapis.com/v0/b/dental-aaup.appspot.com/o/default.jpg?alt=media&token=cf0548b6-f7cb-410d-bd1d-f17a83b541d7"
                  }
                  alt="avatar"
                />
              </div>
              <h6>{selectedOtherUser?.fullname || "Chat"}</h6>
            </div>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  author={msg.author}
                  message={msg.message}
                  time={formatTimestamp(msg.timestamp)}
                  sent={msg.sent}
                />
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>
                <FaPaperPlane className="message-icon " id="send-icon" />
              </button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <img src={logo} alt="Logo" className="logo" />
            <p>Your messages</p>
            <p>Send a message to start a chat.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ConversationItem = ({ name, message, onClick, avatar }) => (
  <div className="conversation-item" onClick={onClick}>
    <div id="avatarrr">
      <img src={avatar} alt="avatar" />
    </div>
    <div className="conversation-details">
      <h6>{name}</h6>
      <p>{message}</p>
    </div>
  </div>
);

const ChatMessage = ({ author, message, time }) => {
  const user = auth.currentUser;
  const sent = author === user.uid;

  return (
    <div className={`chat-message ${sent ? "sent" : "received"}`}>
      <div className="message-bubble">
        <div className="message-content">
          <p>{message}</p>
          <span className="message-time">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default Messages;