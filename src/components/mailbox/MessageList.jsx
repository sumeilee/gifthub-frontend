import React, { useEffect, useContext } from "react";
import MessageItem from "./MessageItem";

import MailboxContext from "../../contexts/MailboxContext";

const DateLabel = ({ dateObj }) => (
  <div className="text-center text-xs text-gray-400 font-semibold mt-4 mb-2">
    {dateObj.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}
  </div>
);

const MessageList = ({ messages }) => {
  const { currentConversation, me } = useContext(MailboxContext);
  const msgRef = React.createRef();

  const other = currentConversation
    ? currentConversation.users.filter((user) => user._id !== me.id)[0]
    : null;

  let currentDate;

  const getDateString = (dateObj) => {
    return dateObj.toLocaleDateString("en-US");
  };

  useEffect(() => {
    msgRef.current.scrollTop = msgRef.current.scrollHeight;
  });

  return (
    <div
      className="w-full mb-4 px-2 overflow-auto overscroll-contain"
      ref={msgRef}
    >
      {currentConversation ? (
        <div className="text-center text-xs text-gray-400 font-semibold mb-2">
          Start of conversation between You and {other.first_name}{" "}
          {other.last_name}
        </div>
      ) : (
        ""
      )}

      {messages
        ? messages.map((message, idx) => {
            const postedDate = new Date(message.postedAt);

            if (
              !currentDate ||
              getDateString(postedDate) !== getDateString(currentDate)
            ) {
              currentDate = postedDate;
              return (
                <React.Fragment key={idx}>
                  <DateLabel key={idx} dateObj={currentDate} />
                  <MessageItem key={message._id} message={message} />
                </React.Fragment>
              );
            } else {
              return <MessageItem key={message._id} message={message} />;
            }
          })
        : ""}
    </div>
  );
};

export default MessageList;
