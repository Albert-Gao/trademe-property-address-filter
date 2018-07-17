// ==UserScript==
// @name     TradeMe Filter
// @version  1
// @grant    none
// @match https://www.trademe.co.nz/*
// ==/UserScript==

const BLACK_LIST = [
  "Clendon Park",
  "Franklin",
  "Gulf Harbour",
  "Mangere",
  "Manurewa",
  "Otahuhu",
  "Otara",
  "Randwick Park",
  "Warkworth",
  "Weymouth"
];

function isAddressInBlackList(address) {
  return BLACK_LIST.some(blackKeyword => address.includes(blackKeyword));
}

function isAdv(element) {
  if (!element.className) return false;
  const className = element.className;
  return (
    className.includes("tmp-search-card-top-tier") ||
    className.includes("native-ad")
  );
}

function getAddress(element) {
  if (element.nodeName !== "LI") return "";

  const content = element.getElementsByClassName(
    "tmp-search-card-list-view__card-content"
  )[0];
  if (content == null) return "";

  const addressElement = content.getElementsByClassName(
    "tmp-search-card-list-view__subtitle"
  )[0];
  if (addressElement == null) return "";

  return addressElement.innerText;
}

function start() {
  const listViewList = document.getElementById("ListViewList");
  if (listViewList == null) return;

  listViewList.childNodes.forEach(element => {
    if (isAdv(element)) {
      element.remove();
      return;
    }

    if (isAddressInBlackList(getAddress(element))) {
      element.remove();
    }
  });
}

start();
