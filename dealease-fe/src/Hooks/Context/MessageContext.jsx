import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../Hooks/Context/AuthContext';
import axiosClient from '../../api/axios';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [receiverId, setReceiverId] = useState(0);
  const [userMessages, setUserMessages] = useState([]);
  const [messageSeller, setMessageSeller] = useState([]);
  const [inboxes, setInboxes] = useState([]);

  const messageSellersExample = (user_id) => setReceiverId(user_id);

  // clicked make a deal button from post
  const clickedUser = (clicked_user_id) => {
    axiosClient.get('admin/messages/' + clicked_user_id).then((resp) => {
      console.log(resp);
      setUserMessages(resp.data);
      navigate('/admin/message/' + clicked_user_id);
    });
  };

  useEffect(() => {
    if (user) {
      axiosClient.get('/admin/users').then((resp) => {
        setMessageSeller(resp.data.listOfUser);
      });

      axiosClient.get('admin/messages').then((resp) => {
        setInboxes(resp.data);
      });
    }
  }, [user, inboxes.inbox_id]);

  return (
    <MessageContext.Provider
      value={{
        userMessages,
        messageSeller,
        inboxes,
        messageSellersExample,
        clickedUser,
        setUserMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default function useMessageContext() {
  return useContext(MessageContext);
}
