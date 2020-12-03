import { useState, useEffect, useContext } from "react";
import MailboxContext from "../../contexts/MailboxContext";

import api from "../../services/api";

const ItemPreview = () => {
  const { currentConversation, me } = useContext(MailboxContext);
  const [currentItem, setCurrentItem] = useState(null);

  const other = currentConversation
    ? currentConversation.users.filter((user) => user._id !== me.id)[0]
    : null;

  useEffect(() => {
    async function getItem() {
      if (currentConversation) {
        try {
          const response = await api.getItem(currentConversation.item);
          const item = response.data;

          setCurrentItem(item);
        } catch (err) {
          console.log(err);
        }
      }
    }
    getItem();
  }, [currentConversation]);

  const handleAcceptClick = async () => {
    let requestorId;
    let donorId;

    const itemOwnerId = currentItem.postedBy._id;

    if (
      (currentItem.postType === "Request" && itemOwnerId === me.id) ||
      (currentItem.postType === "Offer" && itemOwnerId === other._id)
    ) {
      requestorId = me.id;
      donorId = other._id;
    } else if (
      (currentItem.postType === "Request" && itemOwnerId === other._id) ||
      (currentItem.postType === "Offer" && itemOwnerId === me.id)
    ) {
      requestorId = other._id;
      donorId = me.id;
    }

    try {
      const response = await api.createTransaction(
        donorId,
        requestorId,
        currentItem._id
      );
      const { transaction } = response.data;

      const itemResponse = await api.updateItem(currentItem._id, {
        status: "Fulfilled",
        transaction: transaction._id,
        updatedAt: Date.now(),
      });

      const updatedItem = itemResponse.data.item;

      setCurrentItem(updatedItem);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      {currentItem ? (
        <div>
          <h2 className="text-lg text-gray-800 font-semibold leading-tight">
            {currentItem.title}
          </h2>
          <p className="text-sm text-gray-800 font-light mt-1">
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

          {currentItem.postedBy._id === me.id ? (
            currentItem.status === "Fulfilled" ? (
              currentItem.transaction &&
              (currentItem.transaction.donorID === other._id ||
                currentItem.transaction.requestorID === other._id) ? (
                <button
                  className="rounded-lg bg-gray-300 py-1 px-4 mt-6 focus:outline-none cursor-not-allowed"
                  disabled
                >
                  Accepted
                </button>
              ) : (
                ""
              )
            ) : (
              <button
                onClick={handleAcceptClick}
                className="rounded-lg bg-yellow-400 hover:bg-yellow-500 py-1 px-4 mt-6 focus:outline-none "
              >
                Accept
              </button>
            )
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ItemPreview;
