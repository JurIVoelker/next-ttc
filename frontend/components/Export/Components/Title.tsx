import { COLORS, SCREEN_WIDTH } from "../exportConstants";

const Title = ({ children }) => (
  <text
    x={SCREEN_WIDTH / 2}
    y={200}
    className="title"
    textAnchor="middle"
    dominant-baseline="middle"
    fill={COLORS.TEXT}
  >
    {children}
  </text>
);
export default Title;
