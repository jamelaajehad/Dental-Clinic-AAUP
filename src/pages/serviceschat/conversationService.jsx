// import { db } from '../firebase'; 
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// export const createConversation = async (userId1, userId2) => {
//   try {
//     const conversationRef = await addDoc(collection(db, 'conversations'), {
//       participants: [userId1, userId2],
//       lastMessage: '',
//       lastUpdated: serverTimestamp()
//     });
//     console.log('Conversation created with ID: ', conversationRef.id);
//   } catch (e) {
//     console.error('Error adding document: ', e);
//   }
// };

// createConversation('userId1', 'userId2'); 
