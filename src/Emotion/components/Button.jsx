/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import { useTheme } from "@emotion/react";
import { useCSSObject } from "../helpers";

export function Button({ children, ...props }) {
  const [additionalCssProps, forwardProps] = useCSSObject(props);
  const theme = useTheme();
  const buttonStyles = useMemo(() => {
    return {
      borderRadius: "2px",
      ...additionalCssProps,
    };
  }, [additionalCssProps]);

  const { isDisabled, isSpinning, as, ...otherProps } = forwardProps;

  const TagName = as ? as : "button";

  return (
    <TagName css={buttonStyles} disabled={false} {...otherProps} role="button">
      {children}
      {isSpinning && <span>SPIN</span>}
    </TagName>
  );
}
