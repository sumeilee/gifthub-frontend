import React, { useContext } from "react";
import ConversationItem from "./ConversationItem";

import MailboxContext from "../../contexts/MailboxContext";

const ConversationList = (props) => {
  const { setCurrentConversation } = useContext(MailboxContext);

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

// class ConversationList extends React.Component {
//   handleClick = async (conversationId) => {
//     const response = await api.getMessages(conversationId);
//     const messages = response.data.messages;
//     this.props.setMessages(messages);
//   };

//   render() {
//     return (
//       <div className="h-full flex flex-col items-start">
//         {this.props.conversations.map((conversation) => {
//           const { lastMessage } = conversation;
//           return (
//             <ConversationItem
//               onClick={this.handleClick}
//               key={conversation._id}
//               {...lastMessage}
//             />
//           );
//         })}
//       </div>
//     );
//   }
// }

export default ConversationList;
