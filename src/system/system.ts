import { space, color } from "./config";
import theme, { themeType, themeValue } from "../theme";
import facepaint from "facepaint";

export interface anyReactProps {
  [x: string]: unknown;
  sx?: {
    [x: string]: string;
  };
}

export type cssPropAndVar = [keyof themeValue, string | (string | number)[]];

interface stylePropsConfigItem {
  property: string;
  scale: string;
  transform?: Function;
}
export interface stylePropsConfigTyps {
  [x: string]: stylePropsConfigItem;
}

export function parseStyleProps(props: anyReactProps) {
  const styleProps: { [x: string]: string | number | (string | number)[] } = {};
  const forwardProps: { [x: string]: unknown } = {};
  const { sx, ...rest } = props;

  Object.entries(rest).forEach((entry: [string, unknown]) => {
    const [key, value] = entry;
    // console.log("typeof value", value, typeof value);
    if (
      (isStyleProp(key) && typeof value === "string") ||
      typeof value === "number" ||
      typeof value === "object"
    ) {
      styleProps[key] = value;
    } else {
      forwardProps[key] = value;
    }
  });

  const stylePropsMapped = getMappedStyleProps(styleProps);
  const finalStyledPropsMapped = { ...stylePropsMapped, ...sx };

  return [finalStyledPropsMapped, forwardProps];
}

// The prop keys are already known to be valid prop keys
interface mappedStylePropsTypes {
  [x: string]: string;
}

const mappedStyleProps: mappedStylePropsTypes = {};
const getMappedStyleProps = (styleProps: {
  [x: string]: string | number | (string | number)[];
}) => {
  Object.entries(styleProps).forEach((entry) => {
    const [key, value] = entry;
    // console.log("key", key);

    // const [cssProperty, cssValue] = getStylePropCssVar(key, value);
    const [cssProperty, cssValue] = getMappedCSSPropertyAndValue(key, value);
    mappedStyleProps[cssProperty] = cssValue;
  });

  return mappedStyleProps;
};

const getMappedCSSPropertyAndValue = (
  propKey: keyof stylePropsConfigTyps,
  propValue: string | number | (string | number)[]
): [keyof stylePropsConfigTyps, string] => {
  if (typeof propValue === "object") {
    // console.log("propValue", propValue);
    return getResponsiveThemeValues(propKey, propValue);
  } else {
    // console.log("map it", propKey, propValue);
    return getStylePropCssVar(propKey, propValue);
  }
};

const getAllStyleProps = (): stylePropsConfigTyps => {
  return {
    ...space,
    ...color,
  };
};

const isStyleProp = (propKey: string): Boolean => {
  const allStylePropKeys = Object.keys({
    ...space,
    ...color,
  });
  return allStylePropKeys.includes(propKey);
};

export const getPropKeyScale = (propKey: keyof stylePropsConfigTyps) => {
  const allStyleProps = getAllStyleProps();
  return allStyleProps[propKey].scale;
};

/**
 * Style Props tools
 *
 * covert {mb: "36"} to ['marginBottom', "var(--rh-space-36)"]
 * covert {color: "sprk.purple.deep"} to ['color', "var(--rh-colors-sprk_purple_dark)"]
 */
export function getStylePropCssVar(
  propKey: keyof stylePropsConfigTyps,
  propValue: string | number
): [keyof stylePropsConfigTyps, string] {
  const allStyleProps = getAllStyleProps();
  const propKeyScale = getPropKeyScale(propKey);

  const isValueInTheme = isValidThemeValue(propKeyScale, propValue);

  if (!isValueInTheme) {
    throwWarning("invalidThemeValue", [propKeyScale, propValue]);
  }

  const CSSVarFunctionString = getCSSVarFunctionString(propKeyScale, propValue);

  return [allStyleProps[propKey].property, CSSVarFunctionString];
}

/**
 * covert {mb: ["4", "8", "12", "16"]} to ['marginBottom', ["var(--rh-space-4)", "var(--rh-space-8)", "var(--rh-space-12)", "var(--rh-space-16)"]]
 *
 */
