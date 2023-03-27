import { useLocation } from "react-router-dom";

function useHideHeader() {
  const locationName = useLocation().pathname;

  switch (locationName) {
    case "/signup":
    case "/signin":
      return true;
    default:
      return false;
  }
}

export default useHideHeader;
