import { Message, User } from './assets/types';

interface Props {
  message: Message;
  isCurrentUser: boolean;
  sender?: User;
  sortedUsernames: string[];
}

const insertTags = (text: string, usernames: string[]) =>
  text.replace(
    new RegExp(usernames.map((u) => `@${u}`).join('|')),
    (match) => `<em>${match}</em>`,
  );

const MessageItem = (props: Props) => {
  const { message, isCurrentUser, sender, sortedUsernames } = props;

  if (!sender) return null;

  const date = new Date(message.createdAt);

  const alignment = isCurrentUser ? 'flex-end' : 'flex-start';

  let messageContent = '';
  let messageCaption = '';

  if (message.type === 'text') {
    messageContent = insertTags(message.content, sortedUsernames);
  } else {
    messageCaption = insertTags(message.caption, sortedUsernames);
  }

  return (
    <div
      className="message"
      style={{ alignSelf: alignment, alignItems: alignment }}>
      <p>{sender.username}</p>
      {message.type === 'text' ? (
        <div
          className={`content ${isCurrentUser ? 'self' : 'reply'}`}
          dangerouslySetInnerHTML={{ __html: messageContent }}></div>
      ) : (
        <div className="image" style={{ alignItems: alignment }}>
          <img src={message.url} />
          <div
            className={`caption ${isCurrentUser ? 'self' : 'reply'}`}
            dangerouslySetInnerHTML={{ __html: messageCaption }}></div>
        </div>
      )}
      <div className="date">
        <div>{date.toLocaleDateString()}</div>
        <div className="separator">-</div>
        <div>{date.toLocaleTimeString()}</div>
      </div>
    </div>
  );
};

export default MessageItem;