export const getResponsiveThemeValues = (
  stylePropKey: keyof stylePropsConfigTyps,
  stylePropValue: (string | number)[]
) => {
  const propKeyScale = getPropKeyScale(stylePropKey);
  const allStyleProps = getAllStyleProps();

  const cssValue = Object.values(stylePropValue).map((item) => {
    return getCSSVarFunctionString(propKeyScale, item);
  });
  const result = [[allStyleProps[stylePropKey].property, cssValue]];
  return result;
};

/**
 * Theme CSS var tools
 */

/**
 * Validates that a given themeKey and themeValueKey are found within the theme
 */
export function isValidThemeValue(
  themeKey: keyof themeType,
  themeValueKey: keyof themeValue | unknown
): boolean {
  if (typeof themeValueKey !== "string" && typeof themeValueKey !== "number")
    return false;
  return Boolean(theme?.[themeKey]?.[themeValueKey]);
}

/**
 * Contains the "template" for generating CSS variables given a themeKey and themeValueKey
 * Returns a string
 */
export function getCSSVarName(
  themeKey: keyof themeType,
  themeValueKey: keyof themeValue
): false | string {
  if (!isValidThemeValue(themeKey, themeValueKey)) return false;
  return `--rh-${themeKey}-${themeValueKey}`.replace(/\./gi, "_");
}

/**
 * Returns a value from the theme given a themeKey and themeValueKey
 */
export function getThemeValue(
  themeKey: keyof themeType,
  themeValueKey: keyof themeValue
): false | string | number {
  if (!isValidThemeValue(themeKey, themeValueKey)) return false;
  const themeValue = theme[themeKey][themeValueKey];
  return themeValue;
}

/**
 * Returns a CSS value - using CSS var function
 */
export function getCSSVarFunctionString(
  themeKey: keyof themeType,
  themeValueKey: string | number
): string {
  const varName = getCSSVarName(themeKey, themeValueKey);
  return `var(${varName})`;
}

/**
 * Return a string representing a CSS property/value. (using CSS var function)
 */
export function getThemeRuleCSSVarString(
  themeKey: keyof themeType,
  themeValueKey: string
): false | string {
  if (!isValidThemeValue(themeKey, themeValueKey)) return false;

  const varName = getCSSVarName(themeKey, themeValueKey);
  const varValue = getThemeValue(themeKey, themeValueKey);

  return `${varName}: ${varValue};`;
}

/**
 * Returns an array of CSS variables generated by the theme
 */
export function getThemeCSSVars() {
  let cssVars = [];
  for (let themeKey in theme) {
    for (let themeValueKey in theme[themeKey]) {
      const rule = getThemeRuleCSSVarString(themeKey, themeValueKey);
      cssVars.push(rule);
    }
  }
  return cssVars;
}

/**
 * Wrap in facepaint
 */

export function getFinalCss(
  css: mappedStylePropsTypes
): facepaint.DynamicStyle[] {
  const mq = facepaint([
    "@media(min-width: 420px)",
    "@media(min-width: 920px)",
    "@media(min-width: 1120px)",
  ]);
  return mq(css);
}

/**
 * Playing around...
 */
const generateErrorMessage = (
  staticTags: TemplateStringsArray,
  ...tags: string[]
) => {
  let str = [staticTags[0]];
  for (let i = 0; i < tags.length; i++) {
    str.push(tags[i] + staticTags[i + 1]);
  }
  return str.join("");
};

/**
 * Error Messages
 */
interface getErrorMessagePropTypes {
  [x: string]: Function;
}

const getErrorMessage: getErrorMessagePropTypes = {
  invalidStyleProp: (values: string[]) => {
    const [styleProp] = values;
    return generateErrorMessage`Invalid style prop ${styleProp}.`;
  },
  invalidThemeValue: (values: string[]) => {
    const [themeScale, themeValue] = values;
    return generateErrorMessage`Theme value "${themeValue}" not found in "${themeScale}".`;
  },
};

const throwWarning = (
  errorType: keyof getErrorMessagePropTypes,
  values: (string | number)[]
) => {
  const message = getErrorMessage[errorType](values);
  console.warn(`WARNING: ${message}`);
};

/**
 * TODO: Add psuedo selectors
 *
 * @chakra-ui/styled-system/src/pseudos.ts
 */
