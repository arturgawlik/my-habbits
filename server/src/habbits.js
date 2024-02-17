const habbits = {};

/**
 * @param {string} userId
 * @returns {Promise<string[]>}
 */
export async function getHabbits(userId) {
  if (!userId) {
    throw new Error("userId is required");
  }
  return habbits[userId] ?? [];
}

/**
 * @param {string} userId
 * @param {string[]} habbits
 */
export async function postHabbits(userId, habbits) {
  if (!userId) {
    throw new Error("userId is required");
  }
  if (Array.isArray(habbits)) {
    throw new Error("habbits array is required");
  }
  habbits[userId] = habbits;
}

/**
 * @returns {string[]}
 */
export function getAllHabbits() {
  return habbits;
}
