export const database = (function () {
  let db = null;

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const openRequest = indexedDB.open("habbits", 1);

      openRequest.onupgradeneeded = function () {
        const db = openRequest.result;
        const habbitsObjStore = db.createObjectStore("habbits", {
          autoIncrement: true,
        });

        // load test data
        habbitsObjStore.add({
          name: "Drink water",
          description: "Drink 2 liters of water",
          cron: "0 0 12 * * *",
        });
        habbitsObjStore.add({
          name: "Walk",
          description: "Walk 10 km",
          cron: "0 0 6 * * *",
        });
        habbitsObjStore.add({
          name: "Read",
          description: "Read 100 pages",
          cron: "0 0 20 * * *",
        });
        habbitsObjStore.add({
          name: "Sleep",
          description: "Sleep 8 hours",
          cron: "0 0 22 * * *",
        });
        habbitsObjStore.add({
          name: "Sleep 2",
          description: "Sleep 8 hours",
          cron: "0 0 22 * * *",
        });
        habbitsObjStore.add({
          name: "Sleep 3",
          description: "Sleep 8 hours",
          cron: "0 0 22 * * *",
        });
        habbitsObjStore.add({
          name: "Sleep 4",
          description: "Sleep 8 hours",
          cron: "0 0 22 * * *",
        });
      };

      openRequest.onsuccess = function (event) {
        const db = event.target.result;
        db.onerror = genericErrorHandler;
        resolve(db);
      };

      openRequest.onerror = function () {
        reject(openRequest.error);
      };
    });
  }

  function genericErrorHandler(error) {
    console.error(error);
  }

  return {
    /**
     * @returns {Promise<IDBDatabase>}
     */
    async get() {
      if (db) {
        return db;
      }

      db = await openDatabase();
      return db;
    },
  };
})();
