import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function getElementHeights(height) {
  const bannerHeight = document.getElementById("banner").clientHeight;
  const bodyHeight =
    height -
    bannerHeight -
    6 * parseFloat(getComputedStyle(document.documentElement).fontSize);
  return { bannerHeight, bodyHeight };
}

export default function useWindowDimensions() {
  const [windowdimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [bannerHeight, setBannerHeight] = useState(0);
  const [bodyHeight, setBodyHeight] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
      const heights = getElementHeights(windowdimensions.height);
      setBannerHeight(heights.bannerHeight);
      setBodyHeight(heights.bodyHeight);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowdimensions.height]);

  useEffect(() => {
    const heights = getElementHeights(windowdimensions.height);
    setBannerHeight(heights.bannerHeight);
    setBodyHeight(heights.bodyHeight);
  }, [bannerHeight, windowdimensions.height]);

  return { bannerHeight, bodyHeight };
}
