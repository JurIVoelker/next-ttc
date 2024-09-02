import { GENERAL_STYLES, SCREEN_WIDTH } from "../exportConstants";
import Bg from "./Bg";

const Layout = ({ height, children, ...props }) => (
  <svg
    width={SCREEN_WIDTH}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <style>{GENERAL_STYLES}</style>
    <Bg />
    {children}
  </svg>
);

export default Layout;
