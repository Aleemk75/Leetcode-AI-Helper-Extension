console.log("LeetCode Helper Active!");

const metaDescriptionEl = document.querySelector("meta[name=description]");

const problemstatement = metaDescriptionEl?.getAttribute("content");

console.log("Problem statement:", problemstatement);
