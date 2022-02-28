/** @jsxImportSource @emotion/react */
import { css, jsx, useTheme } from "@emotion/react";
import { useCSSObject } from "../helpers";
import { getStylePropCssVar, getThemeCSSVars } from "../system";

import * as Config from "../config";

export function Container({ children, ...props }) {
  const [additonalCssProps, forwardProps] = useCSSObject(props);
  getThemeCSSVars();
  getStylePropCssVar();
  //   console.log("Config", { ...Config });
  //   console.log("Config.space", Config.space);
  return <div {...forwardProps}>{children}</div>;
}
