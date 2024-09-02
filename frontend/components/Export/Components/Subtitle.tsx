import { COLORS, SCREEN_WIDTH } from "../exportConstants";

const Subtitle = ({ children }) => (
  <text
    x={SCREEN_WIDTH / 2}
    y={280}
    className="subTitle"
    textAnchor="middle"
    dominant-baseline="middle"
    fill={COLORS.TEXT}
  >
    {children}
  </text>
);
export default Subtitle;
