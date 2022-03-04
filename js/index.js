const sections = document.querySelectorAll('.section');
const container = document.querySelector('.container');
const UpLink = document.getElementById('up');
const downLink = document.getElementById('down');
const leftLink = document.getElementById('left');
const rightLink = document.getElementById('right');
const otherSideLink = document.getElementById('other-side');
const navBar = document.querySelectorAll('nav ul li');
const navList = document.querySelector('.nav-list');
const dice = document.querySelector('.dice');
const aboutImgContainer = document.querySelector('.about .image-container');
const aboutImg = document.querySelector('.about .image-container img');
const howAmIDescription = document.querySelector(
  '.about .how-am-i .description'
);
const myJobDescription = document.querySelector('.about .my-job .description');
const links = document.querySelectorAll('footer .info div');
const barContainer = document.querySelectorAll(
  '.certificate .content .controller'
);
const certificateBox = document.querySelectorAll('.certificate .content .box');
const layers = document.querySelectorAll('.experience .layer');
const dot = document.querySelectorAll('.experience .dot-container .dot');

const sectionsPosition = {
  current: 2,
  otherSide: 3,
  left: 1,
  right: 4,
  top: 5,
  bottom: 0,
};

const sectionsNames = [
  'About',
  'Certificates',
  'experience',
  'section3',
  'section4',
  'section5',
];

let delayTime = 600;
let isScrolling = false;
let pageDirection = true;
let nextSectionPosition = '';
// scroll direction functions

function scrollVertically() {
  container.classList.add('container-scroll-vertically');
  container.classList.remove('container-scroll-horizontally');
  console.log('vertically');
}

function scrollHorizontally() {
  container.classList.add('container-scroll-horizontally');
  container.classList.remove('container-scroll-vertically');
  console.log('horizontally');
}

function reverseDirection() {
  container.classList.add('change-direction');
  pageDirection = false;
  console.log('reverse');
}

function rightDirection() {
  container.classList.remove('change-direction');
  pageDirection = true;
  console.log('right');
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
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  });
}

const goToSectionPro = (sectionNumber) => {
  return new Promise((resolve, reject) => {
    goToSection(sectionNumber);
    setTimeout(() => {
      resolve(true);
    }, delayTime);
  });
};

function showCurrent() {
  container.classList.add('no-scroll');
  sections.forEach((section, index) => {
    if (index !== sectionsPosition.current) {
      section.classList.add('hidden');
    } else {
      section.classList.remove('hidden');
    }
  });
}

function showSection(sectionNumber) {
  container.classList.remove('no-scroll');
  console.log(sectionNumber);
  sections[sectionNumber].classList.remove('hidden');
}

// moving Function

function findOppositeSide(direction) {
  const side = ['bottom', 'top', 'left', 'right'];
  const opposite = ['top', 'bottom', 'right', 'left'];
  let oppositeSide;
  for (let s = 0; s < side.length; s++) {
    if (direction === side[s]) {
      oppositeSide = opposite[s];
      return oppositeSide;
    }
  }
}

const setScrollDirectionPro = (direction) => {
  return new Promise((resolve, reject) => {
    setScrollDirection(direction);
    setTimeout(() => {
      resolve(true);
    }, 100);
  });
};

function setScrollDirection(direction) {
  if (direction === 'bottom' || direction === 'top') {
    scrollVertically();
  } else if (direction === 'left' || direction === 'right') {
    scrollHorizontally();
  }
  if (direction === 'bottom' || direction === 'right') {
    if (sectionsPosition.current > sectionsPosition[direction]) {
      reverseDirection();
    } else {
      rightDirection();
    }
  } else if (direction === 'left' || direction === 'top') {
    if (sectionsPosition.current < sectionsPosition[direction]) {
      reverseDirection();
    } else {
      rightDirection();
    }
  }
}

function reorderingSections(direction, oppositeSide) {
  console.log(direction, oppositeSide);
  sectionsPosition[oppositeSide] = sectionsPosition.current;
  sectionsPosition.current = sectionsPosition[direction];
  sectionsPosition[direction] = sectionsPosition.otherSide;
  sectionsPosition.otherSide = 5 - sectionsPosition.current;
  console.log(sectionsPosition);
}

async function go(direction) {
  nextSectionPosition = direction;
  await setScrollDirectionPro(direction);
  showSection(sectionsPosition[direction]);
  await goToSectionPro(sectionsPosition[direction]);
  oppositeSide = findOppositeSide(direction);
  reorderingSections(direction, oppositeSide);
  showCurrent(sectionsPosition.current);
}

function goOtherSide() {
  if (pageDirection) {
    go('right');
    setTimeout(() => {
      go('top');
      setTimeout(() => {
        go('top');
        setTimeout(() => {
          go('top');
          setTimeout(() => {
            go('right');
            changeNavName();
            pageDirection = false;
          }, delayTime + 200);
        }, delayTime + 200);
      }, delayTime + 200);
    }, delayTime + 200);
  } else {
    go('bottom');
    setTimeout(() => {
      go('left');
      setTimeout(() => {
        go('left');
        setTimeout(() => {
          go('left');
          setTimeout(() => {
            go('bottom');
            changeNavName();
            pageDirection = true;
          }, delayTime + 200);
        }, delayTime + 200);
      }, delayTime + 200);
    }, delayTime + 200);
  }
}

