let pageTitle = document.querySelector("#page-title");
let pageContent = document.querySelector("#page-content");

function setTab(element) {
  document.querySelectorAll(".tab-section").forEach((node) => {
    if (node.id == element.dataset.target) {
      node.classList.remove("is-hidden");
    } else {
      node.classList.add("is-hidden");
    }
  });

  document.querySelectorAll(".widget-tab").forEach((node) => {
    if (node == element) {
      node.classList.add("is-selected");
    } else {
      node.classList.remove("is-selected");
    }
  });
}

function setPage(element) {
  window.location.hash = element.dataset.name;
  updatePage();
}

// No page has been selected
if (window.location.hash === "") {
  window.location.hash = document.querySelector("#pages").children[0].dataset.name;
}

function updatePage() {
  let page = window.location.hash.replace("#", "");
  document.querySelectorAll(".widget-item").forEach(node => {
    node.classList.remove("is-selected");
  });
  let node = document.querySelector(`[data-name="${page}"]`);

  node?.classList.add("is-selected");
  pageContent.innerHTML = node?.querySelector(".widget-content").innerHTML;
  pageTitle.innerHTML = node?.querySelector("span").innerHTML;
}
updatePage();
