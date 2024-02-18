import { getAllHabbits } from "../shared/data-access/habbits.js";
import { getSubscription } from "../push-notification/subscribe.js";

export async function synchronize() {
  await syncHabbits();
  await syncPushSubscription();
}

async function syncHabbits() {
  const habbits = await getAllHabbits();

  await fetch("/api/habbits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(habbits),
  });
}

async function syncPushSubscription() {
  const subscription = getSubscription();

  await fetch("/api/push-subscriptions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
}

// register periodic sync's
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.ready.then((sw) => {
    sw.periodicSync.register("sync-with-be", {
      minInterval: 60 * 60 * 1000,
    });
  });
}

export function registerBackgroundSync() {
  navigator.serviceWorker.ready.then((sw) => {
    sw.sync.register("sync-with-be");
  });
}
