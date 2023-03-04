import { createContext, useContext, useEffect, useState } from 'react';
import useAuthContext from '../../Hooks/Context/AuthContext';
import axiosClient from '../../api/axios';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [senderMessage, setSenderMessage] = useState('');
  const [receiverId, setReceiverId] = useState(0);
  const [userMessages, setUserMessages] = useState([]);
  const [messageSeller, setMessageSeller] = useState([]);
  const [inboxes, setInboxes] = useState([]);

  const messageSellersExample = (user_id) => setReceiverId(user_id);

  const handleSender = (e) => {
    e.preventDefault();
    const chat = {
      sender: user.user_id,
      receiver: receiverId,
      chat: senderMessage,
    };
    console.log(chat);
    axiosClient
      .post('/admin/messages', chat)
      .then((resp) => {
        console.log(resp);
        setSenderMessage('');
      })
      .catch((e) => console.log(e));
  };

  const clikedUser = (clicked_user_id) => {
    axiosClient.get('admin/messages/' + clicked_user_id).then((resp) => {
      console.log(resp);
      setUserMessages(resp.data);
    });
  };

  useEffect(() => {
    axiosClient.get('/admin/users').then((resp) => {
      setMessageSeller(resp.data.listOfUser);
    });

    axiosClient.get('admin/messages').then((resp) => setInboxes(resp.data));
  }, [user.user_id]);

  return (
    <MessageContext.Provider
      value={{
        userMessages,
        messageSeller,
        inboxes,
        messageSellersExample,
        handleSender,
        clikedUser,
        setSenderMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default function useMessageContext() {
  return useContext(MessageContext);
}
