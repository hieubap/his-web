import React, { useRef, useEffect, useMemo } from "react";
import Navigation from "./Navigation";
import useWindowSize from "hook/useWindowSize";
import { listNav } from "../config";
import { useDispatch, useSelector } from "react-redux";
import {cloneDeep} from "lodash"
const NavigationBar = ({ onActiveTab, layerId }) => {
  const windowSize = useWindowSize();
  const infoNb = useSelector((state) => state.khamBenh.infoNb);
  const setElementKey = useDispatch().khamBenh.setElementKey;
  const updateData = useDispatch().khamBenh.updateData;


  // const refTimeout = useRef(null);
  // const refElementKey = useRef(null);
  const refLinks = useRef({});
  // useEffect(() => {
  // if (refTimeout.current) {
  //   clearTimeout(refTimeout.current);
  // }
  // refTimeout.current = null;
  // refElementKey.current = elementKey;
  // }, [elementKey]);
  const onActive = (key, onClick) => {
    // if (refTimeout.current) {
    //   clearTimeout(refTimeout.current);
    // }
    // console.log(onClick);
    // refTimeout.current = setTimeout(
    //   (key) => {
    setElementKey(key);
    onActiveTab(key);
    //   },
    //   onClick ? 0 : 2000,
    //   key
    // );
    // if (key) {  
    //   refLinks.current[refElementKey.current] &&
    //     refLinks.current[refElementKey.current].setActive(false);
    //   refLinks.current[key] && refLinks.current[key].setActive(true);
    //   refElementKey.current = key;
    // }
  };
  const onClickChild = (item) => {
    let obj = {}
    if (item === "Khám covid") {
      obj = {
        title: item,
        type: "khamCovid"
      }
    }
    updateData({
      typeKhamCoBan: obj
    })
  }
  const list = useMemo(() => {
    let clone = cloneDeep(listNav)
    return clone.filter(item => {
      if (!infoNb?.covid) {
        let index = item.dataChild.indexOf('Khám covid')
        if (index !== -1) {
          item.dataChild.splice(index, 1);
        }
      }
      return item
    })
  },[infoNb,listNav])
  return list.map((item, index) => {
    return (
      <Navigation
        {...item}
        ref={(ref) => (refLinks.current[item.itemKey] = ref)}
        key={item.title}
        onActive={onActive}
        onClickChild={onClickChild}
        padding={(windowSize.height - 700) / 10}
        layerId={layerId}
      />
    );
  });
};

export default NavigationBar;
