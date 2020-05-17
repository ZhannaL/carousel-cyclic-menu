export const createElement = (tagName) => (children) => {
  if (typeof children === "string" || typeof children === "number") {
    const textNode = document.createTextNode(children);
    const element = document.createElement(tagName);
    element.appendChild(textNode);
    return element;
  }
  if (children === undefined || children === null) {
    return document.createElement(tagName);
  }
  if (children instanceof Array) {
    const element = document.createElement(tagName);
    children.forEach((el) => element.appendChild(el));
    return element;
  }
  const element = document.createElement(tagName);
  element.appendChild(children);
  return element;
};

export const tag = (tagName) => (props = {}) => (children) => {
  let element = createElement(tagName)(children);
  let propsArray = Object.entries(props);
  for (const [key, value] of propsArray) {
    switch (key) {
      case "className":
        element.className = value;
        break;
      case "attribute":
        element.setAttribute(...value);
        break;
    }
  }
  return element;
};
