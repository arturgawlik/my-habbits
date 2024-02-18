const VIEWS = {
  HABBITS: "habbits",
  HABBIT_ADD_EDIT: "habbit-add-edit",
};

function listenNavigationEvent() {
  navigation.addEventListener("navigate", (e) => {
    e.intercept({
      handler: performNavigationBasedOnUrl,
    });
  });
}

function performNavigationBasedOnUrl() {
  const url = new URL(window.location.href);
  if (url.pathname === "/habbits" || url.pathname === "/") {
    navigateToView(VIEWS.HABBITS);
  } else if (
    url.pathname.startsWith("/habbits/") ||
    url.pathname.startsWith("/add-new-habbit")
  ) {
    navigateToView(VIEWS.HABBIT_ADD_EDIT);
  } else {
    navigateToView(VIEWS.HABBITS, { performNavigation: true });
  }
}

function navigateToView(view, options) {
  switch (view) {
    case VIEWS.HABBITS:
      document.querySelector("#root").innerHTML =
        "<app-habbits-main></app-habbits-main>";
      break;
    case VIEWS.HABBIT_ADD_EDIT:
      document.querySelector("#root").innerHTML =
        "<app-add-edit-habbit></app-add-edit-habbit>";
      break;
    default:
      throw new Error("Unknown view");
  }
}

performNavigationBasedOnUrl();
listenNavigationEvent();
