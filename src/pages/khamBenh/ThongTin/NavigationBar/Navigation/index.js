import React, {
  useImperativeHandle,
  forwardRef,
  useRef,
  useEffect,
} from "react";
import Scroll, { scroller } from "react-scroll";
import IcDot from "assets/images/khamBenh/icDot.svg";
import { NavigationWrapper, Main } from "./styled";
import { useSelector, useDispatch } from "react-redux";
const Link = Scroll.Link;
const Navigation = (
  {
    title,
    icon,
    dataChild,
    color,
    onActive,
    itemKey,
    padding,
    trangThai,
    onClickChild,
    layerId,
  },
  ref
) => {
  const refFunOnClick = useRef(null);
  const refLink = useRef(null);
  const elementKey = useSelector((state) => state.khamBenh.elementKey);
  const trangThaiKham = useSelector(
    (state) => state.khamBenh.thongTinChiTiet?.nbDvKyThuat?.trangThai
  );
  const { onRegisterHotkey } = useDispatch().phimTat;

  const onSetActive = (key, element, onClick) => {
    if (itemKey != elementKey) {
      onActive(key, onClick);
    }
  };

  useImperativeHandle(ref, () => ({
    setActive: (active) => {
      // setTimeout(() => {
      //   if (refLink.current?.parentNode?.classList) {
      //     if (!active) refLink.current.parentNode.classList.remove("active");
      //     else refLink.current.parentNode.classList.add("active");
      //   }
      // }, 500);
    },
  }));
  useEffect(() => {
    let key = 119;
    switch (itemKey + "") {
      case "0":
        key = 119;
        break;
      case "1":
        key = 120;
        break;
      case "2":
        key = 121;
        break;
      case "3":
        key = 122;
        break;
      case "4":
        key = 123;
        break;
    }
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: key,
          onEvent: () => {
            refFunOnClick.current && refFunOnClick.current();
          },
        },
      ],
    });
  }, []);

  const onClick = (e) => {
    if (trangThaiKham < trangThai) return;
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    scroller.scrollTo(itemKey, {
      duration: 500,
      smooth: "easeInOutQuint",
      containerId: "containerElement",
    });
    setTimeout(() => {
      onSetActive(itemKey, null, true);
    }, 500);
  };
  refFunOnClick.current = onClick;

  return (
    <NavigationWrapper trangThai={trangThai} trangThaiKham={trangThaiKham}>
      <Link
        className={`${elementKey == itemKey ? "active" : ""}`}
        activeClass="active"
        to={itemKey}
        spy={true}
        smooth={true}
        isDynamic={true}
        duration={250}
        containerId="containerElement"
        offset={0}
        onSetActive={onSetActive}
        onClick={onClick}
      >
        <Main padding={padding}  color={color} onClick={onClick}>
          {icon}
          <div className="content">
            <div className="content--title">{title}</div>
            <div className="content--child">
              {dataChild.map((item, index) => {
                return (
                  <div
                    className="content--item"
                    key={`${index}-${item.title}`}
                    onClick={() => onClickChild(item)}
                  >
                    <IcDot />
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </Main>
      </Link>
    </NavigationWrapper>
  );
};

export default forwardRef(Navigation);
