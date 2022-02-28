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
