import React, { useContext, useEffect, useState } from "react";

import MailboxContext from "../../contexts/MailboxContext";

import api from "../../services/api";

const ConversationItem = ({ conversation, onClick }) => {
  const { currentConversation, me } = useContext(MailboxContext);
  const [itemTitle, setItemTitle] = useState("");

  const currentYear = new Date().getFullYear();

  const other = conversation
    ? conversation.users.filter((user) => user._id !== me.id)[0]
    : null;

  useEffect(() => {
    return;
  }, [currentConversation]);

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
      className={`w-full py-3 pl-3 pr-6 cursor-pointer ${
        currentConversation && currentConversation._id === conversation._id
          ? "bg-gray-100"
          : ""
      }`}
    >
      <h4 className="text-gray-600 text-xs">
        {other ? `${other.first_name} ${other.last_name}` : ""}
      </h4>
      <h3 className="font-semibold text-gray-800 truncate">{itemTitle}</h3>

      {conversation.lastMessage ? (
        <>
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-4/5">
              <p className="font-light truncate mr-2 mt-1">
                {conversation.lastMessage.author
                  ? conversation.lastMessage.author === me.id
                    ? `${conversation.lastMessage.author.first_name}`
                    : "You"
                  : ""}
                : {conversation.lastMessage.message}
              </p>
            </div>
            <div className="text-xs text-gray-500">
              {displayDate(conversation.lastMessage.updatedAt)}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

/* <h4 className="font-semibold text-gray-600 text-xs">
            {conversation.lastMessage.author
              ? `${conversation.lastMessage.author.first_name} ${conversation.lastMessage.author.last_name}`
              : ""}
          </h4> */
// {new Date(props.updatedAt).toLocaleString("en-GB", {
//   day: "numeric",
//   month: "short",
//   year: "numeric",
// })}

export default ConversationItem;
