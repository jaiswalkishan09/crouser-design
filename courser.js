const carouselImages = document.querySelector(".carousel__images");
const images = document.querySelectorAll(".carousel__images img");
const carouselButtons = document.querySelectorAll(".carousel__button");
const numberOfImages = document.querySelectorAll(
  ".carousel__images img"
).length;
let imageIndex = 1;
let translateX = 0;
console.log(carouselImages, "co");
console.log(images, "im");
carouselButtons.forEach((button) => {
  console.log(button, "ds");
  button.addEventListener("click", (event) => {
    if (event.target.id === "previous") {
      if (imageIndex !== 1) {
        imageIndex--;
        translateX += 150;
      }
    } else {
      if (imageIndex !== numberOfImages) {
        imageIndex++;
        translateX -= 150;
      }
    }

    carouselImages.style.transform = `translateX(${translateX}px)`;
    images.forEach((image, index) => {
      if (index === imageIndex - 1) {
        image.classList.add("active");
      } else {
        image.classList.remove("active");
      }
    });
  });
});
