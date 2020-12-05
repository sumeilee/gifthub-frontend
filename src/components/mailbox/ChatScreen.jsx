import React, { useState, useContext, useEffect } from "react";

import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

import MailboxContext from "../../contexts/MailboxContext";
import api from "../../services/api";

const ChatScreen = () => {
  const { currentConversation, counter } = useContext(MailboxContext);
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  useEffect(() => {
    async function getMessages() {
      if (currentConversation) {
        const response = await api.getMessages(currentConversation._id);
        const messages = response.data.messages;
        setMessages(messages);
      }
    }
    getMessages();
  }, [currentConversation, counter]);

  return (
    <div className="flex flex-col h-full w-full overflow-auto justify-between px-4">
      <MessageList messages={messages} />
      <ChatInput addMessage={addMessage} />
    </div>
  );
};

export default ChatScreen;
