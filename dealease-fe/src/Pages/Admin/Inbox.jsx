export const InboxAdmin = () => {
  return (
    <>
      <h2>Inbox</h2>
      {inboxes.map((inbox) => (
        <div
          key={inbox.inbox_id}
          onClick={() => clikedUser(inbox.recipient_id)}
        >
          <h5> {inbox.recipient.first_name}</h5>
          <p> {inbox.last_message.chat}</p>
        </div>
      ))}
    </>
  );
};
