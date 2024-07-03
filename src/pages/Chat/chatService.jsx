// import { firestore } from '../../firebase'; // Adjust this path if necessary
// import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

// export const sendMessage = async (conversationId, sender, text) => {
//   try {
//     const message = {
//       sender,
//       text,
//       timestamp: serverTimestamp()
//     };

//     await addDoc(collection(firestore, conversations/${conversationId}/messages), message);
//     console.log("Message sent successfully!");
//   } catch (e) {
//     console.error("Error sending message: ", e);
//   }
// };

// export const receiveMessages = (conversationId, callback) => {
//   const messagesRef = collection(firestore, conversations/${conversationId}/messages);
//   const q = query(messagesRef, orderBy('timestamp'));

//   return onSnapshot(q, (snapshot) => {
//     const messages = snapshot.docs.map(doc => doc.data());
//     callback(messages);
//   });
// }; 
// export default sendMessage;