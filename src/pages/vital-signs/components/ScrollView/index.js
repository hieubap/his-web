import React, { useRef, useEffect } from "react";
export default function ScrollView(props) {
  const refScrollView = useRef(null);
  const refScrollViewDown = useRef(null);
  const refScrollViewStart = useRef(null);
  const refScrollViewLeft = useRef(null);

  useEffect(() => {
    refScrollViewDown.current = false;

    refScrollView.current.addEventListener("mousedown", scrollViewMouseDown);
    refScrollView.current.addEventListener("mouseleave", scrollViewMouseLeave);
    refScrollView.current.addEventListener("mouseup", scrollViewMouseLeave);
    refScrollView.current.addEventListener("mousemove", scrollViewMouseMove);
    return () => {
      refScrollView.current.removeEventListener(
        "mousedown",
        scrollViewMouseDown
      );
      refScrollView.current.removeEventListener(
        "mousedown",
        scrollViewMouseLeave
      );
      refScrollView.current.removeEventListener(
        "mouseup",
        scrollViewMouseLeave
      );
      refScrollView.current.removeEventListener(
        "mousemove",
        scrollViewMouseMove
      );
    };
  }, [refScrollView.current]);
  const scrollViewMouseDown = (e) => {
    refScrollViewDown.current = true;
    refScrollViewStart.current = e.pageX - refScrollView.current.offsetLeft;
    refScrollViewLeft.current = refScrollView.current.scrollLeft;
  };
  const scrollViewMouseLeave = (e) => {
    refScrollViewDown.current = false;
  };
  const scrollViewMouseMove = (e) => {
    if (!refScrollViewDown.current) return;
    e.preventDefault();
    const x = e.pageX - refScrollView.current.offsetLeft;
    const walk = x - refScrollViewStart.current; //scroll-fast
    refScrollView.current.scrollLeft = refScrollViewLeft.current - walk;
  };

  return (
    <div ref={refScrollView} {...props}>
      {props.children}
    </div>
  );
}