// nav animation

function changeNavName() {
  navBar.forEach((e) => e.classList.add('color'));
  setTimeout(() => {
    navBar.forEach((e) => e.classList.remove('color'));
    UpLink.textContent = sectionsNames[sectionsPosition.top];
    downLink.textContent = sectionsNames[sectionsPosition.bottom];
    leftLink.textContent = sectionsNames[sectionsPosition.left];
    rightLink.textContent = sectionsNames[sectionsPosition.right];
    otherSideLink.textContent = sectionsNames[sectionsPosition.otherSide];
  }, 1500);
}

// moving event listener
downLink.addEventListener('click', () => {
  go('bottom');
  changeNavName();
});

UpLink.addEventListener('click', () => {
  go('top');
  changeNavName();
});

leftLink.addEventListener('click', () => {
  go('left');
  changeNavName();
});

rightLink.addEventListener('click', () => {
  go('right');
  changeNavName();
});

otherSideLink.addEventListener('click', () => {
  goOtherSide();
});

// on load
goToSectionPro(sectionsPosition.current);
showCurrent();
changeNavName();

container.onscroll = function () {
  navList.classList.remove('active');

  if (
    howAmIDescription.getBoundingClientRect().top < window.innerHeight &&
    howAmIDescription.getBoundingClientRect().bottom >= 0
  ) {
    howAmIDescription.classList.add('active');
  } else {
    howAmIDescription.classList.remove('active');
  }

  if (
    myJobDescription.getBoundingClientRect().top < window.innerHeight &&
    myJobDescription.getBoundingClientRect().bottom >= 0
  ) {
    myJobDescription.classList.add('active');
  } else {
    myJobDescription.classList.remove('active');
  }

  // let nextSection = sections[sectionsPosition[nextSectionPosition]];
  // if (
  //   Math.abs(container.scrollTop) + 200 >= Math.abs(container.clientHeight) ||
  //   Math.abs(container.scrollLeft) + 100 >= Math.abs(container.clientHeight)
  // ) {
  //   isScrolling = true;
  // } else {
  //   isScrolling = false;
  // }
};

// navbar on mobile

dice.addEventListener('click', () => {
  navList.classList.toggle('active');
});

// about

aboutImg.onmouseover = () => {
  aboutImgContainer.classList.add('active');
};

aboutImg.onmouseout = () => {
  aboutImgContainer.classList.remove('active');
};

// copy link

links.forEach((link) => {
  link.addEventListener('click', function () {
    links.forEach((l) => {
      l.title = 'copy';
      l.classList.remove('copied');
    });
    link.title = 'copied';
    link.classList.add('copied');
    navigator.clipboard.writeText(this.dataset.slink);
  });
});

// 3D animation bar

function setProgressBar(e) {
  const width = this.clientWidth;
  const position = e.offsetX;
  e.srcElement.querySelector('.bar').style.width = `${position}px`;
  const deg = (position / width) * 360;
  let shift = 0;
  const boxId = e.srcElement.dataset.id;
  // let width = screen.width;

  console.log(position);
  // large screen
  if (container.clientWidth > 450) {
    if (position >= 100 && position < 220) {
      shift = -150;
    }
    if (position >= 220 && position < 400) {
      shift = 50;
    }
  }
  // small screen screen
  else {
    if (position >= 55 && position < 150) {
      shift = -100;
    }
    if (position >= 150 && position < 225) {
      shift = 0;
    }
  }

  certificateBox[boxId].style.transform = `rotateY(${deg}deg)
   translate(${shift}px,0)`;
}

barContainer.forEach((bar) => {
  bar.addEventListener('click', setProgressBar);
});

// experience page
function showPage() {
  dot.forEach((D) => {
    D.classList.remove('active');
  });
  this.classList.add('active');
  const layerNumber = this.dataset.id;
  // add2
  if (layerNumber == 2) {
    layers[2].classList.remove('remove2');
    setTimeout(() => {
      layers[2].classList.add('add2');
    }, 0);
  }
  // add1 remove2
  else if (layerNumber == 1) {
    layers[1].classList.remove('remove1');
    setTimeout(() => {
      layers[1].classList.add('add1');
      setTimeout(() => {
        layers[2].classList.remove('add2');
        setTimeout(() => {
          layers[2].classList.add('remove2');
        }, 0);
      }, 0);
    }, 0);
  }
  // remove2 remove1
  else {
    layers[2].classList.remove('add2');
    setTimeout(() => {
      layers[2].classList.add('remove2');
      setTimeout(() => {
        layers[1].classList.remove('add1');
        setTimeout(() => {
          layers[1].classList.add('remove1');
        }, 0);
      }, 0);
    }, 0);
  }
}

dot.forEach((D) => {
  D.addEventListener('click', showPage);
});
