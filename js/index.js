const sections = document.querySelectorAll('.section');
const container = document.querySelector('.container');
const aboutImgContainer = document.querySelector('.about .image-container');
const aboutImg = document.querySelector('.about .image-container img');
const howAmIDescription = document.querySelector(
  '.about .how-am-i .description'
);
const myJobDescription = document.querySelector('.about .my-job .description');
const links = document.querySelectorAll(
  'footer .info div , .contact .email , .contact .phone'
);
const barContainer = document.querySelectorAll(
  '.certificate .content .controller'
);
const certificateBox = document.querySelectorAll('.certificate .content .box');
const layers = document.querySelectorAll('.experience .layer');
const dot = document.querySelectorAll('.experience .dot-container .dot');
const project = document.querySelectorAll('.projects .box .project');
const drop = document.querySelectorAll('.projects .controller .drop');
const themeIcon = document.querySelector('.contact .color-icon');
const themeContainer = document.querySelector(
  '.contact .color-icon .theme-container'
);
const themes = document.querySelectorAll('.contact .color-icon .theme');
const contactSection = sections[5];
const lands = document.querySelectorAll('.contact .map .land');

const sectionsPosition = {
  current: 5,
  otherSide: 0,
  left: 2,
  right: 3,
  top: 4,
  bottom: 1,
};

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

// on load
goToSectionPro(sectionsPosition.current);
showCurrent();

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

// project

function changeProject() {
  const currentProject = this.dataset.id;
  // drop animation
  drop.forEach((d) => d.classList.remove('active'));
  this.classList.add('active');
  // project animation
  // 1 remove class from projects
  project.forEach((p) => {
    p.classList.remove('active');
  });
  // add project after time
  setTimeout(() => {
    project[currentProject].classList.add('active');
  }, 2000);
  // 3 replace text after time
  setTimeout(() => {
    project.forEach((p) => {
      p.querySelector('.text').classList.remove('active');
    });
    project[currentProject].querySelector('.text').classList.add('active');
  }, 2400);
}

drop.forEach((D) => {
  D.addEventListener('click', changeProject);
});

// change theme
const themeArray = [
  {
    '--color1': '#19282f',
    '--color2': '#b33030',
    '--color3': '#a1b57d',
    '--color4': '#d3eca7',
    '--color5': '#fff',
    '--color6': '#19282f73',
    '--color7': '#535e40',
  },
  {
    '--color1': '#0f0e0e',
    '--color2': '#541212',
    '--color3': '#8b9a46',
    '--color4': '#eeeeee',
    '--color5': '#fff',
    '--color6': '#19282f73',
    '--color7': '#535e40',
  },
  {
    '--color1': '#000000',
    '--color2': '#aa14f0',
    '--color3': '#bc8cf2',
    '--color4': '#eeeeee',
    '--color5': '#fff',
    '--color6': '#19282f73',
    '--color7': '#535e40',
  },
];

function setTheme(themeNumber) {
  const keys = Object.keys(themeArray[themeNumber]);
  keys.forEach((key) => {
    document.documentElement.style.setProperty(
      key,
      themeArray[themeNumber][key]
    );
  });
}

function toggleThemes() {
  themeContainer.classList.toggle('active');
}

function changeTheme() {
  const themeNumber = this.dataset.id;
  setTheme(themeNumber);
}

themeIcon.addEventListener('click', toggleThemes);
themes.forEach((theme) => {
  theme.addEventListener('click', changeTheme);
});

// onload
setTheme(0);

async function shrinkMap() {
  contactSection.classList.add('be-nav');
  switch (this.classList[1]) {
    case 'experience-land':
      scrollHorizontally();
      reverseDirection();
      showSection(2);
      await goToSectionPro(2);
      sectionsPosition.current(2);
      showCurrent();
      break;

    case 'about-land':
      scrollHorizontally();
      rightDirection();
      showSection(0);
      await goToSectionPro(0);
      sectionsPosition.current(0);
      showCurrent();
      break;

    case 'skills-land':
      scrollVertically();
      rightDirection();
      showSection(3);
      await goToSectionPro(3);
      sectionsPosition.current(3);
      showCurrent();
      break;

    case 'certificate-land':
      scrollVertically();
      reverseDirection();
      showSection(1);
      await goToSectionPro(1);
      sectionsPosition.current(1);
      showCurrent();
      break;

    case 'projects-land':
      scrollHorizontally();
      reverseDirection();
      showSection(4);
      await goToSectionPro(4);
      sectionsPosition.current(4);
      showCurrent();
      break;
  }
}

lands.forEach((land) => {
  land.addEventListener('click', shrinkMap);
});
