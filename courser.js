const carouselImages = document.querySelector(".carousel__images");
const images = document.querySelectorAll(".carousel__images img");
const carouselButtons = document.querySelectorAll(".carousel__button");
const numberOfImages = document.querySelectorAll(
  ".carousel__images img"
).length;

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0;
let translateX = 0;

console.log(images[0]);
images.forEach((slide, index) => {
  slide.addEventListener("dragstart", (e) => e.preventDefault());
});

function indexChange(index) {
  slide = images[index];
  // Touch events
  console.log("index");
  slide.addEventListener("touchstart", touchStart(index));
  slide.addEventListener("touchend", touchEnd);
  slide.addEventListener("touchmove", touchMove);

  // Mouse events
  slide.addEventListener("mousedown", touchStart(index));
  slide.addEventListener("mouseup", touchEnd);
  slide.addEventListener("mouseleave", touchEnd);
  slide.addEventListener("mousemove", touchMove);
}

indexChange(0);

// Disable context menu
window.oncontextmenu = function (event) {
  event.preventDefault();
  event.stopPropagation();
  return false;
};

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPos = getPositionX(event);
    isDragging = true;

    // https://css-tricks.com/using-requestanimationframe/
    animationID = requestAnimationFrame(animation);
  };
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -50 && currentIndex < numberOfImages - 1) {
    currentIndex += 1;
    indexChange(currentIndex);
    setPositionByIndex();
  }

  if (movedBy > 50 && currentIndex > 0) {
    currentIndex -= 1;
    indexChange(currentIndex);
    setPositionP();
  }
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);

    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  const movedBy = currentTranslate - prevTranslate;
  // console.log(movedBy, currentIndex, "a");
  if (currentIndex != 0 && currentIndex != numberOfImages - 1) {
    setSliderPosition();
  } else if (currentIndex == 0 && movedBy < 0) {
    setSliderPosition();
  } else if (currentIndex == numberOfImages - 1 && movedBy > 0) {
    setSliderPosition();
  }
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  // console.log(currentTranslate, "s");
  carouselImages.style.transform = `translateX(${currentTranslate}px)`;
  images.forEach((image, index) => {
    if (index === currentIndex) {
      image.classList.add("active");
    } else {
      image.classList.remove("active");
    }
  });
}

function setPositionByIndex() {
  if (currentIndex != numberOfImages) {
    translateX = translateX - 150;
  }

  currentTranslate = translateX;
  prevTranslate = currentTranslate;
  setSliderPosition();
}
function setPositionP() {
  if (currentIndex >= 0) {
    translateX = translateX + 150;
  }

  currentTranslate = translateX;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

// let imageIndex = 1;
// let translateX = 0;
// carouselButtons.forEach((button) => {
//   console.log(button, "ds");
//   button.addEventListener("click", (event) => {
//     if (event.target.id === "previous") {
//       if (imageIndex !== 1) {
//         imageIndex--;
//         translateX += 150;
//       }
//     } else {
//       if (imageIndex !== numberOfImages) {
//         imageIndex++;
//         translateX -= 150;
//       }
//     }

//     carouselImages.style.transform = `translateX(${translateX}px)`;
//     images.forEach((image, index) => {
//       if (index === imageIndex - 1) {
//         image.classList.add("active");
//       } else {
//         image.classList.remove("active");
//       }
//     });
//   });
// });
