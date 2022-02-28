const isObject = (value) => typeof value === "object";

export const tokenToCSSVar = (scale, value) => (theme) => {
  const valueStr = String(value);
  const key = scale ? `${scale}.${valueStr}` : valueStr;
  return isObject(theme.__cssMap) && key in theme.__cssMap
    ? theme.__cssMap[key].varRef
    : value;
};

export function createTransform(options) {
  const { scale, transform, compose } = options;
  const fn = (value, theme) => {
    const _value = tokenToCSSVar(scale, value)(theme);
    let result = transform?.(_value, theme) ?? _value;
    if (compose) {
      result = compose(result, theme);
    }
    return result;
  };

  return fn;
}

export function toConfig(scale, transform) {
  return (property) => {
    const result = { property, scale };
    result.transform = createTransform({
      scale,
      transform,
    });
    return result;
  };
}

const transforms = {
  px: (value) => value,
};

export const t = {
  space: toConfig("space", transforms.px),
  spaceT: toConfig("space", transforms.px),
  colors: toConfig("colors"),
};
