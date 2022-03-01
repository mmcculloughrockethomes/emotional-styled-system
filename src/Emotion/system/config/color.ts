import * as CSS from "csstype";
import { t } from "../utils";

export const color = {
  color: t.colors("color"),
  textColor: t.colors("color"),
  fill: t.colors("fill"),
  stroke: t.colors("stroke"),
};

export interface ColorProps {
  color?: CSS.Property.Color;
  textColor?: CSS.Property.Color;
  fill?: CSS.Property.Color;
  stroke?: CSS.Property.Color;
}
