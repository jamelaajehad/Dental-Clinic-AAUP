// import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { sendMessage, receiveMessages } from './chatService';
// import './Chat.css';

// const Chat = ({ conversationId, sender }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     const unsubscribe = receiveMessages(conversationId, (messages) => {
//       setMessages(messages);
//     });
//     return () => unsubscribe();
//   }, [conversationId]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (newMessage.trim() === '') return;
//     await sendMessage(conversationId, sender, newMessage);
//     setNewMessage('');
//   };

//   return (
    
//     <div className="chat-container">
//       <div className="messages">
//         {messages.map((message, index) => (
//           <div key={index} className={message ${message.sender === sender ? 'sent' : 'received'}}>
//             <p>{message.text}</p>
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSendMessage} className="message-form">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );

// };

// Chat.propTypes = {
//   conversationId: PropTypes.string.isRequired,
//   sender: PropTypes.string.isRequired
// };

// export default Chat;