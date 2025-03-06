const root = document.querySelector("#root");

function scrollMobile(isRight) {
  console.log(root);
  if (isRight) {
    root.scrollTo(root.scrollLeftMax, 0);
  } else {
    root.scrollTo(0, 0);
  }
}

// Default to the page
scrollMobile(true);
