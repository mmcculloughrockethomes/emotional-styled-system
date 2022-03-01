import * as CSS from "csstype";
import { t } from "../utils";

export const space = {
  margin: t.spaceT("margin"),
  marginTop: t.spaceT("marginTop"),
  marginRight: t.spaceT("marginRight"),
  marginBottom: t.spaceT("marginBottom"),
  marginLeft: t.spaceT("marginLeft"),
  marginX: t.spaceT(["marginInlineStart", "marginInlineEnd"]),
  marginY: t.spaceT(["marginTop", "marginBottom"]),
  padding: t.space("padding"),
  paddingTop: t.space("paddingTop"),
  paddingRight: t.space("paddingRight"),
  paddingBottom: t.space("paddingBottom"),
  paddingLeft: t.space("paddingLeft"),
  paddingX: t.space(["paddingInlineStart", "paddingInlineEnd"]),
  paddingY: t.space(["paddingTop", "paddingBottom"]),
};

Object.assign(space, {
  m: space.margin,
  mt: space.marginTop,
  mr: space.marginRight,
  mb: space.marginBottom,
  ml: space.marginLeft,
  mx: space.marginX,
  my: space.marginY,
  p: space.padding,
  pt: space.paddingTop,
  py: space.paddingY,
  px: space.paddingX,
  pb: space.paddingBottom,
  pl: space.paddingLeft,
  pr: space.paddingRight,
});

// styled-system/src/config/space.ts
export interface SpaceProps {
  margin?: CSS.Property.Margin;
  m?: CSS.Property.Margin;
  marginTop?: CSS.Property.MarginTop;
  mt?: CSS.Property.MarginTop;
  marginRight?: CSS.Property.MarginRight;
  mr?: CSS.Property.MarginRight;
  marginBottom?: CSS.Property.MarginBottom;
  mb?: CSS.Property.MarginBottom;
  marginLeft?: CSS.Property.MarginLeft;
  ml?: CSS.Property.MarginLeft;
  marginX?: CSS.Property.Margin;
  mx?: CSS.Property.Margin;
  marginY?: CSS.Property.Margin;
  my?: CSS.Property.Margin;
  padding?: CSS.Property.Padding;
  p?: CSS.Property.Padding;
  paddingTop?: CSS.Property.PaddingTop;
  pt?: CSS.Property.PaddingTop;
  paddingRight?: CSS.Property.PaddingRight;
  pr?: CSS.Property.PaddingRight;
  paddingBottom?: CSS.Property.PaddingBottom;
  pb?: CSS.Property.PaddingBottom;
  paddingLeft?: CSS.Property.PaddingLeft;
  pl?: CSS.Property.PaddingLeft;
  paddingX?: CSS.Property.Padding;
  px?: CSS.Property.Padding;
  paddingY?: CSS.Property.Padding;
  py?: CSS.Property.Padding;
}
