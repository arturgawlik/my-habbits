const subscriptions = {};

/**
 * @param {string} userId
 * @returns {string | undefined}
 */
export async function getSubscrition(userId) {
  if (!userId) {
    throw new Error("userId is required");
  }
  return subscriptions[userId];
}

/**
 * @param {string} userId
 * @param {string[]} habbits
 */
export async function postSubscrition(userId, subscription) {
  if (!userId) {
    throw new Error("userId is required");
  }
  if (!subscription) {
    throw new Error("subscription is required");
  }
  subscriptions[userId] = subscription;
}

/**
 * @returns {object}
 */
export function getAllSubscritions() {
  return subscriptions;
}
