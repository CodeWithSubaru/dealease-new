import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../../Components/Notification/Notification';
import useAuthContext from '../../Hooks/Context/AuthContext';
import axiosClient from '../../api/axios';
import { Delete } from '../../Components/Notification/Notification';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [receiverId, setReceiverId] = useState(0);
  const [userMessages, setUserMessages] = useState([]);
  const [messageSeller, setMessageSeller] = useState([]);
  const [errors, setErrors] = useState({});
  const [inboxes, setInboxes] = useState([]);
  const messages = [];

  const messageSellersExample = (user_id) => setReceiverId(user_id);

  // clicked make a deal button from post
  const clickedUser = (clicked_user_id, userType) => {
    axiosClient.get('/messages/' + clicked_user_id).then((resp) => {
      setUserMessages(resp.data);
      navigate(userType + '/message/' + clicked_user_id);
    });
  };

  function fetchMessage(message_id) {
    axiosClient.get('/messages/' + message_id).then((resp) => {
      setUserMessages(resp.data);
    });
  }

  function fetchInbox() {
    axiosClient.get('/messages').then((resp) => {
      setInboxes(resp.data);
      messages.push(inboxes.map((inbox) => inbox.message_id));
    });
  }

  function softDel(id) {
    Delete()
      .then((resp) => {
        if (resp.isConfirmed) {
          axiosClient
            .post('/messages/inbox/delete/' + id)
            .then((res) => fetchInbox());
        }
      })
      .catch((err) =>
        Notification({
          title: 'Error',
          message: 'Something went wrong',
          icon: 'error',
        }).then(() => setErrors(err.response.data.errors))
      );
  }

  function handleRestoration(id) {
    axiosClient
      .post('/messages/inbox/restore/' + id)
      .then((res) =>
        Notification({
          title: 'Success',
          message: res.data.status,
          icon: 'success',
        })
      )
      .catch((err) =>
        Notification({
          title: 'Error',
          message: 'Something went wrong',
          icon: 'error',
        }).then(() => setErrors(err.response.data.errors))
      );
  }

  useEffect(() => {
    setErrors([]);
  }, []);

  return (
    <MessageContext.Provider
      value={{
        userMessages,
        messageSeller,
        inboxes,
        messages,
        softDel,
        handleRestoration,
        messageSellersExample,
        clickedUser,
        setUserMessages,
        fetchMessage,
        fetchInbox,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default function useMessageContext() {
  return useContext(MessageContext);
}
