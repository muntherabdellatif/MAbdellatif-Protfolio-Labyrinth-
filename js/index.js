const sections = document.querySelectorAll(".section");
const container = document.querySelector(".container");
const UpLink = document.getElementById("up");
const downLink = document.getElementById("down");
const leftLink = document.getElementById("left");
const rightLink = document.getElementById("right");
const otherSideLink = document.getElementById("other-side");

const sectionsPosition = {
  current : 0,
  otherSide : 5,
  left : 1,
  right : 4,
  top : 3,
  bottom: 2 
}

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

// control sections functions

function goToSection (sectionNumber) {
  sections[sectionNumber].scrollIntoView(
    {
    behavior: "smooth",
    block: "end",
    inline: "nearest"
  }
  );
}

function showCurrent() {
  sections.forEach((section,index)=>{
    if (index!==sectionsPosition.current){
      section.classList.add("hidden");
    }else {
      section.classList.remove("hidden");
    }
  })
}

function showSection(sectionNumber) {
  console.log(sectionNumber);
  sections[sectionNumber].classList.remove("hidden");
}

// moving Function
function goDown() {
  scrollVertically();
  if (sectionsPosition.current>sectionsPosition.bottom){
    reverseDirection();
  }else {
    rightDirection();
  }
  showSection(sectionsPosition.bottom);
  goToSection(sectionsPosition.bottom);
  setTimeout(() => {  
    sectionsPosition.top = sectionsPosition.current;
    sectionsPosition.current = sectionsPosition.bottom;
    sectionsPosition.bottom = sectionsPosition.otherSide;
    sectionsPosition.otherSide =5 - sectionsPosition.current;
    showCurrent(sectionsPosition.current);
  }, 500);
}

function goUp() {
  scrollVertically();
  if (sectionsPosition.current<sectionsPosition.top){
    reverseDirection();
  }else {
    rightDirection();
  }
  showSection(sectionsPosition.top);
  goToSection(sectionsPosition.top);
  setTimeout(() => {  
    sectionsPosition.bottom = sectionsPosition.current;
    sectionsPosition.current = sectionsPosition.top;
    sectionsPosition.top = sectionsPosition.otherSide;
    sectionsPosition.otherSide =5 - sectionsPosition.current;
    showCurrent(sectionsPosition.current);
  }, 500);
}

function goLeft() {
  scrollHorizontally();
  if (sectionsPosition.current<sectionsPosition.left){
    reverseDirection();
  }else {
    rightDirection();
  }
  showSection(sectionsPosition.left);
  goToSection(sectionsPosition.left);
  setTimeout(() => {  
    sectionsPosition.right = sectionsPosition.current;
    sectionsPosition.current = sectionsPosition.left;
    sectionsPosition.left = sectionsPosition.otherSide;
    sectionsPosition.otherSide =5 - sectionsPosition.current;
    showCurrent(sectionsPosition.current);
  }, 500);
}

function goRight() {
  scrollHorizontally();
  if (sectionsPosition.current>sectionsPosition.right){
    reverseDirection();
  }else {
    rightDirection();
  }
  showSection(sectionsPosition.right);
  goToSection(sectionsPosition.right);
  setTimeout(() => {  
    sectionsPosition.left = sectionsPosition.current;
    sectionsPosition.current = sectionsPosition.right;
    sectionsPosition.right = sectionsPosition.otherSide;
    sectionsPosition.otherSide =5 - sectionsPosition.current;
    showCurrent(sectionsPosition.current);
  }, 500);
}

function goOtherSide() {
  sections[sectionsPosition.current].classList.add("front-section");
  setTimeout(() => {  
    sectionsPosition.current = sectionsPosition.otherSide;
    sectionsPosition.otherSide =5 - sectionsPosition.current;
    showCurrent(sectionsPosition.current);
    sections[sectionsPosition.current].classList.remove("front-section");
  }, 1000);
}

// moving event listener 
downLink.addEventListener("click",goDown);
UpLink.addEventListener("click",goUp);
leftLink.addEventListener("click",goLeft);
rightLink.addEventListener("click",goRight);
otherSideLink.addEventListener("click",goOtherSide);

// on load
goToSection(sectionsPosition.current);
showCurrent();

// function scrollHandler () {

// }

// container.addEventListener("scroll", scrollHandler);