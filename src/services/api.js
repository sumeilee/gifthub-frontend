import axios from "axios";

const baseURL = "http://localhost:5000/api/v1";

const ax = axios.create({
  baseURL,
  timeout: 5000,
});

const api = {
  getMessage: (id) => {
    return ax({
      method: "GET",
      url: `${baseURL}/messages/${id}`,
    });
  },

  getMessages: (conversationId) => {
    return ax({
      method: "GET",
      url: `${baseURL}/messages?conversation=${conversationId}&asc=1`,
    });
  },
  createMessage: (author, message, attachments, conversation) => {
    const data = {
      author,
      message,
      attachments,
      conversation,
    };

    return ax({
      method: "POST",
      url: `${baseURL}/messages`,
      data,
    });
  },
  getConversationsByUser: (userId) => {
    return ax({
      method: "GET",
      url: `${baseURL}/conversations?user=${userId}`,
    });
  },
  getConversationsByUsersAndItem: (usersArr, item) => {
    const users = usersArr.join(",");
    // console.log(users);
    return ax({
      method: "GET",
      url: `${baseURL}/conversations?users=${users}&item=${item}`,
    });
  },
  createConversation: (users, item) => {
    const data = {
      users,
      item,
    };
    // console.log(data);
    return ax({
      method: "POST",
      url: `${baseURL}/conversations`,
      data,
    });
  },
  async getOrCreateConversation(users, item) {
    const response = await this.getConversationsByUsersAndItem(users, item);
    const conversations = response.data.conversations;
    let conversation;

    if (conversations.length === 0) {
      conversation = await api.createConversation(users, item);
    } else {
      conversation = conversations[0];
    }

    return conversation;
  },
  getItem: (id) => {
    return ax({
      method: "GET",
      url: `${baseURL}/items/${id}`,
    });
  },
  updateItem: (id, data) => {
    return ax({
      method: "PATCH",
      url: `${baseURL}/items/${id}`,
      data,
    });
  },
  createTransaction: (donorID, requestorID, item) => {
    const data = {
      donorID,
      requestorID,
      item,
    };
    // console.log(data);
    return ax({
      method: "POST",
      url: `${baseURL}/transactions`,
      data,
    });
  },
};

export default api;
