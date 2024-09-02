import { BASE_Y_OFFSET } from "../exportConstants";

const Container = ({ offset = BASE_Y_OFFSET, margin = 112, index }) => {
  return (
    <rect
      width="calc(100% - 128px)"
      fill="#4B7895"
      rx="40"
      ry="40"
      height="80"
      x="64"
      y={offset + index * margin}
    />
  );
};

export default Container;
