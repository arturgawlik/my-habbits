import { getAllHabbits } from "./habbits.js";
import webpush from "web-push";
import keys from "./keys.json" with { type: "json" };

webpush.setVapidDetails(
  "mailto:hoofedcomic666@gmail.com",
  keys.publicKey,
  keys.privateKey
);

export function startDispatchingPushNotifications() {``
  setInterval(() => {
    dispatchNotifications();
  }, 10_000);
}

function dispatchNotifications() {
  const allHabbits = getAllHabbits();
  for (const [userId, habbits] of Object.entries(allHabbits)) {
    for (const habbit of habbits) {
      for (const notyficationTime of habbit.notificationTimes) {
        const now = new Date();
        const notificationDate = new Date(notyficationTime);
        if (
          now.getHours() === notificationDate.getHours() &&
          now.getMinutes() === notificationDate.getMinutes()
        ) {
          dispatchNotification(userId, habbit);
        }
      }
    }
  }
}

function dispatchNotification(userId, habbit) {
  const subscription = getSubscrition(userId);
  if (!subscription) {
    throw new Error(`Subscription not found for user ${userId}`);
  }

  webpush.sendNotification(subscription, habbit.name);
}
