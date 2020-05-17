import { tag, createElement, Component } from "./createElement.js";

const li = tag("LI");
const ul = tag("UL");
const nav = tag("NAV");
const span = tag("SPAN");
const div = tag("DIV");
const p = tag("P");
const button = tag("BUTTON");

//
//
//

const Tab = ({ isActive, onClick }) => (children) =>
  li({
    className: isActive ? "tab active" : "tab",
  })(button({ className: "tabInner", onClick })(children));

class TabContent extends Component {
  render() {
    const { isActive, children } = this.props;
    return div({
      className: isActive ? "tabPanel active" : "tabPanel",
    })(p({ className: "tabText" })(children));
  }
}

class Carousel extends Component {
  state = {
    selectedTab: 0,
    tabItems: [],
  };

  constructor(props) {
    super(props);
    const { items } = this.props;
    const tabItems = Object.entries(items);
    const totalItems = tabItems.length;
    this.setState({ totalItems, tabItems });
  }

  componentDidMount() {
    document.addEventListener("keydown", (event) => {
      const { selectedTab, totalItems } = this.state;
      if (event.code === "ArrowRight") {
        this.moveCarouselTo(
          selectedTab === totalItems - 1 ? 0 : selectedTab + 1
        );
      }
      if (event.code === "ArrowLeft") {
        this.moveCarouselTo(
          selectedTab === 0 ? totalItems - 1 : selectedTab - 1
        );
      }
    });
  }

  moveCarouselTo(ind) {
    this.setState({ selectedTab: ind });
  }

  render() {
    const { selectedTab, tabItems } = this.state;

    const tabs = tabItems.map(([key], ind) =>
      Tab({
        isActive: ind === selectedTab,
        onClick: () => this.moveCarouselTo(ind),
      })(key.toUpperCase())
    );

    const tabPanels = tabItems.map(
      ([key, value], ind) =>
        new TabContent({ isActive: ind === selectedTab, children: value })
    );

    return div({ className: "content" })([
      nav({ className: "navMenu" })(ul({ className: "tabs" })(tabs)),
      div({ className: "tabPanels" })(tabPanels),
    ]);
  }
}

const renderCarouselMenu = (selector, items) => {
  const carousel = new Carousel({ items });

  carousel.__onRender = (newMarkup) => {
    let elementToInsert = document.querySelector(selector);
    elementToInsert.innerHTML = "";
    elementToInsert.appendChild(newMarkup);
  };
  carousel.doRender();
};

renderCarouselMenu("body", {
  "tab one": "tab one repeat 30 times ".repeat(30),
  "tab two": "tab two repeat 20 times ".repeat(20),
  "tab three": "tab three repeat 50 times ".repeat(50),
  "tab four": "tab four repeat 10 times ".repeat(10),
});
