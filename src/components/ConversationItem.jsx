import React, { useContext, useEffect, useState } from "react";

import MailboxContext from "../contexts/MailboxContext";

import api from "../services/api";

const ConversationItem = ({ conversation, onClick }) => {
  const { currentConversation } = useContext(MailboxContext);
  const [itemTitle, setItemTitle] = useState("");

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    async function getItem() {
      const response = await api.getItem(conversation.item);
      setItemTitle(response.data.title);
    }
    getItem();
  }, [conversation]);

  const displayDate = (dateStr) => {
    const postDate = new Date(dateStr);

    if (postDate.getFullYear() === currentYear) {
      return postDate.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
      });
    } else {
      return postDate.toLocaleDateString("en-GB");
    }
  };

  return (
    <div
      onClick={() => onClick(conversation)}
      className={`w-full py-2 pl-3 pr-6 mb-2 cursor-pointer ${
        currentConversation && currentConversation._id === conversation._id
          ? "bg-gray-100"
          : ""
      }`}
    >
      <h3 className="font-semibold text-gray-800 mb-1">{itemTitle}</h3>
      <h4 className="font-semibold text-gray-600 text-xs">
        {conversation.lastMessage.author
          ? `${conversation.lastMessage.author.first_name} ${conversation.lastMessage.author.last_name}`
          : ""}
      </h4>
      <div className="flex flex-wrap items-center justify-between">
        <div className="w-4/5">
          <p className="font-light truncate mr-2">
            {conversation.lastMessage.message}
          </p>
        </div>
        <div className="text-xs text-gray-500">
          {displayDate(conversation.lastMessage.updatedAt)}
        </div>
      </div>
    </div>
  );
};

// {new Date(props.updatedAt).toLocaleString("en-GB", {
//   day: "numeric",
//   month: "short",
//   year: "numeric",
// })}

export default ConversationItem;
