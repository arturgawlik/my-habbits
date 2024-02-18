import { getAllHabbits } from "./habbits.js";
import webpush from "web-push";
import keys from "./keys.json" with { type: "json" };
import { getSubscrition } from "./subscribtions.js";

webpush.setVapidDetails(
  "mailto:hoofedcomic666@gmail.com",
  keys.publicKey,
  keys.privateKey
);

export function startDispatchingPushNotifications() {``
  setInterval(() => {
    dispatchNotifications();
  }, 60_000);
}

async function dispatchNotifications() {
  const allHabbits = getAllHabbits();
  for (const [userId, habbits] of Object.entries(allHabbits)) {
    for (const habbit of habbits) {
      for (const notyficationTime of habbit.notificationTimes) {
        const now = new Date();
        if (
          now.getHours() === Number(notyficationTime.split(':')[0]) &&
          now.getMinutes() === Number(notyficationTime.split(':')[1])
        ) {
          await dispatchNotification(userId, habbit);
        }
      }
    }
  }
}

async function dispatchNotification(userId, habbit) {
  const subscription = await getSubscrition(userId);
  if (!subscription) {
    throw new Error(`Subscription not found for user ${userId}`);
  }

  webpush.sendNotification(subscription, habbit.name);
}
