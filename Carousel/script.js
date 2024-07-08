// Sliding Images on Mouse Move           ==> DONE
// Working on Previous and next button    ==> DONE
// Infinite Scrolling Effect              ==> DONE
// Autoplay on non-mobile screen          ==> DONE
const wrapper = document.querySelector(".wrapper");
const arrowHolder = document.querySelector(".arrowHolder");
const cardWidth = document.querySelector(".card").offsetWidth;
let autoplayID;

function dragOnMouseMove() {
  let initialMousePosition,
    intialScrollLeft,
    startDragging = false;

  wrapper.addEventListener("mousedown", function (e) {
    initialMousePosition = e.pageX;
    intialScrollLeft = wrapper.scrollLeft;
    startDragging = true;
    wrapper.classList.add("draggingNOW");
    wrapper.classList.remove("arrowBtnNOW");
  });

  wrapper.addEventListener("mousemove", function (e) {
    // wrapper.scrollLeft = e.pageX;

    /* reason for boolean check is that the mousemove over 
          the wrapper should not move the wrapper, only 
          when mousedown has been performed the carousel 
          should move
          */
    if (startDragging === false) return;

    wrapper.scrollLeft = intialScrollLeft - (e.pageX - initialMousePosition);
  });

  wrapper.addEventListener("mouseup", function (e) {
    startDragging = false;
    wrapper.classList.remove("draggingNOW");
  });
}

dragOnMouseMove();

function PrevNextButton() {
  const btns = document.querySelectorAll(".arrow");
  const cardWidth = document.querySelector(".card").offsetWidth;
  btns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      wrapper.classList.add("arrowBtnNOW");
      wrapper.scrollLeft +=
        btn.dataset.function == "left" ? -cardWidth : cardWidth;
    });
  });
}
PrevNextButton();

function InfinteScrollingEffect() {
  const cardsPerView = Math.round(wrapper.offsetWidth / cardWidth);
  const cardsList = [...wrapper.children];
  console.log(cardsPerView);

  // Adding n cards from the start of cardsList to the end of wrapper
  cardsList.slice(0, cardsPerView).forEach((card) => {
    wrapper.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  // Adding n cards from the end of cardsList to the start of wrapper
  cardsList
    .slice(-cardsPerView)
    .reverse()
    .forEach((card) => {
      wrapper.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

  wrapper.scrollLeft = wrapper.offsetWidth + wrapper.offsetWidth * 0.05;

  wrapper.addEventListener("scroll", function () {
    if (wrapper.scrollLeft == 0) {
      // when you reach extreme left move to back
      //   console.log("extreme left reached");
      wrapper.classList.remove("arrowBtnNOW");
      wrapper.scrollLeft = wrapper.scrollWidth - 3 * wrapper.offsetWidth;

      //   7 8 9    1 2 3 4 5 6 7 8 9    1 2 3
    } else if (
      Math.ceil(wrapper.scrollLeft) ==
      wrapper.scrollWidth - wrapper.offsetWidth
    ) {
      // when you reach extreme right move to front
      //   console.log("extreme right reached");
      wrapper.classList.remove("arrowBtnNOW");
      wrapper.scrollLeft = 2 * wrapper.offsetWidth;
    }
  });
}

InfinteScrollingEffect();

function autoplay() {
  if (window.innerWidth < 800) return;
  autoplayID = setInterval(() => (wrapper.scrollLeft += cardWidth), 1500);
}

arrowHolder.addEventListener("mouseenter", () => {
  clearInterval(autoplayID);
});

arrowHolder.addEventListener("mouseleave", () => {
  autoplay();
});

window.onload = () => {
  autoplay();
};
