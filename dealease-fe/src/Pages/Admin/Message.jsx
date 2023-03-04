import useMessageContext from '../../Hooks/Context/MessageContext';
import useAuthContext from '../../Hooks/Context/AuthContext';

const MessageForm = () => {
  const { senderMessage, handleSender, setSenderMessage } = useMessageContext();

  return (
    <form onSubmit={handleSender}>
      <textarea
        type='text'
        placeholder='you'
        name='francis'
        value={senderMessage}
        onChange={(e) => setSenderMessage(e.target.value)}
      />

      <button>Send</button>
    </form>
  );
};

export const MessageAdmin = () => {
  const { user } = useAuthContext();
  const {
    userMessages,
    messageSeller,
    inboxes,
    messageSellersExample,
    clikedUser,
  } = useMessageContext();

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
      {userMessages.map((message) =>
        message ? (
          <div key={message.message_id}>
            {message.sender.user_id === user.user_id ? (
              <p>You: {message.chat}</p>
            ) : (
              <p>Him{message.chat}</p>
            )}
          </div>
        ) : (
          ''
        )
      )}
      <MessageForm />
    </div>
  );
};
