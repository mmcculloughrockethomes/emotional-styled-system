import { space, color } from "./config";
import { SystemConfigTypes } from "./";
import theme, { themeType, themeValue } from "../theme";
import facepaint from "facepaint";

export interface anyReactProps {
  [x: string]: unknown;
  sx?: {
    [x: string]: string;
  };
}
type stylePropValueType = number | string | string[] | number[] | null | object;

interface stylePropType {
  [x: string]: stylePropValueType;
}

// export type cssPropAndVar = [keyof themeValue, string | (string | number)[]];
type mappedCssPropertyAndValueType = [string | string[], string | string[]];

interface stylePropsConfigItem {
  property: string;
  scale: string;
  transform?: Function;
}
export interface stylePropsConfigTyps {
  [x: string]: stylePropsConfigItem;
}

export function parseStyleProps(props: anyReactProps) {
  const styleProps: stylePropType = {};
  const forwardProps: anyReactProps = {};
  const { sx, ...rest } = props;

  Object.entries(rest).forEach((entry: [string, unknown]) => {
    const [key, value] = entry;
    if (
      (isStyleProp(key) && typeof value === "string") ||
      typeof value === "number" ||
      typeof value === "object"
    ) {
      const thing = key;
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
  [x: string | number]: string;
}

const getMappedStyleProps = (styleProps: stylePropType) => {
  const mappedStyleProps: {
    [x: string | number]: string | string[];
  } = {};
  Object.entries(styleProps).forEach((entry) => {
    const [key, value] = entry;
    // const [cssProperty, cssValue] = getStylePropCssVar(key, value);
    const [cssProperty, cssValue] = getMappedCSSPropertyAndValue(key, value);
    mappedStyleProps[cssProperty] = cssValue;
  });

  return mappedStyleProps;
};

const getMappedCSSPropertyAndValue = (
  propKey: keyof stylePropsConfigTyps,
  propValue: stylePropValueType
): [keyof stylePropsConfigTyps, string | string[]] => {
  // ): [string | string[], string | string[]] => {
  if (typeof propValue === "object") {
    const thingOne = getResponsiveThemeValues(propKey, propValue);
    console.log("thingOne", thingOne);
    return thingOne;
  } else {
    const thingTwp = getStylePropCssVar(propKey, propValue);
    console.log("thingTwp", thingTwp);
    return thingTwp;
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
  propKey: keyof stylePropsConfigTyps, // TODO: This can probably be a string
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
  stylePropValue: stylePropValueType
): [keyof stylePropsConfigTyps, string | string[]] => {
  // ): [string, string | string[]] => {
  const propKeyScale = getPropKeyScale(stylePropKey);
  const allStyleProps = getAllStyleProps();

  const cssValue = stylePropValue
    ? Object.values(stylePropValue).map((item) => {
        const thing = getCSSVarFunctionString(propKeyScale, item);
        return thing;
      })
    : null;

  const property = allStyleProps[stylePropKey].property;

  const result = [property, cssValue] as [string, string | string[]];
  return result;
};

/**
 * Validates that a given themeKey and themeValueKey are found within the theme
 */
export function isValidThemeValue(
  themeKey: keyof themeType,
  themeValueKey: keyof themeValue
) {
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
