import { models } from "mongoose";
import axios from "axios";

export const updateNotificationsSeenBy = async (viewedNotifications, token) => {
  viewedNotifications.forEach((notific) =>
    updateNotificationSeenBy(notific, token)
  );
};

export const updateNotificationSeenBy = async (notification, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // purposely not adding await as this operation can be done without waiting to complete
  axios.put(`/api/notification/update/${notification._id}`, {}, config);
};
