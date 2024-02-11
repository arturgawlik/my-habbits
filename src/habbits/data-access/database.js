export const database = (function () {
  let db = null;

  function openDatabase() {
    return new Promise((resolve, reject) => {
      const openRequest = indexedDB.open("habbits", 1);

      openRequest.onupgradeneeded = function () {
        const db = openRequest.result;
        const habbitsObjStore = db.createObjectStore("habbits", {
          keyPath: "id",
        });

        // load test data
        for (let i = 1; i <= 100; i++) {
          habbitsObjStore.add(generateHabbitWithRandomName(i));
        }
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

  function generateHabbitWithRandomName(id) {
    const names = [
      "Drink water",
      "Walk",
      "Read",
      "Sleep",
      "Code",
      "Eat",
      "Meditate",
      "Exercise",
      "Write",
      "Study",
    ];
    const descriptions = [
      "Drink 2 liters of water",
      "Walk 10 km",
      "Read 100 pages",
      "Sleep 8 hours",
      "Code for 2 hours",
      "Eat 3 meals",
      "Meditate for 10 minutes",
      "Exercise for 1 hour",
      "Write 500 words",
      "Study for 4 hours",
    ];
    const name = names[Math.floor(Math.random() * names.length)];
    const description =
      descriptions[Math.floor(Math.random() * descriptions.length)];
    return {
      id,
      name,
      description,
      cron: "0 0 12 * * *",
    };
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
