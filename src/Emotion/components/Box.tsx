/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import { css, useTheme } from "@emotion/react";
import { parseStyleProps } from "../system";

interface boxPropTypes {
  children: string | JSX.Element | JSX.Element[];
  as?: keyof JSX.IntrinsicElements;
  showBoxTitle?: string;
  myTitle?: string;
  [x: string]: unknown;
}

const Box = ({
  children,
  as,
  showBoxTitle,
  myTitle,
  matIsCool,
  ...rest
}: boxPropTypes) => {
  const TagName = as ? as : "div";
  const [styleProps, forWardProps] = parseStyleProps(rest);

  const boxStyles = {
    border: "solid thin",
    marginRight: "20px",
    borderColor: "orange",
    borderWidth: "1px",
    ...styleProps,
  };

  return (
    <>
      <h3>
        {showBoxTitle} and {matIsCool}
      </h3>
      <TagName css={boxStyles} {...forWardProps}>
        {children}
      </TagName>
    </>
  );
};
export { Box };
