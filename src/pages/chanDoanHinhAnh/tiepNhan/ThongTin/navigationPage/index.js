import React from "react";
import Scroll from "react-scroll";
import { NavigationPage } from "../styled";
import IcDot from "assets/images/khamBenh/icDot.svg";
import { NavigationWrapper } from "./styled";

const Link = Scroll.Link;
function ThongTin({
  title,
  icon,
  dataChild,
  color,
  itemKey,
  padding,
  handleScroll
}) {

  const onActive = (key) => handleScroll(key);

  return (
    <NavigationWrapper>
      <Link
        activeClass="active"
        to={itemKey}
        spy={true}
        smooth={true}
        isDynamic={true}
        duration={250}
        containerId="containerElement"
        offset={-75}
        onSetActive={onActive}
      >
        <NavigationPage padding={padding} color={color}>
          {icon}
          <div className="content">
            <div className="content--title">{title}</div>
            <div className="content--child">
              {dataChild.map((item, index) => {
                return (
                  <div className="content--item" key={`${index}-${item.title}`}>
                    <IcDot />
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </NavigationPage>
      </Link>
    </NavigationWrapper>
  );
}

export default ThongTin;
