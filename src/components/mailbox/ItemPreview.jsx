import { useState, useEffect, useContext } from "react";
import MailboxContext from "../../contexts/MailboxContext";

import api from "../../services/api";

const ItemPreview = () => {
  const { currentConversation } = useContext(MailboxContext);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    async function getItem() {
      if (currentConversation) {
        try {
          const response = await api.getItem(currentConversation.item);
          const item = response.data;
          console.log(item);
          setCurrentItem(item);
        } catch (err) {
          console.log(err);
        }
      }
    }
    getItem();
  }, [currentConversation]);

  return (
    <div>
      {currentItem ? (
        <div className="px-6">
          <h2 className="text-lg text-gray-800 font-semibold">
            {currentItem.title}
          </h2>
          <p className="text-sm text-gray-800 font-light">
            Posted on{" "}
            {new Date(currentItem.createdAt).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            by {currentItem.postedBy.first_name}{" "}
            {currentItem.postedBy.last_name}
          </p>
          <p className="mt-6 font-light">{currentItem.description}</p>
          <p className="mt-6 font-light">Status: {currentItem.status}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ItemPreview;
