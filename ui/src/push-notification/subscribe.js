const VAPID_PUBLIC_KEY =
  "BF8TKuUNRgq-fBuGADi2fZANpeRD5BFRsLAvznbuI5roFHEdNDbfZ33czpL03Uw1VcmJgF4qppQwTBR2i113TgM";

let subscription;

(async function () {
  let permissionState;
  if ("serviceWorker" in navigator) {
    const sw = await navigator.serviceWorker.ready;
    permissionState = await sw.pushManager.permissionState({
      userVisibleOnly: true,
      applicationServerKey: VAPID_PUBLIC_KEY,
    });
  } else {
    permissionState = Notification.permission;
  }

  if (permissionState === "denied") {
    console.error("Permission for notifications was denied");
    return;
  } else if (permissionState === "granted") {
    if ("serviceWorker" in navigator) {
      const sw = await navigator.serviceWorker.ready;
      subscription = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: VAPID_PUBLIC_KEY,
      });
    } else {
      subscription = self.registration.pushManager.getSubscription();
    }
    return;
  } else {
    subscription = sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: VAPID_PUBLIC_KEY,
    });
  }
})();

export function getSubscription() {
  return subscription;
}
