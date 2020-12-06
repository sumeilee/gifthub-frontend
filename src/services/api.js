import axios from "axios";
// import qs from "qs";

export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://gifthubsg-backend.herokuapp.com/api/v1"
    : "http://localhost:5000/api/v1";

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
  createMessage: (author, recipient, message, attachments, conversation) => {
    const data = {
      author,
      recipient,
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
      const response = await api.createConversation(users, item);
      conversation = response.data.conversation;
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
  createItem: (data) => {
    return ax({
      method: "POST",
      url: `${baseURL}/items/`,
      data,
    });
  },
  listOffers: () => {
    return ax({
      method: "GET",
      url: `${baseURL}/offers`,
    });
  },
  listRequests: () => {
    return ax({
      method: "GET",
      url: `${baseURL}/requests`,
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
