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

  const handleSend = (receiverId) => {
    console.log(receiverId);
    const chat = {
      sender: user.user_id,
      receiver: Number(receiverId),
      chat: senderMessage,
    };
    console.log(chat);
    axiosClient
      .post('/admin/messages', chat)
      .then((resp) => {
        console.log(resp);
        setSenderMessage('');
      })
      .catch((e) => {
        setErrors(e.response.data.errors);
      });
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSend(message_id);
      }}
    >
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

export const MessageAdmin = () => {
  const {
    userMessages,
    messageSeller,
    messageSellersExample,
    setUserMessages,
    setSenderMessage,
  } = useMessageContext();
  const { user } = useAuthContext();
  const { message_id } = useParams();

  useEffect(() => {
    axiosClient.get('admin/messages/' + message_id).then((resp) => {
      setUserMessages(resp.data);
    });
  }, [userMessages.message_id]);

  return (
    <div>
      {/* Line 35 - 47 is used to message a user. Example post and make a deal */}
      <h1>Message Admin</h1>
      {messageSeller.map((seller) =>
        seller ? (
          <div className='card-style' key={seller.user_id}>
            Example Post
            <button onClick={() => messageSellersExample(seller.user_id)}>
              Message Seller
            </button>
          </div>
        ) : (
          ''
        )
      )}
      <h2>Messages</h2>
      {userMessages.map((message, index) =>
        message ? (
          <div key={index}>
            <p>
              {message.sender.user_id === user.user_id
                ? message.receiver.first_name
                : 'You'}
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
