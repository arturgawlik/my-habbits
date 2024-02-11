navigation.addEventListner("navigate", function (event) {
  if (shouldNotIntercept(event)) {
    return;
  }
});

function shouldNotIntercept(event) {}

// navigation.addEventListener("navigate", (e) => {
//   e.intercept({
//     handler: () => new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve();
//       }, 3000);
//     }),
//   });
//   console.log(e);
// });
