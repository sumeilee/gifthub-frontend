import React from "react";

const MailboxContext = React.createContext({
  currentConversation: null,
  setCurrentConversation: () => {},
});

export default MailboxContext;
