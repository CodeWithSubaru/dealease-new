import useMessageContext from '../../Hooks/Context/MessageContext';
import useAuthContext from '../../Hooks/Context/AuthContext';

export const InboxBuyer = () => {
  const { user } = useAuthContext();
  const { inboxes, clickedUser } = useMessageContext();

  return (
    <>
      <h2>Inbox</h2>
      {inboxes.map((inbox) =>
        inbox.user_id === user.user_id ? (
          <div
            key={inbox.inbox_id}
            onClick={() => clickedUser(inbox.recipient_id)}
          >
            <h5>
              {inbox.user_id === user.user_id
                ? inbox.recipient.first_name
                : inbox.sender.first_name}
            </h5>
            <p> {inbox.last_message.chat}</p>
          </div>
        ) : (
          ''
        )
      )}
    </>
  );
};
