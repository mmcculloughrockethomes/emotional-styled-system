/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import { css, useTheme } from "@emotion/react";
import { parseStyleProps, getFinalCss } from "../system";

interface boxPropTypes {
  children: string | JSX.Element | JSX.Element[];
  as?: keyof JSX.IntrinsicElements;
  showBoxTitle?: boolean;
  myTitle?: string;
  [x: string]: unknown | null;
}

const Box = ({
  children,
  as,
  showBoxTitle,
  myTitle,
  ...rest
}: boxPropTypes) => {
  const TagName = as ? as : "div";
  const [styleProps, forWardProps] = parseStyleProps(rest);

  // TODO: We should be able to use style props here
  const boxStyles = {
    border: "solid thin",
    marginRight: "20px",
    borderColor: "orange",
    borderWidth: "1px",
    ...styleProps,
  };
  const CSSWithMediaQueries = getFinalCss(boxStyles);

  return (
    <>
      <TagName css={CSSWithMediaQueries} {...forWardProps}>
        {showBoxTitle && <h3>{myTitle}</h3>}
        {children}
      </TagName>
    </>
  );
};
export { Box };
