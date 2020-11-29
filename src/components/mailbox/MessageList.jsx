import React, { useEffect } from "react";

import MessageItem from "./MessageItem";

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
  const msgRef = React.createRef();

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
      {messages
        ? messages.map((message, idx) => {
            if (!currentDate) {
              currentDate = new Date(message.postedAt);
              return <DateLabel key={idx} dateObj={currentDate} />;
            } else {
              const postedDate = new Date(message.postedAt);
              if (getDateString(postedDate) === getDateString(currentDate)) {
                return <MessageItem key={message._id} message={message} />;
              } else {
                currentDate = postedDate;
                return (
                  <React.Fragment key={idx}>
                    <DateLabel key={idx} dateObj={currentDate} />
                    <MessageItem key={message._id} message={message} />
                  </React.Fragment>
                );
              }
            }
          })
        : ""}
    </div>
  );
};

export default MessageList;
