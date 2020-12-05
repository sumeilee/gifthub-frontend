import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { withCookies } from "react-cookie";
import jwt from "jsonwebtoken";

import ConversationList from "../mailbox/ConversationList";
import ChatScreen from "../mailbox/ChatScreen";
import ItemPreview from "../mailbox/ItemPreview";

import api from "../../services/api";

import MailboxContext from "../../contexts/MailboxContext";
import SocketContext from "../../contexts/SocketContext";

const Mailbox = (props) => {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [me, setMe] = useState(null);
  let [counter, setCounter] = useState(0);
  const { currentSocket } = useContext(SocketContext);

  const messageRerender = async (message) => {
    if (currentSocket && currentConversation) {
      if (me) {
        const response = await api.getConversationsByUser(me.id);
        const conversations = response.data.conversations;

        if (conversations.length > 0) {
          const messageConversation = conversations.filter(
            (convo) => convo._id === message.conversation
          )[0];

          if (
            messageConversation &&
            currentConversation._id !== message.conversation
          ) {
            setCurrentConversation(messageConversation);
            setConversations(conversations);
          } else {
            setCounter(++counter);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (currentSocket) {
      currentSocket.on("message", (message) => {
        console.log(message.message);
        messageRerender(message);
      });
    }
  }, [currentSocket, currentConversation]); // eslint-disable-line react-hooks/exhaustive-deps

  const getConversations = async () => {
    try {
      if (me) {
        const response = await api.getConversationsByUser(me.id);
        const conversations = response.data.conversations;

        setConversations(conversations);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = props.cookies.get("token");
    const decode = jwt.decode(token);

    if (!decode) {
      props.history.push("/login");
      return;
    }

    setMe(decode);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getConversations();
  }, [me, counter]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(
    () => {
      async function getCurrentConversation() {
        if (conversations.length > 0) {
          if (!currentConversation) {
            setCurrentConversation(conversations[0]);
          }
        }
      }
      getCurrentConversation();
    },
    [conversations] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <>
      {conversations.length > 0 ? (
        <MailboxContext.Provider
          value={{
            currentConversation,
            setCurrentConversation,
            getConversations,
            me,
            setMe,
            counter,
          }}
        >
          <div className="h-full flex overflow-auto items-start divide-x divide-gray-200 divide-solid p-6">
            <div className="h-full w-3/12 overflow-auto">
              <ConversationList conversations={conversations} />
            </div>
            <div className="h-full flex w-5/12 px-4 py-3 overflow-auto">
              <ChatScreen />
            </div>
            <div className="flex flex-col h-full w-4/12 py-3 overflow-auto">
              <div className="px-6">
                <ItemPreview />
              </div>
            </div>
          </div>
        </MailboxContext.Provider>
      ) : (
        <div className="h-full w-full flex items-start justify-center py-8 px-4">
          <h1 className="text-2xl text-gray-800 font-semibold">
            Mailbox is empty
          </h1>
        </div>
      )}
    </>
  );
};

export default withCookies(withRouter(Mailbox));
