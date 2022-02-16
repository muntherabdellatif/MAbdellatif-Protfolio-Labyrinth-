const sections = document.querySelectorAll(".section");
const container = document.querySelector(".container");
const UpLink = document.getElementById("up");
const downLink = document.getElementById("down");
const leftLink = document.getElementById("left");
const rightLink = document.getElementById("right");
const otherSideLink = document.getElementById("other-side");
const navBar = document.querySelectorAll("nav ul li");

const sectionsPosition = {
  current: 0,
  otherSide: 5,
  left: 1,
  right: 4,
  top: 3,
  bottom: 2,
};

const sectionsNames = [
  "section1",
  "sections2",
  "section3",
  "section4",
  "section5",
  "section6",
];

let pageDirection = true;
let nextSectionPosition = "";
// scroll direction functions

function scrollVertically() {
  container.classList.add("container-scroll-vertically");
  container.classList.remove("container-scroll-horizontally");
}

function scrollHorizontally() {
  container.classList.add("container-scroll-horizontally");
  container.classList.remove("container-scroll-vertically");
}

function reverseDirection() {
  container.classList.add("change-direction");
  pageDirection = false;
}

function rightDirection() {
  container.classList.remove("change-direction");
  pageDirection = true;
}

function changeDirection() {
  if (pageDirection) {
    reverseDirection();
  } else {
    rightDirection();
  }
}

// control sections functions

function goToSection(sectionNumber) {
  sections[sectionNumber].scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
}

function showCurrent() {
  sections.forEach((section, index) => {
    if (index !== sectionsPosition.current) {
      section.classList.add("hidden");
    } else {
      section.classList.remove("hidden");
    }
  });
}

function showSection(sectionNumber) {
  console.log(sectionNumber);
  sections[sectionNumber].classList.remove("hidden");
}
// moving Function

function findOppositeSide(direction) {
  const side = ["bottom", "top", "left", "right"];
  const opposite = ["top", "bottom", "right", "left"];
  let oppositeSide;
  side.forEach((s, i) => {
    if (direction === side) {
      oppositeSide = opposite[i];
      return oppositeSide;
    }
  });
}

function setScrollDirection(direction) {
  if (direction === "bottom" || direction === "top") {
    scrollVertically();
  } else if (direction === "left" || direction === "right") {
    scrollHorizontally();
  }
  if (direction === "bottom" || direction === "right") {
    if (sectionsPosition.current > sectionsPosition[direction]) {
      reverseDirection();
    } else {
      rightDirection();
    }
  } else if (direction === "left" || direction === "top") {
    if (sectionsPosition.current < sectionsPosition[direction]) {
      reverseDirection();
    } else {
      rightDirection();
    }
  }
}

function reorderingSections(direction, oppositeSide) {
  sectionsPosition[oppositeSide] = sectionsPosition.current;
  sectionsPosition.current = sectionsPosition[direction];
  sectionsPosition[direction] = sectionsPosition.otherSide;
  sectionsPosition.otherSide = 5 - sectionsPosition.current;
}

function go(direction) {
  nextSectionPosition=direction;
  oppositeSide = findOppositeSide(direction);
  setScrollDirection(direction);
  showSection(sectionsPosition[direction]);
  goToSection(sectionsPosition[direction]);
  setTimeout(() => {
    reorderingSections(direction, oppositeSide);
    showCurrent(sectionsPosition.current);
  }, 400);
}

function goOtherSide() {
  if (pageDirection) {
    go("right");
    setTimeout(() => {
      go("top");
      setTimeout(() => {
        go("top");
        setTimeout(() => {
          go("top");
          setTimeout(() => {
            go("right");
            changeNavName();
            pageDirection = false;
          }, 400);
        }, 400);
      }, 400);
    }, 400);
  } else {
    go("bottom");
    setTimeout(() => {
      go("left");
      setTimeout(() => {
        go("left");
        setTimeout(() => {
          go("left");
          setTimeout(() => {
            go("bottom");
            changeNavName();
            pageDirection = true;
          }, 400);
        }, 400);
      }, 400);
    }, 400);
  }
}

// nav animation

function changeNavName() {
  navBar.forEach((e) => e.classList.add("color"));
  setTimeout(() => {
    navBar.forEach((e) => e.classList.remove("color"));
    UpLink.textContent = sectionsNames[sectionsPosition.top];
    downLink.textContent = sectionsNames[sectionsPosition.bottom];
    leftLink.textContent = sectionsNames[sectionsPosition.left];
    rightLink.textContent = sectionsNames[sectionsPosition.right];
    otherSideLink.textContent = sectionsNames[sectionsPosition.otherSide];
  }, 1500);
}

// moving event listener
downLink.addEventListener("click", () => {
  go("bottom");
  changeNavName();
});
UpLink.addEventListener("click", () => {
  go("top");
  changeNavName();
});
leftLink.addEventListener("click", () => {
  go("left");
  changeNavName();
});
rightLink.addEventListener("click", () => {
  go("right");
  changeNavName();
});
otherSideLink.addEventListener("click", () => {
  goOtherSide();
});

// on load
goToSection(sectionsPosition.current);
showCurrent();
changeNavName();