const root = document.querySelector("#root");

function scrollMobile(isRight) {
  console.log(root);
  if (isRight) {
    root.scrollTo({
      left: root.scrollLeftMax,
      top: 0,
      behavior: "smooth",
    });
  } else {
    root.scrollTo({
      left: 0,
      top: 0,
      behavior: "smooth",
    });
  }
}

// Default to the page
scrollMobile(true);

function onCarousellScrolled(carousellNode, headerNode) {
  const progress = Math.floor(headerNode.scrollLeft / headerNode.clientWidth);
  if (progress != carousellNode.dataset.progress) {
    const container = carousellNode.querySelector(".carousell_items");
    container.querySelector(".selected")?.classList.remove("selected");
    container.children[progress].classList.add("selected");
  }
  carousellNode.dataset.progress = progress;
}

document.querySelectorAll(".carousell").forEach((node) => {
  onCarousellScrolled(node, node.querySelector("header"));
});

function carousellScrollToItem(carousellNode, offset) {
  const page = Number(carousellNode.dataset.progress) + offset;
  if (page < 0) {
    return;
  }

  const container = carousellNode.querySelector(".carousell_items");
  if (page >= container.children.length) {
    return;
  }

  const header = carousellNode.querySelector("header");
  header.scrollTo({
    top: 0,
    left: header.clientWidth * page,
    behavior: "smooth",
  });
  carousellNode.dataset.progress = page;
  container.querySelector(".selected")?.classList.remove("selected");
  container.children[page].classList.add("selected");
}
