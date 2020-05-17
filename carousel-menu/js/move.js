export const moveCarouselTo = (newSlide, state) => {
  let {
    slide,
    itemClassName,
    items,
    totalItems,
    dotButtons,
    dotClassName,
  } = state;

  let newPrevious = newSlide - 1;
  let newNext = newSlide + 1;

  let oldPrevious = slide - 1;
  let oldNext = slide + 1;

  if (newPrevious < 0) {
    newPrevious = totalItems - 1;
  } else if (newNext > totalItems - 1) {
    newNext = 0;
  }

  if (oldPrevious < 0) {
    oldPrevious = totalItems - 1;
  } else if (oldNext > totalItems - 1) {
    oldNext = 0;
  }

  if (newSlide === 0) {
    newPrevious = totalItems - 1;
    newNext = newSlide + 1;
  } else if (newSlide === totalItems - 1) {
    newPrevious = newSlide - 1;
    newNext = 0;
  }

  items[oldPrevious].className = itemClassName;
  items[slide].className = itemClassName;
  items[oldNext].className = itemClassName;

  items[newPrevious].className = itemClassName + " prev";
  items[newSlide].className = itemClassName + " active";
  items[newNext].className = itemClassName + " next";

  dotButtons[slide].className = dotClassName;
  dotButtons[newSlide].className = dotClassName + " activeDot";

  return { ...state, slide: newSlide };
};

export const moveNext = (state) => {
  const { slide, totalItems } = state;
  return moveCarouselTo(slide === totalItems - 1 ? 0 : slide + 1, state);
};

export const movePrev = (state) => {
  const { slide, totalItems } = state;
  return moveCarouselTo(slide === 0 ? totalItems - 1 : slide - 1, state);
};

export const moveByArrow = (event, state) => {
  if (event.code === "ArrowRight") {
    return moveNext(state);
  }
  if (event.code === "ArrowLeft") {
    return movePrev(state);
  }
  return state;
};
