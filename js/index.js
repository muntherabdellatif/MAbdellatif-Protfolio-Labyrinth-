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

const sectionsPosition = {
  current: 0,
  otherSide: 5,
  left: 1,
  right: 4,
  top: 3,
  bottom: 2,
};

const sectionsNames = [
  'About',
  'certificate and education',
  'section2',
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
