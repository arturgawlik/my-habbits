const vapidPublicKey =
  "BF8TKuUNRgq-fBuGADi2fZANpeRD5BFRsLAvznbuI5roFHEdNDbfZ33czpL03Uw1VcmJgF4qppQwTBR2i113TgM";

const sw = await navigator.serviceWorker.ready;
const subscription = await sw.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: vapidPublicKey,
});

fetch("/api/push-subscriptions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(subscription),
});
