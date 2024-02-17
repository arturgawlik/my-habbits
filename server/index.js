import { startServer } from "./src/server.js";
import { startDispatchingPushNotifications } from "./src/push-notifications.js";

startServer(3000);
startDispatchingPushNotifications();
