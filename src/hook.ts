import { useState, useEffect, useLayoutEffect } from "react";

const getWindowHeight = () => {
  return window.innerHeight;
};

export const useNoOfItemsToRender = () => {
  const [height, setHeight] = useState(getWindowHeight());
  const rowHeight = 40;

  useEffect(() => {
    function handleResize() {
      setHeight(getWindowHeight());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return Math.round(height / rowHeight);
};

export const useWindowPosition = () => {
  const [scrollPosition, setPosition] = useState(0);
  useLayoutEffect(() => {
    function updatePosition() {
      setPosition(window.pageYOffset);
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  return scrollPosition;
};
