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
    children.forEach((el, index) => {
      if (el instanceof Component) {
        let oldElement;
        el.__onRender = (newElement) => {
          if (!oldElement) {
            element.appendChild(newElement);
          } else {
            element.replaceChild(newElement, oldElement);
          }
          oldElement = newElement;
        };
        el = el.doRender();
      } else {
        element.appendChild(el);
      }
    });
    return element;
  }
  if (children instanceof Component) {
    const element = document.createElement(tagName);
    element.appendChild(children.doRender());
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
      case "onClick":
        element.addEventListener("click", value);
    }
  }
  return element;
};

export class Component {
  status = "new";

  constructor(props) {
    this.props = props;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.doRender();
  }

  doRender() {
    if (this.__onRender) {
      this.__onRender(this.render());
      if (this.status === "new") {
        this.componentDidMount();
      }
      this.status = "mount";
    }
  }

  componentDidMount() {}

  render() {}
}
