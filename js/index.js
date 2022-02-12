const sections = document.querySelectorAll(".section");
const container = document.querySelector(".container");

let scrollHorizontally = false;

function GoToHorizontal(sectionNumber) {
  if (container.scrollTop + 50 > sections[sectionNumber].offsetTop) {
    if (!scrollHorizontally) {
      container.classList.replace(
        "container-scroll-vertically",
        "container-scroll-horizontally"
      );
      sections[sectionNumber].scrollIntoView({
        behavior: "auto",
        block: "start",
        inline: "nearest"
      });
      scrollHorizontally = true;
    }
  }
}

function GoToVertical(sectionNumber) {
  if (container.scrollLeft + 50 > sections[sectionNumber].offsetLeft) {
    if (scrollHorizontally) {
      container.classList.replace(
        "container-scroll-horizontally",
        "container-scroll-vertically"
      );
      sections[sectionNumber].scrollIntoView({
        behavior: "auto",
        block: "start",
        inline: "nearest"
      });
      scrollHorizontally = false;
    }
  }
}

function BackToVertical(sectionNumber) {
  if (container.scrollLeft + 50 < sections[sectionNumber + 1].offsetLeft) {
    if (scrollHorizontally) {
      container.classList.replace(
        "container-scroll-horizontally",
        "container-scroll-vertically"
      );
      sections[sectionNumber].scrollIntoView({
        behavior: "auto",
        block: "start",
        inline: "nearest"
      });
      scrollHorizontally = false;
    }
  }
}

function myFunction() {

  GoToHorizontal(2);
  BackToVertical(1);
//   GoToVertical(4);
//   BackToVertical(3);
}

container.addEventListener("scroll", myFunction);