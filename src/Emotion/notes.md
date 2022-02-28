    Chakra system....

```typescript
//  styled-system/src/utils/create-transform.ts
export const tokenToCSSVar =
	(scale: ThemeScale, value: any) => (theme: Dict) => {
		const valueStr = String(value);
		const key = scale ? `${scale}.${valueStr}` : valueStr;
		return isObject(theme.__cssMap) && key in theme.__cssMap
			? theme.__cssMap[key].varRef
			: value;
	};

export function createTransform(options: CreateTransformOptions) {
	const { scale, transform, compose } = options;

	const fn: Transform = (value, theme) => {
		const _value = tokenToCSSVar(scale, value)(theme);
		let result = transform?.(_value, theme) ?? _value;
		if (compose) {
			result = compose(result, theme);
		}
		return result;
	};

	return fn;
}

// styled-system/src/utils/prop-config.ts
export function toConfig(scale: ThemeScale, transform?: Transform) {
	return <T extends CSSProp>(property: T | T[]) => {
		const result: PropConfig = { property, scale };
		result.transform = createTransform({
			scale,
			transform,
		});
		return result;
	};
}

// styled-system/src/utils/index.ts
export const t = {
	borderWidths: toConfig("borderWidths"),
	borderStyles: toConfig("borderStyles"),
	colors: toConfig("colors"),
	borders: toConfig("borders"),
	radii: toConfig("radii", transforms.px),
	space: toConfig("space", transforms.px),
	spaceT: toConfig("space", transforms.px),
	degreeT(property: PropConfig["property"]) {
		return { property, transform: transforms.degree };
	},
	prop(
		property: PropConfig["property"],
		scale?: ThemeScale,
		transform?: PropConfig["transform"]
	) {
		return {
			property,
			scale,
			...(scale && {
				transform: createTransform({ scale, transform }),
			}),
		};
	},
	propT(property: PropConfig["property"], transform?: PropConfig["transform"]) {
		return { property, transform };
	},
	sizes: toConfig("sizes", transforms.px),
	sizesT: toConfig("sizes", transforms.fraction),
	shadows: toConfig("shadows"),
	logical,
	blur: toConfig("blur", transforms.blur),
};

// styled-system/src/config/space.ts
export const space: Config = {
	margin: t.spaceT("margin"),
	marginTop: t.spaceT("marginTop"),
	marginBlockStart: t.spaceT("marginBlockStart"),
	marginRight: t.spaceT("marginRight"),
	marginInlineEnd: t.spaceT("marginInlineEnd"),
	marginBottom: t.spaceT("marginBottom"),
	marginBlockEnd: t.spaceT("marginBlockEnd"),
	marginLeft: t.spaceT("marginLeft"),
	marginInlineStart: t.spaceT("marginInlineStart"),
	marginX: t.spaceT(["marginInlineStart", "marginInlineEnd"]),
	marginInline: t.spaceT("marginInline"),
	marginY: t.spaceT(["marginTop", "marginBottom"]),
	marginBlock: t.spaceT("marginBlock"),
	padding: t.space("padding"),
	paddingTop: t.space("paddingTop"),
	paddingBlockStart: t.space("paddingBlockStart"),
	paddingRight: t.space("paddingRight"),
	paddingBottom: t.space("paddingBottom"),
	paddingBlockEnd: t.space("paddingBlockEnd"),
	paddingLeft: t.space("paddingLeft"),
	paddingInlineStart: t.space("paddingInlineStart"),
	paddingInlineEnd: t.space("paddingInlineEnd"),
	paddingX: t.space(["paddingInlineStart", "paddingInlineEnd"]),
	paddingInline: t.space("paddingInline"),
	paddingY: t.space(["paddingTop", "paddingBottom"]),
	paddingBlock: t.space("paddingBlock"),
};

Object.assign(space, {
	m: space.margin,
	mt: space.marginTop,
	mr: space.marginRight,
	me: space.marginInlineEnd,
	marginEnd: space.marginInlineEnd,
	mb: space.marginBottom,
	ml: space.marginLeft,
	ms: space.marginInlineStart,
	marginStart: space.marginInlineStart,
	mx: space.marginX,
	my: space.marginY,
	p: space.padding,
	pt: space.paddingTop,
	py: space.paddingY,
	px: space.paddingX,
	pb: space.paddingBottom,
	pl: space.paddingLeft,
	ps: space.paddingInlineStart,
	paddingStart: space.paddingInlineStart,
	pr: space.paddingRight,
	pe: space.paddingInlineEnd,
	paddingEnd: space.paddingInlineEnd,
});
```
