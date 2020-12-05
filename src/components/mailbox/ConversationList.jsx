import React, { useContext, useEffect } from "react";
import ConversationItem from "./ConversationItem";

import MailboxContext from "../../contexts/MailboxContext";

const ConversationList = (props) => {
  const { setCurrentConversation, counter } = useContext(MailboxContext);

  useEffect(() => {
    // console.log("conversation list rerendering");
    return;
  }, [counter]);

  const handleClick = async (conversation) => {
    setCurrentConversation(conversation);
  };

  return (
    <div className="h-full flex flex-col items-start divide-y divide-gray-200 divide-solid">
      {props.conversations.map((conversation) => {
        return (
          <ConversationItem
            onClick={handleClick}
            key={conversation._id}
            conversation={conversation}
          />
        );
      })}
    </div>
  );
};

export default ConversationList;
