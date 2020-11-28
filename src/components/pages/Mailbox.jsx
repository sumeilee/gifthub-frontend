import React, { useEffect, useState } from "react";

import ConversationList from "../ConversationList";
import ChatScreen from "../ChatScreen";
import api from "../../services/api";

import MailboxContext from "../../contexts/MailboxContext";

const Mailbox = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);

  const getConversations = async () => {
    const response = await api.getConversationsByUser(
      "5fb8b003e1e86a126a37520d"
    );
    const conversations = response.data.conversations;
    setConversations(conversations);
  };

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(
    () => {
      async function getCurrentConversation() {
        if (conversations.length > 0) {
          if (!currentConversation) {
            setCurrentConversation(conversations[0]._id);
          }
        }
      }
      getCurrentConversation();
    },
    [conversations] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <MailboxContext.Provider
      value={{ currentConversation, setCurrentConversation, getConversations }}
    >
      <div className="h-full flex overflow-auto items-start divide-x divide-gray-200 divide-solid p-6">
        <div className="h-full w-1/4 pr-4 overflow-auto">
          <ConversationList conversations={conversations} />
        </div>
        <div className="h-full flex w-1/2 px-4 overflow-auto">
          <ChatScreen />
        </div>
        <div className="h-full w-1/4 overflow-auto"></div>
      </div>
    </MailboxContext.Provider>
  );
};

export default Mailbox;
