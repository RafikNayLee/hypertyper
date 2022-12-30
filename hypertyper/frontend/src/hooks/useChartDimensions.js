import { useMediaQuery } from "./";

const useChartDimensions = () => {
  const isMobile320 = useMediaQuery("(max-width: 320px)");
  const isMobile375 = useMediaQuery("(max-width: 375px)");
  const isMobile425 = useMediaQuery("(max-width: 425px)");
  const isTablet768 = useMediaQuery("(max-width: 768px)");
  let width = 380;
  if (isMobile320) width = 290;
  else if (isMobile375) width = 340;
  else if (isMobile425) width = 390;
  else if (isTablet768) width = 320;

  return {
    width,
    height: 200,
    margin: { top: 20, right: 30, bottom: 30, left: 40 },
  };
};

export default useChartDimensions;
