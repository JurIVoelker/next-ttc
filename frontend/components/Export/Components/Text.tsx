import { BASE_Y_OFFSET, SCREEN_WIDTH } from "../exportConstants";

export const Text = ({
  children,
  offset = BASE_Y_OFFSET,
  index,
  margin = 112,
  variant = "regular",
  anchor = "left",
  ...props
}) => {
  const variants = {
    regular: {
      className: "text",
      fontOffset: 56,
    },
    small: {
      className: "text-small",
      fontOffset: 52,
    },
    "small-accent": {
      className: "text-small-accent",
      fontOffset: 52,
    },
  };

  const anchorProps = {
    left: {
      x: 64 + 32,
    },
    center: {
      x: SCREEN_WIDTH / 2,
      textAnchor: "middle",
    },
    right: {
      x: SCREEN_WIDTH - 100,
      textAnchor: "end",
    },
  };

  const selectedVariant = variants[variant];

  return (
    <text
      {...anchorProps[anchor]}
      y={offset + index * margin + selectedVariant.fontOffset}
      fill="white"
      className={selectedVariant.className}
      {...props}
    >
      {children}
    </text>
  );
};
