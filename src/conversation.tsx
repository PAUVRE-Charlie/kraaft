import { useMemo } from 'react';
import { Message, User } from './assets/types';
import MessageItem from './messageItem';

interface Props {
  className: string;
  currentUserId: string;
  messages: Message[];
  users: User[];
}

const Conversation = (props: Props) => {
  const { className, currentUserId, messages, users } = props;

  const sortedMessages = useMemo(
    () => messages.sort((a, b) => a.createdAt - b.createdAt),
    [messages],
  );

  const sortedUsernames = useMemo(
    () => users.map((u) => u.username).sort((a, b) => b.length - a.length),
    [users],
  );

  return (
    <div className={className}>
      {sortedMessages.map((message) => (
        <MessageItem
          message={message}
          isCurrentUser={currentUserId === message.senderId}
          sender={users.find((u) => u.id === message.senderId)}
          sortedUsernames={sortedUsernames}
        />
      ))}
    </div>
  );
};

export default Conversation;
