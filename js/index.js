const sections = document.querySelectorAll(".section");
const container = document.querySelector(".container");
const UpLink = document.getElementById("up");
const downLink = document.getElementById("down");
const leftLink = document.getElementById("left");
const rightLink = document.getElementById("right");
const otherSideLink = document.getElementById("other-side");

let currentSection = 0;

let pageDirection = true;

// scroll dirction functions 

function scrollVertically () {
  container.classList.add("container-scroll-vertically");
  container.classList.remove("container-scroll-horizontally");
}

function scrollHorizontally () {
  container.classList.add("container-scroll-horizontally");
  container.classList.remove("container-scroll-vertically");
}

function reverseDirection () {
  container.classList.add("change-direction");
  pageDirection = false;
}

function rightDirection () {
  container.classList.remove("change-direction");
  pageDirection = true;
}

function changeDirection () {
  if (pageDirection) {
    reverseDirection();
  }else {
    rightDirection();
  }
}

// control page functions

function goToSection (sectionNumber) {
  sections[sectionNumber].scrollIntoView({
    behavior: "auto",
    block: "start",
    inline: "nearest"
  });
}

// moving Function
function goUp() {
  scrollVertically();
}

function goDown() {
  scrollVertically();
}

function goLeft() {
  scrollHorizontally();
}

function goRight() {
  scrollHorizontally();
}

function goOtherSide() {

}

// moving event listener 
UpLink.addEventListener("click",goUp);
downLink.addEventListener("click",goDown);
leftLink.addEventListener("click",goLeft);
rightLink.addEventListener("click",goRight);
otherSideLink.addEventListener("click",goOtherSide);

// on load
goToSection(currentSection);

// function scrollHandler () {

// }

// container.addEventListener("scroll", scrollHandler);