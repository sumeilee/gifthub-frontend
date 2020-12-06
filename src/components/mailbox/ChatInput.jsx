import React, { useContext, useEffect } from "react";
import { withCookies } from "react-cookie";

import api from "../../services/api";

import MailboxContext from "../../contexts/MailboxContext";

const ChatInput = (props) => {
  const { currentConversation, getConversations, me } = useContext(
    MailboxContext
  );

  const other = currentConversation
    ? currentConversation.users.filter((user) => user._id !== me.id)[0]
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = e.target.chatBox.value;
    const attachments = "";
    const author = me.id;
    const recipient = other._id;

    if (message) {
      const response = await api.createMessage(
        author,
        recipient,
        message,
        attachments,
        currentConversation
      );

      if (response.status === 201) {
        e.target.chatBox.value = "";

        // get message populated with author name
        const id = response.data.message._id;
        const responseMsg = await api.getMessage(id);

        props.addMessage(responseMsg.data.message);
        getConversations();
      }
    }
  };

  useEffect(() => {
    api.setAuthHeaderToken(props.cookies.get("token"));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <form className="w-full flex items-center" onSubmit={handleSubmit}>
      <input
        className="w-full border border-gray-300 rounded-xl outline-none py-2 px-3"
        type="text"
        id="chatBox"
      />
      <button type="submit" className="text-gray-500 outline-none">
        <svg
          className="fill-current w-8 h-8 ml-4 cursor-pointer"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
};

export default withCookies(ChatInput);
