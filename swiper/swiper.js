const container = document.querySelector(".container");

const swiperWrapper = document.querySelector(".swiper-wrapper");

const pagination = document.querySelector(".pagination");

let slideCount = 1;
const maxSlideCount = swiperWrapper.childElementCount;
const minSlideCount = 1;
const swipeWidth = 350;

// set pagination dots
for (let i = 1; i <= maxSlideCount; i++) {
  const div = document.createElement("div");
  if (i === 1) {
    div.classList.add("active");
  }
  pagination.appendChild(div);
}

const paginationDots = pagination.querySelectorAll("div");

paginationDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    paginationDots.forEach((pDot) => {
      pDot.classList.remove("active");
    });

    const moveSwiper = index * swipeWidth;
    swiperWrapper.style.transform = `translateX(-${moveSwiper}px)`;
    slideCount = index + 1;
    dot.classList.add("active");
  });
});

container.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const buttonDirection = button.dataset.direction;
    if (buttonDirection === "prev") swipeLeft();
    if (buttonDirection === "next") swipeRight();
  }
});

const swipeLeft = () => {
  if (slideCount === minSlideCount) {
    slideCount = 5;
  }
  const swipeToLeftOnce = (slideCount - 2) * swipeWidth;

  swiperWrapper.style.transform = `translateX(-${swipeToLeftOnce}px)`;

  // update pagination
  paginationDots.forEach((dot) => {
    dot.classList.remove("active");
  });
  slideCount--;
  paginationDots[slideCount - 1].classList.add("active");
};

const swipeRight = () => {
  if (slideCount === maxSlideCount) {
    slideCount = 0;
  }
  const swipeToRightOnce = slideCount * swipeWidth;

  swiperWrapper.style.transform = `translateX(-${swipeToRightOnce}px)`;

  // update pagination
  paginationDots.forEach((dot) => {
    dot.classList.remove("active");
  });

  slideCount++;
  paginationDots[slideCount - 1].classList.add("active");
};
