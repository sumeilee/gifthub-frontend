import React from "react";

const MessageItem = ({ message }) => {
  return (
    <div className="w-full my-2">
      <div className="flex items-baseline">
        <h3 className="font-semibold text-gray-800 mr-2">
          {`${message.author.first_name} ${message.author.last_name}`}
        </h3>

        <div className="text-xs text-gray-500">
          {new Date(message.updatedAt).toLocaleTimeString("en-US", {
            timeStyle: "short",
          })}
        </div>
      </div>
      <p className="font-light whitespace-pre-line">{message.message}</p>
    </div>
  );
};

export default MessageItem;
