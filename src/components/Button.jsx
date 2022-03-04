/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import { useTheme } from "@emotion/react";

export function Button({ children, as = 'button', ...props }) {
  // const [additionalCssProps, forwardProps] = useCSSObject(props);
  // const theme = useTheme();
  // const buttonStyles = useMemo(() => {
  //   return {
  //     borderRadius: "2px",
  //     ...additionalCssProps,
  //   };
  // }, [additionalCssProps]);

  // const { isDisabled, isSpinning, as, ...otherProps } = forwardProps;

  const otherProps = {};
  const TagName = as ? as : "button";
  const buttonStyles = {};

  return (
    <TagName css={buttonStyles} disabled={false} {...otherProps} role="button">
      {children}
    </TagName>
  );
}
