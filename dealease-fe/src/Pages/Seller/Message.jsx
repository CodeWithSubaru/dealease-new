import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axiosClient from '../../api/axios';
import useAuthContext from '../../Hooks/Context/AuthContext';
import useMessageContext from '../../Hooks/Context/MessageContext';

const MessageForm = () => {
  const [senderMessage, setSenderMessage] = useState('');
  const { message_id } = useParams();
  const { user } = useAuthContext();
  const [errors, setErrors] = useState('');
  const { fetchMessage, setPath } = useMessageContext();

  const handleSend = (receiverId, e) => {
    e.preventDefault();

    const chat = {
      sender: user.user_id,
      receiver: Number(receiverId),
      chat: senderMessage,
    };

    axiosClient
      .post('/messages', chat)
      .then((resp) => {
        setSenderMessage('');
        fetchMessage(message_id);
        setPath(receiverId);
      })
      .catch((e) => {
        setErrors(e.response.data.errors);
      });
  };

  return (
    <Form onSubmit={(e) => handleSend(message_id, e)}>
      <Form.Group className='mb-3'>
        <Form.Control
          as='textarea'
          rows={3}
          placeholder='Send a message'
          onChange={(e) => setSenderMessage(e.target.value)}
          value={senderMessage}
          isInvalid={!!errors}
        />
        <Form.Control.Feedback type='invalid'>
          {errors && errors.chat && errors.chat.length > 0 && errors.chat[0]}
        </Form.Control.Feedback>
      </Form.Group>
      <button>Send</button>
    </Form>
  );
};

export const MessageSeller = () => {
  const {
    userMessages,
    messageSeller,
    messageSellersExample,
    setUserMessages,
    setSenderMessage,
    fetchMessage,
    path,
  } = useMessageContext();
  const { user } = useAuthContext();
  const { message_id } = useParams();

  // useEffect(() => {
  //   fetchMessage(message_id);
  // }, [path]);

  return (
    <div>
      <h2>Messages</h2>
      {userMessages.map((message, index) =>
        message ? (
          <div key={index}>
            <p>
              {message.sender.user_id === user.user_id
                ? 'You'
                : message.receiver.user_id === user.user_id
                ? message.sender.first_name
                : message.receiver.first_name}
              : {message.chat}
            </p>
          </div>
        ) : (
          ''
        )
      )}
      <MessageForm />
    </div>
  );
};
