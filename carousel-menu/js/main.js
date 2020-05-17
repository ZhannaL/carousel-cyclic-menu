import { moveCarouselTo, moveNext, movePrev, moveByArrow } from "./move.js";
import { tag, createElement } from "./createElement.js";

const li = tag("LI");
const ul = tag("UL");
const nav = tag("NAV");
const span = tag("SPAN");
const div = tag("DIV");
const button = tag("BUTTON");

//
//
//

const App = (items) => {
  const menuItems = items.map((el, ind) => {
    return li({ className: "menuItem" })(
      span({ className: "menuItemInner" })(el)
    );
  });
  const dots = items.map((el, ind) => {
    return button({ className: "dotButton" })();
  });

  const leftButton = button({ className: "leftButton button" })("❮");
  const rightButton = button({ className: "rightButton button" })("❯");

  return {
    markup: div({ className: "content" })([
      nav({ className: "navMenu" })(ul({ className: "menu" })(menuItems)),
      leftButton,
      rightButton,
      div({ className: "dots" })(dots),
    ]),
    leftButton,
    rightButton,
    menuItems,
    dots,
  };
};

const state = (elements) => {
  let {
    leftButton: prev,
    rightButton: next,
    menuItems: items,
    dots: dotButtons,
  } = elements;
  const itemClassName = "menuItem";
  const totalItems = items.length;
  const dotClassName = "dotButton";
  let state = {
    slide: 0,
    itemClassName,
    items,
    totalItems,
    dotButtons,
    dotClassName,
  };

  const setInitialClasses = () => {
    items[totalItems - 1].classList.add("prev");
    items[0].classList.add("active");
    items[1].classList.add("next");

    dotButtons[0].classList.add("activeDot");
  };
  const setEventListeners = () => {
    next.addEventListener("click", () => {
      state = moveNext(state);
    });
    prev.addEventListener("click", () => {
      state = movePrev(state);
    });

    setInterval(() => {
      state = moveNext(state);
    }, 3000);

    [...dotButtons].forEach((dot, ind) => {
      dot.addEventListener("click", () => {
        state = moveCarouselTo(ind, state);
      });
    });

    document.addEventListener("keydown", (event) => {
      state = moveByArrow(event, state);
    });
  };

  function initCarousel() {
    setInitialClasses();
    setEventListeners();
  }
  initCarousel();
};

const renderCarouselMenu = (selector, items) => {
  let { markup, ...elements } = App(items);
  let elementToInsert = document.querySelector(selector);
  elementToInsert.appendChild(markup);
  state(elements);
};

// renderCarouselMenu("#first", [1, 2, 345]);
renderCarouselMenu("#second", ["1 Slide", "2 Slide", "3 Slide", "4 Slide"]);
